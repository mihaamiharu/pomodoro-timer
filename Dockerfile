# Use a lightweight Node.js image as the base
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the frontend directory
COPY frontend/package.json frontend/package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the frontend files to the container
COPY frontend/. .

# Expose the port if a static server is used
EXPOSE 3000

# Serve static files with a simple HTTP server
RUN npm install -g http-server
CMD ["http-server", ".", "-p", "3000"]
