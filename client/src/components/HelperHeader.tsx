import { Save, Share2 } from "lucide-react";
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
export default function HelperHeader() {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RooState) => state.compilerSlice.currentLanguage
  );
  const fullcode = useSelector(
    (state: RooState) => state.compilerSlice.fullcode
  );
  const handleSaveCode = async () => {
    try {
      const response = await axios.post("http://localhost:4000/compiler/save", {
        fullcode,
      });
      console.log(response.data);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="h-[40px] w-full flex items-center justify-end space-y-6 py-6 px-4 ">
      <div className="__btn_container flex items-center gap-3">
        <Button
          variant={"success"}
          size={"sm"}
          className="flex items-center justify-center gap-2 "
          onClick={handleSaveCode}
        >
          <Save size={16} />
          Save
        </Button>
        <Button
          size={"sm"}
          variant={"destructive"}
          className="flex items-center justify-center gap-2 "
        >
          <Share2 size={16} /> Share
        </Button>
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
