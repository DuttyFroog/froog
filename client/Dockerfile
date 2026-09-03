FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Sequential on purpose: parallel builds race on node_modules/.cache/native-federation.
RUN npx ng build shell       --configuration production \
 && npx ng build portfolio   --configuration production \
 && npx ng build sandbox     --configuration production \
 && npx ng build share-files --configuration production


FROM nginx:1.27-alpine AS final
RUN apk add --no-cache openssl

# The shell must sit at the web root: Native Federation resolves the host's own
# remoteEntry.json and shared bundles relative to the document base href ("/").
COPY --from=build /app/dist/shell/browser/       /usr/share/nginx/html/
COPY --from=build /app/dist/portfolio/browser/   /usr/share/nginx/html/mfe/portfolio/
COPY --from=build /app/dist/sandbox/browser/     /usr/share/nginx/html/mfe/sandbox/
COPY --from=build /app/dist/share-files/browser/ /usr/share/nginx/html/mfe/share-files/

# Same-origin remote URLs replace the localhost ones used in development.
COPY projects/shell/federation.manifest.prod.json /usr/share/nginx/html/assets/federation.manifest.json

COPY docker/default.conf.template /etc/nginx/templates/default.conf.template
COPY docker/10-ensure-cert.sh     /docker-entrypoint.d/10-ensure-cert.sh
RUN chmod +x /docker-entrypoint.d/10-ensure-cert.sh

EXPOSE 80 443
