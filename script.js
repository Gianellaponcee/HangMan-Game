//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const usserInputSection = document.getElementById("user-input-section");
const newGameCOntainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Options values for buttons
let options = {
    fruits: [
        "Platano",
        "Manzana",
        "Mandarina",
        "Mango",
        "Fresas",
        "Sandia",
    ],
    animals: ["Perro", "Caballo", "Gato", "Leon", "Girafa", "Zebra"],
    countries: [
        "India",
        "Peru",
        "Colombia",
        "Brazil",
        "Estados Unidos",
        "Argentina",
    ],
};

//count
let winCount = 0;
let count = 0;

let choseWord = "";

//Display option buttons
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Please Select An Options</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let lettersButtons = document.querySelectorAll(".letters");
    //disable all options
    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    //disable all Letters
    lettersButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameCOntainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    //If optionValur matches the button innerText then highLight the button
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });

    //initaitlly hide letters, clear previous word
    letterContainer.classList.remove("hide");
    usserInputSection.innerText = "";

    let optionArray = options[optionValue];
    //chose random word
    choseWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    choseWord = choseWord.toUpperCase();

    //replace every Letter with span containing dash
    let displayItem = choseWord.replace(/./g, '<span class="dashes">_</span>');

    //Display each element as span
    usserInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
    winCount = 0;
    count = 0;

    //Initially erase all content and hide letters and new game button
    usserInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameCOntainer.classList.add("hide");
    letterContainer.innerHTML = "";

    //For creating Letter buttons 
    for (let i = 65; i < 91; i++) {
       let button = document.createElement("button");
       button.classList.add("letters");
       //Number to ASCII[A-Z]
       button.innerText = String.fromCharCode(i);
       //character button click
       button.addEventListener("click", () => {
        let charArray = choseWord.split("");
        document.getElementsByClassName("your-class-name");
        //if array contains clicked value replace the matched dash with Letter else dram on canvas
        if (charArray.includes(button.innerText)) {
            charArray.forEach((char, index) => {
                //if character in array is same as clicked button
                if (char === button.innerText) {
                   //replace dash with Letter
                   [index].innerText = char;
                   //increment counter
                   winCount += 1;
                   //if winCount equals word Lenfth
                   if (winCount == charArray.length) {
                    resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${choseWord}</span></p>`;
                    //block all buttons
                    blocker();
                   }
                }
            });
        } else {
            //lose count
            count += 1;
            //for drawing man
            drawMan(count);
            //Count==6 because head,body,left arm, right arm, left leg, right leg
            if(count == 6) {
                resultText.innerHTML = `<h2 class='lose-msg'>Game Over!!</h2><p>The word was <span>${choseWord}</span></p>`;
                blocker();
            }
        }
        //disable clicker button
        button.disabled = true;
    });
    letterContainer.append(button);
}

 displayOptions();
 //Call to canvasCreator (for clearing previoous canvas and creating initial canvas)
 let { initialDrawing } = canvasCreator();
 //initialDrawing would draw the frame 
 initialDrawing()
};

//Canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidht = 2;

    //For drawing Lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 40, 10,  Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 50, 50, 70);
    };

    const leftArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 50, 90, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    //initial frame
    const initialDrawing = () => {
        //clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //botton Linr
        drawLine(10, 130, 130, 130);
        //Left line
        drawLine(10, 10, 10, 131);
        //top line
        drawLine(10, 10, 70, 10);
        //small top line
        drawLine(70, 10, 70, 20);
    };

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer