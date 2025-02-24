const form = document.getElementById("form");
const username = document.getElementById("username-input");
const email = document.getElementById("email-input");
const password = document.getElementById("password-input");
const repeat_password = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");
const enterButton = document.getElementById("enterbutton");
const rememberMe = document.getElementById("remember-me");

let found = false;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let errors = [];

    if(email){
        errors = getSignupFormErrors(username.value, email.value, password.value, repeat_password.value);
    }
    else {
        errors = getLoginFormErrors(username.value, password.value);
    }
    if(errors.length > 0) {
        error_message.innerText = errors.join(". ");
        return;
    };
});

function getSignupFormErrors(username, email, password, repeat_password){
    let errors = [];

    if(username === "" || username === null)
    {
        errors.push("Username is required");
    }
    else if(email === "" || email === null)
    {
        errors.push("Email is required");
    }
    else if(password === "" || password === null)
    {
        errors.push("Password is required");
    }
    else if(repeat_password === "" || repeat_password === null)
    {
        errors.push("Repeat password please");
    }
    else if(password.length < 8 || repeat_password.length < 8)
        {
            errors.push("Password must have at least 8 characters");
        }
    else if(password !== repeat_password){
        errors.push("Password does not match repeated password");
    };

    return errors;
};

function getLoginFormErrors(username, password){
    let errors = [];

    if(username === "" || username === null)
    {
        errors.push("Username is required");
    }
    else if(password === "" || password === null)
    {
        errors.push("Password is required");
    }
    else if(password.length < 8)
        {
            errors.push("Password must have at least 8 characters");
        }

    return errors;
};

const allInputs = [username, email, password, repeat_password].filter(input => input != null);

allInputs.forEach(input => {
    input.addEventListener("input", () => {
        if(input.classList.contains("incorrect")){
            error_message.innerText = "";
        };
    });
});

function storeSignupInformations(username, email, password) {
    const userData = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem(`user_${username}`, JSON.stringify(userData));
};

document.addEventListener("DOMContentLoaded", () => {
    rememberMe.checked = localStorage.getItem("remember-me") === "1";

    rememberMe.addEventListener("change", function () {
        localStorage.setItem("RememberMe", this.checked ? "1" : "0");
    });
});

enterButton.addEventListener("click", (e) => {
    let errors = [];

    if (email) {
        errors = getSignupFormErrors(username.value, email.value, password.value, repeat_password.value);
        if (errors.length === 0) {
            storeSignupInformations(username.value, email.value, password.value);
            localStorage.setItem("AccountIs", "true");
            window.location.replace("index.html");
            error_message.innerText = "";
            localStorage.setItem("username", username.value);
        }
    }

    errors = getLoginFormErrors(username.value, password.value);
    if (errors.length === 0 && !email) {
        const storedUsername = localStorage.getItem(`username_${username.value}`);
        const storedPassword = localStorage.getItem(`password_${username.value}`);

        for (let i = 0; i < localStorage.length; i++) {
            const storedUserData = JSON.parse(localStorage.getItem(`user_${username.value}`));
            if (storedUserData && storedUserData.password === password.value) {
                found = true;
                break;
            }
        }

        if (found) {
            if (rememberMe.checked) {
                localStorage.setItem("AccountIs", "true");
            } else {
                sessionStorage.setItem("AccountIs", "true");
            }

            window.location.replace("index.html");
            error_message.innerText = "";
        } else {
            error_message.innerText = "Your account does not exist or credentials are incorrect.";
        }
    }
    if (username.value === "admin123" && password.value === "admin123") {
        if (rememberMe.checked) {
            localStorage.setItem("AccountIs", "true");
        } 
        else {
            sessionStorage.setItem("AccountIs", "true");
        }
        window.location.replace("index.html");
        error_message.innerText = "";
    }
    else {
        error_message.innerText = "Your account does not exist or credentials are incorrect.";
    }
});