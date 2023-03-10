"use strict";
avoidPageSkipping();

const pageId = "personalInfo";
const inputs = document.querySelectorAll("input[type='text']");
const textarea = document.querySelector("textarea");
const fileInput = document.querySelector("#personalImage");
const nextButton = document.querySelector("#nextButton");

for(const input of inputs) input.addEventListener("keyup", (e)=>{
  const outputPage = document.querySelector(`#${pageId}`);
  const data = getDataFromLocalStorage();

  const target = e.currentTarget;
  updateOutputAndValidate(target);
  if(target.id === "email" || target.id == "phoneNumber"){
    const outputDestination = document.querySelector(`#${target.id}Output`);
    outputDestination.parentElement.style.visibility = "visible";
  }
  data["data"][pageId][target.id] = target.value;
  if(target.value === ""){
    delete data["data"][pageId][target.id];
    target.classList = [];
    target.nextElementSibling.style.display = "none";
    if(target.id === "email" || target.id == "phoneNumber"){
      const outputDestination = document.querySelector(`#${target.id}Output`);
      outputDestination.parentElement.style.visibility = "hidden";
    }
  }
  setDataInLocalStorage(data);

  outputPage.style.visibility = "visible";
  if(Object.keys(data["data"][pageId]).length === 0) outputPage.style.visibility = "hidden";

  const label = document.querySelector(`label[for='${e.currentTarget.id}']`);
  label.classList = [];
});

textarea.addEventListener("keyup",(e)=>{
  const outputPage = document.querySelector(`#${pageId}`);
  const data = getDataFromLocalStorage();
  const target = e.currentTarget;
  const outputDestination = document.querySelector(`#${target.id}Output`);
  outputDestination.innerText = target.value;
  outputDestination.parentElement.style.visibility = "visible";
  target.classList = [];
  target.classList.add("valid");

  data["data"][pageId][target.id] = target.value;
  if(target.value == ""){
    delete data["data"][pageId][target.id];
    target.classList = [];
    outputDestination.parentElement.style.visibility = "hidden";
  }
  setDataInLocalStorage(data);

  outputPage.style.visibility = "visible";
  if(Object.keys(data["data"][pageId]).length == 0) outputPage.style.visibility = "hidden";
});


fileInput.addEventListener("change",(e)=>{
  const id = e.currentTarget.id;
  const imageDestination = document.querySelector("#personalImageOutput");
  const label = document.querySelector(`label[for='${e.currentTarget.id}']`);
  label.classList = [];
  const data = getDataFromLocalStorage();
  if(e.currentTarget.files.length == 0) return;
  const image = e.currentTarget.files[0];
  const validInvalid = e.currentTarget.parentElement.parentElement.querySelector("img");

  if(!image.type.startsWith("image/")){
    validInvalid.src = "./images/invalid.png";
    validInvalid.style.display = "block";
    validInvalid.alt="Invalid";
    imageDestination.parentElement.style.visibility = "hidden";
    delete data["data"][pageId][id];
    setDataInLocalStorage(data);
    return;
  }
  if(image.size>3000000){ //~3mb
    validInvalid.src = "./images/invalid.png";
    validInvalid.style.display = "block";
    validInvalid.alt="Invalid";
    imageDestination.parentElement.style.visibility = "hidden";
    delete data["data"][pageId][id];
    setDataInLocalStorage(data);
    return;
  }
  validInvalid.src = "./images/valid.png";
  validInvalid.style.display = "block";
  validInvalid.alt="Valid";
  imageDestination.parentElement.style.visibility = "visible";

  const imageLoader = new FileReader();
  imageLoader.readAsDataURL(image);
  imageLoader.addEventListener("load",(e)=>{
    imageDestination.src = e.currentTarget.result;
    //under 3mb images
    data["data"][pageId][id] = {"base64Image":e.currentTarget.result, "name":image.name};
    setDataInLocalStorage(data);
  });

});


nextButton.addEventListener("click",()=>{
  let validQuantity = 0;
  const data = getDataFromLocalStorage();
  const inputs = document.querySelectorAll("input");
  for(const input of inputs){
    const id = input.id;
    const label = document.querySelector(`label[for='${id}']`);
    label.classList = [];
    const inputData = data["data"][pageId][id];
    if(inputData !== undefined && id !== "personalImage"){
      input.className === "valid" ? validQuantity++ : label.classList.add("invalidLabel");
      continue;
    }else if(id === "personalImage" && inputData !== undefined){
      validQuantity++;
      continue;
    }
    label.classList.add("invalidLabel");
  }
  if(validQuantity === 5){
    data["resumeFilled"]++;
    setDataInLocalStorage(data);
    window.location.href = "experience.html";
  }
});
