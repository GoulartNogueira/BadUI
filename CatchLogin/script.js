const Catcher = document.getElementById('catcher');
const MailBox = document.getElementById('email-box');
const PassBox = document.getElementById('pass-box');
const LoginButton = document.getElementById('login-btn');




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

let divList = [] 
let catcherData = {
    'x':100,
    'length': 200,
}

let divid=0;
let field=1;
const generateLetterDiv = (left_padding , divid) => {
    let letterDiv = document.createElement('div')
    letterDiv.style.cssText = `
    position:fixed;
    left: ${left_padding}px;
    top: 20px;
    opacity:1;
    z-index:100;
   `
    ;
    let letterText = document.createElement('h1')
    letterText.innerHTML=randomChar();
    

    letterDiv.appendChild(letterText);
    letterDiv.id = divid
    document.body.appendChild(letterDiv)

    return letterDiv
}

const randomChar = () => {
    return String.fromCharCode(getRandomInt(33,126));
}


let loginLoopInterval = setInterval(loginLoop, 10);
let spawnTime = 0;

function loginLoop(){
    spawnTime+=10;
    if(spawnTime == 1000){
        spawnTime=0;
        divList.push(generateLetterDiv(getRandomInt(20, window.innerWidth-20), divid))
        divid+=1;
    }

    if(field == 1){
        MailBox.style.borderColor = "purple";
    }
    else if( field == 2){
        MailBox.style.borderColor = "white";
        PassBox.style.borderColor = "purple";
    }
    else{
        MailBox.style.borderColor = "white";
        PassBox.style.borderColor = "white";
        LoginButton.style.borderColor = "purple";
    }
   
    moveLetters();
}

function stopLoginLoop(){
    clearInterval(loginLoopInterval);
    console.log('login stopped')
}


function removeElement(id){
    const elementToRemove = document.getElementById(id);
    if(elementToRemove != null)
        elementToRemove.remove()
}
function moveLetters(){
    divList.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        let currentTop = parseInt(computedStyle.getPropertyValue("top"));
        currentTop+=2;
        element.style.top =  `${currentTop}px`;
        if(element.id == 0)

        if(parseInt(element.style.top) > window.innerHeight)
                removeElement(element.id)

        if(parseInt(element.style.top) > window.innerHeight-120 && parseInt(element.style.top) < window.innerHeight-20 && parseInt(element.style.left) >=  catcherData.x && parseInt(element.style.left) <= catcherData.x + catcherData.length)
        {
            
            
            const parentDiv = document.getElementById(element.id);
            if(parentDiv != null){
            const childText = parentDiv.querySelector("h1").textContent;
            addLetterToBox(childText);
            removeElement(element.id);   
            }
        }
    });
}

function addLetterToBox(chr){
    if (field == 1)
        MailBox.value += chr;
    else if (field == 2)
        PassBox.value += chr;
}

function removeLetterFromBox(){


    if (field == 1)
        MailBox.value = MailBox.value.substring(0, MailBox.value.length - 1);
    else if (field == 2)
        PassBox.value = PassBox.value.substring(0, PassBox.value.length - 1);
}


document.addEventListener("keydown", function(event) {
    const key = event.key;
  
    if(key == 'ArrowRight' && catcherData.x+catcherData.length < window.innerWidth-20 )
        catcherData.x += 50;
    else if (key == 'ArrowLeft' && catcherData.x > 20)
        catcherData.x -= 50;
    else if(key == 'Enter')
        field+=1;
    else if (key == 'Backspace')
        removeLetterFromBox()
    

    Catcher.style.left=`${catcherData.x}px`

});



