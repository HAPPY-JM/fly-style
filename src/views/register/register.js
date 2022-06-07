import * as Api from "/api.js";
import { validateEmail } from "/useful-functions.js";
import header from "/header.js";

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
async function addAllElements() {
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

  if (!isFullNameValid || !isPasswordValid) {
    return alert("이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.");
  }

  if (!isEmailValid) {
    return alert("이메일 형식이 맞지 않습니다.");
  }

  if (!isPasswordSame) {
    return alert("비밀번호가 일치하지 않습니다.");
  }

  /* 회원가입 api 요청
  try {
    const data = { fullName, email, password };

    await Api.post('/api/register', data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = '/login';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
*/
  /* 모달 */
  $(function () {
    //사용 예시 **************************
    $(document).on("click", "#confirm", function () {
      action_popup.confirm("hello world confirm test !!!", function (res) {
        if (res) {
          action_popup.alert("확인창을 눌렀습니다.");
        }
      });
    });

    $(document).on("click", "#alert", function () {
      action_popup.alert("경고창 테스트!!!");
    });

    $(".modal_close").on("click", function () {
      action_popup.close(this);
    });
    //사용 예시 **************************
  });

  /**
   *  alert, confirm 대용 팝업 메소드 정의 <br/>
   *  timer : 애니메이션 동작 속도 <br/>
   *  alert : 경고창 <br/>
   *  confirm : 확인창 <br/>
   *  open : 팝업 열기 <br/>
   *  close : 팝업 닫기 <br/>
   */
  var action_popup = {
    timer: 500,
    confirm: function (txt, callback) {
      if (txt == null || txt.trim() == "") {
        console.warn("confirm message is empty.");
        return;
      } else if (callback == null || typeof callback != "function") {
        console.warn("callback is null or not function.");
        return;
      } else {
        $(".type-confirm .btn_ok").on("click", function () {
          $(this).unbind("click");
          callback(true);
          action_popup.close(this);
        });
        this.open("type-confirm", txt);
      }
    },

    alert: function (txt) {
      if (txt == null || txt.trim() == "") {
        console.warn("confirm message is empty.");
        return;
      } else {
        this.open("type-alert", txt);
      }
    },

    open: function (type, txt) {
      var popup = $("." + type);
      popup.find(".menu_msg").text(txt);
      $("body").append("<div class='dimLayer'></div>");
      $(".dimLayer").css("height", $(document).height()).attr("target", type);
      popup.fadeIn(this.timer);
    },

    close: function (target) {
      var modal = $(target).closest(".modal-section");
      var dimLayer;
      if (modal.hasClass("type-confirm")) {
        dimLayer = $(".dimLayer[target=type-confirm]");
        $(".type-confirm .btn_ok").unbind("click");
      } else if (modal.hasClass("type-alert")) {
        dimLayer = $(".dimLayer[target=type-alert]");
      } else {
        console.warn("close unknown target.");
        return;
      }
      modal.fadeOut(this.timer);
      setTimeout(function () {
        dimLayer != null ? dimLayer.remove() : "";
      }, this.timer);
    },
  };
}
