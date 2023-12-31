#!/bin/sh
python manage.py makemigrations api
python manage.py migrate --noinput
python manage.py collectstatic --noinput
python manage.py loaddata api/fixtures/*.json

# 環境変数のDEBUGの値がTrueの時はrunserverを、Falseの時はgunicornを実行します
# シェルスクリプトでは`[`と`$DEBUG`、`1`と`]`の間にスペースを一つ空けておかないと[]内の式を認識できないので注意
if [ $DEBUG = 1 ]; then
    python manage.py runserver 0.0.0.0:8000
elif [ $DEBUG = 0 ]; then
    # gunicornを起動させる時はプロジェクト名を指定します
    gunicorn backend.wsgi:application --bind 0.0.0.0:8000
fi
