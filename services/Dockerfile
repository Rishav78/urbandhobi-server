# for development
FROM node:latest as debug

WORKDIR /app

COPY . /app

RUN npm i

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["run", "start:dev"]

# for prodection
FROM node:latest as prod

WORKDIR /app

COPY . /app

RUN npm i
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["run", "start:prod"]