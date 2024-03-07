# Use the official Node.js 20.11.1 image as the base image
FROM node:20.11.1-alpine

# Set the working directory in the container
WORKDIR /MUSICAPI

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose a port
EXPOSE 9000

# Specify the command to run the Node.js application
CMD [ "npm", "run", "start" ]