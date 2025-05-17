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
現状だとデフォルトのフォームログインだけです。登録や削除だったり、APIだったりはありません。 
以下のユーザーが自動で登録されるので、ログインできるはず。 
## ユーザー情報

```
user
password
```
# セッション管理
セッション管理はCookieで行われています。
例：
```
JSESSIONID=5BF8FFAA033EECCDE16385B1057AE3BD
```

## REST APIでのログイン
これから実装します。
[公式ドキュメント](https://spring.pleiades.io/spring-security/reference/servlet/authentication/passwords/)を参考にする予定です。

# テーブル情報
[ビルド](#jarファイルの作成)等をした際に生成される`backend/schema.sql`が参考になります
