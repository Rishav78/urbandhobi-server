FROM nginx:1.17-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;'"]