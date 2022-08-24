import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
    static async addEducation({ userId, school, major, status }) {
        const eduId = uuidv4();

        const newEducation = { userId, eduId, school, major, status };

        const createdNewEducation = await Education.create({ newEducation });
        createdNewEducation.errorMessage = null;

        return createdNewEducation;
    }

    static async getEducations({ userId }) {
        const education = await Education.findAllById({ userId: userId });

        const school = education.school;
        const major = education.major;
        const status = education.status;

        const educationDetail = {
            school,
            major,
            status,
        };

        return educationDetail;
    }

    static async updateEducation({ eduId, toUpdate }) {
        const education = await Education.findOne({ eduId: eduId });

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
        if (toUpdate.status) {
            const fieldToUpdate = "status";
            const newValue = toUpdate.status;
            education = await Education.update({ eduId, fieldToUpdate, newValue });
        }

        return education;
    }
}

export { educationService };