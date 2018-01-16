FROM node:carbon
WORKDIR /usr/app

RUN npm install nodemon -g
RUN npm install bower -g

COPY package*.json ./

RUN npm install --production

COPY . .
EXPOSE 8080
CMD ["npm", "start"]
