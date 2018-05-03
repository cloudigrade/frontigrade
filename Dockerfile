FROM node:8-alpine

# Setup directory
WORKDIR /app

# Add/copy code
ADD . /app

# Create build
RUN yarn --production --non-interactive --silent \
    && yarn build >/dev/null \
    && yarn cache clean

USER node
EXPOSE 3000
CMD [ "node", "./scripts/serve" ]
