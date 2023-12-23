import { Editor, Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
type onMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => void;
type MonacoEditorProps = { onMount: onMount };

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
