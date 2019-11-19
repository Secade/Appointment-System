var accountID, procedureID, accountUsername;
var defaultButton, currTab, userType, days = [], passwordChecker, accor_show;;
var editSchedule, editBreaktime, editDay;

$(document).ready(() => {
    // switch page between users, dentist, and procedure
    $(".ui .item").on("click", switchPage);

    // validation if username exist
    $("#add-username-user").focusout(() => {
        $.ajax({
            type: "post",
            url: "/admin/validateUsername",
            data:  {
                username: $("#add-username-user").val()
            },
            success: (value) => {
                if(value.message) {
                    $("#username-field-user").addClass("error");
                    $('body').toast({
                        class: "error",
                        position: "top center",
                        message: "Username already taken"
                    });
                }
            }
        })
    })
    $("#add-username-dentist").focusout(() => {
        $.ajax({
            type: "post",
            url: "/admin/validateUsername",
            data:  {
                username: $("#add-username-dentist").val()
            },
            success: (value) => {
                if(value.message) {
                    $("#username-field-dentist").addClass("error");
                    $('body').toast({
                        class: "error",
                        position: "top center",
                        message: "Username already taken"
                    });
                }
            }
        })
    })
    // validate password format
    $("#new-password").focusout(() => {
        var check = /^[0-9a-zA-Z]+$/;
        if(!$("#new-password").val().match(check)) {
            $("#new-password-field").addClass("error");
            $("body").toast({
                class: "error",
                position: "top center",
                message: "Incorrect password format"
            })
            passwordChecker = false;
        } else if($("#new-password").val().length < 10) {
            $("#new-password-field").addClass("error");
            $("body").toast({
                class: "error",
                position: "top center",
                message: "Password is too short"
            })
            passwordChecker = false;
        } else if($("#new-password").val().length > 32) {
            $("#new-password-field").addClass("error");
            $("body").toast({
                class: "error",
                position: "top center",
                message: "Password is too long"
            })
            passwordChecker = false;
        } else {
            passwordChecker = true;
        }
    })
    $("#add-password-user").focusout(() => {
        var check = /^[0-9a-zA-Z]+$/;
        if(!$("#add-password-user").val().match(check)) {
            $("#password-field-user").addClass("error");
            $("body").toast({
                class: "error",
                position: "top center",
                message: "Incorrect password format"
            })
            passwordChecker = false;
        } else if($("#add-password-user").val().length < 10) {
            $("#password-field-user").addClass("error");
            $("body").toast({
                class: "error",
                position: "top center",
                message: "Password is too short"
            })
            passwordChecker = false;
        } else if($("#add-password-user").val().length > 32) {
            $("#password-field-user").addClass("error");
            $("body").toast({
                class: "error",
                position: "top center",
                message: "Password is too long"
            })
            passwordChecker = false;
        } else {
            passwordChecker = true;
        }
    })
    $("#add-password-dentist").focusout(() => {
        var check = /^[0-9a-zA-Z]+$/;
        if(!$("#add-password-dentist").val().match(check)) {
            $("#password-field-dentist").addClass("error");
            $("body").toast({
                class: "error",
                position: "top center",
                message: "Incorrect password format"
            })
            passwordChecker = false;
        } else if($("#add-password-dentist").val().length < 8) {
            $("#password-field-dentist").addClass("error");
            $("body").toast({
                class: "error",
                position: "top center",
                message: "Password is too short"
            })
            passwordChecker = false;
        } else if($("#add-password-dentist").val().length > 32) {
            $("#password-field-dentist").addClass("error");
            $("body").toast({
                class: "error",
                position: "top center",
                message: "Password is too long"
            })
            passwordChecker = false;
        } else {
            passwordChecker = true;
        }
    })

    // Switch between weekly and unavailable
    $("#weekly").click(() => {
        $("#weekly").addClass("green");
        $("#unavailable").removeClass("green");
        $('#table-dimmer').addClass("active");
        $.ajax({
            type: 'post',
            url: 'admin/getSchedule',
            data: {
                doctorID: $("#schedule-modal").data("id")
            },
            success: (value) => {
                $('#table-dimmer').removeClass("active");
                let table = Handlebars.compile(value.htmlData);
                $("#table-schedule").html(table(value.data));
                $("#schedule-table").addClass("celled");
                if(value.data.sched == "") {
                    $("#table-detail").text("No available schedules yet");
                } else {
                    $("#table-detail").text("");
                }
                if(!$("#schedule-modal")[0].className.includes("active")) {
                    $("#schedule-modal").modal("show");
                }
            }
        })
    })
    $("#unavailable").click(() => {
        $("#weekly").removeClass("green");
        $("#unavailable").addClass("green");
        $('#table-dimmer').addClass("active");
        $.ajax({
            type: 'post',
            url: 'admin/getUnavailableDates',
            data: {
                doctorID: $("#schedule-modal").data("id")
            },
            success: (value) => {
                $('#table-dimmer').removeClass("active");
                let table = Handlebars.compile(value.htmlData);
                $("#table-schedule").html(table(value.data));
                $("#schedule-table").removeClass("celled");
                if(value.data.sched == "") {
                    $("#table-detail").text("No unavailable dates yet");
                } else {
                    $("#table-detail").text("");
                }
                if(!$("#schedule-modal")[0].className.includes("active")) {
                    $("#schedule-modal").modal("show");
                }
            }
        })
    })

    // EDITING DENTIST SCHEDULE
    $("#table-schedule").on("click", (event) => {
        var temp = event.target;
        if(temp.id == "delete-unavailable-button") {
            $("#modal-text-delete-unavailable").text($(temp).data("time"));
            $("#confirmation-modal").data("id", $(temp).data("id"));
            $("#confirmation-modal").modal("show");
        } else {
            editDay = $($(event.target)[0].parentNode).data("day").toLowerCase();
            $("#editing-schedule-modal").data("id", $("#schedule-modal").data("id"));
            $("#editing-schedule-modal").data("firstname", $("#schedule-modal").data("firstname"));
            $("#editing-schedule-modal").data("lastname", $("#schedule-modal").data("lastname"));
            $("#editing-schedule-modal").modal("show");    
            $('.dimmer').addClass("active");
            $.ajax({
                type: "post",
                url: "admin/getDoctorSchedule",
                data: {
                    doctorID: $("#editing-schedule-modal").data("id")
                },
                success: (value) => {
                    $('.dimmer').removeClass("active");
                    editSchedule = value.docSched;
                    editBreaktime = value.breakTime;
                    var normal = value.docSched[editDay];
                    var breaktime = value.breakTime[editDay];
                    if(normal != "") {
                        $("#edit-start").val(normal[0]);
                        $("#edit-end").val(normal[1]);
                    } 
                    if(breaktime != "") {   
                        $("#edit-custom")[0]["checked"] = true;
                        $("#edit-start").val(normal[0]);
                        $("#edit-end").val(breaktime[0]);
                        $("#edit-start-add").val(breaktime[1]);
                        $("#edit-end-add").val(normal[1]);
                        accor_show = true;
                        $("#edit-first-schedule").css({'color':'black'})
                        $("#edit-custom-schedule").slideToggle(500);
                    } 
                }
            })
        }
    })

    // switch selected day in adding/editing dentist schedule
    $(".ui .button").on('click', (event) => {
        var temp = $(event.target)[0];
        if(temp.className.includes("active")) {
            $(temp).removeClass("active");
            days = days.filter((value) => {
                return value != temp.name;
            })
        } else {
            $(temp).addClass("active");
            days.push(temp.name);
        }
    })

    // slide down accordion in add schedule
    $(".ui .checkbox").on('change', (event) => {
        var id = $(event.target)[0].id;
        if(id == "daily") {
            if($(event.target)[0].checked && !$("#repeat")[0].checked) {
                $("#repeat-field").addClass("disabled");
                $("#repeat").attr("disabled", "disabled");
            } else {
                $("#repeat-field").removeClass("disabled");
                $("#repeat").removeAttr("disabled");
            }
        } else {
            if(id == "custom") {
                accor_show = !accor_show;
                if(accor_show) {
                    $("#first-schedule").css({'color': 'black'});
                } 
                $("#" + id + "-schedule").slideToggle(500, () => {
                    if(!accor_show) {
                        $("#first-schedule").css({'color': 'white'});
                    }
                });
            } else if(id == "repeat") {
                $("body").find("#" + id + "-content").slideToggle(500);
                if($(event.target)[0].checked && !$("#daily")[0].checked) {
                    $("#daily-field").addClass("disabled");
                    $("#daily").attr("disabled","disabled");
                } else {
                    $("#daily-field").removeClass("disabled");
                    $("#daily").removeAttr("disabled");
                }
            }
        }
        if($("#editing-schedule-modal")[0].className.includes("active")) {
            accor_show = !accor_show;
            if(accor_show) {
                $("#edit-first-schedule").css({'color':'black'});
            } 
            $("#edit-custom-schedule").slideToggle(500, () => {
                if(!accor_show) {
                    $("#edit-first-schedule").css({'color':'white'});
                }
            });
        }
        $("#daily-field").removeClass("error");
        $("#report-field").removeClass("error");
    });

    // function to access the loaded table
    $('#table').on("click", (event) => {
        var temp = event.target;
        if($(temp).text().trim() != "" && temp.id != "filter-dropdown") {
            if(currTab == "Users") {    // accessing elements in users tab
                if($(temp).text() == "Delete") {
                    $("#delete-user-modal").modal("show");
                    $("#modal-text-delete-user").text($(event.target).data("username"));

                    // setting temporary value
                    accountID = $(temp).data("id");
                    accountUsername = $(temp).data("username");
                } else if($(event.target).text() == "Edit") {
                    // setting temporary value
                    accountID = $(temp).data("id");
                    accountUsername = $(temp).data("username");
                    $('.dimmer').addClass("active");
                    // getting the user object to be edited
                    $.ajax({
                        type: "post",
                        url: "admin/getUser",
                        data: {
                            username: accountUsername
                        },
                        success: (value) => {
                            $('.dimmer').removeClass("active");
                            let user = value.user;
                            let doctor = value.doctor;
                            if(user.accountType == "dentist") {
                                $("#edit-dentist-modal").modal("show");
                                $("#edit-firstname-dentist").val(doctor.firstname);
                                $("#edit-lastname-dentist").val(doctor.lastname);
                                $("#edit-username-dentist").text(user.username);
                            } else {
                                $("#edit-user-modal").modal("show");
                                $("#edit-username-user").text(user.username);
                            }
                        }
                    })
                }
            } else if(currTab == "Dentist") {   // accessing elements in dentist tab
                if($(temp).text() == "Add") {
                    $("#adding-schedule-modal").data("id", $(temp).data("id"));
                    $("#adding-schedule-modal").data("firstname", $(temp).data("firstname"));
                    $("#adding-schedule-modal").data("lastname", $(temp).data("lastname"));
                    $("#adding-schedule-modal").modal("show");    
                    $("#doctor-name").text("Dr. " + $(temp).data("firstname") + " " + $(temp).data("lastname"));
                } else if($(temp).text() == "View") {
                    $("#schedule-modal").data("id", $(temp).data("id"));
                    $("#schedule-modal").data("firstname", $(temp).data("firstname"));
                    $("#schedule-modal").data("lastname", $(temp).data("lastname"));
                    $("#doctor-name-schedule").text("Dr. " + $("#schedule-modal").data("firstname") + " " + $("#schedule-modal").data("lastname"));
                    setDataTable("weekly");
                }
            } else if(currTab == "Procedure") { // accessing elements in procedure tab
                if($(temp).text() == "Delete") {
                    $("#delete-procedure-modal").modal("show");
                    $("#modal-text-delete-procedure").text($(temp).data("name"));
                } else if($(temp).text() == "Edit") {
                    $("#edit-procedure-modal").modal("show");
                    $("#old-procedure-name").text($(temp).data("name"));
                }
                
                // setting temporary value
                procedureID = $(temp).data("id");
            }
        } 
    })
})

