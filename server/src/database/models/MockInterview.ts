import mongoose from "mongoose";
import { FieldCannotBeEmpty } from "../../helpers/fieldSchema";

const mockInterviewSchema = new mongoose.Schema(
  {
    jsonMockResp: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, FieldCannotBeEmpty("Json Mock Response")],
    },

    jobPosition: {
      type: String,
      required: [true, FieldCannotBeEmpty("Job Position")],
    },

    jobDesc: {
      type: String,
      required: [true, FieldCannotBeEmpty("Job Description")],
    },
    jobExperience: {
      type: String,
      required: [true, FieldCannotBeEmpty("Job Experience")],
    },

    mockId: {
      type: String,
      required: [true, FieldCannotBeEmpty("Mock Id")],
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, FieldCannotBeEmpty("User")],
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
