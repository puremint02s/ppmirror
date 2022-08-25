import { EducationModel } from "../schemas/education";

class Education {
    static async create({ newEducation }) {
        const createdNewEducation = await EducationModel.create(newEducation);
        return createdNewEducation;
    }

    static async findAllById({ userId }) {
        const educations = await EducationModel.find({ userId: userId });
        return educations;
    }

    static async findById({ eduId }) {
        const education = await EducationModel.findOne({ eduId: eduId });
        return education;
    }

    static async update({ eduId, fieldToUpdate, newValue }) {
        const filter = { eduId: eduId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal : false };

        const updatedEducation = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedEducation;
    }
}

export { Education };