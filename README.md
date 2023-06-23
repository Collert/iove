# I/Ove
A dating app for the tech community

Showcase: https://youtu.be/Bzgmn-G7iX0

## Overview
I/O ve is a dating web app designed around attracting potential matches with one's programming skills instead of thier looks.

Users can create and customize their profile with:
* A single profile picture
* An "About Me" card which includes:
    * A bio
    * Person's backgroung information such as languages they speak, their occupation, etc.
    * Person's lifestyle such as what kind of diet they follow, what religion they follow, etc.
* A code card where user can write an impressive code snipit, complete with syntax highlighting for multiple languages.
* A favourite hobby card
* Small cards such as:
    * Favourite music genre
    * Favourite video game
    * What the person is looking for on the app
    * The zodiac sign

When the user is satisfied with their profile, they can go to the main screen of the app and start exploring other users' profiles as well as swiping rigt or left to respectively indicate whether they like that person or not. 
When the app serves users to swipe on, it randomly picks a member from the database that the user hasn't swiped on yet. 
After two people "like" each other, they would be considered matched and would be able to chat with each other.

The chat screen provides the ability for users to chat with each other. When user selects a chat, a websocket connection is established with the Redis server and if both users are present in the same chat, they will be able to see each other's messages appear in real time, rendering new bubbles to the chat screen.
Because the Redis server at that time would be running in a Docker container, the architecture of the host machine needs to be configured in a way that would allow to connect to both, the HTTP port as well as the WS port from the client machine. 

## Distinctiveness and Complexity
This project is distinct from the other projects because although it is a new idea likes of which have not been assigned before. Although a dating app can theoretically be classified as a social network, I believe it is to be distinct as it implements completely different functionality from Project 4.
l/O ve is also more complex as it includes advanced functionality of the technologies taught in this course, as well as those outside the course's scope.

## File structure
#### Root
* "requirements.txt" file contains all the Python libraries required to run the Django server.
* backend/iove directory contains both the backend code, as well as both compiled and source code for React frontend.
#### Backend
* "server/" directory contains files responsible for websocket interfacing, such as "consumers.py" and "routing.py". It also contains the database as well as migration files.
* "api/" directory contains URL patterns ("urls.py") as well as API views ("views.py") required to interface with React frontend.
* "iove/" directory contains config files for both HTTP and WebSocket protocols

#### Frontend
* "src/" directory contains different JS utilities, such as cookie retrieval ("cookieUtils.js") or error handlers ("HTTPUtils.js"); while the child "src/components/" directory contains appropriately named React components, as well as .css files responsible for styling their components.
* "public/" directory contains static files, such as graphics, photos, .gifs, etc.
* "build/" directory contains compiled and optimized code for the frontend, which can be updated by running ````npm run build```` command from "/backend/iove/frontend" directory.

## Running on your local machine
To host this app on your local machine, run ````python manage.py runserver```` from "/backend/iove" directory and follow the link in your terminal, or navigate to ````http://127.0.0.1:8000/```` in your web browser.
If you get any 403 errors, make sure the address you are hosting the server on is included in the ````ALLOWED_HOSTS```` list of ````/backend/iove/iove/settings.py```` and the client machine is included in ````CSRF_TRUSTED_ORIGINS```` list.

#### Setting up real time messaging
To utilize the real time messaging feature, you will need to spin up a Redis docker container on port 6379 by running ````docker run -p 6379:6379 -d redis:5````. After starting the container, restart the Django server and enjoy the feature.
