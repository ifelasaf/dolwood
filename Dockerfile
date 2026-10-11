FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_YANDEX_METRICA_ID
ARG NEXT_PUBLIC_YANDEX_VERIFICATION
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_YANDEX_METRICA_ID=$NEXT_PUBLIC_YANDEX_METRICA_ID
ENV NEXT_PUBLIC_YANDEX_VERIFICATION=$NEXT_PUBLIC_YANDEX_VERIFICATION
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=build /app/out ./out
COPY server/server.mjs server/export.mjs server/backup.mjs ./server/
RUN mkdir /data && chown node:node /data
USER node
ENV HOST=0.0.0.0 PORT=4174 DB_PATH=/data/leads.sqlite
EXPOSE 4174
CMD ["node", "server/server.mjs"]
