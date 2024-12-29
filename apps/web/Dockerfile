FROM droid-arena-base

USER bun
WORKDIR /usr/src/app/apps/web
EXPOSE 5173

# Some workaround for rollup
RUN bun install @rollup/rollup-linux-x64-musl
RUN bun run build

# CMD ["tail", "-f", "/dev/null"]
ENTRYPOINT [ "bun", "run", "serve" ]

