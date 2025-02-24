const blueColor = document.getElementById("blue");
const greenColor = document.getElementById("green");
const redColor = document.getElementById("red");
const blackgrayColor = document.getElementById("black-gray");
const yellowColor = document.getElementById("yellow");
const purpleColor = document.getElementById("purple");
let headerColor;
let bckgroundColor;
let changeActivated = false;

const disableTasks = document.getElementById("disable-tasks");
const disableBooks = document.getElementById("disable-books");

const easterEggButton = document.getElementById("easter-egg");
const easterEgg = document.getElementById("easterEgg");
const easterEgg1 = document.getElementById("easterEgg1");
const easterEgg2 = document.getElementById("easterEgg2");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const submitAnswer1 = document.getElementById("answer1");
const submitAnswer2 = document.getElementById("answer2");

let accountIs;

window.addEventListener("DOMContentLoaded", () => {
    const accountStatus = localStorage.getItem("AccountIs");

    if (accountStatus !== "true") {
        window.location.replace("login.html");
    }
});

blueColor.addEventListener("click", () =>{
    changeActivated = true;
    headerColor = "rgba(1, 150, 250, 0.9)";
    bckgroundColor = "rgba(1, 150, 250, 0.7)";
    localStorage.setItem("changeActivate", String(changeActivated));
    localStorage.setItem("hdrColor", headerColor);
    localStorage.setItem("bgColor", bckgroundColor);
});

greenColor.addEventListener("click", () =>{
    changeActivated = true;
    headerColor = "rgba(0, 255, 0, 0.9)";
    bckgroundColor = "rgba(0, 255, 0, 0.65)";
    localStorage.setItem("changeActivate", String(changeActivated));
    localStorage.setItem("hdrColor", headerColor);
    localStorage.setItem("bgColor", bckgroundColor);
});

redColor.addEventListener("click", () =>{
    changeActivated = true;
    headerColor = "rgba(250, 1, 1, 0.9)";
    bckgroundColor = "rgba(250, 1, 1, 0.7)";
    localStorage.setItem("changeActivate", String(changeActivated));
    localStorage.setItem("hdrColor", headerColor);
    localStorage.setItem("bgColor", bckgroundColor);
});

blackgrayColor.addEventListener("click", () =>{
    changeActivated = true;
    headerColor = "rgba(13, 13, 13, 0.9)";
    bckgroundColor = "rgba(112, 128, 144, 0.7)";
    localStorage.setItem("changeActivate", String(changeActivated));
    localStorage.setItem("hdrColor", headerColor);
    localStorage.setItem("bgColor", bckgroundColor);
});

yellowColor.addEventListener("click", () =>{
    changeActivated = true;
    headerColor = "rgba(255, 215, 0, 0.9)";
    bckgroundColor = "rgba(255, 215 ,0, 0.7)";
    localStorage.setItem("changeActivate", String(changeActivated));
    localStorage.setItem("hdrColor", headerColor);
    localStorage.setItem("bgColor", bckgroundColor);
});

purpleColor.addEventListener("click", () =>{
    changeActivated = true;
    headerColor = "rgba(250, 1, 250, 0.9)";
    bckgroundColor = "rgba(250, 1, 250, 0.65)";
    localStorage.setItem("changeActivate", String(changeActivated));
    localStorage.setItem("hdrColor", headerColor);
    localStorage.setItem("bgColor", bckgroundColor);
});

easterEggButton.addEventListener("click", () => {
    easterEgg.showModal();
});

cancelBtn.addEventListener("click", () => {
    easterEgg.close();
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(submitAnswer1.value === "ladna" && submitAnswer2.value === "srednja"){
        localStorage.setItem("Egg", "1");
        easterEgg.close();
        easterEgg1.showModal();
    }
    else {
        easterEgg2.showModal();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    disableTasks.checked = localStorage.getItem("disableTasksOn") === "1";
    disableBooks.checked = localStorage.getItem("disableBooksOn") === "1";

    disableTasks.addEventListener("change", function () {
        localStorage.setItem("disableTasksOn", this.checked ? "1" : "0");
    });

    disableBooks.addEventListener("change", function () {
        localStorage.setItem("disableBooksOn", this.checked ? "1" : "0");
    });
});