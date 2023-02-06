"use strict";
const pageId = "experience";
const addMore = document.querySelector("#addMore");

experienceFormEventListenerSetUp(pageId);

addMore.addEventListener("click",()=>{
    const formId = createNewExperience();
    experienceFormEventListenerSetUp(pageId, formId);
});
