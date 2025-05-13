# データベースの起動
ビルドやアプリケーションの起動前に、必ずデータベース（PostgreSQL）を起動してください。
ポート等の設定は```src/main/resources/application.properties```に記述します。

## docker-composeを利用する場合
`taak/backend/compose.yml` にPostgreSQLの設定が記載されています。

### データベースの起動方法
```
docker compose up -d postgres
```

### データベースの停止方法
```
docker compose down postgres
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
java -jar build/libs/taak-0.0.1-SNAPSHOT.jar
```

# Dockerでの起動方法
TODO

