import is from "@sindresorhus/is";
import { v4 as uuidv4 } from "uuid";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { ProjectModel } from "../db/schemas/project";
import { projectService } from "../services/projectService";

const projectRouter = Router();

projectRouter.post(
  "/project/create",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error("모든 항목을 입력해주세요.");
      }

      const userId = req.currentUserId;
      const projectId = uuidv4();
      const { title, description, startDate, endDate } = req.body;

      const newProject = await projectService.addProject({
        userId,
        projectId,
        title,
        description,
        startDate,
        endDate,
      });

      if (newProject.errorMessage) {
        throw new Error(newProject.errorMessage);
      }

      return res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.get("/projects/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const foundProjects = await projectService.findProjectsByUserId({ userId });
  res.status(200).json(foundProjects);
});

projectRouter.put(
  "/projects/:projectId",
  login_required,
  async (req, res, next) => {
    const userId = req.currentUserId;
    const { projectId } = req.params;
    const foundProject = await projectService.findOneByProjectId({
      projectId,
    });
    if (userId === foundProject.userId) {
      try {
        if (is.emptyObject(req.body)) {
          throw new Error("모든 항목을 입력해주세요");
        }

        const { title, description, startDate, endDate } = req.body;

        const toUpdate = { title, description, startDate, endDate };

        const updatedProject = await projectService.updateProject({
          projectId,
          toUpdate,
        });

        console.log(updatedProject);
        res.status(201).json(updatedProject);
      } catch (error) {
        next(error);
      }
    }
    // res.status(400).json({ message: "작성자만 수정할 수 있습니다." });
  }
);

export { projectRouter };
