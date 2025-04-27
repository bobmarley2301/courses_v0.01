import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({
  language = "python",
  initialCode = "",
  onCodeChange,
}) => {
  const [code, setCode] = useState(initialCode);

  const handleEditorChange = (value) => {
    setCode(value);
    if (onCodeChange) {
      onCodeChange(value);
    }
  };

  return (
    <div className="w-full">
      <Editor
        height="400px"
        width="100%"
        defaultLanguage={language}
        defaultValue={initialCode}
        theme="light"
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 15,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
