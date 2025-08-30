# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++

# Copy package files (if they exist)
COPY package*.json ./

# Install dependencies (if package.json exists)
RUN if [ -f package.json ]; then npm ci; fi

# Copy source code
COPY . .

# Create a basic package.json if it doesn't exist
RUN if [ ! -f package.json ]; then \
    echo '{"name":"web-app","version":"1.0.0","scripts":{"start":"node -e \"console.log(\"Web app placeholder - add your React app here\")\""}}' > package.json; \
    fi

# Expose port
EXPOSE 3002

# Start the application
CMD ["npm", "start"]


