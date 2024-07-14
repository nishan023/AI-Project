import mongoose, { Mongoose } from "mongoose";
import { FieldCannotBeEmpty } from "../../helpers/fieldSchema";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, FieldCannotBeEmpty("Title")],
      minlength: [3, "Must be at least 3 characters"],
    },

    content: {
      type: String,
      required: [true, FieldCannotBeEmpty("Content")],
      minlength: [3, "Must be at least 10 character"],
    },
    tags: {
      type: [String],
      validate: {
        validator: function (val: any) {
          return val.length <= 10;
        },
        message: "{PATH} exceeds the limit of 10",
      },
    },
    upvote: {
      type: Number,
      default: 0,
    },
    downVote: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, FieldCannotBeEmpty("User")],
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
