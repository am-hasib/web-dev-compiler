import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Compiler() {
  return (
    <ResizablePanelGroup direction="horizontal" className="">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[calc(100dvh-66px)] w-full items-start justify-center flex-1">
          <div className="w-full h-full flex flex-col">
            <HelperHeader />
            <CodeEditor />
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[calc(100dvh-66px)] items-center justify-center flex-1">
          <RenderCode />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
