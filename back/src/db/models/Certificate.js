import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findById({ user_id }) {
    const certificates = await Certificate.find({});
    return certificates;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      { id: user_id },
      { [fieldToUpdate]: newValue }
      // returnOriginal 제외
    );
    return updatedCertificate;
  }
}

export { Certificate };
