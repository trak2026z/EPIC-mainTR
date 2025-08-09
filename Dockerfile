FROM node:20-alpine
WORDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENVIRONMENT "CHOKIDAR_USEPOLLING=true"
CMD ["npm","start"]
