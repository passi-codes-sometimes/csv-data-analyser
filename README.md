# CSV Atelier

**A simple, local-first CSV analyser built with Python.** Choose a CSV file in the browser and get a quick summary of its rows, columns, missing values, numeric ranges, common text values, and first few records.

## What the project does

CSV Atelier is a small web app for students and beginners who want to understand a dataset before doing deeper analysis. The browser provides the upload and results screens; a Python server reads the CSV and calculates the summaries. It uses no database or accounts.

### Main features

- Upload or drag and drop a CSV file.
- See the number of rows, columns, numeric fields, and empty cells.
- Review column types, unique values, and common text values.
- Explore numeric minimum, maximum, mean, median, and a distribution chart.
- Preview the first eight rows.
- Try the app with the included `sample.csv`.
- Get readable errors for unsupported or oversized files.

## Run the app

### Easiest way on Windows

1. Install Python 3.9 or newer if it is not already installed: [python.org/downloads](https://www.python.org/downloads/).
2. Double-click **START HERE.bat**.
3. The app opens in your browser at [http://127.0.0.1:8000](http://127.0.0.1:8000). Keep the black server window open while using the app; close it when finished.

### Run it manually

Open PowerShell in this folder and run:

```powershell
py app.py
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000). Press **Ctrl+C** in PowerShell to stop the server.

## Privacy and limits

The app binds to your own computer. Uploaded CSV contents are analysed in memory and are not saved to a database or written to a file by the app. The current limits are **8 MB** and **100,000 rows** per file. Numeric summaries recognise plain numbers and common currency or percent symbols; dates and other values are treated as text.

## Agile methodology

This section records the project vision, user needs, current work, and likely next steps. It is a lightweight Agile planning snapshot for the current version; priorities can change after feedback from users or the professor.

### Product vision

Help a student or curious beginner get a quick, understandable first read on a CSV without installing analysis software or sending the data to a third-party service.

### Target users

- **Students** who need to understand an unfamiliar dataset before an assignment.
- **Beginners** who want plain-language summaries instead of a spreadsheet full of unexplained values.
- **Privacy-conscious users** who prefer a small local tool without accounts or a database.

### User stories and acceptance criteria

| ID | User story | Acceptance criteria |
| --- | --- | --- |
| US1 | As a student, I want to upload a CSV and see its size so I can understand the dataset quickly. | A valid CSV shows its row and column counts; an invalid file shows a clear error. |
| US2 | As a beginner, I want to see each column's type, missing cells, and unique values so I know what to inspect. | Each column is labelled as numeric or text and includes filled, missing, and unique counts. |
| US3 | As a user exploring numbers, I want basic statistics and a chart so I can spot the range and distribution. | Numeric columns show minimum, maximum, mean, median, and a distribution chart. |
| US4 | As a privacy-conscious user, I want the file handled locally without a database. | The app runs on localhost and analyses the upload in memory. |
| US5 | As a first-time visitor, I want a sample file and simple run instructions. | The project includes `sample.csv` and a one-click Windows launcher. |

### MVP backlog

Priority uses **Must**, **Should**, and **Could** to make scope visible. Estimates are relative effort points, not hours.

| ID | Backlog item | Priority | Estimate | Status |
| --- | --- | --- | ---: | --- |
| A1 | Create a clear, responsive workspace and upload area | Must | 3 | Done |
| A2 | Parse CSV files in Python and return useful errors | Must | 5 | Done |
| A3 | Summarise rows, columns, types, missing cells, and unique values | Must | 5 | Done |
| A4 | Show numeric statistics and a distribution chart | Must | 5 | Done |
| A5 | Preview rows and show frequent text values | Should | 3 | Done |
| A6 | Add a sample CSV and beginner-friendly setup instructions | Should | 2 | Done |
| A7 | Document the project plan and Kanban workflow | Must | 2 | Done |
| A8 | Recognise dates and summarise date ranges | Could | 3 | Backlog |
| A9 | Let users export a compact analysis report | Could | 5 | Backlog |
| A10 | Improve analysis for files larger than the current limits | Could | 5 | Backlog |

### Kanban board

Move each item from left to right as work progresses. Keep **In progress** to one item at a time (WIP limit: 1) so unfinished work stays visible and manageable.

| Backlog | Ready | In progress | Review / verify | Done |
| --- | --- | --- | --- | --- |
| A8 Date summaries | A9 Export a report | — | — | A1 Upload workspace |
| A10 Larger-file handling | — | — | — | A2 Python CSV parsing and errors |
| — | — | — | — | A3 Column summaries |
| — | — | — | — | A4 Numeric statistics and chart |
| — | — | — | — | A5 Preview and common text values |
| — | — | — | — | A6 Sample file and run instructions |
| — | — | — | — | A7 Agile planning notes |

### Definition of Done

An item can move to **Done** when:

- Its acceptance criteria are met in the user-facing app or documentation.
- The result or error is understandable to a beginner.
- It fits the project's local-first, no-database scope, or the scope change is documented.
- The README and Agile board reflect the delivered change.

### Review and next iteration

At a review, demonstrate uploading `sample.csv`, interpreting the summary, and handling an invalid or oversized file. Ask users what was clear, what was confusing, and which follow-up would help most. Use that feedback to reorder the backlog before starting the next iteration.

## Project files

| File | Purpose |
| --- | --- |
| `app.py` | Local Python web server and CSV analysis logic |
| `index.html`, `styles.css`, `app.js` | Browser interface and charts |
| `sample.csv` | Example data for a first run |
| `START HERE.bat` | One-click Windows launcher |
| `AGILE.md` | Expanded vision, backlog, and board notes |
