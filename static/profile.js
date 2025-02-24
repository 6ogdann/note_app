const fileInput = document.getElementById("file-input");
const profilePicture = document.getElementById("profile-picture");
const changeProfilePicture = document.getElementById("change-picture");
const deleteProfilePicture = document.getElementById("delete-picture");
const deleteData = document.getElementById("delete-data");
const deleteProfile = document.getElementById("delete-profile");
const h1 = document.querySelector("h1");

const storedUser = localStorage.getItem("username");
const storedProfilePic = localStorage.getItem(`${storedUser}_profilePicture`);

if (storedProfilePic) {
    profilePicture.src = storedProfilePic;
    profilePicture.style.width = "100px";
    profilePicture.style.height = "100px";
}

let accountIs;

window.addEventListener("DOMContentLoaded", () => {
    const accountStatus = localStorage.getItem("AccountIs");

    if (accountStatus !== "true") {
        window.location.replace("login.html");
    }
});

if(storedUser) {
    h1.textContent = `Welcome, ${storedUser}!`;
};

fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            profilePicture.src = imageData;
            profilePicture.style.width = "100px";
            profilePicture.style.height = "100px";
            localStorage.setItem(`${storedUser}_profilePicture`, imageData);
        };
        reader.readAsDataURL(file);
    }
});

changeProfilePicture.addEventListener("click", () => {
    fileInput.click();
});

deleteProfilePicture.addEventListener("click", (e) => {
    e.preventDefault();
    profilePicture.src = "../static/default1.jpg";
    localStorage.removeItem(`${storedUser}_profilePicture`);
});

/*deleteData.addEventListener("click", () => {
    localStorage.clear();
});*/