# Animal GO (Advance)

![](https://github.com/tf63/kawakera_advance/actions/workflows/django.yml/badge.svg)
<img src="https://img.shields.io/badge/-Django-092E20.svg?logo=django&style=flat"><img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=flat"><img src="https://img.shields.io/badge/-Docker-EEE.svg?logo=docker&style=flat"><img src="https://img.shields.io/badge/-Amazon%20AWS-232F3E.svg?logo=amazon-aws&style=flat">
![](https://img.shields.io/github/repo-size/tf63/kawakera_advance)
![](https://img.shields.io/github/languages/code-size/tf63/kawakera_advance)

![サムネイル](docs/img/thumbnail_animalgo.png)

### やりたいこと

### ロゴテスト
<img src="backend/docs/img/../../../docs/img/logos/django.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/github.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/docker.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/huggingface.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/react.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/openai.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/docker-compose.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/aws.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/figma.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/miro.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/postgresql.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/python.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/typescript.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/vite.svg" width="30" height="30">
<img src="backend/docs/img/../../../docs/img/logos/vscode.svg" width="30" height="30">

### 使いたい技術
- Docker, Github Actions
- DRF + React(TypeScript), AWS

### url
| url | page |
| - | - |
| / | ホーム画面 |

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

パッケージのインストール

```
    docker compose exec react yarn
```

(新規インストール)

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

### 参考
React (TypeScript) チュートリアル

https://zenn.dev/roiban/articles/473f9cbf2b793a

https://react.dev/learn/tutorial-tic-tac-toe#setup-for-the-tutorial
