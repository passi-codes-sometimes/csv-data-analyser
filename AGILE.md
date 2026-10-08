# Agile project notes

## Product vision

Help a student, small team, or curious analyst get a quick, understandable first read on a CSV without installing analysis software or uploading data to a third-party service.

## MVP goal

Within the first iteration, a visitor can open the local web app, select or drop a CSV, and understand its size, column types, missing values, numeric ranges, common text values, and first few records. The interface explains errors and keeps file handling simple. No account, database, or external analysis service is needed.

## Users and user stories

- As a student, I want to upload a CSV and see its row and column counts so I can quickly understand the dataset.
- As a beginner, I want each column's type, missing cells, and unique values explained so I can decide what to inspect next.
- As a user working with numeric data, I want a distribution chart and basic statistics so I can spot a range or concentration.
- As a privacy-conscious user, I want uploads processed without a database so I can try the tool with confidence.
- As a first-time visitor, I want a sample CSV and clear run instructions so I can try the project quickly.

## Iteration 1 backlog

| ID | Story / task | Priority | Estimate |
| --- | --- | --- | ---: |
| A1 | Create a clear, responsive workspace and CSV upload/drop area | Must | 3 |
| A2 | Parse CSVs in Python and return useful validation errors | Must | 5 |
| A3 | Summarise rows, columns, types, missing cells, and unique values | Must | 5 |
| A4 | Show basic numeric statistics and a distribution chart | Must | 5 |
| A5 | Preview sample rows and frequent text values | Should | 3 |
| A6 | Add a sample CSV and beginner-friendly setup instructions | Should | 2 |
| A7 | Document product vision, user stories, backlog, and board | Must | 2 |

## Kanban board

| Backlog | Ready | In progress | Review / verify | Done |
| --- | --- | --- | --- | --- |
| Add date-aware summaries (future) | Export a compact analysis report | — | — | A1 Workspace and upload UI |
| Add optional larger-file streaming (future) | — | — | — | A2 Python CSV parsing and feedback |
| — | — | — | — | A3 Column summaries and data preview |
| — | — | — | — | A4 Numeric statistics and distribution chart |
| — | — | — | — | A5 Frequent text values and sample CSV |
| — | — | — | — | A6 Run instructions and privacy notes |
| — | — | — | — | A7 Agile planning notes |

**WIP limit:** one item in *In progress* at a time. Move work from left to right; agree acceptance criteria before moving an item to *Done*.

## Definition of Done

- A user can complete the story through the visible interface.
- The result or error is understandable to a beginner.
- The change fits the no-database, local-first MVP scope.
- Run instructions and relevant Agile board notes stay current.

## Next iteration ideas

Add date recognition and date ranges, optional column selection, CSV export of summaries, and better handling for files larger than the current in-memory limits. Prioritise these only after gathering feedback on the first iteration.
