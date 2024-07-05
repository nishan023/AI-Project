import { ICreatePostDto, IUser } from "../../@types/interfaces";
import Blog from "../../database/models/Blog";
import User from "../../database/models/User";
import AppError from "../../utils/errorUtils/appError";

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
}
