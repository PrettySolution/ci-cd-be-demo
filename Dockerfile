FROM public.ecr.aws/bitnami/node:16.15.1 as build
WORKDIR /usr/src/app
COPY . .
RUN npm i --production=false
RUN npm run build

FROM node:16.15.0-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /usr/src/app/ ./
#COPY --from=build /usr/src/app/src/config/ ./config/
CMD [ "npm", "run", "start" ]
EXPOSE 3000