import { NextFunction, Request, Response } from "express";
import {
  ICreatePostDto,
  IRequestObjectUpdate,
  IUpdatePostDto,
  IVoteInterface,
  voteEnums,
} from "../../@types/interfaces";
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

  public static async getAllBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.userId;
      const data: any = await BlogService.getAllBlog(userId);
      return sendResposne(res, 201, `All Blog By ${req.user.username}`, data);
    } catch (err) {
      next(err);
    }
  }

  public static async getBlogById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.userId;
      const blogId = req.params.blogId;
      const data: any = await BlogService.getBlogById(userId, blogId);
      return sendResposne(res, 201, "Here is User Blog", data);
    } catch (err) {
      next(err);
    }
  }

  public static async updateBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.userId;
      const UpdatePostDto: IUpdatePostDto = req.body;
      const blogId = req.params.blogId;
      const requestObject: IRequestObjectUpdate = {
        userId: userId,
        blogId: blogId,
        UpdatePostDto: UpdatePostDto,
      };
      const data: any = await BlogService.updateBlog(requestObject);
      return sendResposne(res, 201, "Blog is Updated SuccessFully", data);
    } catch (err) {
      next(err);
    }
  }
  public static async voteBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.userId;
      const blogId = req.params.blogId;
      const vote_status = req.query.vote?.toString().startsWith("u")
        ? voteEnums.UPVOTE
        : voteEnums.DOWNVOTE;
      const requestObject: IVoteInterface = {
        userId: userId,
        blogId: blogId,
        vote_status: vote_status,
      };
      const data: any = await BlogService.voteBlog(requestObject);
      return sendResposne(res, 201, "Vote Updated SuccessFully", data);
    } catch (err) {
      next(err);
    }
  }
}
