import { NextFunction, Request, Response } from "express";
import { InterviewService } from "../../service/interview/interview.service";
import { IInterviewDto } from "../../@types/interfaces";
import AppError from "../../utils/errorUtils/appError";
import { unknown } from "zod";
import { sendResposne } from "../../helpers/send-Response";
import { mock } from "node:test";

export class InterviewController {
  public static async createInterview(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const InterviewDto: Required<IInterviewDto> = req.body;
      const userId = req.user.userId;
      const data: any = await InterviewService.createInterview(
        userId,
        InterviewDto
      );
      return sendResposne(res, 201, "Interview started", data);
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

  public static async getInterviewDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const mockId = req.params.mockId;
      const userId = req.user.userId;
      const data: any = await InterviewService.getInterviewDetails(
        userId,
        mockId
      );
      return sendResposne(res, 201, "Interview Details", data);
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

  public static async getInterviewDetailsJson(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const mockId = req.params.mockId;
      const userId = req.user.userId;
      const data: any = await InterviewService.getInterviewDetailsJson(
        userId,
        mockId
      );
      return sendResposne(res, 201, "Interview Details", data);
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
}
