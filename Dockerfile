# Use the official Node.js 14 image
FROM node:20.13.1

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    unixodbc unixodbc-dev

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild bcrypt
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]
