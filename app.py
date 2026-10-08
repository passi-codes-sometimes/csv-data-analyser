"""A database-free CSV analysis web app using only the Python standard library."""

from __future__ import annotations

import csv
import io
import json
import math
import os
import statistics
from collections import Counter
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parent
MAX_UPLOAD_BYTES = 8 * 1024 * 1024
MAX_ROWS = 100_000


def json_safe(value):
    if isinstance(value, float) and not math.isfinite(value):
        return None
    return value


def analyse_csv(raw: bytes, filename: str) -> dict:
    if len(raw) > MAX_UPLOAD_BYTES:
        raise ValueError("This file is larger than the 8 MB upload limit.")
    if not raw:
        raise ValueError("The file is empty. Choose a CSV with a header row and data.")
    try:
        text = raw.decode("utf-8-sig")
    except UnicodeDecodeError as exc:
        raise ValueError("Please save the file as UTF-8 CSV and try again.") from exc

    sample = text[:8192]
    try:
        dialect = csv.Sniffer().sniff(sample, delimiters=",;\t|")
    except csv.Error:
        dialect = csv.excel
    try:
        reader = csv.reader(io.StringIO(text, newline=""), dialect)
        headers = next(reader, None)
        if not headers or not any(cell.strip() for cell in headers):
            raise ValueError("The first row needs column names.")
        headers = [(h.strip() or f"Column {i + 1}") for i, h in enumerate(headers)]
        rows = []
        for row in reader:
            if not row or not any(cell.strip() for cell in row):
                continue
            if len(rows) >= MAX_ROWS:
                raise ValueError("This analyser supports up to 100,000 data rows at a time.")
            # Keep row shapes aligned with the header for reliable column summaries.
            rows.append((row + [""] * len(headers))[:len(headers)])
    except csv.Error as exc:
        raise ValueError("There is a formatting issue in this CSV. Check its rows and try again.") from exc

    columns = []
    for index, name in enumerate(headers):
        values = [row[index].strip() for row in rows]
        present = [value for value in values if value]
        parsed = []
        numeric = True
        for value in present:
            cleaned = value.replace(",", "").replace("$", "").replace("£", "").replace("€", "").replace("%", "")
            try:
                number = float(cleaned)
                if not math.isfinite(number):
                    numeric = False
                    break
                parsed.append(number)
            except ValueError:
                numeric = False
                break
        kind = "numeric" if present and numeric else "text"
        item = {
            "name": name,
            "type": kind,
            "filled": len(present),
            "missing": len(values) - len(present),
            "unique": len(set(present)),
        }
        if kind == "numeric":
            ordered = sorted(parsed)
            item["stats"] = {
                "min": json_safe(min(parsed)),
                "max": json_safe(max(parsed)),
                "mean": json_safe(statistics.fmean(parsed)),
                "median": json_safe(statistics.median(parsed)),
            }
            # Compact histogram for the chart, with a single bucket for constant values.
            if len(ordered) == 1 or ordered[0] == ordered[-1]:
                item["histogram"] = [{"label": f"{ordered[0]:g}", "count": len(ordered)}]
            else:
                bucket_count = min(8, max(4, round(math.sqrt(len(ordered)))))
                low, high = ordered[0], ordered[-1]
                counts = [0] * bucket_count
                for value in ordered:
                    bucket = min(bucket_count - 1, int((value - low) / (high - low) * bucket_count))
                    counts[bucket] += 1
                item["histogram"] = [
                    {"label": f"{low + (high-low)*i/bucket_count:.3g}", "count": count}
                    for i, count in enumerate(counts)
                ]
        else:
            common = Counter(present).most_common(6)
            item["top_values"] = [{"label": value, "count": count} for value, count in common]
        columns.append(item)

    preview = [[cell.strip() for cell in row] for row in rows[:8]]
    return {
        "filename": Path(filename).name[:120] or "your-file.csv",
        "row_count": len(rows),
        "column_count": len(headers),
        "columns": columns,
        "preview": preview,
        "headers": headers,
    }


class Handler(BaseHTTPRequestHandler):
    def _send(self, status, body, content_type="application/json; charset=utf-8"):
        encoded = body if isinstance(body, bytes) else body.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(encoded)

    def do_GET(self):
        path = urlparse(self.path).path
        if path in ("/", "/index.html"):
            try:
                self._send(200, (ROOT / "index.html").read_bytes(), "text/html; charset=utf-8")
            except OSError:
                self._send(500, "App page is missing", "text/plain; charset=utf-8")
        elif path in ("/styles.css", "/app.js"):
            target = ROOT / path.lstrip("/")
            mime = "text/css; charset=utf-8" if path.endswith(".css") else "text/javascript; charset=utf-8"
            try:
                self._send(200, target.read_bytes(), mime)
            except OSError:
                self._send(404, "Not found", "text/plain; charset=utf-8")
        elif path == "/api/sample":
            self._send(200, (ROOT / "sample.csv").read_bytes(), "text/csv; charset=utf-8")
        else:
            self._send(404, json.dumps({"error": "Not found"}))

    def do_POST(self):
        if urlparse(self.path).path != "/api/analyze":
            self._send(404, json.dumps({"error": "Not found"}))
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0:
                raise ValueError("Choose a CSV file to analyse.")
            if length > MAX_UPLOAD_BYTES:
                raise ValueError("This file is larger than the 8 MB upload limit.")
            raw = self.rfile.read(length)
            filename = unquote(self.headers.get("X-Filename", "your-file.csv"))
            result = analyse_csv(raw, filename)
            self._send(200, json.dumps(result, ensure_ascii=False, allow_nan=False))
        except ValueError as exc:
            self._send(400, json.dumps({"error": str(exc)}, ensure_ascii=False))
        except Exception:
            self._send(500, json.dumps({"error": "Something went wrong while reading this file."}))

    def log_message(self, fmt, *args):
        print(f"[{self.log_date_time_string()}] {fmt % args}")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    print(f"CSV Atelier is ready at http://127.0.0.1:{port}")
    print("Press Ctrl+C to stop the server.")
    ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
