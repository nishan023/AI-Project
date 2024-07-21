import { log } from "console";
import { NextFunction, Request, Response } from "express";
import { saveAnswers } from "../../service/userAnswer/userAnswer.service";

export const userAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("this is controlller ");
  try {
    console.log("req.body", req.body);
    const savedAnswers = await saveAnswers(req.body.answers);
    console.log("saved answers", savedAnswers);
    res
      .status(201)
      .json({ message: "Answers saved successfully", savedAnswers });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
