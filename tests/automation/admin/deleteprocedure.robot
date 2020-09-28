*** Settings ***
Documentation    Suite description
Suite Setup       Open Admin Browser
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***
${PROCEDURE}    Veneers

*** Test Cases ***
Delete Procedure Setup
    Set Selenium Speed  0.5
    Sleep   1
    Click Create Appointment Selection
    Click Add Procedure
    Input Procedure Name
    Click Create Procedure

Delete Procedure
    Click Procedure Page
    Click Delete Procedure
    Create Procedure Cooldown
    Click Confirm Delete

Delete Procedure Should Be Successful
    Success Toast Should Be Visible
    Procedure Should Not Exist on Table

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

Click Delete Procedure
    Click Element   Veneers-delete

Click Confirm Delete
    Click Element   delete-procedure-button

Create Procedure Cooldown
    Wait Until Page Does Not Contain    New procedure successfully added    timeout=5

Success Toast Should Be Visible
    Wait Until Page Contains    Procedure successfully deleted  timeout=10

Procedure Should Not Exist on Table
    Page Should Not Contain   ${PROCEDURE}