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
View Schedule Setup
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

View Schedule
    Click View Schedule
    Schedule Table Should Be Correct
    Exit View Schedule Modal

View Schedule Teardown
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

Exit View Schedule Modal
    Click Element   close-schedule-modal

Click Delete Dentist
    Click Element   Jack-Skellington-delete

Click Confirm Delete
    Click Element   delete-dentist-button

Click View Schedule
    Click Element   Jack-Skellington-view

Schedule Table Should Be Correct
    Table Row Should Contain    schedule-table  1  Monday
    Table Row Should Contain    schedule-table  1  8:00 - 18:00
    Table Row Should Contain    schedule-table  2  Tuesday
    Table Row Should Contain    schedule-table  2  8:00 - 18:00
    Table Row Should Contain    schedule-table  3  Wednesday
    Table Row Should Contain    schedule-table  3  8:00 - 18:00
    Table Row Should Contain    schedule-table  4  Thursday
    Table Row Should Contain    schedule-table  4  8:00 - 18:00
    Table Row Should Contain    schedule-table  5  Friday
    Table Row Should Contain    schedule-table  5  8:00 - 18:00
    Table Row Should Contain    schedule-table  6  Saturday
    Table Row Should Contain    schedule-table  6  8:00 - 18:00