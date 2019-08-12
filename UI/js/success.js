function successRequest(){

  const forms = document.querySelector('form');
  forms.addEventListener('submit', e => {
    const inputs = forms.value;

    if(inputs !==''){
      alert(" Succefully Mentorship Session Requested!");
    }else{
      return;
    }
  })
  
}