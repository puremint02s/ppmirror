import { AwardModel } from "../schemas/award";

class Award {
    static async create({ newAward }) {
        const createdNewAward = await AwardModel.create(newAward);
        return createdNewAward;
    }

    static async findAllById({ userId }) {
        const awards = await AwardModel.find({ userId: userId }).populate('userId', 'id').exec();
        return awards;
    }

    static async update({ awardId, fieldToUpdate, newValue }) {
        const filter = { awardId: awardId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedAward = await Award.findOneAndUpdate(
            filter,
            update,
            option
        );

        return updatedAward;
    }
}

export { Award };