// RESETING ADMIN PASSWORD
$("#save-password").click(() => {
    var done = true;

    // ERROR CHECKING
    if($("#current-password").val() == "") {
        $("#current-password-field").addClass("error");
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Please input your current password"
        });
        done = false;
    } else {
        if($("#current-password").val() != $("#current-password").data("password")) {
            $("#current-password-field").addClass("error");
            $('body').toast({
                class: "error",
                position: "top center",
                message: "Incorrect current password"
            });
            done = false;
        }   
    }
    if($("#new-password").val() == "" || $("#confirm-new-password").val() == "") {
        if($("#new-password").val() == "") {
            $("#new-password-field").addClass("error");
        }
        if($("#confirm-new-password").val() == "") {
            $("#confirm-new-password-field").addClass("error");
        }
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Please input your new password"
        });
        done = false;
    } else {
        if($("#new-password").val() != $("#confirm-new-password").val()) {
            $("#new-password-field").addClass("error");
            $("#confirm-new-password-field").addClass("error");
            $("#new-password").val("");
            $("#confirm-new-password").val("");
            $('body').toast({
                class: "error",
                position: "top center",
                message: "Password do not match"
            });
            done = false;
        }
    }
    $('.dimmer').addClass("active");
    if(done && passwordChecker) {
        $.ajax({
            type: "post",
            url: "/admin/updateAccountPassword",
            data: {
                username: "admin",
                newPassword: $("#new-password").val()
            },
            success: (value) => {
                $('.dimmer').removeClass("active");
                $("#setting-modal").modal("hide");
                $("#setting-modal").form("clear");
                $('body').toast({
                    class: "success",
                    position: "top center",
                    message: "Password successfully reset"
                });
            }
        })
    } else {
        $("#new-password-field").addClass("error");
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Incorrect password format"
        });
    }
})

