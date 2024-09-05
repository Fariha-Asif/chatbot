
let sendBtn = document.getElementById('sendBtn');
let textbox = document.getElementById('textbox');
let chatContainer = document.getElementById('chatContainer');

let user = {message: ""};

let arrayOfPossibleMessage = [
    {message:"hi", response:"How may I help you?"},
    {message:"How are you?", response:"I am good."}
]

function sendMessage(userMessage){

    let messageElement = document.createElement('div');
    messageElement.style.textAlign = "right";
    messageElement.style.margin = "10px";

    messageElement.innerHTML = `<span>You: </span><span>${userMessage}</span>`;

    chatContainer.appendChild(messageElement);


}



function chatbotResponse(userMessage){

    let chatbotMessage = "";

        let result = arrayOfPossibleMessage.find(val => userMessage.toLowerCase().includes(val.message.toLowerCase()));

            if(result){

                chatbotMessage = result.response;
            } else {
                chatbotMessage = "I don't understand that. Could you please rephrase?";
            }

    let messageElement = document.createElement('div');

    messageElement.innerHTML = `<span>Chatbot: </span><span>${chatbotMessage}</span>`;

    setTimeout(()=>{
        messageElement.animate([{easing: "ease-in", opacity:0.4},{opacity:1}],{duration:1000});
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;

    },1000);

    
}



sendBtn.addEventListener('click', function(e){

    let userMessage = textbox.value

    if(userMessage.trim() === ""){
        alert('Please type in a message.')
    }else {
        let userMessageText = userMessage.trim();
        user.message = userMessageText;
        textbox.value = "";
        sendMessage(userMessageText);
        chatbotResponse(userMessageText);

        fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessageText })
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
});