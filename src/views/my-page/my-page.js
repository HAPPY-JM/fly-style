import * as Api from "/api.js";
import { $ } from "/utils.js";
import header from "/header.js";

const userInfo = $("#userInfodiv");
const headerParent = $("body");

landingRender();

async function landingRender() {
  try {
    const userData = await Api.get(`/api/user`);
    const userInfoEl = `
    <div id="userName">
        <h4 class="title is-4">${userData.fullName}</h4><p class="title is-6">님 안녕하세요!</p>
    </div>

    <div class="title is-5" id="userEmail">
        <p>${userData.email}</p>
    </div>
  `;
    userInfo.innerHTML = userInfoEl;
  } catch (e) {
    console.error(e.stack);
    swal({
      icon: "warning",
      text: `문제가 발생하였습니다.
      확인 후 다시 시도해 주세요: ${e.message}`,
    });
    location.href = "/login";
  }

  header(headerParent);
}
