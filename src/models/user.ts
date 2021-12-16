import { Schema, model } from "mongoose";

// 유저의 DB 스키마 정의
const userSchema = new Schema<{
  username: string;
  email: string;
  password: string;
  avatar?: string;
}>(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

// 스키마와 함께 'User' 모델 정의
const User = model("User", userSchema);

export default User;
