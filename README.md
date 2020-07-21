## Author : Nancy Chauhan

Technologies used:

    Front end: React
    Back end: Node
    Database: Mongodb(NoSQL)
    Code Editor: VS code (Visual Studio)

-----------------------------------------------------------
Pre-requisite:

    •Install mongoDB and run on your machine(window or MAC)
    •Install node.js(v10.15.3) runtime environment 
    •Install Node Package manager-npm(v6.4.1)

-----------------------------------------------------------

Important: 
Database with name ‘reviewdb’ will get created automatically when you insert employee data using ‘Add Employee’ button on UI. I did not use authentication so far in database for simplicity. For better understanding of code, I have included detailed comments in code. Please review the code and find the assumptions and details there.


1- MONGO DB setup

    I have used 'Mongo Campass Tool' for DB
    DB will get created on first insertion of record from UI, so you need not to create anything. Just make sure that mongoddb is up and running.

2.1 - Run Using Command Prompt (Skip this step if you want to run using VS code)

    Open command prompt and navigate to folder where project is saved. For example, my project is in D drive inside EXPERIMENT folder and my project name is “employee-performance-review”

        start the client:
        =>npm start

    Open another command prompt and navigate to folder where project is saved. For example, my project is in D drive inside EXPERIMENT folder and my project name is “employee-performance-review”.

        Go to server folder (cd server) and run below command to run server:
        =>‘node server.js’

        Browser should automatically open up with following URL:
        http://localhost:3000/employee/



2.2 - Run Using VS Code(Visual Studio) Editor

    Open command prompt and navigate to folder where project is saved. For example, my project is in D drive inside EXPERIMENT folder and my project name is “employee-performance-review”.
    Now run command ‘code .’ to open the project in VS code(visual studio code editor).

    Project opened in VS code editor, to install node_modules 
        => npm i
    Run Client 
        => npm start

    TIP - Shortcut to open terminal (ctrl + `) or say (ctrl + back tic) in VS code for MAC

    Open new terminal to run server.Server.js is starting point for application and having DB connection and http port connection details.

    run server 
        =>node server/server.js


3 - API end points:

    Client:
    http://localhost:3000
    Or
    http://localhost:3000/employee
    Server: Using ‘Postman’(Chrome extension) to test backend
    GET: 
    http://localhost:3900/emp/
    or
    http://localhost:3900/emp/:id

    POST:
    http://localhost:3900/emp/  with data in body.
    PUT:
    http://localhost:3900/emp/:id

    DELETE:
    http://localhost:3900/emp/:id
