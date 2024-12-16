# Minesweeper

#### Browser version of classic Windows minesweeper game
<img src="/images/new-game-screenshot.png" alt="Screenshot of page upon game start"/>

## Description
Minesweeper is a single player game in which the player's goal is to reveal all the cells without mines, while not revealing any spaces with mines. Clicking on a mine space loses the game, clearing all the non-mine spaces is a win.

I chose Minesweeper because I love playing it! I played many hours over the years and wanted to see if I could replicate the original functionality.

## Table of Contents
* [Technologies Used](#technologiesused)
* [Features](#features)
* [Design](#design)
* [Project Next Steps](#nextsteps)
* [Deployed App](#deployment)
* [About the Author](#author)

## <a name="technologiesused"></a>Technologies Used
* JavaScript
* HTML5
* CSS3

## Features
* The "flood" feature of Minesweeper relies on recursive functions to clear all contiguous spaces when an empty space is clicked. In this case, the function "clickAllAdjacent" iterates through the 8 cells surrounding the selected cell, triggering the "leftClick" function on each cell. Each time the leftClick function is executed on a new, unclicked cell, it has the possibility of again triggering the clickAllAdacent function on that cell if that cell is empty. In this way, the program uses recursion to iterate through all the cells surrounding a blank area.

## Wireframe Images
* The page is a simple layout mimicking the classic Windows Minesweeper. At the top there is a title, followed by a header row with a mine counter, smiley emoji, and timer. Below the header row is the game field, made up of a grid of squares.
<img src="/images/wireframe.png" alt="wireframe of basic webpage layout">

## Trello Planning
* [Trello planning board](https://trello.com/b/OQW76CnV/minesweeper-dallas)

## <a name="design"></a>Design
* Design was directly inspired by Windows Minesweeper game.
* Design elements implemented using HTML4 and CSS3.
* CSS Flexbox was used to arrange several elements including the play field.

## <a name="nextsteps"></a>Project Next Steps
#### List of Future Features
* Allow the user to open an options menu to change aspects of the game.
* Allow the user to chose the size of the game board and number of mines.
* Allow the user to turn question marks on or off.
* Add a timer.
* Add a scoreboard for best times/high scores.
* Allow the user to change theme, or switch between light and dark mode.

## <a name="deployment"></a>Deployed Link
[Github Pages]([https://pages.git.generalassemb.ly/dallas-vanwyk/minesweeper/](https://pages.git.generalassemb.ly/dallas-vanwyk/minesweeper/))

* You can view the repository:
[Github.com](https://git.generalassemb.ly/dallas-vanwyk/minesweeper)
* If unable to view please go live locally through VS Code

## <a name="author"></a>About The Author
I'm a student in General Assembly's Software Development code boot camp. I enjoyed playing many hours of Minesweeper growing up and am happy for the skills to build a version of the game myself. I am excited to continue learning and continue developing my coding skills!

## Works Cited:
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
* Recursive functions:
*   A function that references itself is considered a recursive function. This strategy is used in the "flood" function, allowing an efficient way of performing the cell clicking function multiple times where it's needed, without iterating through the entire game field.
* https://en.wikipedia.org/wiki/Recursion_(computer_science)