// ADDING SECRETARY/USER
$("#create-user-button").click(() => {
    var done = true;

    // ERROR CHECKING
    if($("#add-username-user").val() == "") {
        $("#username-field-user").addClass("error");
        $('body').toast({ 
            class: "error",
            position: "top center",
            message: "Please input a valid username"
        });
        done = false;
    }
    if($("#add-password-user").val() == "" || $("#confirm-password-user").val() == "") {
        if($("#add-password-user").val() == "") {
            $("#password-field-user").addClass("error");
        }
        if($("#confirm-password-user").val() == "") {
            $("#confirm-password-field-user").addClass("error");
        }
        $('body').toast({ 
            class: "error",
            position: "top center",
            message: "Please input a valid password"
        });
        done = false;
    } else {
        if($("#add-password-user").val() != $("#confirm-password-user").val()) {
            $("#password-field-user").addClass("error");
            $("#confirm-password-field-user").addClass("error");
            $("#add-password-user").val("");
            $("#confirm-password-user").val("");
            $('body').toast({ 
                class: "error",
                position: "center",
                message: "Password do not match"
            });
            done = false;
        }
    }

    if(done && passwordChecker) {
        $('.dimmer').addClass("active");
        $.ajax({
            type: "post",
            url: "/admin/addAccount",
            data: {
                username: $("#add-username-user").val(),
                password: $("#add-password-user").val(),
                type: "secretary",
                doctorID: ""
            },
            success: (value) => {
                $('.dimmer').removeClass("active");
                if(value.message) {
                    $("#add-user-modal").modal("hide");
                    $('#add-user-modal').form("clear");
                    if(currTab == "Users") {
                        $.get("/admin/adminUsers", (data) => {
                            $("#table").DataTable().destroy();
                            updateTable(data);
                        });
                    } else if(currTab == "Dentist") {
                        $.get("/admin/adminDentist", (data) => {
                            $("#table").DataTable().destroy();
                            updateTable(data);
                        });
                    }
                    $('body').toast({
                        class: "success",
                        position: "top center",
                        message: "New secretary successfully added"
                    });
                } else {
                    $("#username-field-user").addClass("error");
                    $('body').toast({
                        class: "error",
                        position: "top center",
                        message: "Username already taken"
                    });
                }
            }
        })
    } else {
        $("#password-field-user").addClass("error");
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Incorrect password format"
        });
    }
})

// ADDING DENTIST
$("#create-dentist-button").click(() => {
    var done = true;

    // ERROR CHECKING
    if($("#add-firstname-dentist").val() == "" || $("#add-lastname-dentist").val() == "") {
        if($("#add-firstname-dentist").val() == "") {
            $("#firstname-field-dentist").addClass("error");
        }
        if($("#add-lastname-dentist").val() == "") {
            $("#lastname-field-dentist").addClass("error");
        }
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Please input a valid name"
        });
        done = false;
    }
    if($("#add-username-dentist").val() == "") {
        $("#username-field-dentist").addClass("error");
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Please input a valid username"
        });
        done = false;
    }
    if($("#add-password-dentist").val() == "" || $("#confirm-password-dentist").val() == "") {
        if($("#add-password-dentist").val() == "") {
            $("#password-field-dentist").addClass("error");
        }
        if($("#confirm-password-dentist").val() == "") {
            $("#confirm-password-field-dentist").addClass("error");
        }
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Please input a valid password"
        });
        done = false;
    } else {
        if($("#add-password-dentist").val() != $("#confirm-password-dentist").val()) {
            $("#password-field-dentist").addClass("error");
            $("#confirm-password-field-dentist").addClass("error");
            $("#add-password-dentist").val("");
            $("#confirm-password-dentist").val("");
            $('body').toast({ 
                class: "error",
                position: "top center",
                message: "Password do not match"
            });
            done = false;
        }
    }

    if(done && passwordChecker) {
        $('.dimmer').addClass("active");
        $.ajax({
            type: "post",
            url: "/admin/addDentist",
            data: {
                firstname: $("#add-firstname-dentist").val(), 
                lastname: $("#add-lastname-dentist").val(), 
                username: $("#add-username-dentist").val(),
                password: $("#add-password-dentist").val(),
                type: "dentist",
                status: "Available"
            },
            success: (value) => {
                $('.dimmer').removeClass("active");
                if(value.message) {
                    $("#add-dentist-modal").modal("hide");
                    $('#add-dentist-modal').form("clear");
                    if(currTab == "Dentist") {
                        $.get("/admin/adminDentist", (data) => {
                            $("#table").DataTable().destroy();
                            updateTable(data);
                        });
                    } else if(currTab == "Users") {
                        $.get("/admin/adminUsers", (data) => {
                            $("#table").DataTable().destroy();
                            updateTable(data);
                        });
                    }
                    $('body').toast({
                        class: "success",
                        position: "top center",
                        message: "New dentist successfully added"
                    });
                    $("#adding-schedule-modal").data("id", value.doctor._id);
                    $("#adding-schedule-modal").data("firstname", value.doctor.firstname);
                    $("#adding-schedule-modal").data("lastname", value.doctor.lastname);
                    $("#doctor-name").text("Dr. " + value.doctor.firstname + " " + value.doctor.lastname);
                    $("#adding-schedule-modal").modal("show");
                } else {
                    $("#username-field-dentist").addClass("error");
                    $('body').toast({
                        class: "error",
                        position: "top center",
                        message: "Username already taken"
                    });
                }
            }
        })
    } else {
        $("#password-field-dentist").addClass("error");
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Incorrect password format"
        });
    }
})

