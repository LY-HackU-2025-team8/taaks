# データベースの起動

ビルドやアプリケーションの起動前に、必ずデータベース（PostgreSQL）を起動してください。
ポート等の設定は`src/main/resources/application.properties`に記述します。

## docker-composeを利用する場合

`taaks/backend/compose.yaml` にPostgreSQLの設定が記載されています。

### データベースの起動方法

```
docker compose up -d postgres
```

### データベースの停止方法

```
docker compose stop postgres
```

# ビルド手順

## jarファイルの作成

```
./gradlew build
```

## Dockerイメージの作成

```
./gradlew bootBuildImage
```

# アプリケーションの起動

## 通常起動

事前にビルドは不要です。以下のコマンドでアプリケーションを起動できます。

```
./gradlew bootRun
```

## jarファイルからの起動

ビルド済みのjarファイルを直接実行する場合は、以下のコマンドを使用してください。

```
java -jar build/libs/taaks-0.0.1-SNAPSHOT.jar
```

## Dockerでの起動方法
事前に[`./gradlew bootBuildImage`](#dockerイメージの作成)をしてください
### PostgreSQLも同時に起動させる場合

```
docker compose up -d
```

### アプリケーションだけ起動させる場合

```
docker compose up -d taaks-backend
```

# ログイン

フォーム認証（画面からのログイン）は廃止され、API経由でのログインのみをサポートしています。

- 現状、テスト用のユーザーのみ利用可能です。
  - ユーザー名: `user`
  - パスワード: `password`
- エンドポイント: `/login`
- メソッド: `POST`
- リクエストボディ（JSON形式）:
  - `username`: ユーザー名
  - `password`: パスワード

# セッション管理
セッション管理はCookieで行われています。
例：
```
JSESSIONID=5BF8FFAA033EECCDE16385B1057AE3BD
```

# CSRF対策・API利用手順

Spring SecurityのCSRF対策を有効にしています。
APIを利用する際は、以下の手順で操作してください。

---

## 1. ログイン

まず、ログインAPIを呼び出してセッションID（JSESSIONID）を取得します。

```sh
curl -D - -X POST -H "Content-Type: application/json" \
  -d '{"username":"user", "password":"password"}' \
  http://localhost:8080/login
```

レスポンス例:
```
HTTP/1.1 200 
Set-Cookie: JSESSIONID=323B89F9D8C0D861D5BDEEBEEBC17C6B; Path=/; HttpOnly
...
```

---

## 2. CSRFトークンの取得

取得したJSESSIONIDをCookieとして付与し、CSRFトークンを取得します。

```sh
curl -D - -b "JSESSIONID=323B89F9D8C0D861D5BDEEBEEBC17C6B" http://localhost:8080/csrf
```

レスポンス例:
```
HTTP/1.1 200 
Set-Cookie: XSRF-TOKEN=58282c27-ec54-4811-975b-1f2a7e8d82c7; Path=/
X-XSRF-TOKEN: TLyYkmeXlehLMfjTgKnu1pY356hcyjNwqj_kxfT6A1Gi9DdleYSqqlX0p99mVJvmtITa7qcGypFr_1Fdm1nWpMOfOzWaxlRS
...
```

---

## 3. 認証付きAPIの呼び出し（CSRFトークン利用）

取得したJSESSIONIDとXSRF-TOKENをCookieに、X-XSRF-TOKENをヘッダーに付与してAPIを呼び出します。

```sh
curl -D - -X POST http://localhost:8080/auth-check \
  -H "Content-Type: application/json" \
  -H "X-XSRF-TOKEN: TLyYkmeXlehLMfjTgKnu1pY356hcyjNwqj_kxfT6A1Gi9DdleYSqqlX0p99mVJvmtITa7qcGypFr_1Fdm1nWpMOfOzWaxlRS" \
  -b "JSESSIONID=323B89F9D8C0D861D5BDEEBEEBC17C6B; XSRF-TOKEN=58282c27-ec54-4811-975b-1f2a7e8d82c7" \
  -d '{}'
```

レスポンス例:
```
HTTP/1.1 200 
Content-Type: text/plain;charset=UTF-8

Authenticated!
username: user
param: null
```

---

※ yamamura-laptop などのプロンプトや余計な出力は削除し、コマンド・レスポンス例のみを掲載しています。

# テーブル情報
[ビルド](#jarファイルの作成)等をした際に生成される`backend/schema.sql`が参考になります
