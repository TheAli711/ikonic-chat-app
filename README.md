<!-- Install Bun -->

# Install BUN

`curl -fsSL https://bun.sh/install | bash`

# Install Dependencies

`cd frontend`

`bun install`

`cd backend`

`bun install`

Need postgresql instance

# Start Server

make sure that there is a database with the name that is specified in the DB_URL connection string.

`cd backend`

`bun run start`

# Start Frontend

`cd frontend`

`bun run dev`

# ENV

`cd frontend`

create .env file

VITE_SOCKET_URL='http://localhost:8090'

VITE_BACKEND_URL='http://localhost:8090/api/v1'

`cd backend`

create .env file

PORT=8090

JWT_SECRET=nf8a9prj290fi930jfioqjf390rj

JWT_EXPIRES=1d

DB_URL=postgres://postgres:admin@localhost:5432/ikonic-chat-app
