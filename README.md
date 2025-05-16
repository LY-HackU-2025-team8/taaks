# Taak!

## 開発フロー

[Figma](https://www.figma.com/board/ecICLBaXowdk7WI72liM6Q/Home-space?node-id=3-6531&t=7JgjMehghL4n5deg-1)も参照

1. Issue を立てる
   - プロジェクトの設定をする
2. Issue に対してブランチを切る
   - ブランチ名のルールは下記参照
3. コードを書く
4. PR を作成する
   - プロジェクトの設定をする
5. CI が通ることを確認する
6. コードレビューを依頼する
   - Project のステータスを`レビュー待ち`にする
7. マージする

## ブランチ運用

- GitHub Flow を採用する
- ブランチ名は`feature/[issue-id]-[feature-name]`の形式で作成する

## PR 運用

### マージされるためのルール

- 1 名以上の Approve があること
- CI が通っていること
