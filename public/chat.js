// Make client connection
const socket = io();

// Query the DOM
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const button = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

function socketEmit() {
    socket.emit("chat", {
        message: message.value,
        handle: handle.value
    });
}

// Emit events using client socket
// When the button is clicked
button.addEventListener("click", socketEmit);

// When the 'enter' key is pressed
window.addEventListener("keypress", (event) => {
    const key = event.keyCode || event.which;
    if (key == 13) {
        socketEmit();
    }
});

message.addEventListener("keypress", () => {
    socket.emit("typing", handle.value); 
}); 

// Listen for events
socket.on("chat", (data) => {
    message.value = "";
    feedback.innerHTML = "";
    output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>"
});

socket.on("typing", (data) =>{
    feedback.innerHTML = "<p><em>" + data + " is typing a message..</em></p>";
});