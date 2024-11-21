# Production Deployment

This folder contains all the necessary configuration files to deploy the **Todos application** stack on a production VPS using Docker Compose. The stack includes the following services:

## Overview of Services

1. **Frontend**  
   - Docker Image: `ghcr.io/ingsw24/todos-web:0.0.2`  
   - Description: This is the web interface of the application, built and deployed via GitHub Actions. The frontend communicates with the API service for data operations.  

2. **API**  
   - Docker Image: `ghcr.io/ingsw24/todos-api:0.0.1`  
   - Description: This is the backend API service for handling business logic and interacting with the database. The API also connects to the PostgreSQL database defined in this stack.  
   - Environment: Uses various database-related environment variables to connect to the database (`DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USERNAME`, etc.).  

3. **Database (PostgreSQL)**  
   - Docker Image: `postgres`  
   - Description: Stores the application data persistently.  
   - Volume: `pgdata` is an external Docker volume to ensure data persistence between container restarts.  

4. **Nginx**  
   - Docker Image: `nginx:mainline-alpine`  
   - Description: Acts as a reverse proxy to route requests to the appropriate service. It forwards requests to:
     - The API service at `http://api:3000`.
     - The frontend service at `http://frontend:3000`.  
   - Configuration: The `nginx.conf` file is used to define server names and routing logic. These server names should either match your domain's API and frontend URIs or be parameterized using environment variables.

5. **Watchtower (Optional)**  
   - Docker Image: `containrrr/watchtower`  
   - Description: Can be used to automatically update services whenever a new image is available. Useful for reducing downtime and ensuring the stack is running the latest versions.  
   - Note: Watchtower is currently commented out in the `docker-compose.yml`. Uncomment the `watchtower` section to enable it.

## How the Services Interact

- **Frontend <-> Nginx:** The frontend is served as a static asset and runs on client side. Therefore its requests to the API will have to pass through nginx.
- **API <-> Database:** The API interacts with the PostgreSQL database to store and retrieve data.
- **Nginx <-> Services:** Nginx acts as a load balancer and reverse proxy, routing requests to the appropriate services.

## Deployment Instructions

1. **Ensure the following prerequisites are met on your VPS:**
    - Docker is installed and running.
    - Docker Compose is installed.

2. **Environment Variables:**  
    Create a `.env` file in this directory (you can copy the example file as a starter using `cp .env.example .env`)

3. **Start the Stack:**
    Run the following command to start all services:

    ```bash
    docker-compose up -d
    ```
4. **Access the Application:**
    + Frontend: `http://<your-frontend-domain>`
    + API: `http://<your-api-domain>`

5. **Persistent Data:**
    The PostgreSQL data is stored in the pgdata volume to ensure it persists across container restarts.

## Notes on Nginx Configuration

The `nginx.conf` file routes requests based on the domain names specified in the `server_name` directives:

- `ingsw24-api.zapto.org` for the API.
- `ingsw24-web.zapto.org` for the frontend.

If you use different domains or subdomains, make sure to update the server_name values in nginx.conf. Alternatively, you can parameterize them using environment variables for greater flexibility.

## Enabling Watchtower (Optional)

Watchtower can be uncommented in the `docker-compose.yml` to enable automatic updates for your services:

```yaml
watchtower:
  image: containrrr/watchtower
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
```

Once enabled, Watchtower will monitor services for new image versions and update them. This can be particularly useful for keeping the stack up to date with minimal intervention.

