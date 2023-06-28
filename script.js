const rightHand = document.querySelector(".right-arm");
const buttonCont = document.getElementById("buttonContainer");
const flagStick = document.querySelector(".flag-stick");
const flag = document.querySelector(".flag");
const leftHand = document.querySelector(".left-arm");
const buttonOrigin = buttonCont.innerHTML; //saves the origin html of the initial buttons
let animationProgress = false;

function rightHand90() {
    if (animationProgress) {
        return;
    }

    animationProgress = true;
    rightHand.style.transform = "rotateX(85deg)";
    setTimeout(() => {  
      rightHand.style.transform = "rotateX(0deg)"; // Reset the rotation
      animationProgress = false
    }, 3000);
    
}

function rightHand180() {
    if (animationProgress) {
        return;
    }

    animationProgress = true;
    rightHand.style.transform = "rotateX(180deg)";
}

function rightHand45() {
    if (animationProgress) {
        return;
    }

    animationProgress = true;
    rightHand.style.transform = "rotate(45deg)";
    setTimeout(() => {  
        rightHand.style.transform = "rotate(0deg)"; // Reset the rotation
        animationProgress = false;
      }, 3000);
}

function callFoul() {
    rightHand.style.transform = "rotateX(180deg)";
    const flag = document.querySelector(".flag");

    setTimeout(() => { //allows rotation up before shaking
        flag.classList.add("shake-animation");
    }, 1000); 

    // Remove the shake animation class after a certain duration
    setTimeout(() => {
    flag.classList.remove('shake-animation');
  }, 4000); // Adjust the duration as needed (in milliseconds)
}

function nearSide() {
    if (animationProgress) {
        return;
    }

    animationProgress = true;
    rightHand.style.transform = "rotateX(180deg)"; //left hand goes up 
    setTimeout(() => {
        rightHand.style.transform = "rotateX(60deg)";
    }, 2000);

    setTimeout(() => {
        rightHand.style.transform = "rotateX(0deg)";
        animationProgress = false;
    }, 4000);
}

function farSide() {
    if (animationProgress) {
        return;
    }

    animationProgress = true;
    rightHand.style.transform = "rotateX(180deg)"; //left hand goes up 
    setTimeout(() => {
        rightHand.style.transform = "rotateX(120deg)";
    }, 2000);

    setTimeout(() => {
        rightHand.style.transform = "rotateX(0deg)";
        animationProgress = false;
    }, 4000);
}

function middleSide() {
    if (animationProgress) {
        return;
    }

    animationProgress = true;
    rightHand.style.transform = "rotateX(180deg)"; //left hand goes up 
    setTimeout(() => {
        rightHand.style.transform = "rotateX(85deg)";
    }, 2000);

    setTimeout(() => {
        rightHand.style.transform = "rotateX(0deg)";
        animationProgress = false;
    }, 4000);
}

function offsideButtons() {
    buttonCont.innerHTML = '';
    buttonCont.appendChild(createNewButton('nearSide', 'Near-Side', 'button'));
    buttonCont.appendChild(createNewButton('middleSide', 'Middle', 'button'));
    buttonCont.appendChild(createNewButton('farSide', 'Far-Side', 'button'));
    const nearSideButton = document.getElementById('nearSide');
    const middleButton = document.getElementById('middleSide');
    const farSideButton = document.getElementById('farSide');
    nearSideButton.addEventListener("click", () => {
        nearSide();
        buttonCont.innerHTML = buttonOrigin; //change back to previous set of buttons
        attachEventListeners();
    });

    farSideButton.addEventListener("click", () => {
        farSide();
        buttonCont.innerHTML = buttonOrigin;
        attachEventListeners();
    });

    middleButton.addEventListener("click", () => {
        middleSide();
        buttonCont.innerHTML = buttonOrigin;
        attachEventListeners();
    });
}

function rightHandThrowIn() {
    if (animationProgress) {
        return;
    }

    animationProgress = true;
    rightHand.style.transform = "rotate(135deg)";
    setTimeout(() => {  
        rightHand.style.transform = "rotate(0deg)"; // Reset the rotation
        animationProgress = false;
      }, 3000);
}

function leftHandThrowIn() {
    if (animationProgress) {
        return;
    }

    animationProgress = true;
    
    rightHand.style.transform = "rotate(-45deg)";
    leftHand.style.transform = "rotate(20deg)";
    setTimeout(() => { //switches to leftHand
        rightHand.removeChild(flagStick);
        flagStick.style.right = "-15px"; //was originally 40
        flag.style.right = "0px"; //change position of flag on flag stick, originally -45
        leftHand.appendChild(flagStick);
        rightHand.style.transform = "rotate(0deg)";
        leftHand.style.transform = "rotate(0deg)";
    }, 1000);

    setTimeout(() => { //rotates 135degrees
        leftHand.style.transform = "rotate(-135deg)";
    }, 2000);

    //Moves back down to natural position
    setTimeout(() => {
        leftHand.style.transform = "rotate(0deg)";
    }, 5000);

    setTimeout(() => { //exchanging the flag back to the left hand
        rightHand.style.transform = "rotate(-20deg)";
        leftHand.style.transform = "rotate(45deg)";
    }, 7000);

    setTimeout(() => { //resets everything back to originally
        leftHand.removeChild(flagStick);
        flagStick.style.right = "40px"; 
        flag.style.right = "-45px"; 
        rightHand.appendChild(flagStick);
        rightHand.style.transform = "rotate(0deg)";
        leftHand.style.transform = "rotate(0deg)";
        animationProgress = false;
    }, 8000);
}

