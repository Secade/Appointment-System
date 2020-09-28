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

*** Test Cases ***
Active Inactive Dentist Setup
    Set Selenium Speed  0.5
    Sleep   1
    Click Create Appointment Selection
    Click Add Dentist
    Input First Name
    Input Last Name
    Input Username
    Input Password
    Input Confirm Password
    Click Create Dentist
    Exit Add Schedule Modal
    Exit Schedule Modal

Set Inactive
    Click Status Button

Dentist Should Be Inactive in Admin
    Dentist Should Be Inactive in Table

Set Active
    Click Status Button

Dentist Should Be Active in Admin
    Dentist Should Be Active in Table

Active Inactive Dentist Teardown
    Click Delete Dentist
    Click Confirm Delete

*** Keywords ***
Click Create Appointment Selection
    Click Element   create

Click Add Dentist
    Click Element   add-dentist-button

Input First Name
    Input Text  firstname   ${FIRST NAME}

Input Last Name
    Input Text  lastname    ${LAST NAME}

Input Username
    Input Text  username    ${USERNAME}

Input Password
    Input Text  password    ${PASSWORD}

Input Confirm Password
    Input Text  confirmPassword  ${PASSWORD}

Click Create Dentist
    Click Element   create-dentist-button

Click Dentist Page
    Click Element   dentistButton

Exit Add Schedule Modal
    Wait Until Page Contains Element    adding-schedule-modal   timeout=10
    Click Element   close-adding-schedule-modal

Exit Schedule Modal
    Wait Until Page Contains Element    schedule-modal   timeout=10
    Click Element   close-schedule-modal

Click Delete Dentist
    Click Element   Jack-Skellington-delete

Click Confirm Delete
    Click Element   delete-dentist-button

Click Status Button
    Click Element   Jack-Skellington-active

Dentist Should Be Active in Table
    Wait Until Element Contains  Jack-Skellington-active  Active

Dentist Should Be Inactive in Table
    Wait Until Element Contains  Jack-Skellington-active  Inactive