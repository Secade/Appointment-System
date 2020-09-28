*** Settings ***
Documentation    Suite description
Suite Setup       Open Admin Browser
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***
${FIRST_NAME}   Truman
${LAST_NAME}    Burbank
${USERNAME}     truman
${SHORT_NAME}  t
${DUPLICATE_NAME}   buchanan
${INVALID_NAME}   `123
${INVALID_USERNAME}     123-123
${SHORT_USERNAME}   123
${PASSWORD}     1234567890
${SHORT_PASS}      1
${LONG_PASS}    123456789012345678901234567890123
${INVALID_PASS}     1234567890-

*** Test Cases ***
Create Duplicate Dentist
    Set Selenium Speed  0.5
    Sleep   1
    Click Create Appointment Selection
    Click Add Dentist
    Input First Name    Daisy
    Input Last Name     Buchanan
    Input Username      buchanan
    Input Password      ${PASSWORD}
    Input Confirm Password  ${PASSWORD}
    Click Create Dentist
    Exit Add Schedule Modal
    Exit Schedule Modal

Invalid Empty Create Dentist
    Click Create Appointment Selection
    Click Add Dentist
    Click Create Dentist
    Invalid Firstname Error Toast
    Invalid Lastname Error Toast
    Invalid Password Error Toast
    Invalid Username Error Toast

Invalid Name Create Dentist
    Input First Name    ${INVALID_NAME}
    Input Last Name     ${INVALID_NAME}
    Input Username      ${USERNAME}
    Input Password      ${PASSWORD}
    Input Confirm Password  ${PASSWORD}
    Click Create Dentist
    Invalid Firstname Error Toast
    Invalid Lastname Error Toast

Invalid First Name Too Short Create Dentist
    Input First Name    ${SHORT_NAME}
    Input Last Name     ${LAST_NAME}
    Input Username      ${USERNAME}
    Input Password      ${PASSWORD}
    Input Confirm Password  ${PASSWORD}
    Click Create Dentist
    Firstname Too Short Error Toast

Invalid Last Name Too Short Create Dentist
    Input First Name    ${FIRST_NAME}
    Input Last Name     ${SHORT_NAME}
    Input Username      ${USERNAME}
    Input Password      ${PASSWORD}
    Input Confirm Password  ${PASSWORD}
    Click Create Dentist
    Lastname Too Short Error Toast

Invalid Duplicate Name Create Dentist
    Input First Name    ${FIRST_NAME}
    Input Last Name     ${LAST_NAME}
    Input Username      ${DUPLICATE_NAME}
    Input Password      ${PASSWORD}
    Input Confirm Password  ${PASSWORD}
    Click Create Dentist
    Duplicate Error Toast

Invalid Username Create Dentist
    Input Username      ${INVALID_USERNAME}
    Input Password      ${PASSWORD}
    Input Confirm Password  ${PASSWORD}
    Click Create Dentist
    Incorrect Username Format Error Toast

Invalid Matching Passwords Create Dentist
    Input Username      ${USERNAME}
    Input Password      ${PASSWORD}
    Input Confirm Password  ${INVALID_PASS}
    Click Create Dentist
    Mismatched Passwords Error Toast

Invalid Password Format Create Dentist
    Input Password      ${INVALID_PASS}
    Input Confirm Password  ${INVALID_PASS}
    Click Create Dentist
    Incorrect Password Format Error Toast

Invalid Password Too Short Create Dentist
    Input Password      ${SHORT_PASS}
    Input Confirm Password  ${SHORT_PASS}
    Click Create Dentist
    Password Too Short Error Toast

Invalid Password Too Long Create Dentist
    Input Password      ${LONG_PASS}
    Input Confirm Password  ${LONG_PASS}
    Click Create Dentist
    Password Too Long Error Toast

Create Dentist Teardown
    Exit Create Dentist Modal
    Click Delete Dentist
    Click Confirm Delete

*** Keywords ***
Click Create Appointment Selection
    Click Element   create

Click Add Dentist
    Wait Until Page Contains Element    add-dentist-button
    Click Element   add-dentist-button

Input First Name
    [Arguments]  ${name}
    Input Text  firstname   ${name}

Input Last Name
    [Arguments]  ${name}
    Input Text  lastname    ${name}

Input Username
    [Arguments]  ${name}
    Input Text  username    ${name}

Input Password
    [Arguments]  ${password}
    Input Text  password    ${password}

Input Confirm Password
    [Arguments]  ${password}
    Input Text  confirmPassword  ${password}

Click Create Dentist
    Click Element   create-dentist-button

Exit Add Schedule Modal
    Wait Until Page Contains Element    adding-schedule-modal   timeout=10
    Click Element   close-adding-schedule-modal

Exit Schedule Modal
    Wait Until Page Contains Element    schedule-modal   timeout=10
    Click Element   close-schedule-modal

Exit Create Dentist Modal
    Press Keys  None    ESC

Invalid Firstname Error Toast
    Wait Until Page Contains   Please input a valid firstname

Invalid Lastname Error Toast
    Wait Until Page Contains   Please input a valid lastname

Invalid Password Error Toast
    Wait Until Page Contains    Please input a valid password

Invalid Username Error Toast
    Wait Until Page Contains    Please input a valid username

Firstname Too Short Error Toast
    Wait Until Page Contains    Firstname is too short

Lastname Too Short Error Toast
    Wait Until Page Contains    Lastname is too short

Duplicate Error Toast
    Wait Until Page Contains    Username already exists

Incorrect Username Format Error Toast
    Wait Until Page Contains    Incorrect username format

Username Too Short Error Toast
    Wait Until Page Contains    Username should be at least 6 alphanumeric characters

Mismatched Passwords Error Toast
    Wait Until Page Contains    Passwords do not match

Incorrect Password Format Error Toast
    Wait Until Page Contains    Incorrect password format

Password Too Short Error Toast
    Wait Until Page Contains    Password is too short

Password Too Long Error Toast
    Wait Until Page Contains    Password is too long

Click Delete Dentist
    Click Element   Daisy-Buchanan-delete

Click Confirm Delete
    Click Element   delete-dentist-button