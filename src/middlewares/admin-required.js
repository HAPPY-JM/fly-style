//관리자만 접근할 수 있는 api 일반 유저가 접근했을때 걸러주는 미들웨어
function adminRequired(req, res, next) {
  console.log(req.currentUserRole);
  if (req.currentUserRole !== "admin") {
    res.status(403).json({
      //오류
      result: "forbidden-approach",
      reason: "관리자인 유저만 사용할 수 있는 서비스입니다.",
    });
    return;
  }
  //관리자 통과
  next();
}

export { adminRequired };
