*** Settings ***
Documentation    Suite description
Suite Setup       Open Admin Browser
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***
${FIRST NAME}   Jack
${LAST NAME}    Skellington
${USERNAME}     skellington
${PASSWORD}     1234567890

${EDIT FIRST}   Truman
${EDIT LAST}    Burbank
${SHORT_NAME}  t
${INVALID_NAME}   `123
${SHORT_PASS}      1
${LONG_PASS}    123456789012345678901234567890123
${INVALID_PASS}     1234567890-

*** Test Cases ***
Edit Dentist Setup
    Set Selenium Speed  0.5
    Sleep   1
    Click Create Appointment Selection
    Click Add Dentist
    Input First Name    ${FIRST NAME}
    Input Last Name     ${LAST NAME}
    Input Username
    Input Password   ${PASSWORD}
    Input Confirm Password   ${PASSWORD}
    Click Create Dentist
    Exit Add Schedule Modal
    Exit Schedule Modal

Invalid Empty Edit Dentist
    Click Edit Dentist
    Input First Name    ${SPACE}
    Input Last Name     ${SPACE}
    Click Confirm Edit
    Invalid Firstname Error Toast
    Invalid Lastname Error Toast
    Invalid Password Error Toast

Invalid Name Edit Dentist
    Input First Name    ${INVALID_NAME}
    Input Last Name     ${INVALID_NAME}
    Input Password      ${PASSWORD}
    Input Confirm Password   ${PASSWORD}
    Click Confirm Edit
    Invalid Firstname Error Toast
    Invalid Lastname Error Toast

Invalid Firstname Too Short Edit Dentist
    Input First Name    ${SHORT_NAME}
    Input Last Name     ${EDIT LAST}
    Click Confirm Edit
    Firstname Too Short Error Toast

Invalid Lastname Too Short Edit Dentist
    Input First Name    ${EDIT FIRST}
    Input Last Name     ${SHORT_NAME}
    Click Confirm Edit
    Lastname Too Short Error Toast

Invalid Matching Passwords Edit Dentist
    Input Last Name     ${EDIT LAST}
    Input Password      ${PASSWORD}
    Input Confirm Password   ${INVALID_PASS}
    Click Confirm Edit
    Mismatched Passwords Error Toast

Invalid Password Format Edit Dentist
    Input Password      ${INVALID_PASS}
    Click Confirm Edit
    Incorrect Password Format Error Toast

Invalid Password Too Short Edit Dentist
    Input Password      ${SHORT_PASS}
    Input Confirm Password   ${SHORT_PASS}
    Click Confirm Edit
    Password Too Short Error Toast

Invalid Password Too Long Edit Dentist
    Input Password      ${LONG_PASS}
    Input Confirm Password   ${LONG_PASS}
    Click Confirm Edit
    Password Too Long Error Toast

Exit Modal
    Exit Edit Modal

Edit Dentist Teardown
    Click Delete Dentist
    Click Confirm Delete

*** Keywords ***
Click Create Appointment Selection
    Click Element   create

Click Add Dentist
    Click Element   add-dentist-button

Input First Name
    [Arguments]  ${name}
    Input Text  firstname   ${name}

Input Last Name
    [Arguments]  ${name}
    Input Text  lastname    ${name}

Input Username
    Input Text  username    ${USERNAME}

Input Password
    [Arguments]  ${password}
    Input Text  password    ${password}

Input Confirm Password
    [Arguments]  ${password}
    Input Text  confirmPassword     ${password}

Click Create Dentist
    Click Element   create-dentist-button

Click Dentist Page
    Click Element   dentistButton

Click Edit Dentist
    Click Element   Jack-Skellington-edit

Click Confirm Edit
    Click Element   edit-dentist-button

Exit Add Schedule Modal
    Wait Until Page Contains Element    adding-schedule-modal   timeout=10
    Click Element   close-adding-schedule-modal

Exit Schedule Modal
    Wait Until Page Contains Element    schedule-modal   timeout=10
    Click Element   close-schedule-modal

Exit Edit Modal
    Click Element   close-edit-dentist-modal

Click Delete Dentist
    Click Element   Jack-Skellington-delete

Click Confirm Delete
    Click Element   delete-dentist-button

Invalid Firstname Error Toast
    Wait Until Page Contains  Please input a valid firstname

Invalid Lastname Error Toast
    Wait Until Page Contains  Please input a valid lastname

Invalid Password Error Toast
    Wait Until Page Contains  Please input a valid password

Firstname Too Short Error Toast
    Wait Until Page Contains  Firstname is too short

Lastname Too Short Error Toast
    Wait Until Page Contains  Lastname is too short

Mismatched Passwords Error Toast
    Wait Until Page Contains    Passwords do not match

Incorrect Password Format Error Toast
    Wait Until Page Contains    Incorrect password format

Password Too Short Error Toast
    Wait Until Page Contains    Password is too short

Password Too Long Error Toast
    Wait Until Page Contains    Password is too long