FROM node:14-alpine AS builder
MAINTAINER MLRfroms <admin@mlrit.ac.in>

WORKDIR /usr/src/app

RUN apk update && apk add curl bash && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# just copy everhing
COPY . .

RUN touch /usr/src/app/src/schema.gql && chown 9999:9999 /usr/src/app/src/schema.gql

RUN yarn install --frozen-lockfile
RUN yarn build

# remove development dependencies
RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

FROM node:14-alpine
MAINTAINER MLRfroms <admin@mlrit.ac.in>

# Create a group and a user with name "mlrform".
RUN addgroup --gid 9999 mlrform && adduser -D --uid 9999 -G mlrform mlrform

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

ENV PORT=3000 \
    SECRET_KEY=ChangeMe \
    CREATE_ADMIN=FALSE \
    ADMIN_EMAIL=admin@mlrit.ac.in \
    ADMIN_USERNAME=root \
    ADMIN_PASSWORD=root \
    HIDE_CONTRIB=TRUE \
    NODE_ENV=production


EXPOSE 3000

# Change to non-root privilege
USER mlrform

CMD [ "yarn", "start:prod" ]
