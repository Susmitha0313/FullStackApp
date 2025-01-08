# FullStackApp


PROJECT SETUP INSTRUCTIONS

Backend Setup
1.Clone The Repository
    git clone <repository url>
    cd <project -directory>
2.Install Dependencies:
    npm Install
3.Set up environment variables by creating .env file in the root directory:
    PORT = 3000
    MONGO_URI = mongodb://localhost:27017
4.Start the backend server:
    npm start   
5.Verify the server is running at http://localhost:3000.


FRONTEND SETUP(Using Vite)
1.Create a new React app using vite:
    npm create vite@latest frontend --template react
2.Move into the project directory:
    cd frontend
3.Install dependencies
    npm install
4.Update the API base URL in the Vite proxy configuration: Open vite.config.js and add the following:

    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      plugins: [react()],
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            secure: false,
          },
        },
      },
    });

5.Start the Vite development server:
    npm run dev
6.Access the frontend at http://localhost:5173.



API DOCUMENTATION
  Task Management:
    POST /api/addTask - Add a new Task.
    GET /api/:taskId- Fetch all tasks
    PUT /api/:taskId - Fetch tasks with task Id
    DELETE /api/:taskId - Delete the task with task Id
  
  Request/Response Formats
    1. POST /api/addTask

        Request Body
        {
            "title": "Work out",
            "description": "waking up at 5 and go to gym for working out",
        }

        Response (Success):
       {
        _id: new ObjectId('677e300db3fcd74de36b525d'),
        title: 'Work out',
        description: 'waking up at 5 and go to gym for working out',
        lastUpdatedAt: 2025-01-08T07:58:05.647Z,
        createdAt: 2025-01-08T07:58:05.651Z,
        updatedAt: 2025-01-08T07:58:05.651Z,
        __v: 0
      },
        
        Response (error)
        {
        "error": "Failed to add task "
        }

   
    Edge Cases

    Empty Inputs: Verify behavior when required fields are missing (e.g., { "title": "" }).

    Duplicate Records: Ensure unique constraints are enforced (e.g., duplicate Task titles in POST /api/addTask).




Test Cases Documentation

Example Test Case for POST `/api/addTask`

1. Test Case 1: Successful Task Addition
   Input:
   json
   {
     "title": "Morning Routine",
     "description": "Waking up at 6 AM and doing yoga."
   }
   
   Expected Output:
   json
   {
     "_id": "1234abcd",
     "title": "Morning Routine",
     "description": "Waking up at 6 AM and doing yoga.",
     "createdAt": "2025-01-08T08:00:00.000Z"
   }
   

2. Test Case 2: Missing Title Field
   Input:
   json
   {
     "description": "Yoga session at 6 AM."
   }
   
   Expected Output:
   json
   { "error": "Title is required." }
   

3. Test Case 3: Duplicate Task
   Input:
   json
   {
     "title": "Morning Routine",
     "description": "Duplicate Task Entry."
   }
   
   Expected Output:
   json
   { "error": "Task with this title already exists." }