import { Schema, model } from "mongoose";

// 노트의 DB 스키마 정의
const noteSchema = new Schema<{
  content: string;
  author: Schema.Types.ObjectId;
}>(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// 스키마와 함께 'Note' 모델 정의
const Note = model("Note", noteSchema);

export default Note;
