import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Prompt || model("Prompt", PromptSchema);
