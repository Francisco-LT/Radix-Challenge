# Getting Started Radix Challenge

## Backend

In order to build the backend project you must follow the following steps:

- In your terminal go to the backend folder;
- Run the script "npm i" to install the dependencies;
- Run the script "npm run dev-deps-start" to create and run the database container;
- Run the script "npm run dev-migrations-up" to run the migrations and build the table on the database;
- Run the script "npm run dev" to start the application;
- After all those steps the application will be runing and functional, and you can start testing it.

### `Backend endpoints`

- You should use am API testing plataform like "Postman" to test the endpoints;
- The first endpoint will be `http://localhost:3001/equipments`. You should use the "POST" requisition and send the a JSON body in the following format: 

        {
            "equipmentId": "EQ-12496",
            "timestamp": "2024-12-30T12:30:00.000-05:00",
            "value": 500.1
        }

The response must be "Log saved on database"

- The second endpoint will be `http://localhost:3001/equipments/uploadError`. You should use the "POST" requisition. Then on the bosy section you must select "form-data" create a key named "file" and in the value you have to upload a csv file in the following format:

        ![alt text](image.png)


The response must be "Error log saved on database"

## Frontend

In order to build the frontend project you must follow the following steps:

- In your terminal go to the backend folder;
- Run the script "npm i" to install the dependencies;
- Run the script "npm start" run the app in development mode;
- On your browser open http://localhost:3000 to see the page