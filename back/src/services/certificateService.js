import { Certificate } from "../db";

class certificateService {
  static async addCertificate({ title, description }) {
    const createdNewCertificate = await Certificate.create({
      title,
      description,
    });
    createdNewCertificate.errorMessage = null;
    return createdNewCertificate;
  }

  static async getCertificate({}) {}
}
