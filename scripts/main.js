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
let options = [];

if(window.localStorage.getItem("data") === null) setDataInLocalStorage(dataPatern);

window.addEventListener("load",()=>{
  const pageId = getPageIdBasedOnUrl();
  const data = getDataFromLocalStorage();
  console.log(data);
  if(Object.keys(data["data"][pageId]).length == 0 && pageId === "personalInfo") document.querySelector(`#${pageId}`).style.visibility = "hidden";
  restoreDataFromLocalStorage();
});

const loadOptions = async ()=>{

};

window.addEventListener("load", async ()=>{
  const pageId = getPageIdBasedOnUrl();
  if(pageId === "education"){
    const resp = await fetch("https://resume.redberryinternship.ge/api/degrees", {
      headers: {
        Accept: "application/json"
      }
    });
    if(resp.status === 200){
      options = await resp.json();
      const optionsDiv = createOptions();
      const inputComponent = document.querySelector("#education-0 #degree").parentElement;
      inputComponent.appendChild(optionsDiv);
      experienceEducationFormEventListenerSetUp(pageId, "ᲒᲐᲜᲐᲗᲚᲔᲑᲐ");
    }
  }
});
