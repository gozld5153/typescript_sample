import * as express from "express";

const router = express.Router();

const kakao = require("./kakao");
// const kakaoLogout = require("./kakaoLogout.js");

router.post("/kakao", kakao);
// router.get("/kakao/logout", kakaoLogout);

module.exports = router;
