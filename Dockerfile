FROM node:12.16.3
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
EXPOSE 3001 3030
# ENTRYPOINT ["npm", "run", "yelp"]
ENTRYPOINT ["npm", "run", "bitcoin"]