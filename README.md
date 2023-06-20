# I/Ove
A dating app for tech community

Showcase: https://youtu.be/Bzgmn-G7iX0

## Distinctiveness and Complexity
This project is distinct from the other projects because although it is a new idea likes of which have not been asigned before. Although a dating app can theoretically be classified as a social network, I believe it is to be a distinct thing as it implements completely different functionality from that of Project 4.
This project is also more complex than the other projects as it includes advanced functionality of the technologies taught in this course, as well as ones outside of the scope of the course.

## File structure
#### Root
* "requirements.txt" file in the root directory contains all the python libraries required to run the django server.
* backend/iove directory contains both, the backend code, as well as both conmpiled and source code for React frontend.
#### Backend
* "server/" directory contains files responsible for websocket interfacing, such as "consumers.py" and "routing.py". It also contains the database as well as migration files.
* "api/" directory contains urspatterns ("urls.py") as well as API views ("views.py") required to interface with React frontend.
* "iove/" directory contains config files for both HTTP and WebSocket protocols

#### Frontend
* "src/" directory contains diferent JS utilities, such as cookie retreval ("cookieUtils.js") or error handlers ("HTTPUtils.js"); while the child "src/components/" directory contains appropriately named React components, as well as .css files responsible for styling their components.
* "public/" directory contains static files, such as graphics, photos, .gifs, etc.
* "build/" directory contains compiled and optimized code for the frontend which can be updated by running ````npm run build```` command from "/backend/iove/frontend" directory.

## Running on your local machine
To host this app on your local machine, run ````python manage.py runserver```` from "/backend/iove" directory and follow the link in your terminal, or navigate to ````http://127.0.0.1:8000/```` in your web browser.

#### Setting up real time messaging
To utilize the real time messaging feature, you will need to spin up a Redis docker container on port 6379 by running ````docker run -p 6379:6379 -d redis:5````. After starting the container, restart the Django server and enjoy the feature.
