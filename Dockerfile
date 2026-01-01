FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* tsconfig*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm run build:socket

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "socket:start"]
