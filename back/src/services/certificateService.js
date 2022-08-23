import { Certificate, User } from "../db";

class certificateService {
  static async addCertificate({ author, title, description, date }) {
    const createdNewCertificate = await Certificate.create({
      author,
      title,
      description,
      date,
    });
    createdNewCertificate.errorMessage = null;
    return createdNewCertificate;
  }

  static async findCertificateByUserId({ id }) {
    const foundCertificates = await Certificate.findAllByUserId({ author: id });
    return foundCertificates;
  }

  // 수정관련 작성
  static async updateCertificate({ certificateId, toUpdate }) {
    let certificate = await Certificate.findOneById({ certificateId });
    if (!certificate) {
      const errorMessage =
        "해당 자격증을 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.date) {
      const fieldToUpdate = "date";
      const newValue = toUpdate.date;
      certificate = await Certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    return certificate;
  }
}

export { certificateService };
