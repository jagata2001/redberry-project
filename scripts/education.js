"use strict";
const pageId = "education";
const addMore = document.querySelector("#addMore");

addMore.addEventListener("click",()=>{
    const data = getDataFromLocalStorage();
    const formId = createNewEducation();
    experienceEducationFormEventListenerSetUp(pageId, "ᲒᲐᲜᲐᲗᲚᲔᲑᲐ", formId);
    if(data["data"][pageId][formId] === undefined) data["data"][pageId][formId] = {};
    setDataInLocalStorage(data);
});
