import { Router } from "express";
import { CommentController } from "../controller/comment/comment.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { checkisActive } from "../middlewares/check-isActive.middleware";
const commentRouter: Router = Router();

commentRouter.post(
  "/blog/comment/:id",
  authenticateToken,
  checkisActive,
  CommentController.createContent
);

commentRouter.get(
  "/blog/comment/:id",
  authenticateToken,
  checkisActive,
  CommentController.getAllContent
);

export default commentRouter;
