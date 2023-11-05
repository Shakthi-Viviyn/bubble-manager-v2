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
    let accountData = {
        username: username,
        password: password
    }
    let res;
    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(accountData)
    }).then((response) => {
        res = response;
        return response.json();
    }).then((data) => {
        console.log(res);
        if (res.ok){
            document.getElementById("errorMessageContainer").style.display = "block";
            document.getElementById("errorMessageContainer").style.backgroundColor = "green";
            document.getElementById("errorMessageContainer").style.borderLeft = "5px solid darkgreen";
            document.getElementById("errorMessage").innerHTML = "Account created successfully";
            setTimeout(() => {
                window.location.replace("/login");
            }, 1500);
        }else{
            displayErrorMessage(data.error);
        }
    }).catch((error) => {
        displayErrorMessage("Please try again later")
    });
});