/*
A link is defined by its title, its URL and its author (submitter).
If a new link URL does not start with "http://" or "https://", "http://" is automatically added at its beginning.
The web page displays a list of at least three already existing links.
A button exists for the user to submit a new link. When clicked, a form appears before the link list to input the new link properties (author, title and URL).
In this form, all link fields are mandatory.
When the new link is validated by the user, it is displayed at the top of the link list, replacing the form. A message indicates the success of the operation, then disappears after two seconds.


*/



const submitButton = document.getElementById("submitButton");
const inputContainer = document.getElementById("inputContainer")
const userName = document.getElementById("userName")
const websiteName = document.getElementById("websiteName")
const url = document.getElementById("url")
const addLink = document.getElementById("addLink");
const output = document.getElementById("output");
const alert = document.getElementById("alert");



function getValues(e) {
  if(userName.value=="" || url.value=="" || websiteName.value ==""){

    alert.innerHTML = `
    <div class="alert alert-danger" role="alert">
    <strong>Oh snap!</strong> Complete all fields and try again
    </div>
    `
  } else {
    inputContainer.classList.toggle("displayNone")
    alert.innerHTML = `
    <div class="alert alert-success" role="alert">
    <strong>Well done!</strong> ${websiteName.value} link has been succesfully added
    </div>
    `;
    let getURL = url.value;
    if (!getURL.match(/^[a-zA-Z]+:\/\//))
    {
      getURL = 'http://' + getURL;
    }


    output.innerHTML += `
      <li class="list-group-item"><h3>${websiteName.value}</h3> <a href="${getURL}" target="blank">${getURL}</a><br><span>Submitted by: ${userName.value}</span></li>
    `
    setInterval(function(){ alert.innerHTML = ""; }, 5000);
  }






}

function displayContainer() {
  inputContainer.classList.toggle("displayNone")
}

submitButton.addEventListener("click", displayContainer);
addLink.addEventListener("click", getValues);
