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
Valid Create New Dentist
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

New Dentist Should Exist in Admin
    Success Toast Should Be Visible
    New Dentist Should Exist on Table

Create Dentist Teardown
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

Success Toast Should Be Visible
    Wait Until Page Contains  New dentist successfully added

New Dentist Should Exist on Table
    Click Dentist Page
    Table Should Contain    table   ${FIRST NAME}
    Table Should Contain    table   ${LAST NAME}

Click Delete Dentist
    Click Element   Jack-Skellington-delete

Click Confirm Delete
    Click Element   delete-dentist-button