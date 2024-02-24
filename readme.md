# Pokemon Gold and Silver style JRPG typewriter dialog box
This is a HTML DOM (non-canvas) box that resembles Pokemon Gold and Silver style dialogue boxes

## Features
![](/jrpgdialogbox.gif)
- Enter any number of messages into your HTML file, separated by '|'
- They will show on one slide each, letter by letter
- Looks and feels very similar to old JRPG games
- Clicking/Tapping/Pressing Enter or Space advances text
- If it is still typing, interacting will skip it to the end
- On skipping, it will then go to the next slide if the button is pressed
- Optional option to make the first and last slides look different
- Lots of comments for beginners to understand

## Limitations and scope of improvement
- No colours etc, you can add your own though 
	eg:set 'background-color: orange;' in the css 
- Using | might be a bad idea
- Probably the logic for first and last slides is not that useful in other contexts, might want to rework it.
- The functions for handling dialogue progression and UI updates can be separated
- Instead of using 'setTimeout', maybe using promises or 'async/await' is a better idea
- performance: maybe using lazy loading for fonts or using transform instead of margin for the animation would be a better idea
- the design is not very responsive as of now
- Not very suitable for using in a game immediately
	Games often have hundreds of lines of dialogue
	I would probably use JSON files for messages and when to call them, have a separate script for calling this dialog box

## Ideas
- Different colours and styles for different NPCs
- Sound when typing or skipping messages?
- Add a system for choosing responses/choices + a dialogue tree for different choices
- Dynamic content to show different text based on actions, state, attributes, etc
- Additional animations
- Customizable cursor/arrow and UI, maybe similar to RPG maker?
- TTS support?
- Option to show character portraits in the dialog box?

## Demo
Here is a codepen, note that the font doesn't load here so it won't look as good
https://codepen.io/scythianwizard/pen/oNVrGoy


## Acknowledgements

### Idea
The idea comes from the pokemon games, of course. 
My friend Stanley Ching wanted me to make this system for his website. So I put together what I could salvage online.
Check out his website: https://stanleychingstudio.com/

### Font
Pokemon GB by Jackster Productions, released for free.
https://www.fontspace.com/jackster-productions

### UI
jaflo for this codepen https://codepen.io/jaflo/pen/AzgmQb

### Logic
https://stackoverflow.com/questions/7264974/show-text-letter-by-letter

### Disclaimers
- Pokémon Company owns the rights to the Pokémon games, images, text recordings etc
- However, game mechanisms cannot be copyrighted in most countries, and the typewriter style text/dialogs is not an original idea
- I did not find any license for the font, but I am assuming it was free and okay to redistribute, please reach out if this is not the case.
- Also, please tell me if you are the original author of the UI codepen and I got the link wrong.
- Suggestions for improvements and merge requests are welcome
