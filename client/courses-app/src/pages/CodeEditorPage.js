import React, { useState, useRef } from "react";
import CodeEditor from "../components/CodeEditor";
import { executeCode } from "../api";
import "./CodeEditorPage.css";

const LEVELS = {
  easy: { label: "Легко", color: "#22c55e", icon: "check_circle" },
  medium: { label: "Середньо", color: "#f59e42", icon: "change_circle" },
  hard: { label: "Складно", color: "#ef4444", icon: "warning" },
};

const LANGUAGES = [
  {
    value: "python",
    label: "Python",
    icon: (
      <span className="material-icons" style={{ color: "#3572A5" }}>
        terminal
      </span>
    ),
  },
  {
    value: "cpp",
    label: "C++",
    icon: (
      <span className="material-icons" style={{ color: "#00599C" }}>
        memory
      </span>
    ),
  },
];

const TASKS = [
  {
    id: 1,
    title: "Hello, World!",
    level: "easy",
    description: "Напишіть програму, яка виведе на екран Hello, World!",
    template: {
      python: 'print("Hello, World!")',
      cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Ваш код тут\n    return 0;\n}",
    },
    tests: [{ input: "", expected: "Hello, World!\n" }],
  },
  {
    id: 2,
    title: "Сума чисел",
    level: "easy",
    description: "Зчитайте два числа з консолі та виведіть їхню суму.",
    template: {
      python: "a = int(input())\nb = int(input())\nprint(a + b)",
      cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}",
    },
    tests: [
      { input: "2\n3\n", expected: "5\n" },
      { input: "10\n-7\n", expected: "3\n" },
    ],
  },
  {
    id: 3,
    title: "Парність числа",
    level: "medium",
    description:
      "Зчитайте ціле число і виведіть 'Even', якщо воно парне, інакше 'Odd'",
    template: {
      python: "n = int(input())\n# Ваш код тут",
      cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // Ваш код тут\n    return 0;\n}",
    },
    tests: [
      { input: "4\n", expected: "Even\n" },
      { input: "7\n", expected: "Odd\n" },
    ],
  },
  {
    id: 4,
    title: "Сума елементів масиву",
    level: "medium",
    description: "Зчитайте n, потім n чисел. Виведіть їхню суму.",
    template: {
      python:
        "n = int(input())\na = list(map(int, input().split()))\n# Ваш код тут",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> a(n);\n    for(int i=0;i<n;i++) cin >> a[i];\n    // Ваш код тут\n    return 0;\n}",
    },
    tests: [
      { input: "3\n1 2 3\n", expected: "6\n" },
      { input: "5\n10 20 30 40 50\n", expected: "150\n" },
    ],
  },
  {
    id: 5,
    title: "Реверс рядка",
    level: "hard",
    description: "Зчитайте рядок і виведіть його у зворотному порядку.",
    template: {
      python: "s = input()\n# Ваш код тут",
      cpp: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    // Ваш код тут\n    return 0;\n}",
    },
    tests: [
      { input: "hello\n", expected: "olleh\n" },
      { input: "world\n", expected: "dlrow\n" },
    ],
  },
];

const CodeEditorPage = () => {
  const [language, setLanguage] = useState("python");
  const [selectedTask, setSelectedTask] = useState(TASKS[0]);
  const [code, setCode] = useState(TASKS[0].template["python"]);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef(null);
  const editorRef = useRef(null);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setCode(selectedTask.template[e.target.value]);
    setOutput("");
    setError(null);
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setCode(task.template[language]);
    setOutput("");
    setError(null);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setError(null);
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setError(null);
    setOutput("");
    setCopied(false);
    try {
      const result = await executeCode(code, language);
      setOutput(result.output || result.error || "Код виконано успішно");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(error || output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="code-editor-root"
      style={{ flexDirection: "row", alignItems: "flex-start" }}
    >
      <aside className="sidebar-tasks">
        {TASKS.map((task) => (
          <button
            key={task.id}
            className={
              "sidebar-task-item" +
              (selectedTask.id === task.id ? " active" : "")
            }
            onClick={() => handleTaskSelect(task)}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                className="material-icons"
                style={{ fontSize: 20, color: LEVELS[task.level].color }}
              >
                {LEVELS[task.level].icon}
              </span>
              <span>{task.title}</span>
            </span>
            <span
              style={{
                fontSize: "0.85em",
                color: LEVELS[task.level].color,
                marginLeft: 4,
              }}
            >
              {LEVELS[task.level].label}
            </span>
          </button>
        ))}
      </aside>
      <div className="code-editor-main">
        <div style={{ marginBottom: 0 }}>
          <div className="code-editor-label" style={{ marginBottom: 4 }}>
            <span style={{ fontSize: 22, marginRight: 4 }}>
              {LANGUAGES.find((l) => l.value === language)?.icon}
            </span>
            <span>Виберіть мову:</span>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="code-editor-select"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <div
            className="code-editor-hint"
            style={{
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              className="material-icons"
              style={{ fontSize: 18, color: LEVELS[selectedTask.level].color }}
            >
              {LEVELS[selectedTask.level].icon}
            </span>
            <b style={{ color: LEVELS[selectedTask.level].color }}>
              {LEVELS[selectedTask.level].label}
            </b>
            <span style={{ color: "#222" }}>{selectedTask.description}</span>
          </div>
        </div>
        <div className="code-editor-monaco" ref={editorRef}>
          <CodeEditor
            language={language}
            initialCode={code}
            onCodeChange={handleCodeChange}
          />
        </div>
        <div>
          <button
            className="code-editor-run-btn"
            onClick={handleRunCode}
            disabled={isLoading || !code.trim()}
          >
            {isLoading ? (
              <span
                style={{
                  display: "inline-block",
                  width: 22,
                  height: 22,
                  border: "2px solid #fff",
                  borderTop: "2px solid #2563eb",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></span>
            ) : (
              <span>Запустити код</span>
            )}
          </button>
        </div>
        {(output || error) && (
          <div ref={resultRef} className="fade-in">
            <div className="code-editor-result-label">
              Вивід:
              <button
                className={`code-editor-copy-btn${copied ? " copied" : ""}`}
                onClick={handleCopy}
                title="Скопіювати результат"
              >
                {copied ? "Скопійовано!" : "Копіювати"}
              </button>
            </div>
            <div className="code-editor-console">{error || output}</div>
          </div>
        )}
      </div>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default CodeEditorPage;
