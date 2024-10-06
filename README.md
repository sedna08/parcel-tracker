# **PARCEL TRACKER WEB APP**
This application is a simple web app using the following stack:
    - Frontend -> NextJS using App Routing, TailwindCSS, TypeScript, and Axios for REST API connections
    - Backend -> NodeJS, TypeScript and TypeORM for database connection using Express for REST API
    - Database -> PostgreSQL

All are services (frontend, backend, and database) are containerized.

## **Pre-requisites**
- install `docker` on your machine
- Make sure to define environment variables in `.env` file:
    -   `POSTGRES_USER`
    -   `POSTGRES_PASSWORD`
    -   `POSTGRES_DB`
    -   `SERVER_PORT`
    -   `POSTGRES_PORT`

## **Run**
Clone the Repository and run:
    - `docker build`
    - `docker compose up -d`
    - access webapp on your browser using: http://localhost:3000

### **Sample Images**
    - Parcel Found in search:
        
![ParcelFound](img/ParcelFound.png)
        
    - Parcel Not Found in seach:
        
![ParcelNotFound](img/ParcelNotFound.png)