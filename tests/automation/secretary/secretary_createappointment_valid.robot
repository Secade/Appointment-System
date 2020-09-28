*** Settings ***
Documentation    Suite description
Suite Setup       Open Browser To Login Page Slow
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***
${USERNAME}     secretary
${PASSWORD}     1234567890
${DATENOW}		09/11/2020
${FIRSTNAME}	Jeff
${LASTNAME}		Capistrano
${CONTACT}		99999999999
${NOTE}			Hello!
${PROCEDURE}	POG
${DOCTOR}		Pog Champ

*** Test Cases ***
Valid Create New Appointment
  	Input Username    ${VALID SECRETARY}
  	Input Password    ${PASSWORD}
  	Submit Credentials
	Sleep	15
    Click Add Appointment Button
#	Input Date And Time
	# Press Keys    None    TAB
	# Press Keys    None    ENTER
	# Press Keys    None    TAB
	Press Keys		None	CTRL+A
	Input Text		add-appointment-datepicker	09/30/2020
	Press Keys    	None    ENTER
	Input Time
#	Click Next Button
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    ENTER
	Input First Name
	Input Last Name
	Input Patient Contact
	Click Procedure Drop Box
#	Click On Procedure	${PROCEDURE}
	Press Keys    None    ENTER
	Click Procedure Drop Box
	Input Notes
	Click Doctors Drop Box
#	Click On Doctor		${DOCTOR}
	Press Keys    None    ENTER
	Click Doctors Drop Box
#	Click Submit Button
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    ENTER
	Element Should Be Visible	add-button

	
Date Section Valid Cancel Button
    Click Add Appointment Button
#	Input Date And Time
	# Press Keys    None    TAB
	# Press Keys    None    ENTER
	# Press Keys    None    TAB
	Press Keys		None	CTRL+A
	Input Text		add-appointment-datepicker	09/30/2020
	Press Keys    	None    ENTER
	Input Time
#	Click Next Button
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    ENTER
	Sleep	5
	Element Should Be Visible	add-button
	
Appointment Details Section Valid Cancel Button
   Click Add Appointment Button
#	Input Date And Time
	# Press Keys    None    TAB
	# Press Keys    None    ENTER
	# Press Keys    None    TAB
	Press Keys		None	CTRL+A
	Input Text		add-appointment-datepicker	09/30/2020
	Press Keys    	None    ENTER
	Input Time
#	Click Next Button
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    ENTER
	Input First Name
	Input Last Name
	Input Patient Contact
	Click Procedure Drop Box
#	Click On Procedure	${PROCEDURE}
	Press Keys    None    ENTER
	Click Procedure Drop Box
	Input Notes
	Click Doctors Drop Box
#	Click On Doctor		${DOCTOR}
	Press Keys    None    ENTER
	Click Doctors Drop Box
#	Click Submit Button
	Press Keys    None    TAB
	Press Keys    None    ENTER
	Sleep	5
	Element Should Not Be Visible	processFirstName
	
Appointment Details Section Valid Back Button
    Click Add Appointment Button
#	Input Date And Time
	# Press Keys    None    TAB
	# Press Keys    None    ENTER
	# Press Keys    None    TAB
	Press Keys		None	CTRL+A
	Input Text		add-appointment-datepicker	09/30/2020
	Press Keys    	None    ENTER
	Input Time
#	Click Next Button
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    ENTER
	Input First Name
	Input Last Name
	Input Patient Contact
	Click Procedure Drop Box
#	Click On Procedure	${PROCEDURE}
	Press Keys    None    ENTER
	Click Procedure Drop Box
	Input Notes
	Click Doctors Drop Box
#	Click On Doctor		${DOCTOR}
	Press Keys    None    ENTER
	Click Doctors Drop Box
#	Click Submit Button
	Press Keys    None    TAB
	Press Keys    None    TAB
	Press Keys    None    ENTER
	Sleep	5
	Element Should Not Be Visible	processFirstName

*** Keywords ***
Click Add Appointment Button
	Click Element	add-button
	
Input Date And Time
	Input Text		react-datepicker__input-container	${DATENOW}
	Click Element	//a[contains(@class,'ui active visible fluid selection dropdown')]
	Click Element	//a[contains(@class,'text')]
	
Input Time
	#Click Element	time
	Press Keys	  None    2:00 PM
	Press Keys    None    ENTER
	
Click Next Button
	Click Element	class:ui button
	
Input First Name
	Input Text	processFirstName		${FIRSTNAME}
	
Input Last Name
	Input Text	processLasttName			${LASTNAME}
	
Input Patient Contact
	Input Text	processPatientContact	${CONTACT}
	
Input Notes
	Input Text	processNotes			${NOTE}
	
Click Procedure Drop Box
	Click Element	processDropProc
	
Click On Procedure
	[Arguments]	${type}
	Click Element	//a[contains(text(),'${type}')]
	
Click Doctors Drop Box
	Click Element	processDropDoctor
	
Click On Doctor
	[Arguments]	${type}
	Click Element	//a[contains(text(),'${type}')]
	
Click Submit Button
	Click Element 	//a[contains(@class,'ui green button')]
	
Click On Date Header
	Click Element	class:active step