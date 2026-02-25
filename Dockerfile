# Build Stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files and build
COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production

# Copy custom nginx configuration if needed, or use default
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
