# mod-18-social-network-api

## [![License: APACHE2.0](https://img.shields.io/badge/License:_MIT-orange)](https://opensource.org/license/mit/)

## Description
This is a social network application that allows the user to share their thoughts, react to their friend's thoughts and create or delete a friend from their friend list.
## User Story
AS A social media startup,
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data.
## Acceptance Criteria
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database.
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON.
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database.
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list.
## Sources
* Rice University Boot Camp Activities 18 NoSQL
* Emojis - https://unicode.org/emoji/charts/full-emoji-list.html

## Usage
* This repo has not been deployed.  You will need to do the following to run the application:
1. Download the repo files.
2. Download and install mongoDB to your local computer.
3. Run the folowing commands inside the Terminal command line:
    - npm init -y
    - npm install express
    - npm install mongoose
4. To run the application, type: npm start inside the Terminal.

## Tests
* Testing restful API calls with Insomnia

## Features
* JavaScript
* Express.js
* Mongoose
* MongoDB
* Node.js
## Demonstration Videos

## Link to Deployed Site
There is no deployed site for this application

## Link to GitHub Repository
https://github.com/douglasmarsalis/mod-18-social-network-api

## License
MIT License

Copyright (c) 2023 Douglas Eric Marsalis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
