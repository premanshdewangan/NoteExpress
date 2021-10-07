const form = document.querySelector("form");

function addAlertMsg(data) {
  let resData = JSON.parse(data);

  const alertElement = `
      <div class="alert alert-${resData.color} alert-dismissible fade show" role="alert">
      <strong>${resData.msg}</strong>
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>     
      `;

  document.getElementById("alert_area").innerHTML = alertElement;
}

const createForm = document.querySelector('#createForm');

createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(createForm);
  const searchParams = new URLSearchParams();

  for (const pair of formData) {
    searchParams.append(pair[0], pair[1]);
  }

  fetch("/createNote", {
    method: "POST",
    body: searchParams,
  })
    .then(function (response) {
      console.log(response);
      return response.text();
    })
    .then(function (data) {
      addAlertMsg(data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

/*window.addEventListener('load', ()=>{
        
    const form = document.querySelector('form');
    form.addEventListener('submit', (e)=>{
        //to prevent reload
        e.preventDefault();
        //creates a multipart/form-data object
        let data = new FormData(form);
        console.log(data);
        fetch("/createNote", {
          method  : 'POST',
          body : JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        .then((res)=>{
          console.log(res);
        }).then(data => console.log(data))
        .catch((err) => {throw err});
    });
});

// console.log("Hello JS !! Response from main.js");

*/
