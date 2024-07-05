import { Router } from "express";
import { BlogController } from "../controller/blogs/blog.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { checkisActive } from "../middlewares/check-isActive.middleware";
const blogRouter: Router = Router();

blogRouter.post(
  "/blog",
  authenticateToken,
  checkisActive,
  BlogController.createBlog
);

blogRouter.delete(
  "/blog/:blogId",
  authenticateToken,
  checkisActive,
  BlogController.deleteBlog
);

export default blogRouter;
