# Use Node.js LTS version as base image
FROM node:lts-alpine as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js project
RUN npm run build

# Expose the port on which Next.js app will run
EXPOSE 3000

# Command to run the Next.js app
CMD ["npm", "start"]
