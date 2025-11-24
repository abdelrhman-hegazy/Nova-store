
# Use a lightweight Node.js base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /usr/src/server

# Copy package.json and package-lock.json (if present)
# to install dependencies
COPY package*.json ./

# Install application dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port your Express app listens on
EXPOSE 3000

# Command to run the application when the container starts
CMD [ "node", "dist/server.js" ]