FROM phusion/baseimage:jammy-1.0.1

ARG user=nanobus
ARG group=nanobus
ARG uid=1000
ARG gid=1000
ARG workdir=/opt/app

ARG BASE_DIR=components
ARG APP_NAME

# RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y libssl1.1  ca-certificates

WORKDIR ${workdir}

RUN groupadd -g ${gid} ${group} && useradd -u ${uid} -g ${group} -s /bin/sh ${user}

RUN chown ${user}:${group} ${workdir}

COPY --chown=${user}:${group} ${BASE_DIR}/${APP_NAME} .

RUN ln -s ${workdir}/${APP_NAME} /app

USER ${user}:${group}

RUN ls .

ENTRYPOINT [ "/app" ]

CMD ["/app"]
