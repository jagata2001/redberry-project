"use strict";
const dataPatern = {
  "data":{
    "personalInfo":{},
    "experience":{},
    "education":{},
  },
  "pages":{
    "personalInfo":"personalInfo.html",
    "experience":"experience.html",
    "education":"education.html",
  }
}

if(window.localStorage.getItem("data") === null) setDataInLocalStorage(dataPatern);

window.addEventListener("load",()=>{
  const pageId = getPageIdBasedOnUrl();
  const data = getDataFromLocalStorage();
  console.log(data);
  if(Object.keys(data["data"][pageId]).length == 0 && pageId === "personalInfo") document.querySelector(`#${pageId}`).style.visibility = "hidden";
  restoreDataFromLocalStorage();
});
