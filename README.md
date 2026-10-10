# CSV Atelier — CSV Data Analyser

**An Agile-planned, local-first CSV analysis application built with Python.**

## 1. Project Overview

CSV Atelier is a lightweight web application designed to help students and beginners understand CSV (Comma-Separated Values) datasets quickly and easily.

Before performing detailed data analysis, users often need to understand a dataset's structure, data types, missing values, numerical ranges, and common values. Examining these details manually can be time-consuming, especially for users who are new to data analysis.

CSV Atelier addresses this problem by providing an interactive interface that automatically analyses an uploaded CSV file and presents its important characteristics in a clear and understandable format.

The application uses a browser-based interface and a Python server for processing data. It follows a local-first approach, analysing uploaded files in memory without requiring user accounts or a database.

## 2. Problem Statement

Understanding an unfamiliar dataset is an important first step in data analysis. However, beginners may find it difficult to identify missing values, understand column types, calculate descriptive statistics, and recognise patterns in raw CSV data.

CSV Atelier aims to simplify this initial exploration process by automatically generating a concise overview of the dataset, helping users understand its structure and identify areas that may require further investigation.

## 3. Project Objectives

- Develop a simple and accessible interface for CSV data analysis.
- Automate the calculation of basic dataset statistics.
- Identify column types, missing values, and unique values.
- Present numerical distributions and descriptive statistics.
- Provide a preview of the uploaded data.
- Display clear errors for invalid or unsupported files.
- Support local data processing without a database or user accounts.
- Apply Agile planning principles to organise requirements, prioritise features, track progress, and identify future improvements.

## 4. Key Features

- **CSV Upload:** Upload or drag and drop a CSV file for analysis.
- **Dataset Overview:** Display row count, column count, numeric fields, and empty cells.
- **Column Analysis:** Identify numeric or text columns and display missing, filled, and unique value counts.
- **Numerical Statistics:** Calculate minimum, maximum, mean, and median for numeric columns.
- **Distribution Visualisation:** Display a chart to help users explore numerical distributions.
- **Data Preview:** Show the first eight records of the dataset.
- **Common Text Values:** Display frequently occurring text values.
- **Error Handling:** Provide understandable errors for unsupported or oversized files.
- **Sample Dataset:** Include an example CSV to demonstrate the application's functionality.

## 5. Technology Overview

- **Python:** Server-side processing and CSV analysis.
- **HTML:** Structure of the web interface.
- **CSS:** Layout and visual styling.
- **JavaScript:** Browser-side interactions and chart presentation.
- **CSV:** Input data format.

The application operates locally and does not require a database for its current functionality.

## 6. Agile Methodology

Agile is an approach to software development that emphasises incremental delivery, collaboration, feedback, adaptability, and continuous improvement.

For CSV Atelier, Agile principles are reflected in the organisation of user requirements, prioritisation of features, estimation of work, visual task tracking, and identification of future improvements.

The project documents a lightweight, Kanban-based workflow rather than a formal Scrum implementation.

### 6.1 Product Vision

To provide students and beginners with a simple, understandable, and privacy-conscious tool for exploring CSV datasets before performing deeper analysis.

### 6.2 Target Users and Stakeholders

- **Students:** Need to understand datasets for academic assignments and projects.
- **Beginners:** Need an accessible introduction to dataset exploration.
- **Privacy-conscious users:** Prefer a local tool without accounts or a database.
- **Developer:** Responsible for implementing, testing, and maintaining the application.
- **Project evaluator:** Assesses the project's functionality, objectives, and development approach.

### 6.3 User Stories and Acceptance Criteria

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US1 | As a student, I want to upload a CSV and see its size so that I can understand the dataset quickly. | Valid files display row and column counts; invalid files produce a clear error. |
| US2 | As a beginner, I want to inspect column types, missing cells, and unique values so that I know what to investigate. | Each column displays its type and relevant counts. |
| US3 | As a user exploring numerical data, I want descriptive statistics and a distribution chart so that I can understand numerical values. | Numeric columns display minimum, maximum, mean, median, and a distribution chart. |
| US4 | As a privacy-conscious user, I want my file analysed locally without a database so that I can use the tool without a cloud upload. | The application runs on localhost and processes uploaded data in memory. |
| US5 | As a first-time user, I want an example dataset so that I can explore the application easily. | A sample CSV is included with the project. |

