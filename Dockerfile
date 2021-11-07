
FROM node:lts-alpine3.12 as development

ENV WORKDIR="/app"

WORKDIR ${WORKDIR}
VOLUME /app

EXPOSE 3000-3002

CMD ["npm", "start"]