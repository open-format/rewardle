#!/bin/sh

if [ "$USE_CERTBOT" = "1" ]; then
    # If USE_CERTBOT is 1, substitute variables and output as-is
    envsubst '$SERVER_NAME $ALLOWED_ORIGINS' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
else
    # If USE_CERTBOT is not 1, remove certbot specific config
    sed '/###CERTBOT_CONFIG_START###/,/###CERTBOT_CONFIG_END###/d' /etc/nginx/conf.d/default.conf.template | envsubst '$SERVER_NAME $ALLOWED_ORIGINS' > /etc/nginx/conf.d/default.conf
fi

# Start Nginx
exec nginx -g 'daemon off;'
