//import jwt from "jsonwebtoken";

//*여기서 토큰 유효성 검증한다.
function adminRequired(req, res, next) {
  console.log(req.currentUserRole);
  if (req.currentUserRole !== "admin") {
    console.log("관리자 페이지 입니다.");
    res.status(403).json({
      result: "forbidden-approach",
      reason: "관리자인 유저만 사용할 수 있는 서비스입니다.",
    });
    return;
  }
  next();
}

export { adminRequired };
