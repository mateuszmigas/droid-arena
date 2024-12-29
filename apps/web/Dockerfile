FROM droid-arena-base

# Install Node.js
USER root
# Install prerequisites
RUN apt-get update && apt-get install -y curl gnupg

# Add Node.js repository and install
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs


USER bun
WORKDIR /usr/src/app/apps/web
EXPOSE 5173

# Some workaround for rollup
# RUN bun install @rollup/rollup-linux-x64-musl
# RUN bun run build

CMD ["tail", "-f", "/dev/null"]
# ENTRYPOINT [ "bun", "run", "serve" ]

