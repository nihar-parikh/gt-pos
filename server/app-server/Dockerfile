FROM node:20-alpine
# update packages
RUN apk update
# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/src

# check files list
RUN ls -a

RUN npm install
RUN npm run build

ENV NODE_ENV prod
ENV PORT 8081

ENV DB_HOST 192.168.0.246:5984
ENV DB_PORT 3306
ENV DB_USER admin
ENV DB_PASSWORD password
ENV DB_NAME gtpos

ENV STORE_ID=0001

ENV CONNECTION_LINK 'http://admin:Ethics2024#5@192.168.0.246:5984/gtpos'


EXPOSE 8081

CMD [ "node", "./dist/app.js" ]
