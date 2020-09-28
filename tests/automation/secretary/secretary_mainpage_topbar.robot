*** Settings ***
Documentation    Suite description
Library  DateTime
Suite Setup       Open Browser To Secretary Page Slow
Suite Teardown    Close Browser
Resource    ../login_resource.robot

*** Variables ***


*** Test Cases ***
Text Input Change Date
	${STRINGDATENOW}	Get Current Date	result_format=%B %d, %Y
	Input Text Date	9/24/2020
	Element Should Contain	secretary-date-text	${STRINGDATENOW}
	
Date Today Button
	${STRINGDATENOW}	Get Current Date	result_format=%B %d, %Y
	${NEXTDAY}		Get Current Date	increment=1 day		result_format=%m/%d/%Y
	Input Text Date	${NEXTDAY}
	Click Element	today
	Element Should Contain	secretary-date-text	${STRINGDATENOW}
	
Next Day Button
	${NEXTDAY}		Get Current Date	increment=1 day		result_format=%B %d, %Y
	Click Element	next-button
	Element Should Contain	secretary-date-text	${NEXTDAY}
	
Previous Day Button
	${PREVDAY}		Get Current Date	result_format=%B %d, %Y
	Click Element	prev-button
	Element Should Contain	secretary-date-text	${PREVDAY}
	
Day Table View
	Click Element	secretary-dropdown-view
	Click Element	secretary-dropdown-view
	Element Should Contain	table-header-title	Daily Appointments

Week Table View
	Click Element	secretary-dropdown-view
	Press Keys	None	ARROW_DOWN
	Click Element	secretary-dropdown-view
	Element Should Contain	table-header-title	Weekly Appointments
	
<<<<<<< HEAD
=======
#Logout Secretary Account
#	Click Element	secretary-logout-container
#	Element Should Be Visible 
	
>>>>>>> 2cbc9c14c6721fc82d51296a6d6da403f2885129
*** Keywords ***
Input Text Date
	[Arguments]	${date}
	Press Keys		None	TAB
	Press Keys		None	${date}
	Press Keys		None	ENTER