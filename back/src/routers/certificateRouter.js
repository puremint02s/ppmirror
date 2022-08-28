import is from "@sindresorhus/is";
import { v4 as uuidv4 } from "uuid";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

// 새로운 자격증 추가하기
certificateRouter.post(
  "/certificate/create",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error("모든 항목을 입력해주세요.");
      }

      // jwt토큰에서 추출된 사용자 id 사용
      const userId = req.currentUserId;
      const certificateId = uuidv4();
      const { title, description, acquiredAt } = req.body;

      if (!title) {
        throw new Error("자격증 제목을 입력해주세요.");
      }

      if (!description) {
        throw new Error("상세내역을 입력해주세요.");
      }

      if (!acquiredAt) {
        throw new Error("취득날짜를 입력해주세요.");
      }

      const newCertificate = await certificateService.addCertificate({
        userId,
        certificateId,
        title,
        description,
        acquiredAt,
      });
      return res.status(201).json(newCertificate);
    } catch (error) {
      next(error);
    }
  }
);

// :userId에 해당하는 사람의 자격증 가져오기
certificateRouter.get("/certificates/:userId", async (req, res) => {
  const { userId } = req.params;
  const foundCertificates = await certificateService.findCertificatesByUserId({
    userId,
  });
  return res.status(200).json(foundCertificates);
});

// :certificateId에 해당하는 자격증 수정하기
certificateRouter.put(
  "/certificates/:certificateId",
  login_required,
  async (req, res, next) => {
    const userId = req.currentUserId;
    const { certificateId } = req.params;
    const foundCertificate = await certificateService.findOneByCertificateId({
      certificateId,
    });
    if (userId === foundCertificate.userId) {
      try {
        if (is.emptyObject(req.body)) {
          throw new Error("모든 항목을 입력해주세요");
        }
        const { title, description, acquiredAt } = req.body;

        const toUpdate = { title, description, acquiredAt };

        const updatedCertificate = await certificateService.updateCertificate({
          certificateId,
          toUpdate,
        });

        return res.status(201).json(updatedCertificate);
      } catch (error) {
        next(error);
      }
    }
    res.status(400).json({ message: "작성자만 수정할 수 있습니다." });
  }
);

certificateRouter.delete(
  "/certificates/:certificateId",
  login_required,
  async (req, res, next) => {
    const userId = req.currentUserId;
    const { certificateId } = req.params;
    const foundCertificate = await certificateService.findOneByCertificateId({
      certificateId,
    });

    if (userId === foundCertificate.userId) {
      await certificateService.deleteCertificate({
        certificateId,
      });

      return res.status(201).json({ message: "삭제 성공!" });
    }
    return res.status(400).json({ message: "작성자만 삭제할 수 있습니다." });
  }
);

export { certificateRouter };
