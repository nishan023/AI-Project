import mongoose from "mongoose";
import { FieldCannotBeEmpty } from "../../helpers/fieldSchema";

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, FieldCannotBeEmpty("User")],
    },

    comment: {
      type: String,
      required: [true, FieldCannotBeEmpty("Comment")],
      minlength: [1, "Must be at least 1 character"],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
