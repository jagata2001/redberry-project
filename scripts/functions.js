"use strict";
const validateInputForGeorgianSymbolsAndLength = (text)=>{
  if(/^[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]*$/.test(text) && text.length>=2) return true;
  return false;
};

const validateEmail = (text)=>{
  const mailEnd = "@redberry.ge";
  if (text.endsWith(mailEnd) && text.length>(mailEnd.length)) return true;
  return false;
};

const validatePhoneNumber = (text)=>{
  const geCode = "+995";
  if (/^[+0-9 ]*$/.test(text) && text.replaceAll(" ","").length==13 && text.startsWith(geCode)) return true;
  return false;
};

const validateLength = (text)=>{
  if (text.length>=2) return true;
  return false;
};

const validateDate = (firstDate,secondDate)=>{
  firstDate = Date.parse(firstDate);
  secondDate = Date.parse(secondDate);
  return firstDate<secondDate ? true : false;
};
const validators = {
  "name":validateInputForGeorgianSymbolsAndLength,
  "surname":validateInputForGeorgianSymbolsAndLength,
  "email":validateEmail,
  "phoneNumber":validatePhoneNumber,
  "position":validateLength,
  "employer":validateLength
};

const getPageIdBasedOnUrl = ()=>{
  let page = window.location.href.split("/");
  page = page[page.length - 1];
  return page.split(".")[0];
};

const getDataFromLocalStorage =()=>{
  return JSON.parse(window.localStorage.getItem("data"));
};

const setDataInLocalStorage = (data)=>{
  return window.localStorage.setItem("data",JSON.stringify(data));
};

const updateTextWithSeparator = (firstValue, secondValue, containerId, destinationTag, separatorValue)=>{
  const outputDestination = document.querySelector(`#${containerId} ${destinationTag}`);
  const separator = firstValue === "" || secondValue === "" ? "" : separatorValue;
  if(outputDestination !== null) outputDestination.innerText = `${firstValue}${separator}${secondValue}`;
};

const updateOutputAndValidate = (target)=>{
  const value = target.value;
  if(target.id === "position" || target.id === "employer"){
    const inputsContainerId = target.getAttribute("data-outputcontainerid").replace("Out","");
    const secondId = target.id === "position" ? "employer" : "position";
    const second = document.querySelector(`#${inputsContainerId} #${secondId}`);
    updateTextWithSeparator(
          target.id === "position" ? value :  second.value,
          target.id === "employer" ? value : second.value,
          target.getAttribute("data-outputcontainerid"),
          "h3",//destinationTag
          ", "
       );
  }else{
    const outputDestination = document.querySelector(`#${target.id}Output`);
    outputDestination.innerText = value;
  }
  if(validators[target.id](value)){
    target.classList = [];
    target.classList.add("valid");
    target.nextElementSibling.src = "./images/valid.png";
    target.nextElementSibling.alt = "Valid";
    target.nextElementSibling.style.display = "block";
  }else if(value !== ""){
    target.classList = [];
    target.classList.add("invalid");
    target.nextElementSibling.src = "./images/invalid.png";
    target.nextElementSibling.alt = "Invalid";
    target.nextElementSibling.style.display = "block";
  }
};

const findPositionAndInsert = (containerId,container)=>{
  const idParts = containerId.split("-");
  const containerInsertId = parseInt(idParts[1]);
  const similarSections = document.querySelectorAll(`section[id^='${idParts[0]}']`);
  if(similarSections.length == 0){
    const lastElement = document.querySelector(".resumeLogo");
    lastElement.before(container);
    return;
  }
  const positions = [containerInsertId];
  for(const element of similarSections) positions.push(parseInt(element.id.split("-")[1]));
  positions.sort((x,y)=>{return x-y});
  const insertPosition = positions.indexOf(containerInsertId);

  if(insertPosition === 0){
    similarSections[0].before(container);
  }else{
    similarSections[insertPosition-1].after(container);
  }
};

const createSectionForEducationOrExperience = (containerId,headText)=>{
  const section = document.createElement("section");
  section.className = "experience";
  section.id = containerId;
  const h2 = document.createElement("h2");
  h2.innerText = headText;
  section.appendChild(h2);
  const h3 = document.createElement("h3");
  section.appendChild(h3);
  const h4 = document.createElement("h4");
  section.appendChild(h4);
  const p = document.createElement("p");
  section.appendChild(p);
  findPositionAndInsert(containerId,section);
};

