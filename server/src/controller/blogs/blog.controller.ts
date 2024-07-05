import { NextFunction, Request, Response } from "express";
import { ICreatePostDto } from "../../@types/interfaces";
import { BlogService } from "../../service/blogs/blog.service";
import { sendResposne } from "../../helpers/send-Response";
import { TargetTypeEnum } from "inversify";
import { unknown } from "zod";

export class BlogController {
  public static async createBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const createPostDto: ICreatePostDto = req.body;
      const userId = req.user.userId;
      const data: any = await BlogService.CreateBlog(userId, createPostDto);
      return sendResposne(res, 201, "Blog Posted SuccessFully", data);
    } catch (err) {
      next(err);
    }
  }

  public static async deleteBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.userId;
      const blogId =
        typeof req.params.blogId === "string" ? req.params.blogId : "";
      const data: any = await BlogService.deleteBlog(userId, blogId);
      return sendResposne(res, 201, "Blog Deleted SuccessFully", data);
    } catch (err) {
      next(err);
    }
  }
}
