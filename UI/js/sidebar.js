function displaySideBar(){
  document.querySelector('#sidebar').style.display = "block";


} 
function closebtn(){
  document.querySelector('#sidebar').style.display = "none";
  document.querySelector('#btntoggle').style.display = "block";

}


function showMoreMentors(){
  document.querySelector('.viewMore').style.display = "none";
  document.querySelector('.moreMentor').style.display = "flex";
}
function lessMentors(){
  document.querySelector('.moreMentor').style.display = "none";
  document.querySelector('.viewMore').style.display = "block";
}