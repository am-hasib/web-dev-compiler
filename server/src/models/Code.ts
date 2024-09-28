import mongoose from "mongoose";
interface ICodeSchema {
  fullcode: {
    html: string;
    css: string;
    javascript: string;
  };
}

const CodeSchema = new mongoose.Schema<ICodeSchema>({
  fullcode: {
    html: String,
    css: String,
    javascript: String,
  },
});

export const Code = mongoose.model("Code", CodeSchema);
