*** Settings ***
Library  SeleniumLibrary    run_on_failure=NOTHING

*** Variables ***
#${SERVER}         localhost:3000
${SERVER}           access-dental.herokuapp.com
${BROWSER}        Chrome
${DELAY}         2
${ASAP}          0
${VALID ADMIN}     admin
${VALID SECRETARY}     secretary
${VALID DENTIST}     buchanan
${VALID PASSWORD}    1234567890
${LOGIN URL}      https://${SERVER}/login
${ADMIN URL}    https://${SERVER}/admin
${SECRETARY URL}    https://${SERVER}/secretary
${DENTIST URL}    https://${SERVER}/dentist

*** Keywords ***
Open Admin Browser
    ${chrome_options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys
    Call Method    ${chrome_options}    add_argument    test-type
    Call Method    ${chrome_options}    add_argument    --disable-extensions
    Call Method    ${chrome_options}    add_argument    --headless
    Call Method    ${chrome_options}    add_argument    --disable-gpu
    Call Method    ${chrome_options}    add_argument    --no-sandbox
    Create Webdriver    Chrome    chrome_options=${chrome_options}
    Go To   ${ADMIN URL}

Open Browser To Login Page Slow
    ${chrome_options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys
    Call Method    ${chrome_options}    add_argument    test-type
    Call Method    ${chrome_options}    add_argument    --disable-extensions
    Call Method    ${chrome_options}    add_argument    --headless
    Call Method    ${chrome_options}    add_argument    --disable-gpu
    Call Method    ${chrome_options}    add_argument    --no-sandbox
    Create Webdriver    Chrome    chrome_options=${chrome_options}
    Set Selenium Speed  ${DELAY}
	Go To   ${LOGIN URL}

Open Browser To Login Page
    ${chrome_options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys
    Call Method    ${chrome_options}    add_argument    test-type
    Call Method    ${chrome_options}    add_argument    --disable-extensions
    Call Method    ${chrome_options}    add_argument    --headless
    Call Method    ${chrome_options}    add_argument    --disable-gpu
    Call Method    ${chrome_options}    add_argument    --no-sandbox
    Create Webdriver    Chrome    chrome_options=${chrome_options}
    Set Selenium Speed  ${ASAP}
	Go To   ${LOGIN URL}
	
Open Browser To Secretary Page Slow
    Open Browser    ${SECRETARY URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed  ${DELAY}
	
Open Browser To Secretary Page
    Open Browser    ${SECRETARY URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed  ${ASAP}

Go To Login Page
    Go To   ${LOGIN URL}
    Login Page Should Be Open

Input Username
    [Arguments]     ${username}
    Input Text    username    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    password    ${password}

Submit Credentials
    Click Button    submit

Login Page Should Be Open
    Location Should Be    ${LOGIN URL}
    Title Should Be     Access Dental Clinic | Login

Admin Page Should Be Open
    Location Should Be    ${ADMIN URL}
    Title Should Be    Access Dental Clinic | Admin

Secretary Page Should Be Open
    Location Should Be    ${SECRETARY URL}
    Title Should Be    Access Dental Clinic | Secretary

Dentist Page Should Be Open
    Location Should Be    ${DENTIST URL}
    Title Should Be    Access Dental Clinic | Dentist

Logout Page
    Click Element    logoutButton