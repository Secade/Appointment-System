var passwordChecker, inputChecker, showToast, newPassword, username;
var invalidChar = [".","}","{","&","\"",":","]","[","?",";"];
var checkPassword = /^[0-9a-zA-Z]+$/;

$(document).ready(() => {
    // Checks database to be able to reset a username, displays error if username doesn't exist
    $("#reset-username").focusout(() => {
        if(inputChecker) {
            $.ajax({
                type: "post",
                url: "/admin/validateUsername",
                data:  {
                    username: $("#reset-username").val().trim()
                },
                success: (value) => {
                    if(!value.message) {
                        $("#reset-username-field").addClass("error");
                        $('body').toast({
                            class: "error",
                            position: "top center",
                            message: "Username does not exist"
                        });
                    }
                }
            })
        }
    })

    $("input[type='text']").focusin(() => {
        inputChecker = false;
    })

    //Submits form and redirects page when the user logs in, displays error if username is invalid or if password is invalid
    $("#submit").click(() => { 
        $.ajax({
            type: "post",
            url: "/validateLogin",
            data: {
                username: $("#username").val().trim(),
                password: $("#password").val(),
                date: moment().toDate()
            },
            success: function(value) {
                if(value.message == 0) {
                    $("#username-input").addClass("error");
                    $("#password").val("");
                    if(!showToast) {
                        showToast = true;
                        $('body').toast({
                            class: "error",
                            position: "top center",
                            message: "Invalid username",
                            onHidden: () => {
                                showToast = false;
                            }
                        });
                    }
                } else if(value.message == 2) {
                    $("#username-input").addClass("error");
                    $("#password-input").addClass("error");
                    $("#password").val("");
                    if(!showToast) {
                        showToast = true;
                        $('body').toast({
                            class: "error",
                            position: "top center",
                            message: "Invalid password",
                            onHidden: () => {
                                showToast = false;
                            }
                        });
                    }
                } else if(value.message == 1) {
                    window.location.href="/login"
                }
            }
        })
    })
})

//Remove error on box when user attempts to input again
$(document).on("keydown", () => {
    $("#username-input").removeClass("error");
    $("#password-input").removeClass("error");
})

//submit proper form when enter key is pressed
$(document).on("keypress", (event) => {
    if(event.keyCode == 13) { //ENTER key is pressed
        if($("#forgot-modal")[0].className.includes("active")) {
            $("#reset-button").click();
        } else if($("#confirm-admin-modal")[0].className.includes("active")) {
            $("#reset-button-admin").click();
        } else {
            $("#submit").click();
        }
    }
    $("#reset-username-field").removeClass("error");
    $("#reset-password-field").removeClass("error");
    $("#reset-confirm-password-field").removeClass("error");
    $("#admin-input-field").removeClass("error");
})

$(document).on("keyup", () => {
    inputChecker = true;
})

//display forgot password form 
$("#forgot").click(() => {
    $("#forgot-modal").modal("show");
})

//initialize forgot password form 
$("#forgot-modal").modal({
    onShow: function() {
        $('#forgot-modal').form("clear");
        passwordChecker = true;
    }
})

