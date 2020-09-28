*** Settings ***
Documentation    Suite description
Suite Setup       Open Admin Browser
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***
${PROCEDURE}    Veneers

*** Test Cases ***
Valid Create New Procedure
    Set Selenium Speed  0.5
    Sleep   1
    Click Create Appointment Selection
    Click Add Procedure
    Input Procedure Name
    Click Create Procedure

New Procedure Should Exist in Admin
    Success Toast Should Be Visible
    New Procedure Should Exist on Table

Create Procedure Teardown
    Click Delete Procedure
    Click Confirm Delete

*** Keywords ***
Click Create Appointment Selection
    Click Element   create

Click Add Procedure
    Click Element   add-procedure-button

Input Procedure Name
    Input Text  procedure   ${PROCEDURE}

Click Create Procedure
    Click Element   create-procedure-button

Click Procedure Page
    Click Element   procedureButton

Success Toast Should Be Visible
    Wait Until Page Contains    New procedure successfully added

New Procedure Should Exist on Table
    Click Procedure Page
    Table Should Contain    table   ${PROCEDURE}

Click Delete Procedure
    Click Element   Veneers-delete

Click Confirm Delete
    Click Element   delete-procedure-button