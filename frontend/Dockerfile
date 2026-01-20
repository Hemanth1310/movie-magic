# --- STAGE 1: Build ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- STAGE 2: Production (Nginx) ---
FROM nginx:stable-alpine AS production
# Copy the custom nginx config for React Router support
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the 'dist' folder from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]