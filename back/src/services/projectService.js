import { Project } from "../db/models/Project";

class projectService {
  static async addProject({
    userId,
    projectId,
    title,
    description,
    startDate,
    endDate,
  }) {
    const newProject = {
      userId,
      projectId,
      title,
      description,
      startDate,
      endDate,
    };
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null;
    return createdNewProject;
  }

  static async findProjectsByUserId({ userId }) {
    const foundProjects = await Project.findAllByUserId({ userId });
    return foundProjects;
  }

  static async findOneByProjectId({ projectId }) {
    const foundOneProject = await Project.findOneByProjectId({ projectId });
    return foundOneProject;
  }

  static async updateProject({ projectId, toUpdate }) {
    const project = await Project.findOneByProjectId({ projectId });
    if (!project) {
      const errorMessage =
        "해당 프로젝트를 확인할 수 없습니다. 다시 한 번 확인해 주세요.";
    }
  }
}

export { projectService };
