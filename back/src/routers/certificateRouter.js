import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

// 새로운 자격증 추가하기
certificateRouter.post("/", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("모든 항목을 입력해주세요.");
    }

    const user_id = req.currentUserId;
    const { title, description, date } = req.body;

    const newCertificate = await certificateService.addCertificate({
      author: user_id,
      title,
      description,
      date,
    });

    return res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

// :userId에 해당하는 사람의 자격증 가져오기
certificateRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const certificates = await certificateService.findCertificateByUserId({
    userId,
  });
  return res.status(200).json(certificates);
});

// :certificateId에 해당하는 자격증 수정하기
certificateRouter.put(
  "/:certificateId",
  login_required,
  async (req, res, next) => {
    const user_id = req.currentUserId;
    const { certificateId } = req.params;
    if (user_id === certificateId) {
      try {
        const { title, description, date } = req.body;

        if (is.emptyObject(req.body)) {
          throw new Error("모든 항목을 입력해주세요.");
        }

        const toUpdate = { title, description, date };
        const updatedCertificate = await certificateService.updateCertificate({
          certificateId,
          toUpdate,
        });

        return res.status(201).json(updatedCertificate);
      } catch (error) {
        next(error);
      }
    }
    next("작성자만 수정할 수 있습니다.");
  }
);

export { certificateRouter };
