FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port and run the service
EXPOSE 3003
CMD ["npm", "start"]
