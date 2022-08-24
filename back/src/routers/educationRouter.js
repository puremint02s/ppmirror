import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

educationRouter.post(
    "/education/register",
    login_required,
    async function (req, res, next) {
        try {
            if(is.emptyObject(req.body)) {
                throw new Error(
                    "학력 정보를 정확히 작성해 주세요."
                );
            }

            const school = req.body.school;
            const major = req.body.major;
            const status = req.body.status;

            const newEducation = await educationService.addEducation({
                school,
                major,
                status,
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
    "/education/edit/:eduid",
    login_required,
    async function (req, res, next) {
        try {
            const eduId = req.params.eduid;
            const school = req.body.school ?? null;
            const major = req.body.major ?? null;
            const status = req.body.status ?? null;

            const toUpdate = { school, major, status };

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
    "/educationlist/:userid",
    login_required,
    async function (req, res, next) {
        try {
            const userId = req.params.userid;
            const educationList = await educationService.getEducations({ userId });

            res.status(200).send(educationList);
        } catch (error) {
            next(error);
        }
    }
);

export { educationRouter };