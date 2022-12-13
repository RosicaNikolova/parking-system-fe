# Filename: Dockerfile 
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Arguments
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
EXPOSE 3000
CMD ["npm", "start"]