### 6.4 Minimum Viable Product (MVP)

The MVP focuses on the core functionality required to make CSV Atelier useful:

- CSV upload and parsing.
- Dataset and column summaries.
- Missing-value and unique-value analysis.
- Numerical statistics and visualisation.
- Data preview and understandable error handling.

Additional features are considered separately so that development effort remains focused on the primary user needs.

### 6.5 Product Backlog and Prioritisation

The product backlog records features and improvements that may be implemented. Items are prioritised according to their importance to the product and estimated using relative effort points.

The project uses a lightweight MoSCoW-style priority classification.

| ID | Backlog Item | Priority | Estimate | Status |
|---|---|---|---:|---|
| A1 | Create the upload workspace and interface | Must | 3 | Done |
| A2 | Implement CSV parsing and error handling | Must | 5 | Done |
| A3 | Generate column and dataset summaries | Must | 5 | Done |
| A4 | Add numerical statistics and distribution charts | Must | 5 | Done |
| A5 | Add row previews and common text values | Should | 3 | Done |
| A6 | Include a sample dataset and setup guidance | Should | 2 | Done |
| A7 | Document Agile planning and the Kanban workflow | Must | 2 | Done |
| A8 | Add date recognition and date-range summaries | Could | 3 | Backlog |
| A9 | Add analysis report export | Could | 5 | Backlog |
| A10 | Improve handling of larger files | Could | 5 | Backlog |

*Estimates represent relative effort, not hours or days. The backlog may be reprioritised as requirements and feedback evolve.*

### 6.6 Kanban Workflow

Kanban is used to visualise the state of project work and make progress easier to track.

| Backlog | Ready | In Progress | Review / Verify | Done |
|---|---|---|---|---|
| A8 — Date summaries | A9 — Report export | None | None | A1–A7 |
| A10 — Larger-file handling | | | | |

The workflow follows these stages:

1. **Backlog:** Work identified for possible future development.
2. **Ready:** Work sufficiently defined to begin.
3. **In Progress:** Work currently being implemented.
4. **Review / Verify:** Work being checked against its requirements.
5. **Done:** Work that satisfies the Definition of Done.

A Work in Progress (WIP) limit of one item is adopted for the In Progress column to reduce task switching and keep unfinished work manageable.

### 6.7 Definition of Done

A backlog item is considered complete when:

- Its acceptance criteria are satisfied.
- Its output or error messages are understandable to the intended users.
- It complies with the project's local-first scope, or any scope change is documented.
- Relevant project documentation and the Agile board reflect the delivered change.

### 6.8 Review and Continuous Improvement

During a project review, the application can be demonstrated using the sample dataset, numerical analysis, and invalid or oversized files.

Feedback can be collected to identify confusing results, missing functionality, or usability improvements. These observations can then be added to or reprioritised within the backlog.

The next development cycle may focus on date summaries, report export, or improved large-file handling, depending on user needs and available resources.

## 7. Future Scope

Potential future enhancements include:

- Date recognition and date-range analysis.
- Exporting analysis results as a report.
- Improved processing of larger CSV files.
- Additional visualisations and data-quality checks.
- Enhanced feedback and usability based on user evaluation.

These features are proposed extensions and are not part of the currently completed functionality.

## 8. Project Structure

| File | Responsibility |
|---|---|
| `app.py` | Python server and CSV analysis logic |
| `index.html` | Browser interface structure |
| `styles.css` | Interface styling |
| `app.js` | Client-side interactions and charts |
| `sample.csv` | Example dataset |
| `START HERE.bat` | Windows launcher |
| `AGILE.md` | Expanded Agile planning and workflow documentation |

## 9. Conclusion

CSV Atelier demonstrates how a small software application can simplify an everyday data-analysis task through automation and an accessible interface.

Alongside its technical functionality, the project documents Agile concepts such as product vision, user stories, acceptance criteria, MVP scope, backlog prioritisation, relative estimation, Kanban workflow, WIP limits, Definition of Done, and continuous improvement.

This combination provides a practical example of organising software requirements and development work while keeping the product focused on its intended users.
