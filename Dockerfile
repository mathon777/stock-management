FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm install -g nodemon
RUN npm install -g ts-node

EXPOSE 3000

CMD ["npm", "run", "dev"]