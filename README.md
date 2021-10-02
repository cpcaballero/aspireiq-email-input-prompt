# AspireIQ's FrontEnd Take Home Coding Challenge

Heroku Link: https://agile-reef-18784.herokuapp.com/

## My understanding of the challenge scope

Create an email input prompt/picker with the following things to remember:

- The component must be able to show a dropdown of string-matched emails that begins with the user's current input
- The user's input will be registered when tab or enter button is pressed.
- After pressing tab or enter button, the user input will become a chip or email tag.
- If the email tag is a valid email, it should be a normal email tag. Else, it should hint the user that there is a problem with the latest email tag entered. 
- If there is a dropdown shown, the user can also click one of the emails in the dropdown to make it an email tag.
- There can be multiple email tags inside the input box. 
- These email tags can be erased by clicking the x mark.
- The component must be a **production-ready** component

## Features/Other things included in the code that are not explicitly stated in the challenge scope

- Enabled erasing the last email tag by pressing backspace
- Adding a loading icon and a bit of delay in displaying the dropdown. Since it was stated that normally it would be populated by an API call, there must be a debounce time in populating the dropdown or else the call will be spammed.
- Input box expands vertically to cater multiple lines of email tags.
- Only unique emails are allowed.
- No email tags are created if the input is empty.
- Spaces at the beginning and end of input text are trimmed.
- All input are converted to lowercase.
- Exclamation point in the invalid email tag becomes close/times icon on hover.
- Pressing up and down arrows when the dropdown is visible to navigate to the emails in the dropdown.
- No dropdown displayed when no email matched against the email list

> **Note:** Items listed above were added with the mindset of improving the user's experience when using the email picker.

## What would I add / enhance if given more time
- Allow emails to be searched by name only (this involves changing the source of email list from array to array objects with keys name and email (similar to MS Teams)
- Tooltip on click of email tag to show details if it came from the email list
- Automatically create a tag from the current user input on blur
- Optimize validating emails when displaying as email tags.
- Show a small hint box below text input that says "No email match for &lt;user input&gt;" when typing an email that is not on the email list.
