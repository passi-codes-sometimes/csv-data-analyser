# CSV Atelier

A small, database-free CSV analyser built with Python's standard library. Choose or drop in a CSV to see its row and column counts, numeric summaries, missing and unique values, common text values, a numeric distribution chart, and a preview of the first rows.

## Run it (easy way)

Double-click **START HERE.bat**. It starts the Python app and opens the website in your browser. Keep the black server window open while you use the app; close it when you're finished.

## Run it manually

1. Install Python 3.9 or newer from [python.org](https://www.python.org/downloads/). On Windows, enable **Add python.exe to PATH** during setup.
2. Open PowerShell in this folder.
3. Run `py app.py` (or `python app.py` if that command works).
4. Visit [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.
5. Choose a CSV, or click **Try a sample file** to download the included example.

Stop the server with Ctrl+C. The app binds to your own computer only. It uses no database and saves no uploaded file: Python analyses the upload in memory and returns a summary. The upload limit is 8 MB and the row limit is 100,000. Numeric summaries recognise plain numbers and common currency/percent symbols; dates and other values are treated as text.

## Project files

- `app.py` — local web server and CSV analysis logic
- `index.html`, `styles.css`, `app.js` — responsive upload and results interface
- `sample.csv` — example data for a first run
- `AGILE.md` — project vision, MVP scope, backlog, and Kanban board
