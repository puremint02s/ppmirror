import { EducationModel } from "../schemas/education";

class Education {
    static async create({ newEducation }) {
        const createdNewEducation = await EducationModel.create(newEducation);
        return createdNewEducation;
    }

    static async findAllById ({ user_id }) {
        const educations = await EducationModel.find({ userId: user_id }).populate('userId', 'id');
        return educations;
    }

    static async update({ edu_id, fieldToUpdate, newValue }) {
        const filter = { eduId: edu_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal : false };

        const updatedEducation = await Education.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedEducation;
    }
}

export { Education };