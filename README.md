# Notes API

This is a simple RESTful API for managing notes. It allows you to perform CRUD (Create, Read, Update, Delete) operations on notes stored in a MongoDB database.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB (Either locally or as a cloud service)

The server will start on the port specified in the `.env` file.

## Endpoints

- **POST /newNote**: Create a new note. Requires `title` and `content` in the request body.

- **GET /notes**: Get all notes.

- **DELETE /delete**: Delete a note by its ID. Requires `id` in the request body.

- **PATCH /update**: Update a note by its ID. Requires `id` and `updatedNote` in the request body.

## Link to Frontend
https://github.com/lxjm23/notebook-app-frontend
