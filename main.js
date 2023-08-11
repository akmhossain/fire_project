
const database = firebase.database().ref();

const messages = document.getElementById("all-messages");
const username_input = document.getElementById("username");
const message_input = document.getElementById("message");
const button = document.getElementById("send-btn");

button.onclick = updateDB;

function updateDB(event) {
    event.preventDefault()
    const username_value = username_input.value;
    const message_value = message_input.value;

    username_input.value = "";
    message_input.value = "";

    const value = {
        NAME: username_value, 
        MESSAGE: message_value 
    }
    database.push(value);

    console.log(value);
}

database.on("child_added", addMessageToBoard);

function addMessageToBoard(rowData) {
    const row = rowData.val();
    const name = row.NAME;
    const message = row.MESSAGE;

    const div_element = document.createElement("div");
    const username_paragraph = document.createElement("p");
    const message_paragraph = document.createElement("p");

    username_paragraph.innerHTML = name;
    message_paragraph.innerHTML = message;

    username_paragraph.className = "single-message-username";

    div_element.appendChild(username_paragraph);
    div_element.appendChild(message_paragraph);

    div_element.className = "single-message";

    messages.appendChild(div_element);
}