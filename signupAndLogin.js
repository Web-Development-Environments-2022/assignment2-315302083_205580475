function signup() {
    var username = document.getElementById("userSignup").value;
    var password = document.getElementById("pswSignup").value;
    var fullname = document.getElementById("fNameSignup").value;
    var email = document.getElementById("emailSignup").value;
    var birthDate = document.getElementById("birthdaySignup").value;
    var array = [password, fullname, email, birthDate];
    localStorage.setItem(username, JSON.stringify(array));
}

function login() {
    var usernameGiven = document.getElementById("userLogin").value;
    var passwordGiven = document.getElementById("pswLogin").value;
    var passwordToSearch = localStorage.getItem(usernameGiven);
    passwordToSearch = JSON.parse(passwordToSearch);
    alert(passwordToSearch);
    if (passwordToSearch === null) {
        alert("not");
    } else if (passwordToSearch[0] === passwordGiven) {
        alert("you in");
    } else {
        alert("something wrong");
    }
}