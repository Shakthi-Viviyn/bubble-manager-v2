function displayErrorMessage(error){
    document.getElementById("errorMessageContainer").style.display = "block";
    document.getElementById("errorMessage").innerHTML = error;
    setTimeout(() => {
        document.getElementById("errorMessageContainer").style.display = "none";
    }, 5000);
}

document.getElementById("signupBtn").addEventListener("click", () => {

    if (document.getElementById("username").value === ""){
        displayErrorMessage("Please enter a username.");
        return;
    }
    if (document.getElementById("password").value === ""){
        displayErrorMessage("Please enter a password.");
        return;
    }
    if (document.getElementById("password").value.length < 8){
        displayErrorMessage("Password must be at least 8 characters.");
        return;
    }
    if (document.getElementById("confirmPassword").value === ""){
        displayErrorMessage("Please retype your password.");
        return;
    }

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword){
        displayErrorMessage("Passwords do not match.");
        return;
    }

    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username: username, password: password})
    })
});