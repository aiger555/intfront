# Step 1: Use an official Node.js image as the build environment
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application for production
RUN npm run build

# Step 2: Use an Nginx image to serve the built app
FROM nginx:alpine

# Copy the build output from the previous step to the Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
