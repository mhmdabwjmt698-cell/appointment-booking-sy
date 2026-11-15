# Risk Register

| ID | Risk | Probability | Impact | Mitigation | Status |
|----|------|-------------|--------|------------|--------|
| R1 | Race condition: two users book the same slot | High | High | Unique constraint on (provider, start time) + DB transaction + automated test | Open |
| R2 | Scope creep: adding features beyond v1 | High | Medium | Any new idea goes to Backlog; v1 scope is frozen after Requirements | Open |
| R3 | Time zone bugs when displaying slots | Medium | High | Store everything in UTC, convert once at display time | Open |
| R4 | Underestimating development time | Medium | High | Track estimates vs actual; cut "Should" features first | Open |
| R5 | Losing work (no backups, broken main branch) | Low | High | Commit often, protect main, work on feature branches | Open |
| R6 | Limited free time because of study or work | High | Medium | Fixed daily hours for the project; plan tasks in 1-2 hour chunks | Open |
## Rating guide
- **Probability:** Low / Medium / High. How likely is it to happen?
- **Impact:** Low / Medium / High. How bad is it if it happens?
- **Status:** Open, Mitigated, or Occurred
