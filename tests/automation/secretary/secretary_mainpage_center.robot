*** Settings ***
Documentation    Suite description
Library  DateTime
Suite Setup       Open Browser To Secretary Page Slow
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***


*** Test Cases ***
Day View Header Change Date
	Input Text Date	09/22/2021
	Press Keys	None	ENTER
	Sleep	5
	Click Element	sec-header-child
	Element Should Contain	secretary-date-text	September 19, 2021

Day View Header Change Week
	Input Text Date	09/22/2021
	Press Keys	None	ENTER
	Sleep	5
	Click Element	sec-header-child
	Click Element	prev-button
	Element Should Contain	secretary-date-text	September 18, 2021

Check Card Day View
	Sleep	5
	Click Element	next-button
	Sleep	5
	Element Should Contain	secretary-card-day	Jason Borne

Check Appointment Day View
	Click Element	secretary-card-day
	Sleep	5
	Press Keys	None	TAB
	Press Keys	None	ENTER
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	ENTER
	${firstname}	Get Value	processFirstName
	Should Be Equal	Jason	${firstname}
	Click Element	processDropDoctor
	Press Keys	None	TAB
	Press Keys	None	ENTER

Edit Appointment Day View
	Click Element	secretary-card-day
	Press Keys	None	TAB
	Press Keys	None	ENTER
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	ENTER
	Press Keys	processPatientContact	09986662222
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	ENTER
	Element Should Contain	secretary-card-day	09986662222
	Click Element	secretary-card-day
	Press Keys	None	TAB
	Press Keys	None	ENTER
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	ENTER
	Press Keys	processPatientContact	09187771111
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	TAB
	Press Keys	None	ENTER
	
*** Keywords ***
Input Text Date
	[Arguments]	${date}
	Press Keys		None	TAB
	Press Keys		None	${date}
	Press Keys		None	ENTER

Add Appointment