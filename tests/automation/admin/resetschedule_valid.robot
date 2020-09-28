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
Reset Schedule Setup
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

Valid Reset Schedule Regular Daily
    Click View Schedule
    Click Reset Schedule
    Click Daily Checkbox
    Input Start Time 1  ${TIME_A}
    Input End Time 1  ${TIME_B}
    Click Finish Schedule

Regular Daily Should Be Successful
    Success Toast Should Be Visible
    Regular Daily Schedule Table Should Be Correct

Valid Reset Schedule Regular Recurrence
    Click Reset Schedule
    Click Daily Checkbox
    Click Custom Hours Checkbox
    Input Start Time 1  ${TIME_A}
    Input End Time 1  ${TIME_B}
    Input Start Time 2  ${TIME_C}
    Input End Time 2  ${TIME_D}
    Click Finish Schedule

Regular Recurrence Should Be Successful
    Success Toast Should Be Visible
    Regular Recurrence Schedule Table Should Be Correct

Valid Reset Schedule Custom Daily
    Click Reset Schedule
    Click Custom Recurrence Checkbox
    Input Start Time 1  ${TIME_A}
    Input End Time 1  ${TIME_B}
    Click Monday
    Click Wednesday
    Click Friday
    Click Finish Schedule

Custom Daily Should Be Successful
    Success Toast Should Be Visible
    Custom Daily Schedule Table Should Be Correct

Valid Reset Schedule Custom Recurrence
    Click Reset Schedule
    Click Custom Recurrence Checkbox
    Click Custom Hours Checkbox
    Input Start Time 1  ${TIME_A}
    Input End Time 1  ${TIME_B}
    Input Start Time 2  ${TIME_C}
    Input End Time 2  ${TIME_D}
    Click Monday
    Click Wednesday
    Click Friday
    Click Finish Schedule

Custom Recurrence Should Be Successful
    Success Toast Should Be Visible
    Custom Recurrence Schedule Table Should Be Correct

Exit Modal
    Exit View Schedule Modal

Reset Schedule Teardown
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

Click Reset Schedule
    Click Element   add-schedule

Input Start Time 1
    [Arguments]  ${time}
    Input Text  start   ${time}

Input Start Time 2
    [Arguments]  ${time}
    Input Text  start-add   ${time}

Input End Time 1
    [Arguments]  ${time}
    Input Text  end   ${time}

Input End Time 2
    [Arguments]  ${time}
    Input Text  end-add   ${time}

Click Monday
    Click Element   mon

Click Wednesday
    Click Element   wed

Click Friday
    Click Element   fri

Click Daily Checkbox
    Click Element   id=daily

Click Custom Hours Checkbox
    Click Element   id=custom

Click Custom Recurrence Checkbox
    Click Element   id=repeat

Click Finish Schedule
    Click Element   add-schedule-button

Success Toast Should Be Visible
    Wait Until Page Contains  Dentist schedule successfully added

Regular Daily Schedule Table Should Be Correct
    ${schedule}=  Set Variable   ${TIME_A} - ${TIME_B}
    Table Row Should Contain    schedule-table  1  ${schedule}
    Table Row Should Contain    schedule-table  2  ${schedule}
    Table Row Should Contain    schedule-table  3  ${schedule}
    Table Row Should Contain    schedule-table  4  ${schedule}
    Table Row Should Contain    schedule-table  5  ${schedule}
    Table Row Should Contain    schedule-table  6  ${schedule}

Regular Recurrence Schedule Table Should Be Correct
    ${session_A}=  Set Variable   ${TIME_A} - ${TIME_B}
    ${session_B}=  Set Variable   ${TIME_C} - ${TIME_D}
    Table Row Should Contain    schedule-table  1  ${session_A}
    Table Row Should Contain    schedule-table  1  ${session_B}
    Table Row Should Contain    schedule-table  2  ${session_A}
    Table Row Should Contain    schedule-table  2  ${session_B}
    Table Row Should Contain    schedule-table  3  ${session_A}
    Table Row Should Contain    schedule-table  3  ${session_B}
    Table Row Should Contain    schedule-table  4  ${session_A}
    Table Row Should Contain    schedule-table  4  ${session_B}
    Table Row Should Contain    schedule-table  5  ${session_A}
    Table Row Should Contain    schedule-table  5  ${session_B}
    Table Row Should Contain    schedule-table  6  ${session_A}
    Table Row Should Contain    schedule-table  6  ${session_B}

Custom Daily Schedule Table Should Be Correct
    ${session_A}=  Set Variable   ${TIME_A} - ${TIME_B}
    Table Row Should Contain    schedule-table  1  ${session_A}
    Table Row Should Contain    schedule-table  2  -
    Table Row Should Contain    schedule-table  3  ${session_A}
    Table Row Should Contain    schedule-table  4  -
    Table Row Should Contain    schedule-table  5  ${session_A}
    Table Row Should Contain    schedule-table  6  -

Custom Recurrence Schedule Table Should Be Correct
    ${session_A}=  Set Variable   ${TIME_A} - ${TIME_B}
    ${session_B}=  Set Variable   ${TIME_C} - ${TIME_D}
    Table Row Should Contain    schedule-table  1  ${session_A}
    Table Row Should Contain    schedule-table  1  ${session_B}
    Table Row Should Contain    schedule-table  2  -
    Table Row Should Contain    schedule-table  3  ${session_A}
    Table Row Should Contain    schedule-table  3  ${session_B}
    Table Row Should Contain    schedule-table  4  -
    Table Row Should Contain    schedule-table  5  ${session_A}
    Table Row Should Contain    schedule-table  5  ${session_B}
    Table Row Should Contain    schedule-table  6  -