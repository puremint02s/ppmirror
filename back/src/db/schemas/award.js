import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        awardId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };