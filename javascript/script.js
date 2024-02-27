const typingText = document.querySelector(".typing-text p");
inputField = document.querySelector(".wrapper .input-field")

let charIndex = 0;

function randomParagraph() {
    // get random number (less than 1) and multiply by the number of paragraphs
    let randIndex = Math.floor(Math.random() * paragraphs.length);

    // split chars of random paragraph then add each char inside a span
    // add the span inside the .typing-text p
    paragraphs[randIndex].split("").forEach(char => {
        let spanTag = `<span>${char}</span>`;
        typingText.innerHTML += spanTag;
    })
    
    // set the focus on the input-field when a key or a click is pressed 
    document.addEventListener('keydown', () => inputField.focus())
    document.addEventListener('click', () => inputField.focus())
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split(""); 
    if(characters[charIndex].innerText === typedChar[charIndex]) {
        characters[charIndex].classList.add("correct");
    }
    else {
        characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
}




randomParagraph();

inputField.addEventListener("input", initTyping)