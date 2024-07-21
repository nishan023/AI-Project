import mongoose from "mongoose";
import { FieldCannotBeEmpty } from "../../helpers/fieldSchema";
import { string } from "zod";
import { timeStamp } from "console";

const answerSchema = new mongoose.Schema({
  userAnswer: {
    type: [string],
    required: [true, FieldCannotBeEmpty("Answer")],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userAnswer = mongoose.model("UserAnswer", answerSchema);
export default userAnswer;
