[![Build Status](https://travis-ci.org/william000000/Free-Mentors.svg?branch=develop)](https://travis-ci.org/william000000/Free-Mentors)
[![Coverage Status](https://coveralls.io/repos/github/william000000/Free-Mentors/badge.svg?branch=develop)](https://coveralls.io/github/william000000/Free-Mentors?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/8ee023386df711ab3b1b/maintainability)](https://codeclimate.com/github/william000000/Free-Mentors/maintainability)

# Free-Mentors

Free Mentors is a social initiative where accomplished professionals become role models to
young people to provide free mentorship sessions.

## Features
- Users can sign up.
- Users can sign in.
- Admin can change a user to a mentor.
- Users can view mentors.
- Users can view a specific mentor.
- Users can create a mentorship session request with a mentor.
- A mentor can accept a mentorship session request.
- A mentor can decline a mentorship session request.
- Users can view all their mentorship sessions.
- Users can review a mentor after a mentorship session.
- Admin can delete a review deemed as inappropriate.


## Getting Started
To get started with this project you have to follow all instruction below carefully and implement.

## Prerequisites
Install the software on your local machine [NodeJs](https://nodejs.org/en/download/)

## Installing
Make sure you have cloned this repo to your local machine, and after then run `cd project_directory` command using your terminal. install all dependencies by this command below

```
> npm i
```

## Run the server
```
> npm run dev
```
## Run the test

```
> npm test
```

## API Endpoints

| Request Url | Methods  | Description  |
| ------- | --- | --- |
| /api/v2/auth/signup | POST | Create user account |
| /api/v2/auth/signin | POST | User Login  |
| /api/v2/user/:id | PATCH | Admin Change User to Mentor |
| /api/v2/mentors | GET | Get all Mentors |
| /api/v2/mentor/:id | GET | Get specific Mentor |
| /api/v2/sessions | POST | Create Mentorship sessions |
| /api/v2/sessions/:id/accept | PATCH | Mentor Accept Session |
| /api/v2/sessions/:id/reject | PATCH | Mentor Reject Session |
| /api/v2/sessions  | GET | Get all mentorship against mentor or Mentee |
| /api/v2/sessions/:sessionId/review | POST | Review a Mentor after Mentorship |
| /api/v2/sessions/:sessionId/review | DELETE | Delete inappropriate review |



### UI Link Example
[Free Mentor UI](https://william000000.github.io/Free-Mentors/UI/index.html)


## Tools Used

### Back End
* Node Js

### Framework
* Express

### User Interface (UI)
* HTML
* CSS
* Javascript

### Deployment
```
Heroku
```
### API Documentation
[Documentation](https://freementors.herokuapp.com/apiDocumentation)
### Pivotal Tracker Stories 
[Project Stories](https://www.pivotaltracker.com/n/projects/2379756)
### Heroku link

[My app on Heroku](https://freementors.herokuapp.com/)

## Author
- Sugira Willy <sugiraw@gmail.com>
---

## Copyright
Copyright (c) Willy SUGIRA, Software developer
