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

const validators = {
  "name":validateInputForGeorgianSymbolsAndLength,
  "surname":validateInputForGeorgianSymbolsAndLength,
  "email":validateEmail,
  "phoneNumber":validatePhoneNumber
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

const updateInputAndValidate = (target)=>{
  const value = target.value;
  const outputDestination = document.querySelector(`#${target.id}Output`);
  if(validators[target.id](value)){
    target.classList = [];
    target.classList.add("valid");
    target.nextElementSibling.src = "./images/valid.png"
    target.nextElementSibling.style.display = "block";
  }else if(input !== ""){
    target.classList = [];
    target.classList.add("invalid");
    target.nextElementSibling.src = "./images/invalid.png";
    target.nextElementSibling.style.display = "block";
  }
  outputDestination.innerText = value;
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
        updateInputAndValidate(target);
      }else if (tagname === "TEXTAREA") {
        target.value = value;
      }
    }
  }
};
const restoreDataFromLocalStorage = ()=>{
  restorePersonalInfo();
};
