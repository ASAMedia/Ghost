FROM ghost:3.40.1-alpine
ENV GHOST_INSTALL /var/lib/ghost
ENV GHOST_CONTENT /var/lib/ghost/content
COPY ./.dist/release/ /var/lib
RUN set -eux; \
	cd "$GHOST_INSTALL"; \
	\
	chmod 775 "$GHOST_CONTENT";\
	chown node:node "$GHOST_CONTENT"; \
	su-exec node ghost update --force --zip /var/lib/Ghost-3.40.2.zip; \
	\
	su-exec node yarn cache clean; \
	su-exec node npm cache clean --force; \
	npm cache clean --force; \
	rm -rv /tmp/yarn* /tmp/v8*

