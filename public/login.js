function displayErrorMessage(error){
    document.getElementById("errorMessageContainer").style.display = "block";
    document.getElementById("errorMessage").innerHTML = error;
    setTimeout(() => {
        document.getElementById("errorMessageContainer").style.display = "none";
    }, 5000);
}

document.getElementById("loginBtn").addEventListener("click", () => {

    if (document.getElementById("username").value === ""){
        displayErrorMessage("Please enter a username.");
        return;
    }
    if (document.getElementById("password").value === ""){
        displayErrorMessage("Please enter a password.");
        return;
    }

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username: username, password: password})
    })
});