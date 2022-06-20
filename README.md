# 스타일 날다 Fly Style

제품들을 조회하고, 장바구니에 추가하고, 또 주문을 할 수 있는 쇼핑몰 웹 서비스 제작 프로젝트입니다. <br/>
현재 React와 Typescript를 기반으로 리팩토링을 준비중에 있습니다. <br/>

### 페이지 바로가기 ▶ [Fly Style](http://kdt-sw2-busan-team05.elicecoding.com/) <br/>
배포 이슈 때문에 admin 계정 로그인이 되지 않아서 모든 기능들이 활성화되어 있지 않습니다. (리팩토링 때 고칠 예정입니다.) <br/>
정상적인 작동을 확인하기 위해서는 클론 후 vscode에서 ```npm start``` 후 ```localhost:5000```로 확인해주세요! <br>

** 핵심 기능은 하기입니다. <br>
1. 회원가입, 로그인, 회원정보 수정 등 **유저 정보 관련 CRUD** 
2. **제품 목록**을 조회 및, **제품 상세 정보**를 조회 가능함 (페이지네이션 구현). 
3. 장바구니에 제품을 추가할 수 있으며, **장바구니에서 CRUD** 작업이 가능함.
4. 장바구니는 서버 DB가 아닌, 프론트 단에서 저장 및 관리됨 (localStorage)
5. 장바구니에서 주문을 진행하며, **주문 완료 후 조회 및 삭제**가 가능함.

## 주요 사용 기술

### 1. 프론트엔드
<img  alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
<img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">

- **Vanilla javascript**, html, css (**Bulma css**)
- Font-awesome 
- sweetalert
- swiper
- Daum 도로명 주소 api 
- 이외

### 2. 백엔드 
<img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-8cbe68?style=for-the-badge&logo=MongoDB&logoColor=white">
<img alt="AWS" src="https://img.shields.io/badge/Amazon AWS-f7f7f7?style=for-the-badge&logo=Amazon AWS&logoColor=f89400">

- **Express** (nodemon, babel-node로 실행됩니다.)
- Mongodb, Mongoose
- cors
- multer-s3
- aws-sdk

## 폴더 구조
- 프론트: `src/views` 폴더 
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**



## 설치 방법

1. **.env 파일 설정 (MONGODB_URL 환경변수를, 개인 로컬 혹은 Atlas 서버 URL로 설정해야 함)**

2. express 실행

```bash
# npm 을 쓰는 경우 
npm install
npm run start

# yarn 을 쓰는 경우
yarn
yarn start
```

<br>

---

<!--본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2022 엘리스 Inc. All rights reserved.-->
