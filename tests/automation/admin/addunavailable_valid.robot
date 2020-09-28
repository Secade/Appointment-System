*** Settings ***
Documentation    Suite description
Library  DateTime
Library  String
Suite Setup       Open Admin Browser
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***
${FIRST NAME}   Jack
${LAST NAME}    Skellington
${USERNAME}     skellington
${PASSWORD}     1234567890

*** Test Cases ***
Add Unavailable Setup
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

Valid Add Unavailable
    Click View Schedule
    Click Unavailable Schedule
    Click Add Unavailable
    Input Start Date
    Input End Date
    Click Modal
    Click Finish Unavailable

Add Unavailable Should Be Successful
    Success Toast Should Be Visible
    Table Should Reflect Unavailable Date

Exit Modal
    Exit View Schedule Modal

Add Unavailable Teardown
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

Click Unavailable Schedule
    Click Element   unavailable

Click Add Unavailable
    Click Element   add-unavailable

Get Start Date
    ${date}=    Get Current Date
    ${date}=    Add Time To Date    ${date}  1 day
    ${day}=     Convert Date    ${date}     result_format=%d
    ${day}=     Replace String Using Regexp    ${day}    ^0    ${EMPTY}
    ${date}=    Convert Date    ${date}     result_format=%B ${day}, %Y
    [Return]        ${date}

Get End Date
    ${date}=    Get Current Date
    ${date}=    Add Time To Date    ${date}  2 day
    ${day}=     Convert Date    ${date}     result_format=%d
    ${day}=     Replace String Using Regexp    ${day}    ^0    ${EMPTY}
    ${date}=    Convert Date    ${date}     result_format=%B ${day}, %Y
    [Return]        ${date}

Input Start Date
    ${date}=    Get Start Date
    Input Text  start-date-input    ${date}

Input End Date
    ${date}=    Get End Date
    Input Text  end-date-input    ${date}

Click Modal
    Click Element   add-unavailable-modal

Click Finish Unavailable
    Click Element   add-unavailable-button

Success Toast Should Be Visible
    Wait Until Page Contains    Unavailable dates successfully added

Table Should Reflect Unavailable Date
    ${start}=   Get Start Date
    ${end}=     Get End Date
    ${unavailable}=     Set Variable    ${start} - ${end}
    Table Should Contain    schedule-table  ${unavailable}