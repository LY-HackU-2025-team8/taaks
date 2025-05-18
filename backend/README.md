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
API経由でのログインのみをサポートしています。

- 現状、テスト用のユーザーのみ利用可能です。
  - ユーザー名: `user`
  - パスワード: `password`
- エンドポイント: `/login`
- メソッド: `POST`
- リクエストボディ（JSON形式）:
  - `username`: ユーザー名
  - `password`: パスワード

ログインに成功すると、以下のようなBearerトークン（JWT）が返却されます。このトークンはレスポンスボディだけでなく、レスポンスヘッダー（`X-AUTH-TOKEN`）にも含まれます。以降のAPIリクエスト時に`X-AUTH-TOKEN`ヘッダーに`Bearer {トークン}`の形式で付与してください。

例:
```
X-AUTH-TOKEN: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyIiwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNzQ3NTYwMTQ4LCJleHAiOjE3NDc2NDY1NDh9.qY9noAGVM_KI7ea4N0Lo8afFIgY06GVs1B83sSz8Ouk
```

## 補足
Cookieによるセッション管理やフォームログインは廃止しました。

# テーブル情報
[ビルド](#jarファイルの作成)等をした際に生成される`backend/schema.sql`が参考になります
