*** Settings ***
Documentation    Suite description
Suite Setup       Open Admin Browser
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***
${PASSWORD 1}   1234567890
${PASSWORD 2}   0123456789

*** Test Cases ***
Valid Reset Admin
    Set Selenium Speed  0.5
    Sleep   1
    Click Reset Admin
    Input Current Password  ${PASSWORD 1}
    Input New Password  ${PASSWORD 2}
    Input Confirm New Password  ${PASSWORD 2}
    Click Reset Password

Reset Admin Should be Successful
    Success Toast Should Be Visible

Reset Admin Teardown
    Click Reset Admin
    Input Current Password  ${PASSWORD 2}
    Input New Password  ${PASSWORD 1}
    Input Confirm New Password  ${PASSWORD 1}
    Click Reset Password

*** Keywords ***
Click Reset Admin
    Click Element   resetAdmin

Input Current Password
    [Arguments]  ${password}
    Input Text  currentPassword   ${password}

Input New Password
    [Arguments]  ${password}
    Input Text  newPassword   ${password}

Input Confirm New Password
    [Arguments]  ${password}
    Input Text  confirmNewPassword   ${password}

Click Reset Password
    Click Element   save-password

Success Toast Should Be Visible
    Wait Until Page Contains  Password successfully reset