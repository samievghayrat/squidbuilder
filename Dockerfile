FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    vim \
    openjdk-17-jdk \
    maven \
    curl \
    gnupg \
    software-properties-common

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

ADD backend/squidbuilder /app/backend
ADD run.sh /app/run.sh
ADD frontend /app/frontend

WORKDIR /app/frontend
RUN npm install

RUN chmod +x /app/run.sh

WORKDIR /app

ENTRYPOINT ["/app/run.sh"]
