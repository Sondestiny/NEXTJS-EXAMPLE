import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // nếu bạn tự lưu password, nhưng NextAuth thường hash bên ngoài
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

export default models.User || model("User", UserSchema);
