import * as Api from "/api.js";
import header from "/header.js";
import { validateEmail } from "/useful-functions.js";

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector("#fullNameInput");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");
const submitButton = document.querySelector("#submitButton");
const headerParent = $("body");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  header(headerParent);
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener("click", handleSubmit);
}

// 회원가입 진행
async function handleSubmit(e) {
  e.preventDefault();

  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  // 잘 입력했는지 확인
  const isFullNameValid = fullName.length >= 2;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;

  if (!isFullNameValid) {
    return swal({
      icon: "error",
      text: "이름은 2글자 이상 입력해주세요.",
    });
  }

  if (!isPasswordValid) {
    return swal({
      icon: "error",
      text: "비밀번호는 4글자 이상으로 설정해주세요.",
    });
  }

  if (!isEmailValid) {
    return swal({
      icon: "error",
      text: "이메일 형식이 맞지 않아요.",
    });
  }

  if (!isPasswordSame) {
    return swal({
      icon: "error",
      text: "비밀번호가 일치하지 않아요.",
    });
  }

  // 회원가입 api 요청
  try {
    const data = { fullName, email, password };

    await Api.post("/api/register", data);

    swal({
      icon: "success",
      text: "정상적으로 회원가입되었습니다.",
      type: "success",
    }).then(function () {
      window.location.href = "/login";
    });

    // 로그인 페이지 이동
  } catch (err) {
    console.error(err.stack);
    swal({
      icon: "warning",
      text: `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`,
    });
  }
}
