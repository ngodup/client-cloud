# Use an official Node runtime as the base image (Node.js 16)
FROM node:21-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Build the app
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
