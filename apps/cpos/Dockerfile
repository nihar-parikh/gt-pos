FROM node:20 AS build-step
#ARG API_URL
ARG REACT_APP_BACKEND_API_URL
ARG REACT_APP_PLATFORM
WORKDIR /build
# Copy root-level files
COPY package.json package-lock.json turbo.json ./

# Copy workspace package.json files
COPY apps/web/package.json apps/web/
COPY packages/*/package.json packages/*/

# Copy full monorepo
#COPY . .
#COPY package.json ./
#RUN npm install --legacy-peer-deps
COPY . .

# Install dependencies for the monorepo
RUN npm install

ENV REACT_APP_BACKEND_API_URL=${REACT_APP_BACKEND_API_URL}
ENV REACT_APP_PLATFORM=${REACT_APP_PLATFORM}
#RUN npm run build
# Build only the web app
RUN npx turbo run build --filter=web...

FROM nginx:1.18-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build-step /build/build /frontend/build

COPY apps/web/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/apps/web/build /frontend/build
