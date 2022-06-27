FROM node:14-alpine AS builder
MAINTAINER MLRfroms <admin@mlrit.ac.in>

WORKDIR /usr/src/app

RUN apk --update --no-cache add curl bash g++ make libpng-dev

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

COPY . ./

RUN yarn install --frozen-lock-file
RUN yarn build

# remove development dependencies
RUN npm prune --production

# run node prune
# there is some problem running node prune that then prevents the frontend to load (just start with /form/1 and it will crash)
#RUN /usr/local/bin/node-prune

FROM node:14-alpine
MAINTAINER MLRfroms <admin@mlrit.ac.in>

# Create a group and a user with name "mlrform".
RUN addgroup --gid 9999 mlrform && adduser -D --uid 9999 -G mlrform mlrform

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

ENV PORT=4000 \
    HIDE_CONTRIB=TRUE \
    NODE_ENV=production

# Change to non-root privilege
USER mlrform

CMD [ "yarn", "start" ]
