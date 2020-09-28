*** Settings ***
Documentation    Suite description
Suite Setup       Open Admin Browser
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***
${PROCEDURE}    Teeth Whitening
${INVALID_PROC}     123

*** Test Cases ***
Create Duplicate Procedure
    Set Selenium Speed  0.5
    Sleep   1
    Click Create Appointment Selection
    Click Add Procedure
    Input Procedure Name    ${PROCEDURE}
    Click Create Procedure

Invalid Empty Create Procedure
    Click Create Appointment Selection
    Create Procedure Cooldown
    Click Add Procedure
    Click Create Procedure
    Invalid Procedure Error Toast

Invalid Procedure Name Create Procedure
    Input Procedure Name    ${INVALID_PROC}
    Click Create Procedure
    Invalid Procedure Error Toast

Invalid Duplicate Create Prcoedure
    Input Procedure Name    ${PROCEDURE}
    Click Create Procedure
    Duplicate Error Toast

Create Procedure Teardown
    Exit Modal
    Click Procedure Page
    Click Delete Procedure
    Click Confirm Delete

*** Keywords ***
Click Create Appointment Selection
    Click Element   create

Click Add Procedure
    Click Element   add-procedure-button

Input Procedure Name
    [Arguments]  ${name}
    Input Text  procedure   ${name}

Click Create Procedure
    Click Element   create-procedure-button

Create Procedure Cooldown
    Wait Until Page Contains    New procedure successfully added
    Wait Until Page Does Not Contain    New procedure successfully added    timeout=5

Exit Modal
    Press Keys  None    ESC

Invalid Procedure Error Toast
    Wait Until Page Contains   Please input a valid procedure name

Duplicate Error Toast
    Wait Until Page Contains    Procedure already exists

Click Procedure Page
    Click Element   procedureButton

Click Delete Procedure
    Click Element   Teeth Whitening-delete

Click Confirm Delete
    Click Element   delete-procedure-button