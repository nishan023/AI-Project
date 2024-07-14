import { NextFunction, Request, Response } from "express";
import { ICommentDto } from "../../@types/interfaces";
import AppError from "../../utils/errorUtils/appError";
import { CommentService } from "../../service/comment/comment.service";
import { sendResposne } from "../../helpers/send-Response";

export class CommentController {
  public static async createContent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId = req.user.userId;
      const blogId = typeof req.params.id === "string" ? req.params.id : null;
      const CommentDto: ICommentDto = req.body;
      if (Object.entries(CommentDto).length === 0) {
        throw new AppError("No Comment Body", 401);
      }
      const data: any = await CommentService.createContent(
        userId,
        blogId,
        CommentDto
      );
      return sendResposne(res, 201, "Commented SuccessFully", data);
    } catch (err: Error | any) {
      if (err instanceof Error) {
        return res.status(err.message ? 401 : 500).json({
          message: err.message,
          name: err.name,
        });
      }
      return res.status(err.message).json({
        message: err.message,
      });
    }
  }

  public static async getAllContent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.userId;
      const blogId = req.params.blogId;
      const data: any = await CommentService.getAllComment(userId, blogId);
      return sendResposne(res, 201, "Comment SuccessFully", data``);
    } catch (err) {
      next(err);
    }
  }
}
