FROM node

WORKDIR /app

COPY package.json /app

RUN npm install -f

COPY . .

RUN npm run build

EXPOSE 4200
CMD ["npm", "run", "start"]
