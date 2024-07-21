import { Request, Response, NextFunction } from "express";

export const getQuestionsByExperienceLevel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { level } = req.params;
    console.log(level)
    res
      .status(200)
      .json({ message: "This is response form question controller" });
  } catch (error) {
    next(error);
  }
};
