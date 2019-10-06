FROM node:12

ENV HOME /Coeus

WORKDIR ${HOME}
COPY . $HOME

RUN yarn install

ENV NODE_ENV development

# envs --
#ENV SECRET jbmpHPLoaV8N0nEpuLxlpT95FYakMPiu
#ENV MONGODB_URI mongodb://localhost:27017/coeusTest
#ENV REDIS_URL redis://redis:6379
#ENV RATE_LIMIT 100
# -- envs

# processes --
#ENV WEB_CONCURRENCY 1
# -- processes

EXPOSE 3000

CMD yarn dev