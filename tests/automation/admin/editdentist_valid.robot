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

*** Test Cases ***
Edit Dentist Setup
    Set Selenium Speed  0.5
    Sleep   1
    Click Create Appointment Selection
    Click Add Dentist
    Input First Name    ${FIRST NAME}
    Input Last Name     ${LAST NAME}
    Input Username
    Input Password
    Input Confirm Password
    Click Create Dentist
    Exit Add Schedule Modal
    Exit Schedule Modal

Edit Dentist
    Click Edit Dentist
    Input First Name    ${EDIT FIRST}
    Input Last Name     ${EDIT LAST}
    Input Password
    Input Confirm Password
    Click Confirm Edit

Edit Dentist Should Be Successful
    Success Toast Should Be Visible
    Edited Dentist Should Exist on Table

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
    Input Text  password    ${PASSWORD}

Input Confirm Password
    Input Text  confirmPassword  ${PASSWORD}

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

Click Delete Dentist
    Click Element   Truman-Burbank-delete

Click Confirm Delete
    Click Element   delete-dentist-button

Success Toast Should Be Visible
    Wait Until Page Contains  Dentist successfully edited

Edited Dentist Should Exist on Table
    Click Dentist Page
    Table Should Contain    table   ${EDIT FIRST}
    Table Should Contain    table  ${EDIT LAST}