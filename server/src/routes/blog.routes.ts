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

blogRouter.get(
  "/blog",
  authenticateToken,
  checkisActive,
  BlogController.getAllBlog
);

blogRouter.get(
  "/blog/:blogId",
  authenticateToken,
  checkisActive,
  BlogController.getBlogById
);

blogRouter.patch(
  "/blog/:blogId",
  authenticateToken,
  checkisActive,
  BlogController.updateBlog
);

blogRouter.patch(
  "/blog/:blogId/vote",
  authenticateToken,
  checkisActive,
  BlogController.voteBlog
);

export default blogRouter;
