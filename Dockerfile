# Step 1: Use Node.js image to build the React application
FROM node:18 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire React app code to the container
COPY . .

# Step 6: Build the React application for production
RUN npm run build

# Step 7: Use an Nginx image to serve the build files
FROM nginx:alpine

# Step 8: Copy build files to Nginx's default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 90
EXPOSE 90

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