//Error checking and submit when resetting the username and password
$("#reset-button").click(() => {
    var done = true;
    if($("#reset-username").val().trim() == "" || $("#reset-username").val().trim() == "admin") {
        $("#reset-username-field").addClass("error");
        if($("#reset-username").val().trim() == "admin") {
            $("#reset-username").val("");
            $('body').toast({
                class: "error",
                position: "top center",
                message: "Invalid access"
            });
        }
         else {
            $('body').toast({
                class: "error",
                position: "top center",
                message: "Please input a valid username"
            });
        }
        done = false;
    }
    if(!$("#reset-password").val().match(checkPassword) || !validateSpecialChar($("#reset-password").val())) {
        $("#reset-password-field").addClass("error");
        $("body").toast({
            class: "error",
            position: "top center",
            message: "Incorrect password format"
        })
        done = false;
    }
    if($("#reset-password").val().length < 10) {
        $("#reset-password-field").addClass("error");
        $("body").toast({
            class: "error",
            position: "top center",
            message: "Password is too short"
        })
        done = false;
    } 
    if($("#reset-password").val().length > 32) {
        $("#reset-password-field").addClass("error");
        $("body").toast({
            class: "error",
            position: "top center",
            message: "Password is too long"
        })
        done = false;
    }
    if($("#reset-password").val() == "" || $("#reset-confirm-password").val() == "") {
        if($("#reset-password").val() == "") {
            $("#reset-password-field").addClass("error");
        }
        if($("#reset-confirm-password").val() == "") {
            $("#reset-confirm-password-field").addClass("error");
        }
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Please input a valid password"
        });
        $("#reset-password").val("");
        $("#reset-confirm-password").val("");
        done = false;
    } else {
        if($("#reset-password").val() != $("#reset-confirm-password").val()) {
            $('body').toast({
                class: "error",
                position: "top center",
                message: "Passwords do not match"
            }); 
            $("#reset-password-field").addClass("error");
            $("#reset-confirm-password-field").addClass("error");
            $("#reset-password").val("");
            $("#reset-confirm-password").val("");
            done = false;
        }
    }

    $.ajax({
        type: "post",
        url: "/admin/validateUsername",
        data:  {
            username: $("#reset-username").val().trim()
        },
        success: (value) => {
            if(!value.message) {
                $("#reset-username-field").addClass("error");
                $('body').toast({
                    class: "error",
                    position: "top center",
                    message: "Username does not exist"
                });
            } else{
                if(done && passwordChecker) {
                    $("#forgot-modal").modal("deny");
                    username = $("#reset-username").val().trim();
                    newPassword = $("#reset-password").val();
                    $("#confirm-admin-modal").modal("show");
                } 
            }
        }
    })
})

//error checking and submit for resetting admin 
$("#reset-button-admin").click(() => {
    var done = true;
    if($("#admin-input").val() == "") {
        $("#admin-input-field").addClass("error");
        if(!showToast) {
            showToast = true;
            $('body').toast({
                class: "error",
                position: "top center",
                message: "Please input admin password",
                onHidden: () => {
                    showToast = false;
                }
            });
            done = false;
        }
    } else {
        $.ajax({
            type: "post",
            url: "admin/checkCurrentAdminPassword",
            data: {
                newPassword: $("#admin-input").val().trim()
            },
            success: (value) => {
                if(!value) {
                    if(!showToast) {
                        showToast = true;
                        $("#admin-input-field").addClass("error");
                        $('body').toast({
                            class: "error",
                            position: "top center",
                            message: "Incorrect admin password",
                            onHidden: () => {
                                showToast = false;
                            }
                        });   
                        done = false;
                    }
                } else {
                    if(done) {
                        resetPassword();
                    }
                }
            }
        })
    }
})

//function to reset Password for an account 
function resetPassword() {
    $.ajax({
        type: "post",
        url: "/admin/updateAccountPassword",
        data: {
            username: $("#reset-username").val().trim(),
            newPassword: $("#reset-password").val()
        },
        success: (value) => {
            if(value.message) {
                $("#confirm-admin-modal").modal("hide");
                $("#admin-input").val("");
                $('body').toast({
                    class: "success",
                    position: "top center",
                    message: "Password successfully reset"
                });
            } else {
                $('body').toast({
                    class: "error",
                    position: "top center",
                    message: "Username not found"
                });
                $("#reset-username-field").addClass("error");
                $("#reset-password").val("");
                $("#reset-confirm-password").val("");
            }
        }
    })
}

//initialize form 
function setup() {
    $("#form").form("clear");
    showToast = false;
}

// Validate special characters
function validateSpecialChar(password) {
    var temp = invalidChar.filter((value) => {
        return password.includes(value);
    })
    if(temp == "") {
        return true;
    }
    return false;
}
