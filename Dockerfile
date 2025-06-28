FROM node
WORKDIR /index
COPY . .
RUN npm install

EXPOSE 9000

CMD [ "npm", "start" ] 