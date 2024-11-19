# Todo App

This is a Todo App made with Vite and React which uses the Todos API to get, create, update and delete TODOs. 

You can run it by: 

- Installing dependencies with `npm i`
- Copying `.env.example` as the environment file with `cp .env.example .env`
- Updating `.env` so that `VITE_API_BASE` matches the API base URI
- Running `npm run dev`

**However**, the app is supposed to be started using the global docker compose file in the root of the repository. Docker compose will build the docker image and make the app available at `localhost:8082`.
