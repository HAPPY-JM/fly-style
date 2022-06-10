import * as Api from "/api.js";
import { validateEmail } from "/useful-functions.js";
import header from "/header.js";
import { $, setToken } from "/utils.js";

// 요소(element), input 혹은 상수
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const submitButton = document.querySelector("#submitButton");
const headerParent = $(".hero");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  header(headerParent);
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener("click", handleSubmit);
}

// 로그인 진행
async function handleSubmit(e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // 잘 입력했는지 확인
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  swal({
    icon: "success",
    text: "정상적으로 회원가입되었습니다.",
    type: "success",
  }).then(function () {
    window.location.href = "/login";
  });
  if (!isEmailValid || !isPasswordValid) {
    return swal({
      icon: "error",
      text: "비밀번호가 4글자 이상인지, 이메일 형태가 맞는지 확인해 주세요.",
    });
  }

  // 로그인 api 요청
  try {
    const data = { email, password };
    console.log(document.referrer);
    console.log(document.referrer.includes("login"));
    const result = await Api.post("/api/login", data);
    const token = result.token;
    const role = result.role;
    // 로그인 성공, 토큰을 세션 스토리지에 저장
    // 물론 다른 스토리지여도 됨

    //일반 로그인 경로로 들어왔는데 역할이 admin이면 토큰 갈취당했을수도 있으므로 확인
    if (location.pathname !== "/dkssudgktpdyadmin/" && role === "admin") {
      return swal({
        icon: "error",
        text: "다른경로로 로그인 해주십시오",
      });
    } else if (
      //admin 경로로 들어와서 유저가 로그인 할 수 있으므로 확인
      location.pathname === "/dkssudgktpdyadmin/" &&
      role !== "admin"
    ) {
      return swal({
        icon: "error",
        text: "권한이 없습니다.",
      });
    }
    setToken({ token, role });

    swal({
      icon: "success",
      text: "정상적으로 로그인되었습니다.",
    }).then(() => {
      if (location.pathname === "/dkssudgktpdyadmin/") {
        //관리자 루트 페이지로~~
        window.location.href = "/admin";
        // await Api.get("/admins"); //href admin-page
      } else if (
        document.referrer.includes("login") ||
        document.referrer.includes("register") ||
        !document.referrer
      ) {
        window.location.href = "/";
        // 회원가입 후에는 홈 화면으로 이동
      }
      // else if(document.referrer.includes("register")){
      //   window.location.href = "/";
      // }
      else {
        location.href = document.referrer;
      }
    });
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }

  console.log("----------------document.referrer------------------");
  console.log(sessionStorage.getItem("test"));
}
