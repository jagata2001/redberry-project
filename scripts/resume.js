if(getDataFromLocalStorage("resumeData") === null){
  window.location.href = "index.html";
  throw "Move to index";
}
