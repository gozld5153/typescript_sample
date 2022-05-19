import { Require, Response } from "express";
import { UserInfo } from "../../entities/UserInfo";
import { AppDataSource } from "../../index";
import * as moment from "moment";
import axios from "axios";

module.exports = async (req: Require, res: Response) => {
  const url = new URL("https://kauth.kakao.com/oauth/token");

  url.searchParams.append("grant_type", "authorization_code");
  url.searchParams.append("client_id", process.env.KAKAO_CLIENT_ID);
  url.searchParams.append("redirect_uri", process.env.KAKAO_REDIRECT_URI);
  url.searchParams.append("code", req.body.code);
  let accessToken;

  try {
    const tokenInfo = await axios.post(url.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    accessToken = tokenInfo.data.access_token;
    let userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    //repo에 user_info table을 등록
    const userInfoRepo = AppDataSource.getRepository(UserInfo);
    //새로운 user_info instance 생성
    const user = new UserInfo();

    const findUser = await userInfoRepo.findOneBy({
      snsId: userInfo.data.id,
    });

    console.log(findUser);
    // 등록된 유저가 아니라면
    if (!findUser) {
      user.profileImage = "profile_uploads" + "\\" + "profile.png";
      user.createdTime = moment().format(
        "YYYY-MM-DD HH:mm:ss"
      ) as unknown as Date;
      user.userId = userInfo.data.kakao_account.email;
      user.snsId = userInfo.data.id;
      user.isLogin = "true";
      user.snsType = "kakao";
      //새롭게 등록후에 처음방문 알려줌
      await userInfoRepo.save(user);
      res.status(200).send({ result: { ...user, is_first: true } });
    } else {
      //기존의 유저면 로그인 상태만 변경해 주고 유저정보 넘겨준다.
      findUser.isLogin = "true";
      await userInfoRepo.save(findUser);
      res.status(200).send({ result: { ...findUser, is_first: false } });
    }
  } catch (e) {
    console.log(e);
  }
};
