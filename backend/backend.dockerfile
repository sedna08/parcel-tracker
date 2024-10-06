# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install ts-node globally
RUN npm install -g ts-node

# Copy the .env file to the working directory
COPY .env .env

# Expose the port the app runs on (Use a different port for backend and frontend)
EXPOSE ${PORT}

# Command to run the application, you can use index.ts also
CMD ["ts-node", "src/app.ts"]
