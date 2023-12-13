"use strict";

const input = document.querySelector(".input");
const btn = document.querySelector(".button");
const btnText = btn.innerText;
const list = document.querySelector(".list");

let arr = [];
let edit_id = null;
let strObj = localStorage.getItem("data");

if (strObj !== null) {
  arr = JSON.parse(strObj);
}

const showData = function () {
  let html = "";
  arr.forEach((element, i) => {
    html += `<tr>
           <th>${i + 1}</th>
           <td class="tasks">${element.name}</td>
           <td><i class="fa fa-edit edit" onclick='Edit(${i})'></i> <i class="fa fa-trash del" onclick='Del(${i})'></i></td>
         </tr>`;
  });
  list.innerHTML = html;
};
showData();

btn.addEventListener("click", function () {
  const inputValue = input.value;
  if (inputValue === "") {
    alert("Please add something must!");
  } else if (edit_id != null) {
    arr.splice(edit_id, 1, {
      name: inputValue,
    });
    edit_id = null;
  } else {
    arr.push({
      name: inputValue,
    });
  }

  let str = JSON.stringify(arr);
  localStorage.setItem("data", str);
  showData();

  input.value = "";
  btn.innerText = btnText;
});

const Del = function (index) {
  arr.splice(index, 1);
  let str = JSON.stringify(arr);
  localStorage.setItem("data", str);
  showData();
};

const Edit = function (index) {
  edit_id = index;
  input.value = arr[index].name;
  btn.innerText = "Save Changes";
};
