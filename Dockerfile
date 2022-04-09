FROM node:alpine

WORKDIR /verprof
COPY package.json /verprof
RUN npm i
COPY . /verprof
CMD ["npm", "start"]