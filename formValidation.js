var userInside = "";

// validation for registraion
$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("#registration").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        userSignup: {
          required: true,
          userExist: true
        },
        fNameSignup: {
          required: true,
          fullcheck: true
        },
        emailSignup: {
          required: true,
          // Specify that email should be validated
          // by the built-in "email" rule
          email: true
        },
        pswSignup: {
          required: true,
          pwcheck: true,
          minlength: 6
        }
      },
      // Specify validation error messages
      messages: {
        userSignup: {
          required: "Please enter your user name",
          userExist: "User name is already taken"
        },
        fNameSignup: {
          required: "Please enter your full name",
          fullcheck: "Full name can't contain number"
        },
        pswSignup: {
          required: "Please provide a password",
          pwcheck: "You must have one upper case letter, one lower case letter and one digit",
          minlength: "Your password must be at least 6 characters long"
        },
        emailSignup: "Please enter a valid email address"
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        var username = document.getElementById("userSignup").value;
        var password = document.getElementById("pswSignup").value;
        var fullname = document.getElementById("fNameSignup").value;
        var email = document.getElementById("emailSignup").value;
        var birthDate = document.getElementById("birthdaySignup").value;
        var array = [password, fullname, email, birthDate];
        localStorage.setItem(username, JSON.stringify(array));
        alert("You've successfully registered!");
        toggleDiv(document.getElementById('login').id);
      }
    });
    $.validator.addMethod("pwcheck", function(value) {
      return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(value)
    });
    $.validator.addMethod("fullcheck", function(value) {
      if (/\d/.test(value)) {
        return false;
      }
      return true;
    });
    $.validator.addMethod("userExist", function(value) {
      var userExist = localStorage.getItem(value);
      if (userExist === null) {
        return true;
      }
      return false;
    });
});

// validation for login
$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("#connection").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      userLogin: "required",
      pswLogin: "required"
    },
    // Specify validation error messages
    messages: {
      userLogin: "Please enter your user name",
      pswLogin: "Please provide a password"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      var usernameGiven = document.getElementById("userLogin").value;
      var passwordGiven = document.getElementById("pswLogin").value;
      var passwordToSearch = localStorage.getItem(usernameGiven);
      passwordToSearch = JSON.parse(passwordToSearch);
      if (passwordToSearch === null) {
          alert("User dosen't exist!");
          toggleDiv(document.getElementById('login').id);
      } else if (passwordToSearch[0] === passwordGiven) {
          userInside = usernameGiven;
          alert("You've logged in successfully!");
          toggleDiv(document.getElementById('settings').id);
      } else {
          alert("Incorrect password!");
          toggleDiv(document.getElementById('login').id);
      }
    }
  });
});