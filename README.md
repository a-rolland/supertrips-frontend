# Supertrips

## Developer:

Antoine Rolland

## Link to App:

[Supertrips](https://supertrips.herokuapp.com/)

## Description

Supertrips is an app that allows to share your trips, and to find inspiration for your future ones. You can create and organize your trips, check your past trips, give your opinion about places you visited. These trips you create can be shared: you can make them public, but you can also keep make them private if you need to edit them for example or if you don't want user users to see it.

## User Stories - MVP

- As a visitor, I want a landing page
- As a visitor, I want a "All trips" page
- As a visitor, I want to be able to make a search through a list of trips
- As a visitor, I want to be able to signup / login / logout (+ validations)

- As a user, I want to create a simple trip (title, duration, etc.) (with title, start-date and end-date validation)
- As a user, I want to have a complete CRUD for trips (CReate, Update, Delete)

## Backlog

List of other features outside of the MVPs scope

- As a visitor, I want to signup/login with social media
- As a visitor, I want to see a nice Brand logo
- As a visitor, I want to see a selection of the most popular trips on the homepage
- As a visitor, I want a responsive app
- As a visitor, I want a footer if I am on a small screen
- As a visitor, I want to see all the places a user visited on a map in the Trip description
- As a visitor, I want the map to adapt its size depending on the scope/span of the experiences
- As a visitor, I want to see the pictures of a Trip in a comfortable way

- As a user, I want to be able to make my trip Public or Private
- As a user, I want to create a simple "step" inside a trip (with title validations)
- As a user, I want a complete CRUD for steps
- As a user, I want to create a simple "experience" inside a trip (with title, date and time validations)
- As a user, I want to have the option to make the date and time of an experience public or private
- As a user, I want a profile with an editable profile picture, access to my own trips, my favorite trips, etc.
- As a user, I want to add trips to my "favorites"
- As a user, I want to locate an experience on a map, and use a service to select an referenced "Place"
- As a user, I want to be able to "Like" a trip.
- As a user, I want to add pictures to my trip.

## ROUTES - FRONTEND:

| Method | URL                                                    | Description                                          |
| ------ | ------------------------------------------------------ | ---------------------------------------------------- |
| GET    | /                                                      | renders homepage                                     |
| GET    | /search                                                | renders search results page                          |
| GET    | /trips                                                 | renders all trips list                               |
| GET    | /create-trip                                           | renders a form to create a trip                      |
| GET    | /trips/:id                                             | renders a specific trip                              |
| GET    | /trips/edit/:id                                        | renders a form to edit a trip                        |
| GET    | /trips/:id/add-step                                    | renders a form to create a new step for a trip       |
| GET    | /trips/:id/edit-step/:stepId                           | renders a form to edit a step                        |
| GET    | /trips/:id/steps/:stepId/add-experience                | renders a form to create a new experience for a step |
| GET    | /trips/:id/steps/:stepId/edit-experience/:experienceId | renders a form to edit an experience                 |
| GET    | /signup                                                | renders a signup form                                |
| GET    | /login                                                 | renders a login form                                 |
| GET    | /profile                                               | renders the logged in user's profile                 |
| GET    | /profile/my-trips                                      | renders the logged in user's own trips               |
| GET    | /profile/favorite-trips                                | renders the logged in user's favorite trips          |
| GET    | /profile/user/:userId                                  | renders a specific user's public profile             |

## Models

User model
('unique' and 'required' validations are made inside user-controller.js, so facebook login can work properly)

- id: ObjectId
- username: String -- REQUIRED
- password: String -- encrypted - REQUIRED
- profile_picture: String -- with default
- favorites: [ObjectId] -- (ref Trips model)
- facebook:
  |- id: String
  |- email: String
  |- name:
  |- firstName: String
  |- lastName: String
- timestamps

Trip model

- id: ObjectId
- title: String -- REQUIRED
- author: ObjectId -- (ref User model)
- isPublic: Boolean -- default: false
- startDate: String -- REQUIRED
- endDate: String -- REQUIRED
- duration: Number
- imageUrl: String -- with default
- likes: [ObjectId] = user.\_id
- comments: [
  - commentAuthor:
    |- \_id: ObjectId
    |- username: String
    |- profilePicture: String
  - comment: String
    ]
- timestamps

Step model

- id: ObjectId
- title: String -- REQUIRED
- trip: ObjectId - (ref Trip model)
- timestamps

Experience model

- id: ObjectId
- title: String -- REQUIRED
- step: ObjectId - (ref Step model)
- trip: ObjectId - (ref Trip model)
- description: String
- place:
  |- address: String
  |- lat: Number
  |- lng: Number
- date: String -- REQUIRED
- time: String -- REQUIRED
- showDate: Boolean -- default: false
- showTime: Boolean -- default: false
- pictures: [
  - id: ObjectId
  - url: String
    ]
- timestamps

Sessions model (automatically created)

- id: ObjectId
- expires: Date
- session: Object

## Links

### Project Kanban

[Trello](https://trello.com/b/13f2FoyZ/supertrips)

### Git repository

[Frontend](https://github.com/a-rolland/supertrips-frontend)
[Backend](https://github.com/a-rolland/supertrips-backend)

### Deploy

[Heroku App](https://supertrips.herokuapp.com/)

### Slides

[Presentation slides](https://docs.google.com/presentation/d/1YC5Bo_ZHCLL2DVZpUL5g2bi6fhK_iwcE3fFI6c4JplQ/edit?usp=sharing)