const validateDateTypeInputAndUpdate = (target,compare=false)=>{
  if(compare){
    const inputsContainerId = target.getAttribute("data-outputcontainerid").replace("Out","");
    const secondId = target.id === "startDate" ? "endDate" : "startDate";
    const second = document.querySelector(`#${inputsContainerId} #${secondId}`);
    updateTextWithSeparator(
          target.id === "startDate" ? target.value.replaceAll("-","/") : second.value.replaceAll("-","/"),
          target.id === "endDate" ? target.value.replaceAll("-","/") : second.value.replaceAll("-","/"),
          target.getAttribute("data-outputcontainerid"),
          "h4",//destinationTag
          " - "
       );
    if(target.value !== "" && second.value !== ""){
      if(validateDate(
        target.id === "startDate" ? target.value : second.value,
        target.id === "endDate" ? target.value : second.value
      )){
        target.classList = [];
        target.classList.add("valid");
        second.classList = [];
        second.classList.add("valid");
      }else{
        target.classList = [];
        target.classList.add("invalid");
        second.classList = [];
        second.classList.add("invalid");
      }
      return;
    }
    if(target.value === ""){
      target.classList = [];
      target.classList.add("invalid");
    }else{
      target.classList = [];
      target.classList.add("valid");
    }
  }
};
const validateTextareaAndUpdate = (target)=>{
  const outputContainerId = target.getAttribute("data-outputContainerId");
  const destinationTag = document.querySelector(`#${outputContainerId} p`);
  if(destinationTag !== null) destinationTag.innerText = target.value;

  if(target.value === ""){
    target.classList = [];
    target.classList.add("invalid");
  }else{
    target.classList = [];
    target.classList.add("valid");
  }
};
const positionEmployerEducationDateFunction = (pageId,e)=>{
  const data = getDataFromLocalStorage();
  const target = e.currentTarget;
  const outputContainerId = e.currentTarget.getAttribute("data-outputContainerId");
  const inputsContainerId = outputContainerId.replace("Out","");
  let outputContainer = document.querySelector(`#${outputContainerId}`);
  if(data["data"][pageId][inputsContainerId] === undefined) data["data"][pageId][inputsContainerId] = {};
  if(target.value !== "" && outputContainer === null){
    createSectionForEducationOrExperience(outputContainerId,"ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ");
    outputContainer = document.querySelector(`#${outputContainerId}`);
  }

  if(target.type === "text"){
    updateOutputAndValidate(target);
  }else if(target.type === "date") {
    validateDateTypeInputAndUpdate(target,true)
  }else{
    validateTextareaAndUpdate(target);
  }

  data["data"][pageId][inputsContainerId][target.id] = target.value;
  if(target.value === ""){
    delete data["data"][pageId][inputsContainerId][target.id];
    target.classList = [];
    if(target.type === "text") target.nextElementSibling.style.display = "none";
  }
  setDataInLocalStorage(data);

  if(Object.keys(data["data"][pageId][inputsContainerId]).length === 0
      && outputContainer !== null) outputContainer.remove();
};

const createInputComponent = (id, placeholder, outputContainerId)=>{
  const div = document.createElement("div");
  div.className = "inputComponent";
  const input = document.createElement("input");
  input.type = "text";
  input.autocomplete = "off";
  input.id = id;
  input.setAttribute("data-outputcontainerid",outputContainerId);
  input.placeholder = placeholder;
  div.appendChild(input);
  const img = document.createElement("img");
  img.src = "./images/valid.png";
  img.alt="Valit";
  div.appendChild(img);
  return div;

};
const createSeparatorDiv = (id, labelText, outputContainerId)=>{
  const div = document.createElement("div");
  div.className = "separator";
  const label = document.createElement("label");
  label.innerText = labelText;
  label.setAttribute("for",id);
  div.appendChild(label);
  const dateDiv = document.createElement("div");
  dateDiv.className = "inputComponent date";
  const input = document.createElement("input");
  input.type = "date";
  input.id = id;
  input.setAttribute("data-outputcontainerid",outputContainerId);
  dateDiv.appendChild(input);
  div.appendChild(dateDiv);
  return div;
};

const createDescriptionDiv = (id, placeholder, outputContainerId)=>{
  const div = document.createElement("div");
  div.className = "withTextArea description";
  const label = document.createElement("label");
  label.innerText = "აღწერა";
  label.setAttribute("for", id);
  div.appendChild(label);
  const textarea = document.createElement("textarea");
  textarea.id = id;
  textarea.setAttribute("data-outputcontainerid", outputContainerId);
  textarea.rows="8";
  textarea.cols="80";
  textarea.placeholder = placeholder;
  div.appendChild(textarea);
  return div;
};
const createNewExperience = ()=>{
  const experienceForms = document.querySelectorAll("div[id^='experience']");
  const lastId = parseInt(experienceForms[experienceForms.length-1].id.split("-")[1]);
  const newId = `experience-${lastId+1}`;
  const outputContainerId = `experienceOut-${lastId+1}`;

  const div = document.createElement("div");
  div.id = newId;

  const positionDiv = document.createElement("div");
  positionDiv.className = "withOneInput position";
  const positionLabel = document.createElement("label");
  positionLabel.setAttribute("for","position");
  positionLabel.innerText = "თანამდებობა";
  positionDiv.appendChild(positionLabel);
  positionDiv.appendChild(
    createInputComponent(
      "position",
      "დეველოპერი, დიზაინერი, ა.შ.",
      outputContainerId
    )
  );
  const positionP = document.createElement("p");
  positionP.innerText = "მინიმუმ 2 სიმბოლო";
  positionDiv.appendChild(positionP);
  div.appendChild(positionDiv);

  const employerDiv = document.createElement("div");
  employerDiv.className = "withOneInput employer";
  const employerLabel = document.createElement("label");
  employerLabel.setAttribute("for","employer");
  employerLabel.innerText = "დამსაქმებელი";
  employerDiv.appendChild(employerLabel);
  employerDiv.appendChild(
    createInputComponent(
      "employer",
      "დამსაქმებელი",
      outputContainerId
    )
  );
  const employerP = document.createElement("p");
  employerP.innerText = "მინიმუმ 2 სიმბოლო";
  employerDiv.appendChild(employerP);
  div.appendChild(employerDiv);

  const inlineTwoInputDiv = document.createElement("div");
  inlineTwoInputDiv.className = "inlineTwoInput";
  inlineTwoInputDiv.appendChild(
    createSeparatorDiv(
      "startDate",
      "დაწყების რიცხვი",
      outputContainerId
    )
  );
  inlineTwoInputDiv.appendChild(
    createSeparatorDiv(
      "endDate",
      "დამთავრების რიცხვი",
      outputContainerId
    )
  );
  div.appendChild(inlineTwoInputDiv);
  div.appendChild(
    createDescriptionDiv(
      "description",
      "როლი თანამდებობაზე და ზოგადი აღწერა",
      outputContainerId
    )
  );
  const lineDiv = document.createElement("div");
  lineDiv.className = "line";
  div.appendChild(lineDiv);
  experienceForms[experienceForms.length - 1].after(div);
  return newId;
};

