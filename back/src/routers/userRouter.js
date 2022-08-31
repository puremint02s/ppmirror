import is from "@sindresorhus/is";
import { Router } from "express";
import { User } from "../db";
import { UserModel } from "../db/schemas/user";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

const userAuthRouter = Router();

userAuthRouter.post("/user/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        // 이 부분이 error.message로 들어가게 된다
        // (추정) 내가 분명히 json으로 보냈는데 값이 가지 않았을 경우(ex. undefined도 null도 오지 않을때)
        "headers의 Content-Type을 application/json으로 설정해주세요."
      );
    }

    // req (request) 에서 데이터 가져오기

    const { name, email, password } = req.body;

    if (!name) {
      throw new Error("이름을 입력해주세요.");
    }
    if (!email) {
      throw new Error("이메일 주소를 입력해주세요.");
    }
    if (!password) {
      throw new Error("비밀번호를 입력해주세요.");
    }

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const { email, password } = req.body;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  "/userlist",
  login_required,
  async function (req, res, next) {
    try {
      // // 전체 사용자 목록을 얻음
      // const users = await userAuthService.getUsers();
      // res.status(200).send(users);

      const page = parseInt(req.query.page || 1);
      const perPage = parseInt(req.query.perPage || 10);

      const total = await UserModel.countDocuments({});

      const users = await UserModel.find({})
        .sort({ createdAt: "desc" })
        .skip(perPage * (page - 1))
        .limit(perPage);

      const totalPage = Math.ceil(total / perPage);
      const pagination = { users, page, perPage, totalPage };

      return res.status(200).json(pagination);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/user/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;

      // const name = req.body.name ?? null;
      // const email = req.body.email ?? null;
      // const password = req.body.password ?? null;
      // const description = req.body.description ?? null;
      // const toUpdate = { name, email, password, description };
      const toUpdate = req.body;

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { userAuthRouter };
