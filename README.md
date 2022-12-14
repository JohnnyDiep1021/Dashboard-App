<div align="center">
  <h1> <img src="https://github.com/JohnnyDiep1021/Dashboard-App/blob/main/img/dashboard-logo48.png?raw=true" alt="Dashboard logo"/>Dashboard App</h1>
  <strong>An app simulates the actual dashboard/ admin app, used to monitor, manage and accumulate  data statistics from Netflix Clone app</strong><br>
</div>
<br>

## Why build this project?
Grasping the concept of the actual dashboard app, [Dashboard/ Netflix Dashboard App](https://netflix-dashboard-app.web.app/login) was built with a modern and simplistic, UI for more convenient data observation, analysis and some fundamental operations of an admin app. It incorporated all the underlying traits of a full-stack MERN application and only used as a personal project. This app is completely optimized for computers, and responsive features for mobile devices are going to be integrated in the future. It will visualize the overall analytic view for the developers.

## Features
1. Display an overall view including an analytic graph of yearly registered users and multiple statistical cards and boards.
2. Search engine
3. Manipulate user's data via an administrative table/ data grid:
   + View and update user account's data (name, bio, username, membership,...).
   + Create new users.
4. Manipulate movie's data via an administrative table/ data grid:
   + View and update movie's data (title, genre, image, trailer, video...).
   + Create new movies.
5. Auto account login/ logout (expired in 1 hour)

## How to use?
Only administrators are allowed to access the **Dashboard app**:
  1. Using **default account** with username **"userTest"** - password **"Test@123"**

After signing in successfully, explore all visual graphs, cards, and boards for more statiscal information about users and movies.
  
## Technologies
1) ### Frontend
- **Dashboard App** is a single-page application (SPA), constructed from ReactJS. Using:
  + **Custom hooks** manages form data input, sending requests, and authentication.
  + **react-router-dom** is used to simulate multi-page applications.
  + **reduxjs/toolkit**, **react-redux** creates stores to manage data across the application.
  + **sass** is used for styles and decorations.
  + **mui/material** for icons and tooltips.
  + **firebase** for file upload.
  + **recharts** visualizes a chart for the overall statistical data of users.
  + **@mui/x-data-grid** is used to create tabular data grid managing user and movie's data.
- **The user interface** is simplistic, modern and designed based on the framework and structure of an admin/ dashboard app.

2) ### Backend
- Featured by RESTful APIs and implemented by MongoDB, ExpressJs, and NodeJs. Using:
  + **mongodb**, **mongoose** for data storage.
  + **cors** for setting up cross-site resource sharing permissions.
  + **express** for building web framework, **express-validator** for handling and validating input data sent from client-side.
  + **body-parser** for parsing request data.
  + **helmet** for setting up header security.
  + **compression** to compress size.
  + **jsonwebtoken**, **bcrypt** for creating authToken and hashing user's password.
  + **validator** for validating input data into mongoose schema.

## What needs to be improved?
- Although **Dashboard App** meets all basic needs for data observation and gathering, there are still more features that must be incorporated for more advanced analytical tasks:
  +  Speed up application loading process for future data analysis.
  +  Integrate machine learning, algorithms, and data science techniques.
  +  A more secure way to store user data (token, userId,...) used for auto-login/ logout instead of storing it in easily-mutable local storage.
  +  More configurations, settings, and analytic boards for handling and processing incoming data.

## Closing notes
For more realistic experience and vivid imagination, please spend time exploring and playing around with the [Dashboard/ Netflix Dashboard App](https://netflix-dashboard-app.web.app/login). Enjoy :blush:! 

*I welcome all user's feedbacks and reviews. Your contributions can help me to grow better. Thank you :handshake:!*