// ADDING PROCEDURE
$("#create-procedure-button").click(() => {
    var done = true;

    // ERROR CHECKING
    if($("#procedure-name").val() == "") {
        $("#procedure-field").addClass("error");
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Please input a valid procedure name"
        });
        done = false;
    }

    if(done) {
        $('.dimmer').addClass("active");
        $.ajax({
            type: "post",
            url: "/admin/addProcess",
            data: {
                name: $("#procedure-name").val()
            },
            success: (value) => {
                $('.dimmer').removeClass("active");
                if(value.message) {
                    $("#procedure-modal").modal("hide");
                    $('#procedure-modal').form("clear");
                    if(currTab == "Procedure") {
                        $.get("/admin/adminProcedure", (data) => {
                            $("#table").DataTable().destroy();
                            updateTable(data); 
                        });
                    }
                    $('body').toast({
                        class: "success",
                        position: "top center",
                        message: "New procedure successfully added"
                    });
                } else {
                    $("#procedure-field").addClass("error");
                    $('body').toast({
                        class: "error",
                        position: "top center",
                        message: "Procedure already exist"
                    });
                }
            }
        })
    }
})

// EDITING SECRETARY/USER
$("#edit-user-button").click(() => {
    var done = true;

    // ERROR CHECKING
    if($("#edit-password-user").val() == "" || $("#edit-confirm-password-user").val() == "") {
        if($("#edit-password-user").val() == "") {
            $("#edit-password-field-user").addClass("error");
        }
        if($("#edit-confirm-password-user").val() == "") {
            $("#edit-confirm-password-field-user").addClass("error");
        }   
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Please input a valid password"
        })
        done = false;
    } else {
        if($("#edit-password-user").val() != $("#edit-confirm-password-user").val()) {
            $("#edit-password-field-user").addClass("error");
            $("#edit-confirm-password-field-user").addClass("error");
            $("#edit-password-user").val("");
            $("#edit-confirm-password-user").val("");
            $('body').toast({
                class: "error",
                position: "top center",
                message: "Password do not match"
            })
            done = false;
        }
    }
    if(done) {
        $('.dimmer').addClass("active");
        $.ajax({
            type: "post",
            url: "/admin/editAccount",
            data: {
                accountID,
                accountUsername,
                accountPassword: $("#edit-password-user").val()
            },
            success: (value) => {
                $('.dimmer').removeClass("active");
                $("#edit-user-modal").modal("hide");
                $("#edit-user-modal").form("clear");
                $('body').toast({
                    class: "success",
                    position: "top center",
                    message: "Secretary details successfully edited"
                })
            }
        })
    }
})

// EDITING DENTIST
$("#edit-dentist-button").click(() => {
   var done = true;

    // ERROR CHECKING
    if($("#edit-firstname-dentist").val() == "" || $("#edit-lastname-dentist").val() == "") {
        if($("#edit-firstname-dentist").val() == "") {
            $("#edit-firstname-field-dentist").addClass("error");
        }
        if($("#edit-lastname-dentist").val() == "") {
            $("#edit-lastname-field-dentist").addClass("error");
        }
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Please input a valid name"
        });
        done = false;
    }
    if($("#edit-password-dentist").val() == "" || $("#edit-confirm-password-dentist").val() == "") {
        if($("#edit-password-dentist").val() == "") {
            $("#edit-password-field-dentist").addClass("error");
        }
        if($("#edit-confirm-password-dentist").val() == "") {
            $("#edit-confirm-password-field-dentist").addClass("error");
        }
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Please input a valid password"
        });
        done = false;
    } else {
        if($("#edit-password-dentist").val() != $("#edit-confirm-password-dentist").val()) {
            $("#edit-password-field-dentist").addClass("error");
            $("#edit-confirm-password-field-dentist").addClass("error");
            $("#edit-password-dentist").val("");
            $("#edit-confirm-password-dentist").val("");
            $('body').toast({ 
                class: "error",
                position: "top center",
                message: "Password do not match"
            });
            done = false;
        }
    }

    if(done) {
        $('.dimmer').addClass("active");
        $.ajax({
            type: "post",
            url: "admin/editDentist",
            data: {
                accountID,
                firstname: $("#edit-firstname-dentist").val(),
                lastname: $("#edit-lastname-dentist").val(),
                password: $("#edit-password-dentist").val()
            },
            success: (value) => {
                $('.dimmer').removeClass("active");
                $("#edit-dentist-modal").modal("hide");
                $("#edit-dentist-modal").form("clear");
                $('body').toast({
                    class: "success",
                    position: "top center",
                    message: "Dentist detail successfully edited"
                })
            }
        })
    }
})

