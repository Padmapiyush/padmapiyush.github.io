import { useEffect, useMemo, useState } from "react";
import styles from "./Playground.module.css";

const SQL_ENDPOINT = "/data/sql-practice.json";
const QUEST_ENDPOINT = "/data/data-engineering-quest.json";

export default function Playground() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("sql");
  const [difficulty, setDifficulty] = useState("easy");
  const [sqlData, setSqlData] = useState({ easy: [], medium: [], hard: [] });
  const [questData, setQuestData] = useState([]);
  const [sqlIndex, setSqlIndex] = useState(0);
  const [questIndex, setQuestIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [userSql, setUserSql] = useState("");
  const [sqlCheckResult, setSqlCheckResult] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sqlRes, questRes] = await Promise.all([
          fetch(SQL_ENDPOINT),
          fetch(QUEST_ENDPOINT),
        ]);
        const [sqlJson, questJson] = await Promise.all([
          sqlRes.json(),
          questRes.json(),
        ]);
        setSqlData(sqlJson);
        setQuestData(questJson);
      } catch {
        setSqlData({ easy: [], medium: [], hard: [] });
        setQuestData([]);
      }
    };
    loadData();
  }, []);

  const currentSqlQuestions = useMemo(
    () => sqlData[difficulty] || [],
    [difficulty, sqlData]
  );

  const sqlQuestion = currentSqlQuestions[sqlIndex];
  const quest = questData[questIndex];
  const sqlStorageKey = sqlQuestion
    ? `sql-playground:${difficulty}:${sqlQuestion.id}`
    : null;

  const randomizeSql = () => {
    if (!currentSqlQuestions.length) return;
    const next = Math.floor(Math.random() * currentSqlQuestions.length);
    setSqlIndex(next);
    setShowHint(false);
    setShowSolution(false);
    setSqlCheckResult("");
  };

  const randomizeQuest = () => {
    if (!questData.length) return;
    const next = Math.floor(Math.random() * questData.length);
    setQuestIndex(next);
    setShowHint(false);
    setShowSolution(false);
  };

  useEffect(() => {
    if (!sqlStorageKey || typeof window === "undefined") return;
    const saved = window.localStorage.getItem(sqlStorageKey) || "";
    setUserSql(saved);
    setSqlCheckResult("");
  }, [sqlStorageKey]);

  const normalizeQuery = (query) =>
    query.toLowerCase().replace(/\s+/g, " ").replace(/;$/, "").trim();

  const checkSqlAnswer = () => {
    if (!sqlQuestion) return;

    const user = normalizeQuery(userSql);
    const expected = normalizeQuery(sqlQuestion.solution || "");

    const keywordHeuristic = [
      "select",
      "from",
      ...(sqlQuestion.hint || "")
        .toLowerCase()
        .split(/[^a-z0-9_]+/g)
        .filter((part) => ["group", "by", "order", "count", "lag", "row_number"].includes(part)),
    ];

    const hasKeywords = keywordHeuristic.every((keyword) => user.includes(keyword));

    if (user && (user === expected || hasKeywords)) {
      setSqlCheckResult("✅ Looks correct! Great query structure.");
    } else {
      setSqlCheckResult("❌ Not quite yet. Try using the hint or compare with solution.");
    }
  };

  return (
    <>
      <button className={styles.fab} onClick={() => setOpen((prev) => !prev)}>
        {open ? "CLOSE" : "START"}
      </button>

      {open && (
        <aside className={styles.panel}>
          <div className={styles.header}>
            <h3>Playground</h3>
            <p>Mini games for SQL + Data Engineering prep</p>
          </div>

          <div className={styles.tabs}>
            <button
              className={tab === "sql" ? styles.active : ""}
              onClick={() => setTab("sql")}
            >
              SQL Practice
            </button>
            <button
              className={tab === "quest" ? styles.active : ""}
              onClick={() => setTab("quest")}
            >
              Data Engineering Quest
            </button>
          </div>

          {tab === "sql" && (
            <div className={styles.content}>
              <div className={styles.inline}>
                <label htmlFor="difficulty">Difficulty:</label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => {
                    setDifficulty(e.target.value);
                    setSqlIndex(0);
                    setShowHint(false);
                    setShowSolution(false);
                  }}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {sqlQuestion ? (
                <>
                  <h4>{sqlQuestion.title}</h4>
                  <p>{sqlQuestion.question}</p>
                  {showHint && <p className={styles.hint}>Hint: {sqlQuestion.hint}</p>}
                  {showSolution && (
                    <pre className={styles.solution}>{sqlQuestion.solution}</pre>
                  )}

                  <div className={styles.editorWrap}>
                    <label htmlFor="sql-editor">SQL Canvas</label>
                    <textarea
                      id="sql-editor"
                      className={styles.editor}
                      placeholder="Write your SQL query here..."
                      value={userSql}
                      onChange={(e) => {
                        const value = e.target.value;
                        setUserSql(value);
                        setSqlCheckResult("");
                        if (sqlStorageKey && typeof window !== "undefined") {
                          window.localStorage.setItem(sqlStorageKey, value);
                        }
                      }}
                    />
                    <div className={styles.actions}>
                      <button onClick={checkSqlAnswer}>Check Query</button>
                      <button
                        onClick={() => {
                          setUserSql("");
                          setSqlCheckResult("");
                          if (sqlStorageKey && typeof window !== "undefined") {
                            window.localStorage.removeItem(sqlStorageKey);
                          }
                        }}
                      >
                        Clear Canvas
                      </button>
                    </div>
                    {sqlCheckResult && <p className={styles.result}>{sqlCheckResult}</p>}
                  </div>
                </>
              ) : (
                <p>No SQL questions found.</p>
              )}

              <div className={styles.actions}>
                <button onClick={randomizeSql}>Next Question</button>
                <button onClick={() => setShowHint((prev) => !prev)}>
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>
                <button onClick={() => setShowSolution((prev) => !prev)}>
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </button>
              </div>
            </div>
          )}

          {tab === "quest" && (
            <div className={styles.content}>
              {quest ? (
                <>
                  <h4>{quest.title}</h4>
                  <p>{quest.problem}</p>
                  {showHint && <p className={styles.hint}>Hint: {quest.hint}</p>}
                  {showSolution && <p className={styles.solution}>{quest.solution}</p>}
                </>
              ) : (
                <p>No quests found.</p>
              )}

              <div className={styles.actions}>
                <button onClick={randomizeQuest}>Next Quest</button>
                <button onClick={() => setShowHint((prev) => !prev)}>
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>
                <button onClick={() => setShowSolution((prev) => !prev)}>
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </button>
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );
}
