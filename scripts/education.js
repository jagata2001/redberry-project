"use strict";
avoidPageSkipping();

const pageId = "education";
const addMore = document.querySelector("#addMore");
const backButton = document.querySelector("#backButton");
const submitButton = document.querySelector("#submitButton");

addMore.addEventListener("click",addMoreExperienceOrEducation.bind(event, "ᲒᲐᲜᲐᲗᲚᲔᲑᲐ", pageId));

backButton.addEventListener("click",back);

submitButton.addEventListener("click", async (e)=>{
  const target = e.currentTarget;
  target.disabled = true;
  const data = getDataFromLocalStorage();
  const educationForms = document.querySelectorAll("div[id^='education-']");
  const maxValidObjectsPerForm = 4;
  let validQuantity = 0;
  let invalidQuantity = 0;
  let filledFormQuantity = 0;
  for(const educationForm of educationForms){
    const viData = validateEducationExperienceFormForButton(educationForm);
    validQuantity+=viData["valid"];
    invalidQuantity+=viData["invalid"];
    if(viData["valid"] !== 0 || viData["invalid"] !== 0) filledFormQuantity++;
  }
  if(validQuantity === 0){
    let dataQuantity = 0;
    for(const value of Object.values(data["data"][pageId])) dataQuantity+=Object.keys(value).length;
    if(dataQuantity === 0){
      const firstFormLabels = document.querySelectorAll("#education-0 label");
      for(const label of firstFormLabels) label.classList.add("invalidLabel");
    }
    target.disabled = false;
    return;
  }

  if(validQuantity === (filledFormQuantity*maxValidObjectsPerForm) && invalidQuantity === 0){
    await submitData();
  }
  target.disabled = false;

});

window.addEventListener("click", (e)=>{
  let target = e.target;
  while(true){
    if(target.tagName === "BODY") break;
    if(target.id === "degree") return;
    target = target.parentElement;
  }
  const options = document.querySelectorAll("#options");
  for(const option of options) option.style.display = "none";
});
