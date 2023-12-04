window.addEventListener("load", function () {
    document.getElementById("logout").onclick = unSetLogin;

    if (localStorage.getItem("login") == "") {
        document.getElementById("logout").style.visibility = "hidden";
        document.getElementById("review").style.visibility = "hidden";
        document.getElementById("login").style.visibility = "flex";
        document.getElementById("signup").style.visibility = "flex";
    } else {
        document.getElementById("login").style.visibility = "hidden";
        document.getElementById("signup").style.visibility = "hidden";
        document.getElementById("logout").style.visibility = "flex";
        document.getElementById("review").style.visibility = "flex";
    }
});

function unSetLogin() {
    localStorage.setItem("login", "");
    window.location.href = "./index.html";
}
