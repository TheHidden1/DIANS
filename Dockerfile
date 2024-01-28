FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm install esbuild@latest

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]