import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
    static async addEducation({ userId, school, major, position }) {
        const eduId = uuidv4();

        const newEducation = { userId, eduId, school, major, position };

        const createdNewEducation = await Education.create({ newEducation });
        createdNewEducation.errorMessage = null;

        return createdNewEducation;
    }

    static async getEducations({ userId }) {
        const educations = await Education.findAllById({ userId: userId });
        return educations;
    }

    static async updateEducation({ eduId, toUpdate }) {
        let education = await Education.findById({ eduId });

        if (!education) {
            const errorMessage = "해당하는 학력 사항이 없습니다.";
            return { errorMessage };
        }

        // 학교 필드 수정 시
        if (toUpdate.school) {
            const fieldToUpdate = "school";
            const newValue = toUpdate.school;
            education = await Education.update({ eduId, fieldToUpdate, newValue });
        }

        // 전공 필드 수정 시
        if (toUpdate.major) {
            const fieldToUpdate = "major";
            const newValue = toUpdate.major;
            education = await Education.update({ eduId, fieldToUpdate, newValue });
        }

        // 상태 필드 수정 시
        if (toUpdate.position) {
            const fieldToUpdate = "position";
            const newValue = toUpdate.position;
            education = await Education.update({ eduId, fieldToUpdate, newValue });
        }

        return education;
    }
}

export { educationService };