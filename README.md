# Dev Challenge - Personal Dashboard

## Overview

I've created a personal dashboard with several modules, including sign up/sign in, database design, visual design implementation, weather, news, sport, photo gallery, task list, and a favourite warmer feature.

The project requires implementing APIs for the weather, news, and sport modules, as well as incorporating geolocation to provide weather information. The news and sport modules require internal page navigation and user input to display relevant information. The photo gallery module allows users to upload and display images, while the task list module allows users to create and manage a list of tasks. Finally, the favourite warmer feature utilizes an API to display clothing suggestions based on the user's preferences.

The project requires a mandatory sign up/login module, database design, and visual design implementation.

## Deployment

The backend is currently deployed live at loose-popcorn-production.up.railway.app. To deploy the backend yourself, follow these steps:

1. Download the project zip file and save somewhere locally on your computer
2. Open the project file in an IDE, such as Visual Studio Code
3. Go to this link and set up a railway account
4. In your VSC terminal type the following commands:
* "brew install railway" 
* "railway login"
* "brew install yarn"
5. Go to the railway website where you created an account and create a new project.
* Select "Empty Project"
* Then select "Set up your project locally"
6. After this, the website will provide you with the final three commands to enter into your VSC terminal, they are similar to what follows:
* Install railway CLI - (by brew, npm, curl or scoop) copy and paste the URL they provide into your terminal
* Connect to this project - railway link ....... 
* Run "yarn run build"
* This final command "railway up" will deploy the backend application and provide you with a link where the "deployment is live at"
7. Then you can go to the railway website and go to the settingx of this project and click "generate domain"
8. Go to the path client/src/Config/api.jsx and update the "apiURL"
  
  
The frontend is currently deployed live at https://teal-lebkuchen-cb6a95.netlify.app. To deploy the frontend yourself, follow these steps:

In case anything is already installed run the command: "rm -rf node_modules && npm install"
1. Run this command to create the build: "npm install --legacy-peer-deps --prefix client && npm run build --prefix client"
3. This will create a new folder called 'build' inside of 'client' 
3. Open this website https://app.netlify.com/ and create a new project (site) and select "deploy manually" and drag and drop the 'build' folder onto the site.

To run the project on your local host, run this command: "NODE_ENV=production npm start"

---

