"use strict";
avoidPageSkipping();

const pageId = "experience";
const addMore = document.querySelector("#addMore");
const backButton = document.querySelector("#backButton");
const nextButton = document.querySelector("#nextButton");

experienceEducationFormEventListenerSetUp(pageId, "ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ");

addMore.addEventListener("click",addMoreExperienceOrEducation.bind(event, "ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ",pageId));

backButton.addEventListener("click",back);

nextButton.addEventListener("click",()=>{
  const data = getDataFromLocalStorage();
  const experienceForms = document.querySelectorAll("div[id^='experience-']");
  const maxValidObjectsPerForm = 5;
  let validQuantity = 0;
  let invalidQuantity = 0;
  let filledFormQuantity = 0;
  for(const experienceForm of experienceForms){
    const viData = validateEducationExperienceFormForButton(experienceForm);
    validQuantity+=viData["valid"];
    invalidQuantity+=viData["invalid"];
    if(viData["valid"] !== 0 || viData["invalid"] !== 0) filledFormQuantity++;
  }
  if(validQuantity === 0){
    let dataQuantity = 0;
    for(const value of Object.values(data["data"][pageId])) dataQuantity+=Object.keys(value).length;
    if(dataQuantity === 0){
      const firstFormLabels = document.querySelectorAll("#experience-0 label");
      for(const label of firstFormLabels) label.classList.add("invalidLabel");
    }
    return;
  }

  if(validQuantity === (filledFormQuantity*maxValidObjectsPerForm) && invalidQuantity === 0){
    data["resumeFilled"]++;
    setDataInLocalStorage(data);
    window.location.href = "education.html";
  }
});
