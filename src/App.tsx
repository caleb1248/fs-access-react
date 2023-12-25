import { useRef } from "react";
import "./App.css";
import { Horizontal } from "./lib/splitpane/splitpane";
import { MonacoEditor } from "./monaco";
import type { editor } from "monaco-editor";

function App() {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  return (
    <>
      <Horizontal
        minLeft={100}
        minRight={200}
        initialLeft={200}
        onResize={() => editorRef.current && editorRef.current.layout()}
      >
        <div id="sidebar">
          <button id="file">Open File</button>
          <button id="folder">Open Folder</button>
        </div>
        <div id="main">
          <div id="editor-container">
            <MonacoEditor
              onMount={(editor, monaco) => {
                editorRef.current = editor;
              }}
            />
          </div>
          <div id="terminalContainer">
            <div id="terminal"></div>
          </div>
        </div>
      </Horizontal>
    </>
  );
}

export default App;
