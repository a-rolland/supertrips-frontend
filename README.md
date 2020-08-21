# Supertrips

## Developer: 
Antoine Rolland

## Link to App: 
[Supertrips](link-to-come)

## Description

Supertrips is an app that allows to share your trips, and to find inspiration for your future trips. You can create and organize your trips, check your past trips, give your opinion about places you visited. These trips you create can be shared: you can make them public, but you can also keep it privatem you decide.
Supertrips is really thought as a platform to share experiences, so if you need to ask something to another user, go ahead and reach him through the chat
 
## User Stories - MVP

- As a visitor, I want a landing page
- As a visitor, I want to be able to make a search through a list of trips
- As a visitor, I want to be able to signup / login / logout (+ validations)
- As a user, I want to create a simple trip (title, duration, etc.)
- As a user, I want to edit/delete my trips

## Backlog

List of other features outside of the MVPs scope
- As a visitor, I want to signup/login with social media


## ROUTES:

|Method|URL|Description|
|---|---|---|
GET | / | renders homepage
GET | /search | renders global search results page
GET | /auth/signup| renders signup form
Etc.

## Models

User model
- username: String - unique
- email: String
- password: String - encrypted
- profile_picture: String
- favorites: [ObjectId] - (ref Trips model)
- trips: [ObjectId] - (ref Trips model)
- timestamps

Trips model
- title: String
! description: String
- start: Date
- end: Date
- duration: Number (end - start, min: 1)
- is_public: Boolean
- pictures: [String]
- thumbnail_picture : String
- type: [String] - ['Solo', 'With Friends', 'Couple', 'Honey Moon', 'Family']
- timestamps

## Links

### Project Kanban
[Trello](https://trello.com/b/13f2FoyZ/supertrips)

### Git repository
[Frontend](https://github.com/a-rolland/supertrips-frontend)
[Bqckend](https://github.com/a-rolland/supertrips-backend)

### Deploy
[Heroku App](http://supertrips.herokuapp.com/)

### Slides
[Presentation slides](http://slides.com)