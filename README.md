# Task Manager API

A simple REST API built with **Node.js and Express.js** for creating and managing tasks.



Server runs on `http://localhost:3000`

## API Endpoints

 GET    | `/api/tasks`     | Get all tasks |
 GET    | `/api/tasks/:id` | Get a task    |
 POST   | `/api/tasks`     | Create a task |
 PUT    | `/api/tasks/:id` | Update a task |
 DELETE | `/api/tasks/:id` | Delete a task |

### Example task

```json
{
  "id": "mtok5u400rzvj3",
  "title": "Learn Express",
  "completed": false
}
```

## Project Structure

```text
task-manager-api/
├── server.js
├── routes/
│   └── tasks.js
├── utils/
│   └── storage.js
├── data/
│   └── tasks.json
└── package.json
```

You can test the API using **Postman** or **curl**.

Server runs at `http://localhost:3000`.