// EDITING PROCEDURE
$("#edit-procedure-button").click(() => {
    var done = true;

    // ERROR CHECKING
    if($("#edit-procedure-name") == "") {
        $("#edit-procedure-field").addClass("error");
        $('body').toast({
            class: "error",
            position: "top center",
            message: "Please input a valid procedure name"
        });
        done = false;
    }

    if(done) {
        $('.dimmer').addClass("active");
        $.ajax({
            type: "post",
            url: "/admin/editProcess",
            data: {
                procedureID,
                name: $("#edit-procedure-name").val()
            },
            success: (value) => {
                $('.dimmer').removeClass("active");
                if(value.message) {
                    $("#edit-procedure-modal").modal("hide");
                    $("#edit-procedure-modal").form("clear");
                    $.get("/admin/adminProcedure", (data) => {
                        $("#table").DataTable().destroy();
                        updateTable(data);
                        $('body').toast({
                            class: "success",
                            position: "top center",
                            message: "Procedure successfully edited"
                        });
                    });
                } else {
                    $("#edit-procedure-field").addClass("error");
                    $('body').toast({
                        class: "error",
                        position: "top center",
                        message: "Procedure already exist"
                    });
                }
            }
        })
    }
})

// DELETING USER
$("#delete-user-button").click(() => {
    $('.dimmer').addClass("active");
    $.ajax({
        type: "post",
        url: "/admin/deleteAccount",
        data: {
            accountID: accountID,
            accountUsername: accountUsername
        },
        success: (value) => {
            $('.dimmer').removeClass("active");
            $("#delete-user-modal").modal("hide");
            $.get("/admin/adminUsers", (data) => {
                $("#table").DataTable().destroy();
                updateTable(data);
                $('body').toast({
                    class: "success",
                    position: "top center",
                    message: "User successfully deleted"
                });
            });
        }
    })
})

// DELETING PROCEDURE
$("#delete-procedure-button").click(() => {
    $('.dimmer').addClass("active");
    $.ajax({
        type: "post",
        url: "/admin/deleteProcess",
        data: {
            processID: procedureID
        },
        success: (value) => {
            $('.dimmer').removeClass("active");
            $("#delete-procedure-modal").modal("hide");
            $.get("/admin/adminProcedure", (data) => {
                $("#table").DataTable().destroy();
                updateTable(data);
                $('body').toast({
                    class: "success",
                    position: "top center",
                    message: "Procedure successfully deleted"
                });
            });
        }
    })
})

// ADDING UNAVAILABLE DATE
$("#add-unavailable-button").click(() => {
    var start = $("#start-date-input").val();
    var end = $("#end-date-input").val();
    var done = true;
    
    // ERROR CHECKING
    if(start == "" || end == "")  {
        if(start == "") {
            $("#start-date").addClass("error");
        }
        if(end == "") {
            $("#end-date").addClass("error");
        }
        $("body").toast({
            class: "error",
            position: "top center",
            message: "Please input a valid date"
        })
        done = false;
    }

    if(done) {
        $('.dimmer').addClass("active");
        $.ajax({
            type: "post",
            url: "admin/addUnavailableDates",
            data: {
                doctorID: $("#add-unavailable-modal").data("id"),
                startdate: start,
                enddate: end
            },
            success: (value) => {
                $('.dimmer').removeClass("active");
                $("body").toast({
                    class: "success",
                    position: "top center",
                    message: "Dentist unavailable date successfully added"
                })
                $("#add-unavailable-modal").modal("hide");
            }
        })
    }
})

// DELETING UNAVAILABLE DATES
$("#remove-unavailable-button").click(() => {
    $.ajax({
        type: "post",
        url: "admin/deleteUnavailableDates",
        data: {
            unavailableDateID: $("#confirmation-modal").data("id")
        },
        success: (value) => {
            if(value) {
                $("#confirmation-modal").modal("hide");
                $('body').toast({
                    class: "success",
                    position: "top center",
                    message: "Unavailable date successfully deleted"
                })
            }
        }
    })
})

// ADDING DENTIST SCHEDULE
$("#add-schedule-button").click(() => {
    
    // ERROR CHECKING
    var done = true;
    if(!$("#daily")[0].checked && !$("#repeat")[0].checked) {
        $("#daily-field").addClass("error");
        $("#report-field").addClass("error");
        $("body").toast({
            class: "error",
            position: "top center",
            message: "Please choose an occurence"
        });
        done = false;
    } 
    if($("#start").val() == "" || $("#end").val() == "") {
        if($("#start").val() == "") {
            $("#start-field").addClass("error");
        }
        if($("#end").val() == "") {
            $("#end-field").addClass("error");
        }
        $("body").toast({
            class: "error",
            position: "top center",
            message: "Please input a valid time"
        })
        done = false;
    }
    if($("#custom")[0].checked && ($("#start-add").val() == "" || $("#end-add").val() == "") && done) {
        if($("#start-add").val() == "") {
            $("#start-add-field").addClass("error");
        }
        if($("#end-add").val() == "") {
            $("#end-add-field").addClass("error");   
        }
        $("body").toast({
            class: "error",
            position: "top center",
            message: "Please input a valid time"
        })
        done = false;
    }
    if($("#repeat")[0].checked && days[0] == undefined) {
        $("body").toast({
            class: "error",
            position: "top center",
            message: "Please choose a specific day of reoccurence"
        })
        done = false;
    }

    if(done) {
        $('.dimmer').addClass("active");
        // checking if a doctor has a schedule or not
        $.ajax({
            type: "post",
            url: "admin/getDoctorSchedule",
            data: {
                doctorID: $("#adding-schedule-modal").data("id")
            },
            success: (value) => {
                $('.dimmer').removeClass("active");
                editSchedule = value.docSched;
                editBreaktime = value.breakTime;
                addSchedule();
            }
        })
    }
})

