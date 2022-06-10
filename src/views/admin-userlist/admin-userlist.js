import * as Api from "../api.js";

const adminUserList = document.getElementById('adminUserList');

const userListData = await Api.get(`/api/admins/userList`);
console.log(userListData);

let innerUserData = '';

function userListFunc(userListData){
    innerUserData += `
        <td>${userListData.fullName}</td>
        <td>${userListData.role}</td>
        <td>${userListData.email}</td>
        `
}

userListData.map((userListData) => userListFunc(userListData));
adminUserList.innerHTML = innerUserData;
