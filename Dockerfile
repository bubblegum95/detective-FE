FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production
RUN npm run build

EXPOSE 4000
ENV PORT=4000

CMD ["npm", "start"]
