*** Settings ***
Documentation    Suite description
Suite Setup       Open Admin Browser
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***
${CUR_PASS}   1234567890
${NEW_PASS}   0123456789
${SHORT_PASS}      1
${LONG_PASS}    123456789012345678901234567890123
${INVALID_PASS}     1234567890-

*** Test Cases ***
Invalid Empty Reset Admin
    Set Selenium Speed  0.5
    Sleep   1
    Click Reset Admin
    Click Reset Password
    Missing Current Password Error Toast
    Invalid Password Error Toast

Invalid Current Password Reset Admin
    Input Current Password  ${NEW_PASS}
    Input New Password  ${NEW_PASS}
    Input Confirm New Password  ${NEW_PASS}
    Click Reset Password
    Incorrect Current Password Error Toast

Invalid Matching Passwords Reset Admin
    Input Current Password  ${CUR_PASS}
    Input New Password  ${NEW_PASS}
    Input Confirm New Password  ${CUR_PASS}
    Click Reset Password
    Mismatched Passwords Error Toast

Invalid Password Format Reset Admin
    Input New Password  ${INVALID_PASS}
    Input Confirm New Password  ${INVALID_PASS}
    Click Reset Password
    Incorrect Password Format Error Toast

Invalid Password Too Short Reset Admin
    Input New Password  ${SHORT_PASS}
    Input Confirm New Password  ${SHORT_PASS}
    Click Reset Password
    Password Too Short Error Toast

Invalid Password Too Long Reset Admin
    Input New Password  ${LONG_PASS}
    Input Confirm New Password  ${LONG_PASS}
    Click Reset Password
    Password Too Long Error Toast

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

Missing Current Password Error Toast
    Wait Until Page Contains    Please input your current password

Invalid Password Error Toast
    Wait Until Page Contains    Please input a valid password

Incorrect Current Password Error Toast
    Wait Until Page Contains    Incorrect current password

Incorrect Password Format Error Toast
    Wait Until Page Contains    Incorrect password format

Password Too Long Error Toast
    Wait Until Page Contains    Password is too long

Password Too Short Error Toast
    Wait Until Page Contains    Password is too short

Mismatched Passwords Error Toast
    Wait Until Page Contains    Passwords do not match