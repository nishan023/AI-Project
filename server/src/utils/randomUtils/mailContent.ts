export const textEmail = (username: string, link: any) => {
  return `Hello ${username},

It seems like you requested a password reset. Please use the link below to reset your password:
${link}

If you did not request this, please ignore this email.

Thank you,
Ideas Team`;
};

export const htmlEmail = (username: string, link: any) => {
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="background-color: #f7f7f7; padding: 20px; border-radius: 10px;">
      <h2 style="color: #4CAF50;">Hello ${username},</h2>
      <p>It seems like you requested a password reset. Please click the link below to reset your password:</p>
      <p style="text-align: center;">
        <a href="${link}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">
          Reset Password
        </a>
      </p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thank you,<br/>Ideas Team</p>
    </div>
  </div>
`;

  return htmlContent;
};
