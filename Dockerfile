FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

RUN apt-get update && apt-get install -y \
    libnspr4 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libxshmfence1 \
    libx11-xcb1 \
    libgtk-3-0 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN chown -R node:node /app
USER node

EXPOSE 8081

CMD ["npm", "start", "--", "--host", "0.0.0.0"]