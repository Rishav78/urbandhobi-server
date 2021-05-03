FROM nginx:1.17-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./files /usr/share/nginx/html/
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;'"]