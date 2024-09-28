import { Code, Copy, Loader2, Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { RooState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  compilerSliceType,
  updateLanguage,
} from "@/redux/slices/compilerSlice";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { toast } from "sonner";

export default function HelperHeader() {
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RooState) => state.compilerSlice.currentLanguage
  );
  const fullcode = useSelector(
    (state: RooState) => state.compilerSlice.fullcode
  );
  const handleSaveCode = async () => {
    setSaveLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/compiler/save", {
        fullcode,
      });
      console.log(response.data);
      navigate(`/compiler/${response.data.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    } finally {
      setSaveLoading(false);
    }
  };
  const { urlId } = useParams();

  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);
  return (
    <div className="h-[40px] w-full flex items-center justify-end space-y-6 py-6 px-4 ">
      <div className="__btn_container flex items-center gap-3">
        <Button
          variant={"success"}
          size={"sm"}
          className="flex items-center justify-center gap-2 "
          onClick={handleSaveCode}
        >
          {saveLoading ? (
            <>
              <Loader2 className="animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save size={16} /> Save
            </>
          )}
        </Button>
        {shareBtn && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size={"sm"}
                variant={"destructive"}
                className="flex items-center justify-center gap-2 "
              >
                <Share2 size={16} /> Share
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Share Your Code <Code />
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={window.location.href}
                    disabled
                    readOnly
                  />
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      window.navigator.clipboard.writeText(
                        window.location.href
                      );
                      toast("Url copied to your clipboard");
                    }}
                  >
                    <Copy />
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}

        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              updateLanguage(value as compilerSliceType["currentLanguage"])
            )
          }
        >
          <SelectTrigger className="w-[180px] focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">Javascript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
