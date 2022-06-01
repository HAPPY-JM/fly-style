import jwt from "jsonwebtoken";

//*여기서 토큰 유효성 검증한다.
function loginRequired(req, res, next) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userToken = req.headers["authorization"]?.split(" ")[1];

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (!userToken || userToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");
    // res.status(403).json({
    //   result: "forbidden-approach",
    //   reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    // });
    res.redirect(`/login?url=${req.url}`); //loginrequired
    return;
  }

  // 해당 token 이 정상적인 token인지 확인
  try {
    //.env파일에서 확인
    //사용자 정보를 저장할때 세션 말고 토큰방식을 사용한 것으로 예상됨
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey); //정상적인 토큰인지 secretKey를 가지고 검증

    const userId = jwtDecoded.userId;

    // 라우터에서 req.currentUserId를 통해 유저의 id에 접근 가능하게 됨
    req.currentUserId = userId; //헤더에 토큰 currentUserId에 담아서(?) 다음 미들웨어에(?) 전달

    next();
  } catch (error) {
    // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
    // 403 코드로 JSON 형태로 프론트에 전달함.
    res.status(403).json({
      result: "forbidden-approach",
      reason: "정상적인 토큰이 아닙니다.",
    });

    return;
  }
}

export { loginRequired };
