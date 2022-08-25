import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();

awardRouter.post("/award/create", login_required, async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "수상 내역을 빠짐 없이 작성해 주세요."
            );
        }

        const userId = req.currentUserId;
        const title = req.body.title;
        const description = req.body.description;

        const newAward = await awardService.addAward({
            userId,
            title,
            description,
        });

        if (newAward.errorMessage) {
            throw new Error(newAward.errorMessage);
        }

        res.status(201).json(newAward);
    } catch (error) {
        next(error);
    }
});

awardRouter.put("/award/edit/:awardid", login_required, async function (req, res, next) {
    try {
        const awardId = req.params.awardid;
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;

        const toUpdate = { title, description };

        const updatedAward = await awardService.updateAward({ awardId, toUpdate });

        if (updatedAward.errorMessage) {
            throw new Error(updatedEducation.errorMessage);
        }

        res.status(200).json(updatedAward);
    } catch (error) {
        next(error);
    }
});

awardRouter.get("/awards/:userid", login_required, async function (req, res, next) {
    try {
        const userId = req.params.userid;
        const awards = await awardService.getAwards({ userId });

        res.status(200).send(awards);
    } catch (error) {
        next(error);
    }
});

export { awardRouter };