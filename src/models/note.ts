import { Schema, model } from "mongoose";

// 노트의 DB 스키마 정의
const noteSchema = new Schema<{
  content: string;
  author: Schema.Types.ObjectId;
  favoriteCount: number;
  favoritedBy: Schema.Types.ObjectId[];
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
    favoriteCount: {
      type: Number,
      default: 0,
    },
    favoritedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// 스키마와 함께 'Note' 모델 정의
const Note = model("Note", noteSchema);

export default Note;
