import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    author: {
      // type: Schema.Types.ObjectId,
      // ref: "User",
      // required: true,
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
