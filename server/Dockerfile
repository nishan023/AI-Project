# Use a Node.js image for development
FROM node:16-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./

# install all the packages
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application in development mode
CMD ["npm", "run", "start:dev"]
