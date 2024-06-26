import mongoose, { Schema } from "mongoose";
import { FieldCannotBeEmpty } from "../../helpers/fieldSchema";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const tokenModel = mongoose.model("Token", tokenSchema);

export default tokenModel;
