import { $, getToken, getRole, logout } from "/utils.js";

export default function header(parent) {
  const headerEl = `
  <div class="hero-head">
    <header class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href='/'>
            <img src="../fly-style-logo.png" alt="logo" />
          </a>
        </div>
        <div id="navbarMenuHeroC" class="navbar-menu">
          <div class="navbar-end" id='buttons'>
       
            <a class="navbar-item" id='login'>
              <span>login</span>
            </a>
            <a class="navbar-item" id="join">
              <span>join</span>
            </a>
          </div>
        </div>
      </div>
    </header>
    
  </div>
  `;

  const element = document.createElement("div");

  element.innerHTML = headerEl;
  parent.prepend(element);
  const join = $("#join");
  const login = $("#login");
  console.log(getToken());
  const token = getToken();
  const role = getRole();

  if (token === "null" || !token) {
    login.innerHTML = "login";
    join.innerHTML = "join";
    join.href = "/register";
    cart();
  } else if (role === "admin") {
    login.innerHTML = "logout";
    join.innerHTML = "adminPage";
    join.href = "/admin";
  } else {
    login.innerHTML = "logout";
    join.innerHTML = "myPage";
    join.href = "/myPage";
    cart();
  }

  function cart() {
    const cart = document.createElement("a");
    const buttons = $("#buttons");
    cart.href = "/cart";
    cart.className = "navbar-item";
    cart.innerHTML = `
      <span class="icon">
        <i class="fas fa-cart-shopping">　</i>
      </span>
      cart
    `;
    buttons.prepend(cart);
  }

  login.addEventListener("click", loginOut);

  function loginOut() {
    console.log(token);
    if (token === "null" || !token) {
      location.href = "/login";
    } else {
      logout();
      location.reload();
    }
  }

  //   join.addEventListener("click", () => {
  //     console.log("로그인 페이지로 이동");
  //   });
}
