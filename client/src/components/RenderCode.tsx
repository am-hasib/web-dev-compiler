import { RooState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function RenderCode() {
  const fullcode = useSelector(
    (state: RooState) => state.compilerSlice.fullcode
  );
  const combineCode = `<html><head><style>${fullcode.css}</style></head><body>${fullcode.html}<script>${fullcode.javascript}</script></body</html>`;
  const iFrameCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combineCode
  )}`;
  return (
    <div className="bg-background text-foreground h-[calc(100dvh-66px)] w-full">
      <iframe src={iFrameCode} className="w-full h-full" />
    </div>
  );
}
