# Warbler 

Warbler is a messaging and task management app that allows users to login and create messages for other users to like and comment. Meanwhile, user can also create a ScrumBoard for project management and invite others users to join and work on the project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You should have node and npm installed before you run the project, run following commands to verify

```
node -v
```

```
npm -v
```

If they're not installed at this point, please refer to

* [Node](https://nodejs.org/en/) - Node.js® - a JavaScript runtime

### Installing

Following commands will get you ready for development env running

```
npm install
```

```
npm install -g nodemon
```

Inside the Warbler-server, run

```
nodemon
```

Also, get your local mongodb ready, and change the port number to whatever the port your mongodb is listenning at this file

```
warbler/warbler-server/models/index.js
```

Open a browser, warbler-server should be running on localhost:8081

## Running the tests

Use httpie to test backend APIs

```
npm install -g httpie
```

Example for CREATE an user
```
http POST localhost:8081/api/auth/signup username=<your_username> password=<your_password> email=<your_email>
```

Example for GET an user
```
http POST localhost:8081/api/auth/signin password=<your_password> email=<your_email>
```

Example for CREATE an user
```
http POST localhost:8081/api/users/:userid/messages text="message"
```

Example for GET all message with an user id
```
http GET localshot:8081/api/users/:userid/message
```

Example for CREATE an user with jwt token
```
http POST localhost:8081/api/users/:userid/massages "Authorization:Bearer <jwt token>" text=<your message>
```
### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

## Authors

* **Jay Wang** - *Initial work* - [jw6](https://github.com/jw6)

See also the list of [contributors](https://github.com/jw6/warbler/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc