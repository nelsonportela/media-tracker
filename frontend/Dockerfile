# Use Node.js LTS (Alpine) for a lightweight image
FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Ensure correct permissions for node_modules
RUN chmod -R 777 node_modules

# Copy the rest of the application
COPY . .

# Expose the Vite development server port
EXPOSE 5173

# Command to run the Vite development server
CMD ["tail", "-f", "/dev/null"]