#!/bin/sh
set -e

CERT_DIR="/etc/letsencrypt/live/${DOMAIN}"

# nginx will not start without a certificate file, and certbot cannot pass its
# HTTP-01 challenge until nginx is serving. This placeholder breaks that deadlock
# on first boot; the real certificate replaces it once certbot has run.
if [ ! -f "${CERT_DIR}/fullchain.pem" ]; then
    echo "No certificate for ${DOMAIN}; issuing a temporary self-signed one."
    mkdir -p "${CERT_DIR}"
    openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
        -keyout "${CERT_DIR}/privkey.pem" \
        -out    "${CERT_DIR}/fullchain.pem" \
        -subj   "/CN=${DOMAIN}"
fi