function throwinButtons() {
    buttonCont.innerHTML = '';
    buttonCont.appendChild(createNewButton('a-advantage', 'Attackers Advantage', 'button'));
    buttonCont.appendChild(createNewButton('d-advantage', 'Defenders Advantage', 'button'));
    const aAdvantage = document.getElementById('a-advantage');
    const dAdvantage = document.getElementById('d-advantage');

    aAdvantage.addEventListener("click", () => {
        rightHandThrowIn();
        buttonCont.innerHTML = buttonOrigin;
        attachEventListeners();
    });

    dAdvantage.addEventListener("click", () => {
        leftHandThrowIn()
        buttonCont.innerHTML = buttonOrigin;
        attachEventListeners();
    });
}

function createNewButton(id, label, reference) {
    const button = document.createElement('button');
    button.id = id;
    button.className = reference; //class name
    button.textContent = label;
    return button;
}

function foulForAttacker() {
    if (animationProgress) {
        return;
    }
    animationProgress = true;

    callFoul();

    setTimeout(() => { //signifies the advantage
    rightHand.style.transform = "rotate(135deg)";
    }, 4000);

    setTimeout(() => { //lowers back down
        rightHand.style.transform = "rotate(0deg)";
        animationProgress = false;
    }, 7000);
    
}

function foulForDefender() {
    if (animationProgress) {
        return;
    }
    animationProgress = true;

    callFoul();

    setTimeout(() => {
        rightHand.style.transform = "rotate(210deg)";
        leftHand.style.transform = "rotate(-225deg)";
    }, 4000)

    setTimeout(() => { //switches to leftHand
        rightHand.removeChild(flagStick);
        flagStick.style.right = "-15px"; //was originally 40
        flag.style.right = "0px"; //change position of flag on flag stick, originally -45
        leftHand.appendChild(flagStick);
        rightHand.style.transform = "rotate(0deg)";
        leftHand.style.transform = "rotate(-135deg)";
    }, 5000);

    //Moves back down to natural position
    setTimeout(() => {
        leftHand.style.transform = "rotate(0deg)";
    }, 8000);

    setTimeout(() => { //exchanging the flag back to the left hand
        rightHand.style.transform = "rotate(-20deg)";
        leftHand.style.transform = "rotate(45deg)";
    }, 10000);

    setTimeout(() => { //resets everything back to originally
        leftHand.removeChild(flagStick);
        flagStick.style.right = "40px"; 
        flag.style.right = "-45px"; 
        rightHand.appendChild(flagStick);
        rightHand.style.transform = "rotate(0deg)";
        leftHand.style.transform = "rotate(0deg)";
        animationProgress = false;
    }, 11000);
}

function foulButtons() {
    buttonCont.innerHTML = "";
    buttonCont.appendChild(createNewButton('a-advantage', "Attackers Advantage", "button"));
    buttonCont.appendChild(createNewButton("d-advantage", "Defenders Advantage", "button"));
    const aAdvantage = document.getElementById('a-advantage');
    const dAdvantage = document.getElementById('d-advantage');

    aAdvantage.addEventListener("click", () => {
        foulForAttacker();
        buttonCont.innerHTML = buttonOrigin;
        attachEventListeners();
    });

    dAdvantage.addEventListener("click", () => {
        foulForDefender()
        buttonCont.innerHTML = buttonOrigin;
        attachEventListeners();
    });
}

function substitution() {
    if (animationProgress) {
        return;
    }
    animationProgress = true;

    rightHand.style.transform = "rotateX(150deg)";
    leftHand.style.transform = "rotateX(150deg)";

    setTimeout(() => {
        rightHand.style.transform = "rotate(210deg)";
        leftHand.style.transform = "rotate(-225deg)";
    }, 750);

    setTimeout(() => {
        flagStick.style.transform = "rotate(90deg)";
        flagStick.style.top = "150px";
        flagStick.style.right = "0px";
        rightHand.style.transform = "rotate(180deg)";
        leftHand.style.transform = "rotate(-180deg)";
    }, 1750);

    setTimeout(() => {
        rightHand.style.transform = "rotate(210deg)";
        leftHand.style.transform = "rotate(-225deg)";
        flagStick.style.transform = "rotate(0deg)";
        flagStick.style.top = "100px";
        flagStick.style.right = "40px";
    }, 4750);

    setTimeout(() => {
        rightHand.style.transform = "rotateX(0deg)";
        leftHand.style.transform = "rotateX(0deg)";
        animationProgress = false;
    }, 5500);
}


function attachEventListeners() {

    const goalKick = document.getElementById("goalkick");
    const offside = document.getElementById("offside");
    const throwIn = document.getElementById("throw-in");
    const cornerKick = document.getElementById("cornerkick")
    const foul = document.getElementById("foul");
    const sub = document.getElementById("substitution");

    goalKick.addEventListener("click", rightHand90);
    offside.addEventListener("click", () => {
        if (!animationProgress) {
            offsideButtons()
        }
    });
    throwIn.addEventListener("click", () => {
        if (!animationProgress) {
            throwinButtons();
        }
    });
    cornerKick.addEventListener("click", rightHand45);
    foul.addEventListener("click", () => {
        if (!animationProgress) {
            foulButtons();
        }        
    });
    sub.addEventListener("click", substitution);
}

attachEventListeners();