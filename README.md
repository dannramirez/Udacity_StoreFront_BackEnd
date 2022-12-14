# Storefront Backend Project

## Getting Started

This repo is a REST API with Node,Express app and Typescript.

To get started, clone this repo and run `yarn` in your terminal at the project root.

## Technologies

The application use the following Dependencies:

- **bcrypt**  5.0.1
- **chalk** 4.1.2
- **cors**  2.8.5
- **db-migrate**  0.11.13
- **db-migrate-pg**  1.2.2
- **debug**  4.3.4
- **dotenv**  16.0.2
- **express**  4.18.1
- **helmet**  6.0.0
- **jasmine**  4.4.0
- **jasmine-spec-reporter**  7.0.0
- **jsonwebtoken**  8.5.1
- **morgan**  1.10.0
- **nodemon**  2.0.19
- **pg** 8.8.0

## Steps to Completion

### 1. Plan to Meet Requirements

In  [REQUIREMENTS.md](./REQUIREMENTS.md) document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. 

Tthe requirements file was updated with the following:

- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.**Example**: A SHOW route: 'blogs/:id' [GET]
- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.
  **Example**: You can format this however you like but these types of information should be provided
  Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape.

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder.

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
