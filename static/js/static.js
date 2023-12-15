document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('open-slide').addEventListener('click', function () {
        toggleSlideMenu();
    });

    document.getElementById('chat-container').addEventListener('click', function () {
        closeSlideMenu();
        hideProfileDropdown();
    });

    document.querySelector('.profile-icon').addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the click event from reaching the parent div
        toggleProfileDropdown();
    });

    document.querySelector('.profile-dropdown').addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the click event from reaching the parent div
    });

    document.querySelector('.profile-dropdown a').addEventListener('click', function () {
        hideProfileDropdown();
    });
});

function toggleSlideMenu() {
    document.querySelector('.slide-menu').classList.toggle('open');
}

function closeSlideMenu() {
    document.querySelector('.slide-menu').classList.remove('open');
}

function toggleProfileDropdown() {
    var dropdown = document.querySelector('.profile-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function hideProfileDropdown() {
    var dropdown = document.querySelector('.profile-dropdown');
    dropdown.style.display = 'none';
}

function sendMessage() {
    var userMessage = document.getElementById("user-input").value;
    appendMessage("You: " + userMessage, 'user');

    // Send user message to the server and get the bot response
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: 'user_message=' + encodeURIComponent(userMessage),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var botResponse = data.bot_response;
        appendMessage("Advisor: " + botResponse, 'bot');
    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });
    

    // Clear the user input field
    document.getElementById("user-input").value = "";
}

function appendMessage(message, sender) {
    var chatBox = document.getElementById("chat-box");
    var newMessageContainer = document.createElement("div");
    newMessageContainer.className = 'message-container';

    var newMessage = document.createElement("div");
    
    if (sender === 'user') {
        newMessage.className = 'user-message';
    } else {
        newMessage.className = 'bot-message';
    }

    newMessage.innerHTML = message;

    newMessageContainer.appendChild(newMessage);
    chatBox.appendChild(newMessageContainer);

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}