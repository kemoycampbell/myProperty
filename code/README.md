# SV - Svelte Project Setup Guide

This guide will help you set up the environment to work with your Svelte project. You can choose from multiple setup options depending on how you want to run the application and database.

## Create your .env file in code/
1. create an .env file
2. Copy the contents from env.sample
## Available Setup Options

You have three setup options to choose from:

1. **Run everything locally** (Postgres and NodeJS installed on your local machine).
2. **Run both the app and the database in Docker**.
3. **Run the app locally and the database in Docker**.

If you choose **Option 2**, you will need to get a shell into the Docker container for debugging the application.
The same is also true about the database portion for **Option 3**

---

### **Option 1: Run Everything Locally**

If you want to run the app and database directly on your local machine, follow these steps:

1. **Install and Set Up PostgreSQL**:
   - Download and install PostgreSQL from [here](https://www.postgresql.org/download/).
   - Make sure the PostgreSQL server is running on your machine.

2. **Install Node.js**:
   - Download and install Node.js from [here](https://nodejs.org/en/download/).

---

### **Option 2: Run Both App and Database in Docker**

If you prefer to use Docker for both the app and the database, follow these steps:

1. **Install Docker**:
   - Download and install Docker from [here](https://www.docker.com/get-started).

2. **Build Docker Services**:
   - Navigate to the project folder where your `docker-compose.yml` file is located:
     ```bash
     cd /path/to/your/project
     ```

   - Run the following command to build and start both the app and database containers:
     ```bash
     docker-compose -f docker-compose.yml up -d
     ```

3. **Access Docker Container for Debugging** (Optional):
   - If you need to access the Docker container for debugging, use the following command:
     ```bash
     docker exec -it <container_name_or_id> bash
     ```

---

### **Option 3: Run the App Locally and Database in Docker**

For this option, the app will run locally while the database runs in a Docker container.

1. **Install Docker**:
   - Download and install Docker from [here](https://www.docker.com/get-started).

2. **Install Node.js**:
   - Download and install Node.js from [here](https://nodejs.org/en/download/).

3. **Run Database in Docker**:
   - Navigate to the project folder where the `docker-compose-db-only.yml` file is located:
     ```bash
     cd /path/to/your/project
     ```

   - Run the following command to start only the database container:
     ```bash
     docker-compose -f docker-compose-db-only.yml up -d
     ```

4. **Install Dependencies**:
   - Run `npm install` to install the required dependencies for the app:
     ```bash
     npm install
     ```

5. **Start the Application**:
   - Run `npm dev` to start the app locally:
     ```bash
     npm run dev
     ```

---

## Troubleshooting

- **If the database isn't connecting**: 
   - Make sure that Docker is running and that the containers are up. You can check the status with `docker ps`.

- **For debugging within Docker containers**:
   - Use `docker exec` to open a shell in the container:
     ```bash
     docker exec -it <container_name> bash
     ```

---


