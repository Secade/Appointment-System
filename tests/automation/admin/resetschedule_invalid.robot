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
${TIME_INVAL_A}  8:31
${TIME_INVAL_B}  9:31

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

Invalid Blank Schedule
    Click View Schedule
    Click Reset Schedule
    Click Finish Schedule
    Missing Occurence Error Toast
    Invalid Time Error Toast 1

Invalid Empty Regular Daily
    Click Daily Checkbox
    Click Finish Schedule
    Invalid Time Error Toast 1

Invalid Backward Regular Daily
    Input Start Time 1  ${TIME_B}
    Input End Time 1   ${TIME_A}
    Click Finish Schedule
    Invalid Interval Error Toast

Invalid Short Regular Daily
    Clear Start Time 1
    Clear End Time 1
    Input Start Time 1  ${TIME_A}
    Input End Time 1  ${TIME_A}
    Click Finish Schedule
    Invalid Interval Error Toast

Invalid Input Regular Daily
    Clear Start Time 1
    Clear End Time 1
    Input Start Time 1  ${TIME_INVAL_A}
    Input End Time 1  ${TIME_INVAL_B}
    Click Finish Schedule
    Invalid Time Error Toast 2

Invalid Empty Custom
    Clear Start Time 1
    Clear End Time 1
    Click Daily Checkbox
    Click Custom Hours Checkbox
    Click Finish Schedule
    Missing Occurence Error Toast
    Invalid Time Error Toast 1

Invalid Empty Custom Daily
    Click Daily Checkbox
    Click Finish Schedule
    Invalid Time Error Toast 1

Invalid Backward Custom Daily
    Input Start Time 1  ${TIME_B}
    Input End Time 1  ${TIME_A}
    Input Start Time 2  ${TIME_C}
    Input End Time 2  ${TIME_D}
    Click Finish Schedule
    Invalid Interval Error Toast

Invalid Duplicate Custom Daily
    Clear Start Time 1
    Clear End Time 1
    Clear Start Time 2
    Clear End Time 2
    Input Start Time 1  ${TIME_A}
    Input End Time 1  ${TIME_B}
    Input Start Time 2  ${TIME_A}
    Input End Time 2  ${TIME_B}
    Click Finish Schedule
    Invalid Interval Error Toast

Invalid Overlap Custom Daily
    Clear Start Time 1
    Clear End Time 1
    Clear Start Time 2
    Clear End Time 2
    Input Start Time 1  ${TIME_A}
    Input End Time 1  ${TIME_B}
    Input Start Time 2  ${TIME_E}
    Input End Time 2  ${TIME_D}
    Click Finish Schedule
    Invalid Interval Error Toast

Invalid Short Custom Daily
    Clear Start Time 1
    Clear End Time 1
    Clear Start Time 2
    Clear End Time 2
    Input Start Time 1  ${TIME_A}
    Input End Time 1  ${TIME_B}
    Input Start Time 2  ${TIME_B}
    Input End Time 2  ${TIME_D}
    Click Finish Schedule
    Invalid Interval Error Toast

Invalid Input Custom Daily
    Clear Start Time 1
    Clear End Time 1
    Clear Start Time 2
    Clear End Time 2
    Input Start Time 1  ${TIME_INVAL_A}
    Input End Time 1  ${TIME_INVAL_B}
    Input Start Time 2  ${TIME_B}
    Input End Time 2  ${TIME_D}
    Click Finish Schedule
    Invalid Time Error Toast 2

Invalid Empty Regular Recurrence
    Clear Start Time 1
    Clear End Time 1
    Clear Start Time 2
    Clear End Time 2
    Click Daily Checkbox
    Click Custom Hours Checkbox
    Click Custom Recurrence Checkbox
    Click Finish Schedule
    Missing Date Error Toast
    Invalid Time Error Toast 1

Invalid Backward Regular Recurrence
    Input Start Time 1  ${TIME_B}
    Input End Time 1  ${TIME_A}
    Click Monday
    Click Wednesday
    Click Friday
    Click Finish Schedule
    Invalid Interval Error Toast

Invalid Short Regular Recurrence
    Clear Start Time 1
    Clear End Time 1
    Input Start Time 1  ${TIME_A}
    Input End Time 1  ${TIME_A}
    Click Finish Schedule
    Invalid Interval Error Toast

Invalid Input Regular Recurrence
    Clear Start Time 1
    Clear End Time 1
    Input Start Time 1  ${TIME_INVAL_A}
    Input End Time 1  ${TIME_INVAL_B}
    Click Finish Schedule
    Invalid Time Error Toast 2

