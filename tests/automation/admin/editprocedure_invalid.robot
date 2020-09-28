*** Settings ***
Documentation    Suite description
Suite Setup       Open Admin Browser
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***
${PROCEDURE 1}    Veneers
${PROCEDURE 2}    Teeth Whitening
${INVALID_PROC}     123

*** Test Cases ***
Edit Procedure Setup
    Set Selenium Speed  0.5
    Sleep   1
    Click Create Appointment Selection
    Click Add Procedure
    Input Procedure Name    ${PROCEDURE 1}
    Click Create Procedure
    Create Procedure Cooldown
    Click Create Appointment Selection
    Click Add Procedure
    Input Procedure Name    ${PROCEDURE 2}
    Click Create Procedure

Invalid Empty Edit Procedure
    Create Procedure Cooldown
    Click Procedure Page
    Click Edit Procedure
    Click Save Changes
    Invalid Procedure Error Toast

Invalid Procedure Name Edit Procedure
    Input Procedure Name    ${INVALID_PROC}
    Click Save Changes
    Invalid Procedure Error Toast

Invalid Duplicate Edot Prcoedure
    Input Procedure Name    ${PROCEDURE 2}
    Click Save Changes
    Duplicate Error Toast

Edit Procedure Teardown
    Exit Modal
    Click Delete Procedure 1
    Click Confirm Delete
    Delete Procedure Cooldown
    Click Delete Procedure 2
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

Click Procedure Page
    Click Element   procedureButton

Click Edit Procedure
    Click Element   Veneers-edit

Click Save Changes
    Click Element   edit-procedure-button

Click Delete Procedure 1
    Click Element   Veneers-delete

Click Delete Procedure 2
    Click Element   Teeth Whitening-delete

Click Confirm Delete
    Click Element   delete-procedure-button

Create Procedure Cooldown
    Wait Until Page Contains    New procedure successfully added
    Wait Until Page Does Not Contain    New procedure successfully added    timeout=5

Delete Procedure Cooldown
    Wait Until Page Contains    Procedure successfully deleted
    Wait Until Page Does Not Contain    Procedure successfully deleted    timeout=5

Exit Modal
    Press Keys  None    ESC

Invalid Procedure Error Toast
    Wait Until Page Contains   Please input a valid procedure name

Duplicate Error Toast
    Wait Until Page Contains    Procedure already exists