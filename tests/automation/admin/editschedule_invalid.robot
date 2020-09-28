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
${TIME_E}   9:00

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

Invalid Empty Regular Edit Schedule
    Click View Schedule
    Click Edit Monday Schedule
    Click Save Edit Schedule
    Invalid Time Error Toast

Invalid Backward Regular Edit Schedule
    Input Start Time 1  ${TIME_B}
    Input End Time 1    ${TIME_A}
    Click Save Edit Schedule
    Invalid Time Interval Error Toast

Invalid Short Regular Edit Schedule
    Exit Edit Schedule Modal
    Click Edit Monday Schedule
    Input Start Time 1  ${TIME_A}
    Input End Time 1    ${TIME_A}
    Click Save Edit Schedule
    Invalid Time Interval Error Toast

Invalid Empty Custom Edit Schedule
    Exit Edit Schedule Modal
    Click Edit Monday Schedule
    Click Custom Schedule
    Click Save Edit Schedule
    Invalid Time Error Toast

Invalid Backward Custom Edit Schedule
    Input Start Time 1  ${TIME_B}
    Input End Time 1    ${TIME_A}
    Input Start Time 2  ${TIME_C}
    Input End Time 2    ${TIME_D}
    Click Save Edit Schedule
    Invalid Time Interval Error Toast

Invalid Duplicate Custom Edit Schedule
    Exit Edit Schedule Modal
    Click Edit Monday Schedule
    Click Custom Schedule
    Input Start Time 1  ${TIME_A}
    Input End Time 1    ${TIME_B}
    Input Start Time 2  ${TIME_A}
    Input End Time 2    ${TIME_B}
    Click Save Edit Schedule
    Invalid Time Interval Error Toast

Invalid Overlap Custom Edit Schedule
    Exit Edit Schedule Modal
    Click Edit Monday Schedule
    Click Custom Schedule
    Input Start Time 1  ${TIME_A}
    Input End Time 1    ${TIME_B}
    Input Start Time 2  ${TIME_E}
    Input End Time 2    ${TIME_C}
    Click Save Edit Schedule
    Invalid Time Interval Error Toast

Invalid Short Custom Edit Schedule
    Exit Edit Schedule Modal
    Click Edit Monday Schedule
    Click Custom Schedule
    Input Start Time 1  ${TIME_A}
    Input End Time 1    ${TIME_B}
    Input Start Time 2  ${TIME_B}
    Input End Time 2    ${TIME_C}
    Click Save Edit Schedule
    Invalid Time Interval Error Toast

Exit Modal
    Exit Edit Schedule Modal
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

Exit Edit Schedule Modal
    Click Element   close-editing-schedule-modal

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
    [Arguments]  ${time}
    Input Text  edit-start  ${time}

Input Start Time 2
    [Arguments]  ${time}
    Input Text  edit-start-add  ${time}

Input End Time 1
    [Arguments]  ${time}
    Input Text  edit-end    ${time}

Input End Time 2
    [Arguments]  ${time}
    Input Text  end-add    ${time}

Click Save Edit Schedule
    Click Element   save-changes-schedule

Click Custom Schedule
    Click Element   id=custom

Invalid Time Error Toast
    Wait Until Page Contains     Please input a valid time

Invalid Time Interval Error Toast
    Wait Until Page Contains     Invalid time interval