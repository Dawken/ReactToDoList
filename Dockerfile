FROM node:14-alpine

WORKDIR /ReactToDoList
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD ["npm", "start"]