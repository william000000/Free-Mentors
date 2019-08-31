function successRequest() {

  const forms = document.querySelector('form');
  forms.addEventListener('submit', e => {
    const inputs = forms.value;

    if (inputs !== '') {
      alert(" Succefully Mentorship Session Requested!");
    } else {
      return;
    }
  });

}

function mentorAgree() {
  const btn = document.querySelector('#menteeId');

    if (btn.value == 'accept') {
      document.querySelector('#confirmBtn').value = 'Confirmed';
      document.querySelector('#confirmBtn').style.color = 'green';
      return alert(" Succefully Done!");
    } else {
      document.querySelector('#confirmBtn').style.color = 'red';
      document.querySelector('#confirmBtn').value = 'Rejected';
      return alert(" Rejected!");

    }

}