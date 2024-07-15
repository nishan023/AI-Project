import { IInterviewDto } from "../../@types/interfaces";
import { chatSession } from "../../config/gemini.config";
import mockInterviewModel from "../../database/models/MockInterview";
import User from "../../database/models/User";
import AppError from "../../utils/errorUtils/appError";
import { v4 as uuidv4 } from "uuid";
export class InterviewService {
  public static async createInterview(
    userId: string,
    { jobPosition, jobDesc, jobExperience }: IInterviewDto
  ) {
    const input_prompt = `Job Position : ${jobPosition} , Job Description: ${jobDesc}, Years of Experience: ${jobExperience},
    Depends on this information please give me 5 interview question with Answered in Json Format,
    Give Question and Answered as field in Json`;

    const result = await chatSession.sendMessage(input_prompt);

    const MockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    // const jsonParse = JSON.parse(MockJsonResponse);

    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new AppError("User not found", 401);
    }

    if (MockJsonResponse) {
      const newInterview = new mockInterviewModel({
        jsonMockResp: MockJsonResponse,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        created_by: user._id,
        mockId: uuidv4(),
      });
      await newInterview.save();

      return {
        MockJsonResponse,
        mockId: newInterview.mockId,
      };
    }
  }

  public static async getInterviewDetails(
    userId: string | number,
    mockId: string | number
  ) {
    const user = await User.findOne({ _id: userId });
    if (!user) throw new AppError("User not found", 401);
    const getInterview = await mockInterviewModel.findOne({ mockId: mockId });
    if (!getInterview) {
      throw new AppError("Interview not found", 401);
    }
    return getInterview;
  }

  public static async getInterviewDetailsJson(
    userId: string | number,
    mockId: string | number
  ) {
    const user = await User.findOne({ _id: userId });
    if (!user) throw new AppError("User not found", 401);
    const getInterview = await mockInterviewModel.findOne({ mockId: mockId });
    if (!getInterview) {
      throw new AppError("Interview not found", 401);
    }
    console.log(getInterview);
    const jsonResponse = getInterview.jsonMockResp;

    const parseJson = JSON.parse(jsonResponse);

    return parseJson;
  }
}
