*** Settings ***
Documentation    Suite description
Suite Setup       Open Admin Browser
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***
${PROCEDURE}    Veneers
${EDIT}     Teeth Whitening

*** Test Cases ***
Edit Procedure Setup
    Set Selenium Speed  0.5
    Sleep   1
    Click Create Appointment Selection
    Click Add Procedure
    Input Procedure Name    ${PROCEDURE}
    Click Create Procedure

Edit Procedure
    Click Procedure Page
    Click Edit Procedure
    Input Procedure Name    ${EDIT}
    Click Save Changes

Edited Procedure Should Exist in Admin
    Success Toast Should Be Visible
    Edited Procedure Should Exist on Table

Edit Procedure Teardown
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

Click Procedure Page
    Click Element   procedureButton

Click Edit Procedure
    Click Element   Veneers-edit

Click Save Changes
    Click Element   edit-procedure-button

Success Toast Should Be Visible
    Wait Until Page Contains    Procedure successfully edited

Edited Procedure Should Exist on Table
    Table Should Contain    table   ${EDIT}

Click Delete Procedure
    Click Element   Teeth Whitening-delete

Click Confirm Delete
    Click Element   delete-procedure-button