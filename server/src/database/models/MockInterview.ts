import mongoose from "mongoose";
import { nullable, string } from "zod";
import { FieldCannotBeEmpty } from "../../helpers/fieldSchema";

const mockInterviewSchema = new mongoose.Schema(
  {
    jsonMockResp: {
      type: string,
      required: [true, FieldCannotBeEmpty("Json Mock Response")],
    },

    jobPosition: {
      type: string,
      required: [true, FieldCannotBeEmpty("Job Position")],
    },

    jobDesc: {
      type: string,
      required: [true, FieldCannotBeEmpty("Job Description")],
    },
    jobExperience: {
      type: string,
      required: [true, FieldCannotBeEmpty("Job Experience")],
    },

    mockId: {
      type: string,
      required: [true, FieldCannotBeEmpty("Mock Id")],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const mockInterviewModel = mongoose.model(
  "Mock_Interview",
  mockInterviewSchema
);
export default mockInterviewModel;
