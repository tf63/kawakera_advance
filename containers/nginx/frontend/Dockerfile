# Nginxのイメージを指定
FROM nginx:1.21-alpine

RUN apk add --no-cache bash

COPY containers/nginx/frontend/wait.sh /wait.sh

RUN chmod +x /wait.sh

CMD ["/wait.sh", "react:5173", "--", "nginx", "-g", "daemon off;"]

# ローカルのdefault.confをコンテナにコピー
COPY containers/nginx/frontend/conf.d/default.conf /etc/nginx/conf.d/default.conf