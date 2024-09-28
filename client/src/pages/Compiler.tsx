import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { updateFullCode } from "@/redux/slices/compilerSlice";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function Compiler() {
  const { urlId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadCode = async () => {
    try {
      const response = await axios.post("http://localhost:4000/compiler/load", {
        urlId,
      });
      console.log(response.data);
      dispatch(updateFullCode(response.data.fullCode));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          toast("Invalid URL, Default Code Loaded", {
            style: { background: "bg-red-500" },
          });
          navigate("/", { replace: true });
        }
      }
      handleError(error);
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

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
