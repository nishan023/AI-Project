import { ICommentDto } from "../../@types/interfaces";
import Blog from "../../database/models/Blog";
import Comment from "../../database/models/Comment";
import User from "../../database/models/User";
import AppError from "../../utils/errorUtils/appError";

export class CommentService {
  public static async createContent(
    userId: string | number,
    blogId: string | number | any,
    CommentDto: ICommentDto
  ) {
    const user = await User.findOne({ _id: userId });
    if (!user) throw new AppError("User is Expired Or Does not exists", 403);
    let createContent: Partial<ICommentDto> = {};
    if (CommentDto.comment !== undefined) {
      createContent.comment = CommentDto.comment;
    }
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      throw new AppError("No Blog You requested is not available", 401);
    }
    const createComment = await Comment.create({
      ...createContent,
      user: user._id,
    });
    await createComment.save();
    await Blog.updateOne(
      {
        _id: blogId,
      },
      {
        $addToSet: {
          comments: createComment._id,
        },
      }
    );

    const message = `${user.username} Has Commented SuccessFully`;
    return message;
  }
}
