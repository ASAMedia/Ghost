# https://docs.ghost.org/faq/node-versions/
# https://github.com/nodejs/LTS
# https://github.com/TryGhost/Ghost/blob/3.3.0/package.json#L38
FROM ghost:3.36.0
ENV GHOST_INSTALL /var/lib/ghost
ENV GHOST_CONTENT /var/lib/ghost/content
COPY ./.dist/release/ /var/lib
RUN set -eux; \
	cd "$GHOST_INSTALL"; \
	\
	chmod 775 "$GHOST_CONTENT";\
	chown node:node "$GHOST_CONTENT"; \
	gosu node ghost update --zip /var/lib/Ghost-3.37.1.zip; \
	\
	gosu node yarn cache clean; \
	gosu node npm cache clean --force; \
	npm cache clean --force; \
	rm -rv /tmp/yarn* /tmp/v8*

