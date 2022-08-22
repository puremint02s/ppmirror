import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            requied: true,
        },
        school: {
            type: String,
            required: true,
        },
        major: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };