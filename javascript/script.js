const typingText = document.querySelector(".typing-text p"),
inputField = document.querySelector(".wrapper .input-field"),
mistakeTag = document.querySelector(".mistake span"),
timeTag = document.querySelector(".time span b"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button");


let timer,
maxTime = 60,
timeLeft = maxTime

let charIndex = mistakes = isTyping = 0;

function randomParagraph() {
    // get random number (less than 1) and multiply by the number of paragraphs
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // split chars of random paragraph then add each char inside a span
    // add the span inside the .typing-text p
    paragraphs[randIndex].split("").forEach(char => {
        let spanTag = `<span>${char}</span>`;
        typingText.innerHTML += spanTag;
    })
    
    typingText.querySelectorAll("span")[0].classList.add("active");
    // set the focus on the input-field when a key or a click is pressed 
    document.addEventListener('keydown', () => inputField.focus());
    document.addEventListener('click', () => inputField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let lastTypedChar = inputField.value.split("")[charIndex]; 

    if(charIndex < characters.length - 1 && timeLeft > 0) {
        
    // once timer has started, it won't restart
    if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        

        // if no entered character or backspace was pressed
        if(lastTypedChar == null) {
            charIndex--;
            
            // decrement mistakes if the character span is incorrect
            if(characters[charIndex].classList.contains("incorrect")) mistakes--;

            characters[charIndex].classList.remove("correct", "incorrect");
        }
        else {
            if(characters[charIndex].innerText === lastTypedChar) {
                characters[charIndex].classList.add("correct");
            }
            else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        // if wpm is 0, empty, or infinity, then wpm = 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm
        cpmTag.innerText = charIndex - mistakes; // cpm doesn't take into account the mistakes
    }

    else {
        inputField.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    // if there is time, decrement the timeLeft var
    // else, clear the time
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    }
    else {
        clearInterval(timer);
    }
}

function resetGame() {
    randomParagraph();
    inputField.value = "";
    clearInterval(timer);

    timeLeft = maxTime;
    timeTag.innerText = timeLeft;

    charIndex = mistakes = isTyping = 0;

    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0
    cpmTag.innerText = 0;

}


randomParagraph();

inputField.addEventListener("input", initTyping)
tryAgainBtn.addEventListener("click", resetGame)