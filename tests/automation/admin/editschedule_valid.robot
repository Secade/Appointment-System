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
${TIME_A}   8:00
${TIME_B}   9:30
${TIME_C}   10:00
${TIME_D}   14:00

*** Test Cases ***
Edit Schedule Setup
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

Valid Regular Edit Schedule
    Click View Schedule
    Click Edit Monday Schedule
    Input Start Time 1
    Input End Time 1
    Click Save Edit Schedule

Regular Edit Schedule Should Be Succesful
    Success Toast Should Be Visible
    Regular Edit Schedule Should Reflect on Table

Valid Custom Edit Schedule
    Click Edit Monday Schedule
    Click Custom Schedule
    Input Start Time 1
    Input End Time 1
    Input Start Time 2
    Input End Time 2
    Click Save Edit Schedule

Custom Edit Schedule Should Be Succesful
    Success Toast Should Be Visible
    Custom Edit Schedule Should Reflect on Table

Exit Modal
    Exit View Schedule Modal

Edit Schedule Teardown
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

Click Edit Monday Schedule
    Click Element   Monday-edit

Input Start Time 1
    Input Text  edit-start  ${TIME_A}

Input Start Time 2
    Input Text  edit-start-add  ${TIME_C}

Input End Time 1
    Input Text  edit-end    ${TIME_B}

Input End Time 2
    Input Text  end-add    ${TIME_D}

Click Save Edit Schedule
    Click Element   save-changes-schedule

Click Custom Schedule
    Click Element   id=custom

Success Toast Should Be Visible
    Wait Until Page Contains     Dentist schedule successfully edited

Regular Edit Schedule Should Reflect on Table
    ${session_A}=   Set Variable    ${TIME_A} - ${TIME_B}
    Table Row Should Contain    table   1   ${session_A}

Custom Edit Schedule Should Reflect on Table
    ${session_A}=   Set Variable    ${TIME_A} - ${TIME_B}
    ${session_B}=   Set Variable    ${TIME_C} - ${TIME_D}
    Table Row Should Contain    table   1   ${session_A}
    Table Row Should Contain    table   1   ${session_B}