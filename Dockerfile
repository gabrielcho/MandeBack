FROM node:19-alpine3.16

WORKDIR /app/mande
COPY package.json package.json
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]