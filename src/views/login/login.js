// import res from "/express/lib/response";
import * as Api from "/api.js";
import { validateEmail } from "/useful-functions.js";

// 요소(element), input 혹은 상수
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const submitButton = document.querySelector("#submitButton");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

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

  if (!isEmailValid || !isPasswordValid) {
    return alert(
      "비밀번호가 4글자 이상인지, 이메일 형태가 맞는지 확인해 주세요."
    );
  }

  // 로그인 api 요청
  try {
    const data = { email, password };

    const result = await Api.post("/api/login", data);
    const token = result.token;
    const role = result.role;
    console.log(role);
    // 로그인 성공, 토큰을 세션 스토리지에 저장
    // 물론 다른 스토리지여도 됨

    if (location.pathname !== "/dkssudgktpdyadmin/" && role === "admin") {
      return alert("다른경로로 로그인 해주십시오");
    } else if (
      location.pathname === "/dkssudgktpdyadmin/" &&
      role !== "admin"
    ) {
      return alert("권한이 없습니다");
    }

    sessionStorage.setItem("token", token);

    alert(`정상적으로 로그인되었습니다.`);

    if (location.pathname === "/dkssudgktpdyadmin/") {
      await Api.get("/admins");
    }

    // if (location.search == "null" || !location.search) {
    //   //로그인버튼으로 바로 들어왔을때(쿼리없다)
    //   window.location.href = "/"; //이부분은 생각하면 복잡하니까 차차 생각합쉬다...
    //   return;
    // }

    // 로그인 성공
    //api get을 통한 userlist 불러오기는 가능한데 그냥 get userlist라우팅은 안됨(토큰 잃어버린다) 왜??
    //get으로 불러온 데이터를 넣어서 routing 어떻게 할지 생각해보면 좋을듯..?
    //location.search->?url=/userlist
    const URLSearch = new URLSearchParams(location.search);
    const redirectUrl = URLSearch.get("url");
    //redirectUrl=/userlist
    const string = "string";
    console.log(redirectUrl, string);
    //localhost:5000/api/userlist
    location.href = document.referrer;
    //const order=await Api.get("/order/only/629880390b9398828a062283");
    // const userlist = await Api.get("/api" + redirectUrl);
    //router.get('/api/userlist')
    // 로그인 성공
    //api get을 통한 userlist 불러오기는 가능한데 그냥 get userlist라우팅은 안됨(토큰 잃어버린다) 왜??
    //get으로 불러온 데이터를 넣어서 routing 어떻게 할지 생각해보면 좋을듯..?
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