// Save changes in schedule
$("#save-changes-schedule").click(() => {
    // ERROR CHECKING
    var done = true;

    if($("#edit-custom")[0].checked && ($("#edit-start-add").val() == "" || $("#edit-end-add").val() == "") && ($("#start-add").val() == "" || $("#end-add").val() == "")) {
        if($("#start-add").val() == "") {
            $("#start-add-field").addClass("error");
        }
        if($("#end-add").val() == "") {
            $("#end-add-field").addClass("error");   
        }
        if($("#edit-start-add").val() == "") {
            $("#edit-start-add-field").addClass("error");
        }
        if($("#edit-end-add").val() == "") {
            $("#edit-end-add-field").addClass("error");   
        }
        $("body").toast({
            class: "error",
            position: "top center",
            message: "Please input a valid time"
        })
        done = false;
    }

    if(done) {
        updateSchedule();
    }
})

// Adding schedule without existing
function addSchedule() {
    let mon = [], tue = [], wed = [], thu = [], fri = [], sat = [];
    let monbreak = [], tuebreak = [], wedbreak = [], thubreak = [], fribreak = [], satbreak = [];
    let defaultTime = false;
    
    if($("#daily")[0].checked) {
        if($("#custom")[0].checked) {
            mon.push($("#start").val());    mon.push($("#end-add").val());
            tue.push($("#start").val());    tue.push($("#end-add").val());
            wed.push($("#start").val());    wed.push($("#end-add").val());
            thu.push($("#start").val());    thu.push($("#end-add").val());
            fri.push($("#start").val());    fri.push($("#end-add").val());
            sat.push($("#start").val());    sat.push($("#end-add").val());
            monbreak.push($("#end").val());    monbreak.push($("#start-add").val());
            tuebreak.push($("#end").val());    tuebreak.push($("#start-add").val());
            wedbreak.push($("#end").val());    wedbreak.push($("#start-add").val());
            thubreak.push($("#end").val());    thubreak.push($("#start-add").val());
            fribreak.push($("#end").val());    fribreak.push($("#start-add").val());
            satbreak.push($("#end").val());    satbreak.push($("#start-add").val());
        } else {
            mon.push($("#start").val());    mon.push($("#end").val());
            tue.push($("#start").val());    tue.push($("#end").val());
            wed.push($("#start").val());    wed.push($("#end").val());
            thu.push($("#start").val());    thu.push($("#end").val());
            fri.push($("#start").val());    fri.push($("#end").val());
            sat.push($("#start").val());    sat.push($("#end").val());
        }
    } else if($("#repeat")[0].checked) {
        for(var i = 0; i < days.length; i++) {
            if(days[i] == "mon") {
                if($("#custom")[0].checked) {
                    mon.push($("#start").val());    mon.push($("#end-add").val());
                    monbreak.push($("#end").val());    monbreak.push($("#start-add").val());
                } else {
                    mon.push($("#start").val());    mon.push($("#end").val());
                }
            } else if(days[i] == "tue") {
                if($("#custom")[0].checked) {
                    tue.push($("#start").val());    tue.push($("#end-add").val());
                    tuebreak.push($("#end").val());    tuebreak.push($("#start-add").val());
                } else {
                    tue.push($("#start").val());    tue.push($("#end").val());
                }
            } else if(days[i] == "wed") {
                if($("#custom")[0].checked) {
                    wed.push($("#start").val());    wed.push($("#end-add").val());
                    wedbreak.push($("#end").val());    wedbreak.push($("#start-add").val());
                } else {
                    wed.push($("#start").val());    wed.push($("#end").val());
                }
            } else if(days[i] == "thu") {
                if($("#custom")[0].checked) {
                    thu.push($("#start").val());    thu.push($("#end-add").val());
                    thubreak.push($("#end").val());    thubreak.push($("#start-add").val());
                } else {
                    thu.push($("#start").val());    thu.push($("#end").val());
                }
            } else if(days[i] == "fri") {
                if($("#custom")[0].checked) {
                    fri.push($("#start").val());    fri.push($("#end-add").val());
                    fribreak.push($("#end").val());    fribreak.push($("#start-add").val());
                } else {
                    fri.push($("#start").val());    fri.push($("#end").val());
                }
            } else if(days[i] == "sat") {
                if($("#custom")[0].checked) {
                    sat.push($("#start").val());    sat.push($("#end-add").val());
                    satbreak.push($("#end").val());    satbreak.push($("#start-add").val());
                } else {
                    sat.push($("#start").val());    sat.push($("#end").val());
                }
            }
        }
    }
    $('.dimmer').addClass("active");
    $.ajax({
        type: "post",
        url: 'admin/addSchedule',
        data: {
            'monday[]': mon,
            'tuesday[]': tue,
            'wednesday[]': wed,
            'thursday[]': thu,
            'friday[]': fri,
            'saturday[]': sat,
            'mondaydifference[]': monbreak,
            'tuesdaydifference[]': tuebreak,
            'wednesdaydifference[]': wedbreak,
            'thursdaydifference[]': thubreak,
            'fridaydifference[]': fribreak,
            'saturdaydifference[]': satbreak,
            doctorID: $("#adding-schedule-modal").data("id"),
            defaultTime
        },
        success: (value) => {
            $('.dimmer').removeClass("active");
            if(value) {
                $("body").toast({
                    class: "success",
                    position: "top center",
                    message: "Dentist schedule successfully added"
                })
                $("#adding-schedule-modal").modal("hide");
            } 
        }
    })
}

