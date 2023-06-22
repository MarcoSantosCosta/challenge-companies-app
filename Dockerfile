FROM node:16.3.0 AS builder

WORKDIR /app
RUN git clone https://github.com/MarcoSantosCosta/challenge-companies-app.git
WORKDIR /app/challenge-companies-app
RUN yarn install
RUN yarn build

FROM nginx:1.21.1-alpine

COPY --from=builder /app/challenge-companies-app/build /usr/share/nginx/html
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
