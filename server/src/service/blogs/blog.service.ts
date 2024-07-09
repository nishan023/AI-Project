import {
  ICreatePostDto,
  IRequestObjectUpdate,
  IUpdatePostDto,
  IUser,
  IVoteInterface,
} from "../../@types/interfaces";
import Blog from "../../database/models/Blog";
import User from "../../database/models/User";
import AppError from "../../utils/errorUtils/appError";
import { GenAiService } from "../genAi/genai.service";

export class BlogService {
  public static async CreateBlog(
    userId: string | number,
    createPostDto: ICreatePostDto
  ): Promise<ICreatePostDto | string> {
    const user = await User.findOne({ _id: userId }).countDocuments();
    if (user.toString().startsWith("0"))
      throw new AppError("User not found", 401);

    const userPayload = await User.findOne({ _id: userId });
    if (Object.entries(createPostDto).length === 0)
      throw new AppError(`Every Field Is Empty`, 401);

    const { title, content } = createPostDto;
    let partialPost: Partial<ICreatePostDto> = {
      title,
      content,
    };
    if (createPostDto.tags !== undefined) {
      partialPost.tags = createPostDto.tags;
    }

    const createPost = await Blog.create({
      ...partialPost,
      user: userPayload?._id,
    });

    await createPost.save();

    await User.updateOne(
      {
        _id: userId,
      },
      { $addToSet: { blogs: createPost._id } }
    );

    const message = `${userPayload?.username} Has Posted A blog With ${createPost.title} `;
    return message;
  }

  private async checkGrammer(text: string) {
    const content = await GenAiService.checkGrammar(text);
    return content;
  }

  public static async deleteBlog(userId: string | number, blogId: string) {
    const user: IUser | any = await User.findOne({ _id: userId });
    if (!user) throw new AppError(`${user.username} is not  Authorized`, 403);
    const blogContent: Array<any> = user.blogs;
    if (
      !Array.isArray(blogContent) ||
      blogContent.length.toString().startsWith("0")
    ) {
      throw new AppError(`${user.username} Does not have any Blogs`, 401);
    }
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) throw new AppError(`Blog Does not Exists`, 401);

    const result = await Blog.deleteOne({
      _id: blogId,
    });
    if (result.deletedCount.toString().startsWith("1")) {
      const message = `${user.username} Has SuccessFully Deleted Blog`;
      return message;
    }
  }

  public static async getAllBlog(userId: string | number) {
    const user = await User.findOne({ _id: userId }).populate({
      path: "blogs",
    });
    if (!user) throw new AppError("User not found", 401);
    const userBlogContent = Array.isArray(user.blogs) ? user.blogs : null;
    if (userBlogContent === null) {
      throw new AppError("Blog Is not Appropriate Format", 401);
    }
    if (userBlogContent.length.toString().startsWith("0")) {
      throw new AppError(`${user.username} Has not Posted Any Blogs`, 401);
    }
    return userBlogContent;
  }

  public static async getBlogById(
    userId: string | number,
    blogId: string | number
  ) {
    const user = await User.findOne({ _id: userId });
    if (!user) throw new AppError(`User is not available `, 401);
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) throw new AppError("Blog does not exists", 401);
    return blog;
  }

  public static async updateBlog({
    userId,
    blogId,
    UpdatePostDto,
  }: IRequestObjectUpdate) {
    const user = await User.findOne({ _id: userId }).populate({
      path: "blogs",
    });
    if (!user) throw new AppError("User not found", 401);
    const checkUpdate =
      Object.keys(UpdatePostDto).length > 0 ? UpdatePostDto : false;
    if (!checkUpdate) throw new AppError(`There is nothing to Update`, 401);
    let updateData: Partial<ICreatePostDto> = {};

    if (UpdatePostDto.title !== undefined) {
      updateData.title = UpdatePostDto.title;
    }
    if (UpdatePostDto.content !== undefined) {
      updateData.content = UpdatePostDto.content;
    }
    if (UpdatePostDto.tags !== undefined) {
      updateData.tags = UpdatePostDto.tags;
    }
    const result = await Blog.updateOne(
      {
        _id: blogId,
      },
      updateData
    );
    if (
      result.modifiedCount.toString().startsWith("0") &&
      result.matchedCount > 0
    ) {
      throw new AppError("Nothing Is Updated  , Update Operation Failed", 401);
    }
    return `${user.username} Has SuccessFully Updated`;
  }

  public static async voteBlog({
    userId,
    blogId,
    vote_status,
  }: IVoteInterface) {
    const user = await User.findOne({ _id: userId }).populate({
      path: "blogs",
    });
    if (!user || !user.blogs) {
      throw new AppError("Use not found or blog is not available", 401);
    }

    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      throw new AppError("Blog is not available", 401);
    }

    let updatedVote;

    if (vote_status.startsWith("u")) {
      updatedVote = await Blog.updateOne(
        {
          _id: blogId,
        },
        {
          $set: {
            upvote: blog.upvote + 1,
          },
        },
        {
          new: true,
        }
      );
    } else if (vote_status.startsWith("d")) {
      updatedVote = await Blog.updateOne(
        {
          _id: blogId,
        },
        {
          $set: {
            downVote: blog.downVote + 1,
          },
        },
        {
          new: true,
        }
      );
    } else {
      throw new AppError("Operation failed", 502);
    }
    if (updatedVote.modifiedCount === 0) {
      throw new AppError("Updated Vote Operation Failed", 401);
    }

    return `${user.username} Has SuccessFully ${vote_status}`;
  }
}