import mongoose from "mongoose";
import { FieldCannotBeEmpty } from "../../helpers/fieldSchema";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, FieldCannotBeEmpty("Full Name")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  email: {
    type: String,
    required: [true, FieldCannotBeEmpty("Email ")],
    min: [3, "Must be at least 6, got {VALUE}"],
    mx: [50, "Must be at least Greater than 50, got {VALUE"],
  },
  password: {
    type: String,
    required: [true, FieldCannotBeEmpty("Password")],
    min: [8, "Must be at least 8, got {VALUE}"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
