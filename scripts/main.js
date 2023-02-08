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
  },
  "resumeFilled":0
}
const options = [];
if(window.localStorage.getItem("data") === null && getPageIdBasedOnUrl() !== "resume") setDataInLocalStorage(dataPatern);

window.addEventListener("load",()=>{
  const pageId = getPageIdBasedOnUrl();
  const data = getDataFromLocalStorage();
  if(pageId === "personalInfo")
      if(Object.keys(data["data"][pageId]).length == 0) document.querySelector(`#${pageId}`).style.visibility = "hidden";
  restoreDataFromLocalStorage(pageId === "resume" ? "resumeData" : "data");
});

window.addEventListener("load", async ()=>{
  const pageId = getPageIdBasedOnUrl();
  if(pageId === "education"){
    const resp = await fetch("https://resume.redberryinternship.ge/api/degrees", {
      headers: {
        Accept: "application/json"
      }
    });
    if(resp.status === 200){
      const respData = await resp.json();
      for(const option of respData) options.push(option);
      const optionsDiv = createOptions();
      const inputComponent = document.querySelector("#education-0 #degree").parentElement;
      inputComponent.appendChild(optionsDiv);
      experienceEducationFormEventListenerSetUp(pageId, "ᲒᲐᲜᲐᲗᲚᲔᲑᲐ");
    }
  }
});

document.querySelector(".startPointButton").addEventListener("click",()=>{
  localStorage.removeItem("data");
  localStorage.removeItem("resumeData");
  window.location.href = "index.html";
});
