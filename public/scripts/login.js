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
    let res;
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username: username, password: password})
    }).then((response) => {
        res = response;
        return response.json();
    }).then((data) => {
        if (res.ok){
            document.getElementById("errorMessageContainer").style.display = "block";
            document.getElementById("errorMessageContainer").style.backgroundColor = "green";
            document.getElementById("errorMessageContainer").style.borderLeft = "5px solid darkgreen";
            document.getElementById("errorMessage").innerHTML = "Login successful";
            localStorage.setItem("token", data.token);
            setTimeout(() => {
                window.location.replace("/");
            }, 1500);
        }else{
            displayErrorMessage(data.error);
        }
    }).catch((error) => {
        console.log(error);
    })
});