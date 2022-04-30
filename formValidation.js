$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("#registration").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        user: "required",
        fName: "required",
        email: {
          required: true,
          // Specify that email should be validated
          // by the built-in "email" rule
          email: true
        },
        psw: {
          required: true,
          pwcheck: true,
          minlength: 6
        }
      },
      // Specify validation error messages
      messages: {
        user: "Please enter your user name",
        fName: "Please enter your full name",
        psw: {
          required: "Please provide a password",
          pwcheck: "You must have one upper case letter, one lower case letter and one digit",
          minlength: "Your password must be at least 6 characters long"
        },
        email: "Please enter a valid email address"
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        form.submit();
      }
    });
    $.validator.addMethod("pwcheck", function(value) {
      return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(value)
    });
});