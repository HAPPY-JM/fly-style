import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';
import header from "/header.js";
import { $ } from "/utils.js";


// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const submitButton = document.querySelector('#submitButton');
const headerParent = $(".hero");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
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
		return swal('이름은 2글자 이상 입력해주세요.');
	}

  if (!isPasswordValid) {
		return swal('비밀번호는 4글자 이상으로 설정해주세요.');
	}

	if (!isEmailValid) {
		return swal('이메일 형식이 맞지 않아요.');
	}

	if (!isPasswordSame) {
		return swal('비밀번호가 일치하지 않아요.');
	}

  // 회원가입 api 요청
	try {
		const data = { fullName, email, password };
		const correctEmail = localStorage.getItem('mail');
		if (correctEmail === emailInput.value) {
			await Api.post('/api/register', data);
			const login = { email, password };
			const result = await Api.post('/api/login', login);
			const token = result.token;
			swal({
				text: '가입이 완료되었어요',
			}).then(() => {
				localStorage.setItem('token', token);
				window.location.href = '/';
			});
		}

    // 로그인 페이지 이동
    window.location.href = '/login';
  } catch (err) {
    console.error(err.stack);
    swal({
			text: err.message,
		});
  }
}