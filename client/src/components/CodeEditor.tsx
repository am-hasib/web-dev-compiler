import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { tags as t } from "@lezer/highlight";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useDispatch, useSelector } from "react-redux";
import { RooState } from "@/redux/store";
import { updateCode } from "@/redux/slices/compilerSlice";

function CodeEditor() {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RooState) => state.compilerSlice.currentLanguage
  );
  const fullcode = useSelector(
    (state: RooState) => state.compilerSlice.fullcode
  );
  const onChange = React.useCallback((value: string) => {
    dispatch(updateCode(value));
  }, []);
  return (
    <CodeMirror
      value={fullcode[currentLanguage]}
      className="code-editor overflow-scroll"
      height="calc(100dvh -100px)"
      extensions={[loadLanguage(currentLanguage)!]}
      onChange={onChange}
      theme={draculaInit({
        settings: {
          caret: "#980202",
          fontFamily: "monospace",
        },
        styles: [{ tag: t.comment, color: "#6272a4" }],
      })}
    />
  );
}
export default CodeEditor;
