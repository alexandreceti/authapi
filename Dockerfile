FROM node:8
MAINTAINER Alexandre Cunha C. Oliveira
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
