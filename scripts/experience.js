"use strict";
const pageId = "experience";
const addMore = document.querySelector("#addMore");

experienceEducationFormEventListenerSetUp(pageId, "ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ");

addMore.addEventListener("click",()=>{
    const data = getDataFromLocalStorage();
    const formId = createNewExperience();
    experienceEducationFormEventListenerSetUp(pageId, "ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ", formId);
    if(data["data"][pageId][formId] === undefined) data["data"][pageId][formId] = {};
    setDataInLocalStorage(data);
});