const experienceFormEventListenerSetUp = (pageId, formId)=>{
  const form = formId == undefined ? document : document.querySelector(`#${formId}`);
  const inputs = form.querySelectorAll("input[type='text']");
  const dateInputs = form.querySelectorAll("input[type='date']");
  const description = form.querySelector("#description");
  for(const input of inputs) input.addEventListener("keyup", positionEmployerEducationDateFunction.bind(event,pageId));
  for(const dateInput of dateInputs) dateInput.addEventListener("change", positionEmployerEducationDateFunction.bind(event,pageId));
  description.addEventListener("keyup", positionEmployerEducationDateFunction.bind(event,pageId));
};
const restorePersonalInfo = ()=>{
  const data = getDataFromLocalStorage();
  const pageId = getPageIdBasedOnUrl();
  for(const [elementKey, value] of Object.entries(data["data"]["personalInfo"])){
    const outputDestination = document.querySelector(`#${elementKey}Output`);
    elementKey === "personalImage" ? outputDestination.src=value : outputDestination.innerText = value;
    if(elementKey === "email" || elementKey == "phoneNumber" ||
        elementKey == "aboutMe" || elementKey === "personalImage") outputDestination.parentElement.style.visibility = "visible";
    if(pageId === "personalInfo"){
      const target = document.querySelector(`#${elementKey}`);
      const tagname = target.tagName;
      if (elementKey === "personalImage") {
        const validInvalid = target.parentElement.parentElement.querySelector("img");
        validInvalid.src = "./images/valid.png";
        validInvalid.style.display = "block";
        validInvalid.alt="Valid";
      }else if(tagname === "INPUT"){
        target.value = value;
        updateOutputAndValidate(target);
      }else if (tagname === "TEXTAREA") {
        target.value = value;
        if(value !== "") target.classList.add("valid");
      }
    }
  }
};

const restoreExperienceInfo = ()=>{
  const data = getDataFromLocalStorage();
  const pageId = getPageIdBasedOnUrl();
  for(const [inputsContainerId, inputsData] of Object.entries(data["data"]["experience"])){

    const outputContainerId = inputsContainerId.replace("-","Out-");
    if(Object.keys(inputsData).length === 0) continue;

    createSectionForEducationOrExperience(outputContainerId,"ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ");

    const position = inputsData["position"] === undefined ? "" : inputsData["position"];
    const employer = inputsData["employer"] === undefined ? "" : inputsData["employer"];
    const startDate = inputsData["startDate"] === undefined ? "" : inputsData["startDate"];
    const endDate = inputsData["endDate"] === undefined ? "" : inputsData["endDate"];
    const description = inputsData["description"] === undefined ? "" : inputsData["description"];

    updateTextWithSeparator(
          position,
          employer,
          outputContainerId,
          "h3",//destinationTag
          ", "
       );
    updateTextWithSeparator(
         endDate,
         endDate,
         outputContainerId,
         "h4",//destinationTag
         ", "
      );

    const descriptionDestination = document.querySelector(`#${outputContainerId} p`);
    descriptionDestination.innerText = description;

    if(pageId === "experience"){
      if(inputsContainerId !== "experience-0"){
        const formId = createNewExperience();
        experienceFormEventListenerSetUp(pageId, formId);
      }
      for(const [elementKey, value] of Object.entries(inputsData)){
          const input = document.querySelector(`#${inputsContainerId} #${elementKey}`);
          input.value = value;
          if(input.type === "text"){
            updateOutputAndValidate(input);
          }else if(input.type === "date") {
            validateDateTypeInputAndUpdate(input,true)
          }else{
            validateTextareaAndUpdate(input);
          }
      }
    }
  }
};
const restoreDataFromLocalStorage = ()=>{
  restorePersonalInfo();
  restoreExperienceInfo();
};
