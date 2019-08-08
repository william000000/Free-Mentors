function displaySideBar(){
  document.querySelector('#sidebar').style.display = "block";
  document.querySelector('#header-logo').style.display = "none";

} 
function closebtn(){
  document.querySelector('#sidebar').style.display = "none";
  document.querySelector('#btntoggle').style.display = "block";
  document.querySelector('#header-logo').style.display = "block";
}

