import { format, BuiltInParserName } from "prettier";
import { Monaco } from "@monaco-editor/react";

export default function addFormatters(monaco: Monaco) {
  const usePrettier = (parser: BuiltInParserName) => ({
    async provideDocumentFormattingEdits(model: any) {
      const text = await format(model.getValue(), {
        singleQuote: true,
        parser,
      });

      return [
        {
          range: model.getFullModelRange(),
          text,
        },
      ];
    },
  });

  monaco.languages.registerDocumentFormattingEditProvider(
    "javascript",
    usePrettier("typescript")
  );

  monaco.languages.registerDocumentFormattingEditProvider(
    "typescript",
    usePrettier("typescript")
  );

  monaco.languages.registerDocumentFormattingEditProvider(
    "css",
    usePrettier("css")
  );

  monaco.languages.registerDocumentFormattingEditProvider(
    "json",
    usePrettier("json")
  );

  monaco.languages.registerDocumentFormattingEditProvider(
    "html",
    usePrettier("html")
  );
}
