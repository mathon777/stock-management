FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install && npm install -g nodemon &&  npm install -g ts-node

EXPOSE 3000

CMD ["npm", "run", "dev"]