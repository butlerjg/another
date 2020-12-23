# Notes App - Built with Typescipt, React, Node and Express, and a lowdb data layer

This is my project for BoomTown which makes use of previous work with these technologies with the exception of lowdb, which was new to me.

To run the project you will need to have node and npm installed which you can grab here: https://nodejs.org/en/

This project makes use of Node's main version 12 engine.

Once installed, make sure you are in the root directory and run **'npm install'**

Next you can run either **npm run start:dev** (recommended) or **npm run start:prod**...there is a third option, almost the exact same as the dev option, that uses nodemon, but you may need to install nodemon globally (npm install -g nodemon):
**npm run start:devMon**

**npm run start:dev** - this will simulate a development environment and will run the React development server (react-scripts start), which communicates with Express at localhost:4000...this should open your browser automatically, but if not navigate to localhost:3000

**npm run start:prod** - this will simulate a deployed version to production by just serving the static file from the React build locally at localhost:4000. This will not open your browser automatically so you'll have to navigate over to localhost:4000

Both of these scripts will transpile TS code into JS code into the dist directory in the root. Both scripts also initilize lowdb if the JSON file isn't present.

**NOTE:** Normally a .env file would be ignored for commits, but is included for convenience

I hope you enjoy!
