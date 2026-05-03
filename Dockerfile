FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy rest of the code
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
