FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available ([email protected]+)
COPY package*.json ./

# Bundle app source
COPY . .

#RUN npm run setup
RUN npm install -g grunt-cli --force
RUN yarn install --check-files
RUN yarn setup
RUN grunt build



EXPOSE 2368

CMD [ "yarn","start"]
