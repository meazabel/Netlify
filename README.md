## Mea's Node.js Test

This README provides comprehensive information about the project, its structure, installation instructions, usage, and contact details.

## Project Overview
This project is a Node.js-based web application designed to demonstrate various aspects of server-side development using Netlify. The project showcases the use of TypeScript and JavaScript for creating endpoint functions and handling user-related functionality.

## Project Structure
The project is organized into the following directories and files:

- netlify.toml file: This file is for configurations on netlify side
- .netlify directory: This directory is created when creating a netlify project by default
- netlifyTS directory: This directory has my endpoint functions written in typescript
- netlify directory: This directory has a functions directory which contains all my functions/endpoints written in javascript. This is the file that is running on netlify
- src: This directory contains: 
  - enums directory which only has Role type functions
  - users directory which has a User class and my endpoints testing file
- dist: This directory has all my typescript files compiled/converted to javascript

## Installation and Usage:
To run the project locally, ensure that you have Node.js and npm (Node Package Manager) installed on your system.
Clone the project repository.

Open a terminal or command prompt, navigate to the project directory, and run the following command to install the project dependencies:
npm install

After installation, you can start the development server using the following command:
npm run buildn

Access the project in your web browser by navigating to https://mea-nodejs.netlify.app

## Test data
you can use  ./users.endpoints.http which has predefined statements for GET POST PUT and DELETE


## Personal information
Maryam Al-Yasiri
&nbsp;

mea_zabel@yahoo.com
&nbsp;