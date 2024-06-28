import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class JsonWebTokenUtils {
  private static async GenerateSalt(salt: any) {
    return await bcrypt.genSalt(salt);
  }

  public static async HashPassword(password: string) {
    return bcrypt.hash(password, await this.GenerateSalt(10));
  }
}