// Updating schedule function
function updateSchedule() {
    let defaultTime = false;

    if($("#edit-start").val() == "" && $("#edit-end").val() == "") {
        editSchedule[editDay] = [];
        editBreaktime[editDay] = [];
    } else {
        if($("#edit-start").val() != "") {
            editSchedule[editDay][0] = $("#edit-start").val();
        }
        if($("#edit-end").val() != "") {
            editSchedule[editDay][1] = $("#edit-end").val();
        }
        editBreaktime[editDay] = [];
    }
    if($("#edit-custom")[0].checked) {
        if($("#edit-start").val() != "") {
            editSchedule[editDay][0] = $("#edit-start").val();
        }
        if($("#edit-end").val() != "") {
            editBreaktime[editDay][0] = $("#edit-end").val();
        }
        if($("#edit-start-add").val() != "") {
            editBreaktime[editDay][1] = $("#edit-start-add").val();
        }
        if($("#edit-end-add").val() != "") {
            editSchedule[editDay][1] = $("#edit-end-add").val();
        }
    } else {
        editBreaktime[editDay] = []
    }
    $('.dimmer').addClass("active");
    $.ajax({
        type: "post",
        url: 'admin/editSchedule',
        data: {
            'monday[]': editSchedule["monday"],
            'tuesday[]': editSchedule["tuesday"],
            'wednesday[]': editSchedule["wednesday"],
            'thursday[]': editSchedule["thursday"],
            'friday[]': editSchedule["friday"],
            'saturday[]': editSchedule["saturday"],
            'mondaydifference[]': editBreaktime["monday"],
            'tuesdaydifference[]': editBreaktime["tuesday"],
            'wednesdaydifference[]': editBreaktime["wednesday"],
            'thursdaydifference[]': editBreaktime["thursday"],
            'fridaydifference[]': editBreaktime["friday"],
            'saturdaydifference[]': editBreaktime["saturday"],
            doctorID: $("#editing-schedule-modal").data("id"),
            defaultTime
        },
        success: (value) => {
            $('.dimmer').removeClass("active");
            if(value) {
                $("body").toast({
                    class: "success",
                    position: "top center",
                    message: "Dentist schedule successfully edited"
                })
                $("#editing-schedule-modal").modal("hide");
            } 
        }
    })    
}

// MODALS
$(".modal").modal({
    onHidden: () => {
        $('body').removeClass("dimmed");
        $('.modals').removeClass("active");
    }
})

$("#add").click(() => {
    $("#create-modal").modal("show");
})

$("#add-schedule").click(() => {
    if($("#weekly")[0].className.includes("green")) {
        $("#schedule-modal").modal("deny");
        $("#doctor-name").text("Dr. " + $("#schedule-modal").data("firstname") + " " + $("#schedule-modal").data("lastname"));
        $("#adding-schedule-modal").data("id", $("#schedule-modal").data("id"));
        $("#adding-schedule-modal").data("firstname", $("#schedule-modal").data("firstname"));
        $("#adding-schedule-modal").data("lastname", $("#schedule-modal").data("lastname"));
        $("#adding-schedule-modal").modal("show");
    } else if($("#unavailable")[0].className.includes("green")) {
        $("#schedule-modal").modal("deny");
        var today = new Date();
        $("#start-date").calendar('set date', moment().toDate(), true, false);
        $("#end-date").calendar('set date', moment().toDate(), true, false);
        $("#start-date").calendar({
            type: "date",
            minDate: today,
            today: true
        });
        $("#end-date").calendar({
            type: "date",
            minDate: today,
            today: true
        });
        $("#add-unavailable-modal").data("id", $("#schedule-modal").data("id"));
        $("#add-unavailable-modal").data("firstname", $("#schedule-modal").data("firstname"));
        $("#add-unavailable-modal").data("lastname", $("#schedule-modal").data("lastname"));
        $("#add-unavailable-modal").modal("show");
    }
})

$("#add-sec-button").click(() => {
    $("#add-user-modal").modal('show');
    $("#add-dentist-modal").form('clear');
    $("#procedure-modal").form('clear');
})

$("#add-dentist-button").click(() => {  
    $("#add-dentist-modal").modal('show');
    $("#add-user-modal").form('clear');
    $("#procedure-modal").form('clear');
})

$("#add-procedure-button").click(() => {
    $("#procedure-modal").modal('show');
    $("#add-user-modal").form('clear');
    $("#add-dentist-modal").form('clear');
})

$("#add-user-modal").modal({
    onShow: function() {
        $("#add-password-user").val("");
        $("#confirm-password-user").val("");
    }
})

$("#add-dentist-modal").modal({
    onShow: function() {
        $("#add-password-dentist").val("");
        $("#confirm-password-dentist").val("");
    }
})

$("#edit-user-modal").modal({
    onShow: function() {
        $("#edit-user-modal").form("clear");
    }
})

$("#edit-dentist-modal").modal({
    onShow: function() {
        $("#edit-dentist-modal").form("clear");
    }
})

$("#edit-procedure-modal").modal({
    onShow: function() {
        $("#edit-procedure-modal").form("clear");
    }
})

$("#reset-password-modal").modal({
    onShow: function() {
        $("#current-password").val("");
        $("#new-password").val("");
        $("#confirm-new-password").val("")
    }
})

$("#add-user-modal").modal({
    onShow: function() {
        passwordChecker = true;
    }
})

$("#reset-password-modal").modal({
    onShow: function() {
        passwordChecker = true;   
    }
})

$("#adding-schedule-modal").modal({
    onShow: () => {
        accor_show = false;
        $("#start-field").calendar({
            type: "time",
            minTimeGap: 30,
            ampm: false
        })
        $("#end-field").calendar({
            type: "time",
            minTimeGap: 30,
            ampm: false
        })
        $("#start-add-field").calendar({
            type: "time",
            minTimeGap: 30,
            ampm: false
        })
        $("#end-add-field").calendar({
            type: "time",
            minTimeGap: 30,
            ampm: false
        })
    },
    onHidden: () => {
        $(".ui .button").removeClass("active");
        $(".ui .checkbox").checkbox('uncheck');
        $(".accordion .content").css({
            display: 'none'
        })
        $("input").val("");
        accor_show = false;
        $("#schedule-modal").data("id", $("#adding-schedule-modal").data("id"));
        $("#schedule-modal").data("firstname", $("#adding-schedule-modal").data("firstname"));
        $("#schedule-modal").data("lastname", $("#adding-schedule-modal").data("lastname"));
        $("#doctor-name-schedule").text("Dr. " + $("#schedule-modal").data("firstname") + " " + $("#schedule-modal").data("lastname"));
        setDataTable("weekly");
    }
})

