FROM nginx:1.10.1

# Use Tini as the init process. Tini will take care of important system stuff
# for us, like forwarding signals and reaping zombie processes.
ADD https://github.com/krallin/tini/releases/download/v0.9.0/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

RUN rm /etc/nginx/conf.d/default.conf

COPY conf /etc/nginx
COPY start_nginx.sh /

CMD [ "/start_nginx.sh" ]
