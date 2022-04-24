# Stage 1: BASE
FROM node:14.16.0-alpine3.13 AS base
WORKDIR /app
COPY package*.json ./

# Stage 2: LINT, BUILD, TEST and update SONARQUBE
FROM base AS build
RUN npm ci
COPY . .
RUN npm run lint
RUN npm run swagger
RUN npm run build
RUN npm run test
# Stage 3: RELEASE
FROM base AS release
RUN npm ci --prod --no-optional
COPY --from=build /app/dist ./dist

# Stage 4: FINAL
FROM gcr.io/distroless/nodejs:14
WORKDIR /app
COPY --from=release /app ./
EXPOSE 8000
USER 1000
CMD ["dist/index.js"]