$("#editing-schedule-modal").modal({
    onShow: () => {
        $("#edit-start-field").calendar({
            type: "time",
            minTimeGap: 30,
            ampm: false
        })
        $("#edit-end-field").calendar({
            type: "time",
            minTimeGap: 30,
            ampm: false
        })
        $("#edit-start-add-field").calendar({
            type: "time",
            minTimeGap: 30,
            ampm: false
        })
        $("#edit-end-add-field").calendar({
            type: "time",
            minTimeGap: 30,
            ampm: false
        })
    },
    onHidden: () => {
        $(".ui .button").removeClass("active");
        $(".ui .checkbox").checkbox('uncheck');
        $(".accordion .content").css({
            display: 'none'
        })
        $("input").val("");
        accor_show = false;
        setDataTable("weekly");
    }
})

$("#add-unavailable-modal").modal({
    onShow: () => {
        $("#start-date-input").val("");
        $("#end-date-input").val("");
    },
    onHidden: () => {
        setDataTable("");
    }
})

$("#confirmation-modal").modal({
    onHidden: () => {
        setDataTable("");
    }
})

// Initialization
function setup() {
    // load the list of users
    $.get("/admin/adminUsers", (data) => {
        updateTable(data);
    });

    accor_show = false;
    currTab = "Users";
    $(".ui .item:contains('Users')").addClass("active");
    $(".ui .item:contains('Users')").css({'background-color':'#ebebeb'});
    $(".dimmer").removeClass("active");
}

// SWITCH TAB
function switchPage() {
    let page = $(this).text().trim();
    if(page == "Users") {
        $(".ui .item").removeClass("active");
        $(".ui .item").css({'background-color':''});
        $(this).css({'background-color':'#ebebeb'});
        $(this).addClass("active");
        currTab = "Users";
        $.get("/admin/adminUsers", (data) => {
            $("#table").DataTable().destroy();
            updateTable(data);
        });
    } else if(page == "Dentist") {
        $(".ui .item").css({'background-color':''});
        $(".ui .item").removeClass("active");
        $(this).addClass("active");
        $(this).css({'background-color':'#ebebeb'});
        currTab = "Dentist";
        $.get("/admin/adminDentist", (data) => {
            $("#table").DataTable().destroy();
            updateTable(data);
        });
    } else if(page == "Procedure") {
        $(".ui .item").css({'background-color':''});
        $(".ui .item").removeClass("active");
        $(this).addClass("active");
        $(this).css({'background-color':'#ebebeb'});
        currTab = "Procedure";
        $.get("/admin/adminProcedure", (data) => {
            $("#table").DataTable().destroy();
            updateTable(data);
        });
    } else if(page == "Reset Password") {
        $("#reset-password-modal").modal("show");
    } else if(page == "Logout") {        
        window.location.href="/logout";
    }
}

// Reload table content
function updateTable(data) {
    let table = Handlebars.compile(data.htmlData.table);
    $("#table").html(table(data.data));
    $("#table").DataTable({
        scrollY: 450,
        scrollCollapse: true,
        responsive: true
    });
}

// Set data to table in modal
function setDataTable(string) {
    if(string == "weekly") {
        $("#weekly").click();
    } else {
        $("#unavailable").click();
    }
}

// Setting default button on modal when ENTER key is pressed
$(document).keypress((event) => {
    if(event.keyCode == 13) {
        if($("#reset-password-modal")[0].className.includes("active")) {
            $("#save-password").click();
        } else if($("#add-user-modal")[0].className.includes("active")) {
            $("#create-user-button").click();
        } else if($("#add-dentist-modal")[0].className.includes("active")) {
            $("#create-dentist-button").click();
        } else if($("#procedure-modal")[0].className.includes("active")) {
            $("#create-procedure-button").click();
        } else if($("#edit-user-modal")[0].className.includes("active")) {
            $("#edit-user-button").click();
        } else if($("#edit-dentist-modal")[0].className.includes("active")) {
            $("#edit-dentist-button").click();
        } else if($("#edit-procedure-modal")[0].className.includes("active")) {
            $("#edit-procedure-button").click();
        } else if($("#adding-schedule-modal")[0].className.includes("active")) {
            $("#add-schedule-button").click();
        }
    }
})

// RESETTING ERRORS
$(document).on("keydown", () => {
    $("#username-field-user").removeClass("error");
    $("#password-field-user").removeClass("error");
    $("#confirm-password-field-user").removeClass("error");
    $("#firstname-field-dentist").removeClass("error");
    $("#lastname-field-dentist").removeClass("error");
    $("#username-field-dentist").removeClass("error");
    $("#password-field-dentist").removeClass("error");
    $("#confirm-password-field-dentist").removeClass("error");
    $("#procedure-field").removeClass("error");
    $("#current-password-field").removeClass("error");
    $("#new-password-field").removeClass("error");
    $("#confirm-new-password-field").removeClass("error");
    $("#edit-password-field-user").removeClass("error");
    $("#edit-confirm-password-field-user").removeClass("error");
    $("#edit-firstname-field-dentist").removeClass("error");
    $("#edit-lastname-field-dentist").removeClass("error");
    $("#edit-password-field-dentist").removeClass("error");
    $("#edit-confirm-password-field-dentist").removeClass("error");
    $("#edit-procedure-field").removeClass("error");
    $("#start-field").removeClass("error");
    $("#end-field").removeClass("error");
    $("#start-add-field").removeClass("error");
    $("#end-add-field").removeClass("error");
    $("#start-date").removeClass("error");
    $("#end-date").removeClass("error");
})

// LOGOUT
$("#logout").click(() => {
    window.location.href="/logout";
})