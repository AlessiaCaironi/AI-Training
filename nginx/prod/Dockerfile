# # set imagine
# FROM node:19.7.0-alpine

# # set work directory
# WORKDIR /usr/src/app

# # install all dependency
# # uso il carattere '*' per includere sia il file package.json che il file package-lock.json
# COPY package*.json ./

# RUN npm ci --force 

# # If you are building your code for production (da usare al posto di RUN npm install)
# # RUN npm ci --omit=dev

# RUN npm install react-scripts@5.0.1 -g 

# # copia codice app nell'immagine docker
# COPY . .

# EXPOSE 3000

# # primo comando da eseguire
# CMD ["npm", "start"]



# The first stage
# Build React static files
FROM node:19.7.0-alpine as build

WORKDIR /app/frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./

RUN npm ci --force
COPY ./frontend/ ./
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine

RUN apk upgrade 

# Copy config nginx
COPY ./nginx/prod/nginx.conf /etc/nginx/conf.d/default.conf

# copy slides
COPY ./slides/ /var/www/slides/

# copy frontend buildato
COPY --from=build /app/frontend/build /usr/share/nginx/html
# CMD nginx -g daemon off