Invalid Empty Custom Recurrence
    Clear Start Time 1
    Clear End Time 1
    Click Custom Hours Checkbox
    Click Monday
    Click Wednesday
    Click Friday
    Click Finish Schedule
    Missing Date Error Toast
    Invalid Time Error Toast 1

Invalid Backward Custom Recurrence
    Input Start Time 1  ${TIME_B}
    Input End Time 1  ${TIME_A}
    Input Start Time 2  ${TIME_C}
    Input End Time 2  ${TIME_D}
    Click Monday
    Click Wednesday
    Click Friday
    Click Finish Schedule
    Invalid Interval Error Toast

Invalid Duplicate Custom Recurrence
    Clear Start Time 1
    Clear End Time 1
    Clear Start Time 2
    Clear End Time 2
    Input Start Time 1  ${TIME_A}
    Input End Time 1  ${TIME_B}
    Input Start Time 2  ${TIME_A}
    Input End Time 2  ${TIME_B}
    Click Finish Schedule
    Invalid Interval Error Toast

Invalid Overlap Custom Recurrence
    Clear Start Time 1
    Clear End Time 1
    Clear Start Time 2
    Clear End Time 2
    Input Start Time 1  ${TIME_A}
    Input End Time 1  ${TIME_B}
    Input Start Time 2  ${TIME_E}
    Input End Time 2  ${TIME_D}
    Click Finish Schedule
    Invalid Interval Error Toast

Invalid Short Custom Recurrence
    Clear Start Time 1
    Clear End Time 1
    Clear Start Time 2
    Clear End Time 2
    Input Start Time 1  ${TIME_A}
    Input End Time 1  ${TIME_B}
    Input Start Time 2  ${TIME_B}
    Input End Time 2  ${TIME_D}
    Click Finish Schedule
    Invalid Interval Error Toast

Invalid Input Custom Recurrence
    Clear Start Time 1
    Clear End Time 1
    Clear Start Time 2
    Clear End Time 2
    Input Start Time 1  ${TIME_INVAL_A}
    Input End Time 1  ${TIME_INVAL_B}
    Input Start Time 2  ${TIME_B}
    Input End Time 2  ${TIME_D}
    Click Finish Schedule
    Invalid Time Error Toast 2

Exit Modal
    Exit Reset Schedule Modal
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

Exit Reset Schedule Modal
    Click Element   close-adding-schedule-modal

Click Delete Dentist
    Click Element   Jack-Skellington-delete

Click Confirm Delete
    Click Element   delete-dentist-button

Click View Schedule
    Click Element   Jack-Skellington-view

Click Reset Schedule
    Click Element   add-schedule

View Schedule Modal Should Exist
    Wait Until Page Contains    schedule-modal

Add Schedule Modal Should Exist
    Wait Until Page Contains    adding-schedule-modal

Input Start Time 1
    [Arguments]  ${time}
    Input Text  start   ${time}  clear=True

Input Start Time 2
    [Arguments]  ${time}
    Input Text  start-add   ${time}  clear=True

Input End Time 1
    [Arguments]  ${time}
    Input Text  end   ${time}   clear=True

Input End Time 2
    [Arguments]  ${time}
    Input Text  end-add   ${time}   clear=True

Clear Start Time 1
    Input Text   start  ${EMPTY}
    Double Click Element    start
    Press Keys  None    DELETE
    Double Click Element    start
    Press Keys  None    DELETE
    Double Click Element    start
    Press Keys  None    DELETE

Clear Start Time 2
    Input Text   start-add  ${EMPTY}
    Double Click Element    start-add
    Press Keys  None    DELETE
    Double Click Element    start-add
    Press Keys  None    DELETE
    Double Click Element    start-add
    Press Keys  None    DELETE

Clear End Time 1
    Input Text   end    ${EMPTY}
    Double Click Element    end
    Press Keys  None    DELETE
    Double Click Element    end
    Press Keys  None    DELETE
    Double Click Element    end
    Press Keys  None    DELETE

Clear End Time 2
    Input Text   end-add    ${EMPTY}
    Double Click Element    end-add
    Press Keys  None    DELETE
    Double Click Element    end-add
    Press Keys  None    DELETE
    Double Click Element    end-add
    Press Keys  None    DELETE

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

Missing Occurence Error Toast
    Wait Until Page Contains  Please choose an occurence

Missing Date Error Toast
    Wait Until Page Contains  Please choose a specific day of recurrence

Invalid Time Error Toast 1
    Wait Until Page Contains  Please input a valid time

Invalid Time Error Toast 2
    Wait Until Page Contains    Invalid time

Invalid Interval Error Toast
    Wait Until Page Contains  Invalid time interval