// Delete part:

// add alert feature:
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

// Edit part:
// console.log("Hii JS");

let flag = 0; //currently its blue

function getBtnId(editBtnId) {
  let editBtn = document.getElementById(editBtnId);
  let cardBody =
    document.getElementById(editBtnId).parentElement.parentElement
      .parentElement;

  let titleValue = cardBody.querySelector(".card-body h5").textContent;
  let descValue = cardBody.querySelector(".card-body p").textContent;

  let buttonId = cardBody.querySelector(".card-body div").id;
  let formId = cardBody.querySelector(".card-body div").children[0].name;
  let objId = cardBody.querySelector(".card-body div input").value;

  // console.log(buttonId);
  // console.log(formId);
  // console.log(objId);

  //   card body HTML structure:
  let cardBodyStruct = `
<div class="card-body">
<input type="text" value=${titleValue} class="px-1 mb-2"> 
<textarea name="" id="" cols="30" rows="4" class="px-1 mb-2">${descValue}</textarea>
  <div id=${buttonId} style="display: flex; flex-direction: row">
    <form id=${formId} name=${formId} action="/deleteNote" method="POST">
      <input
        name="id"
        type="text"
        value=${objId}
        style="width: 0%; height: 0%; visibility: hidden"
      />
      <a
        href="#"
        class="btn btn-danger px-4 mx-3"
        onclick="document.getElementById('${formId}').submit()"
        >Delete</a
      >
    </form>
    <a href="#" id=${editBtnId} class="btn btn-success px-4 mx-3" onclick="editNewNote(this.id, ${buttonId}, ${formId})">Save</a>
  </div>
</div>
`;

  // perform toggle operation:

  cardBody.innerHTML = cardBodyStruct;
}

function editNewNote(editBtnId, buttonId, formId) {
  let editBtn = document.getElementById(editBtnId);
  let cardBody =
    document.getElementById(editBtnId).parentElement.parentElement
      .parentElement;

  let newTitleValue = cardBody.querySelector(".card-body input").value;
  let newDescValue = cardBody.querySelector(".card-body textarea").value;
  let objId = cardBody.querySelector(".card-body div input").value;

  // console.log("This is the Obj Id");
  // console.log(objId);

  //   card body HTML structure:
  let cardBodyStruct = `
  <div class="card-body">
  <h5 class="card-title" style="z-index: 10; ">${newTitleValue}</h5>
  <p class="card-text"  style="z-index: 10; ">${newDescValue}</p>
  <div id=${buttonId.id} style="display: flex; flex-direction: row">
    <form id=${formId.name} name=${formId.name} action="/deleteNote" method="POST">
      <input
        name="id"
        type="text"
        value="${objId}"
        style="width: 0%; height: 0%; visibility: hidden"
      />
      <a
        href="#"
        class="btn btn-danger px-4 mx-3"
        onclick="document.getElementById('${formId.name}').submit()"
        >Delete</a
      >
    </form>
    <a href="#" id=${editBtnId} class="btn btn-primary px-4 mx-3" onclick="getBtnId(this.id)">Edit</a>
  </div>
</div>
`;

  // console.log(newTitleValue);
  // console.log(newDescValue);
  // console.log(buttonId.id);
  // console.log(formId.name);

  const searchParams = new URLSearchParams();
  searchParams.append("newTitleValue", newTitleValue);
  searchParams.append("newDescValue", newDescValue);
  searchParams.append("objId", objId);

  fetch("/editNote", {
    method: "POST",
    body: searchParams,
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      let message = JSON.parse(data).msg;
      if (message == "Edited Succesfully") {
        cardBody.innerHTML = cardBodyStruct;
        addAlertMsg(data);
      } else {
        addAlertMsg(data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
