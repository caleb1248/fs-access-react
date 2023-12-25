import { Editor, OnMount } from "@monaco-editor/react";

type MonacoEditorProps = { onMount: OnMount };

export function MonacoEditor(props: MonacoEditorProps) {
  return (
    <>
      <Editor
        className="editor"
        theme="vs-dark"
        defaultLanguage="typescript"
        onMount={(editor, monaco) => {
          props.onMount(editor, monaco);
        }}
      />
    </>
  );
}
