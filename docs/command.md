# 各種コマンド

### .env生成
.env.exampleをコピー
django secret keyの生成
```
    >>> from django.core.management.utils import get_random_secret_key
    >>> get_random_secret_key()
```

### Docker
コンテナの起動
```
    docker compose up -d
```

コンテナの削除
```
    docker compose down
```

コンテナのリビルド
```
    docker compose up -d --build
```

### Django (Backend)

プロジェクトの作成 (Dockerfileでentrypointを読み込んでるせいで失敗するかも)
```
    docker compose exec django django-admin startproject <project_name>
```

fixtureの読み込み
```
    docker compose exec django python manage.py loaddata <fixture_file>
```

fixtureファイルの作成
- fixtureファイルはテーブルの中身をそのまま置き換える
```
    docker compose exec django python make_data.py
```

superuserの作成
```
    python manage.py createsuperuser
```

### React

プロジェクトの作成 (docker runでreact単体に対して実行したほうが良いかも)

```
    docker compose exec react yarn create vite . --template=react-ts
```

package.jsonからインストール

```
    docker compose exec react yarn
```

パッケージの新規インストール

```
    docker compose exec react npm i <パッケージ名>
```

サーバーの立ち上げ

```
    docker compose exec react yarn dev
```

本番環境のdocker-compose

```
    docker compose -f docker-compose.prod.yml up -d
```

**TypeScriptライブラリ**
- react-router-dom
- axios
- react-slick
