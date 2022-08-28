import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

educationRouter.post(
    "/education/create",
    login_required,
    async function (req, res, next) {
        try {
            if(is.emptyObject(req.body)) {
                throw new Error(
                    "headers의 Content-Type을 application/json으로 설정해 주세요."
                );
            }

            const userId = req.currentUserId;
            const { school, major, position } = req.body;

            if (!school) {
                throw new Error("학교명을 입력해 주세요.")
            }
            
            if (!major) {
                throw new Error("전공명을 입력해 주세요.")
            }

            if (!position) {
                throw new Error("학력 상태를 설정해 주세요.")
            }

            const newEducation = await educationService.addEducation({
                userId,
                school,
                major,
                position,
            });

            if (newEducation.errorMessage) {
                throw new Error(newEducation.errorMessage);
            }

            res.status(201).json(newEducation);
        } catch (error) {
            next(error);
        }
});

educationRouter.put(
    "/educations/:eduid",
    login_required,
    async function (req, res, next) {
        try {
            const userId = req.currentUserId;
            const { eduId } = req.params;
            const school = req.body.school ?? null;
            const major = req.body.major ?? null;
            const position = req.body.position ?? null;

            const toUpdate = { school, major, position };

            const updatedEducation = await educationService.updateEducation({ eduId, toUpdate });

            if (updatedEducation.errorMessage) {
                throw new Error(updatedEducation.errorMessage);
            }

            res.status(200).json(updatedEducation);
        } catch (error) {
            next(error);
        }
    }
);

educationRouter.get(
    "/educations/:userId",
    login_required,
    async function (req, res, next) {
        try {
            const userId = req.params.userId;
            const educationList = await educationService.getEducations({ userId });

            res.status(200).send(educationList);
        } catch (error) {
            next(error);
        }
    }
);

educationRouter.delete(
    "/educations/:eduId",
    login_required,
    async function (req, res, next) {
        try {
            const eduId = req.params.eduId;
            await educationService.deleteEducation({ eduId });

            res.status(201).send("정상적으로 삭제되었습니다.");
        } catch (error) {
            next(error);
        }
    }
)

export { educationRouter };