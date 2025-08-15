FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

COPY .env.production .env

RUN --mount=type=cache,target=/root/.npm \
    npm install install --frozen-lockfile

COPY . .

RUN npm run build

CMD ["npm", "run", "serve"]

FROM nginx:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
