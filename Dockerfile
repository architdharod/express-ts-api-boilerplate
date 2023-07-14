FROM node:lts-slim AS tsc-builder
WORKDIR /app
COPY package.json .
COPY tsconfig*.json ./
COPY src src
RUN rm -rf node_modules/
RUN npm install
RUN npx tsc --build --clean
RUN npx tsc 

FROM node:lts-slim
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --production --loglevel=verbose
COPY --from=tsc-builder /app/build ./build
RUN chown -R node:node .
USER node
EXPOSE 3000
CMD ["node", "./build/app.js"]