#################
## DEVELOPMENT ##
#################
FROM node:alpine AS development

WORKDIR /workers/queues

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

################
## PRODUCTION ##
################
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /workers/queues

COPY --from=development /workers/queues .

CMD [ "node", "dist/main" ]