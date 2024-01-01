# ベースイメージを指定
FROM golang:latest

# コンテナ内の作業ディレクトリを設定
WORKDIR /app

# ローカルのソースコードをコンテナにコピー
COPY . /app

# 必要なパッケージをインストール
RUN go mod download && go mod tidy

# アプリケーションをビルド
RUN go get github.com/cosmtrek/air && go build -o /go/bin/air github.com/cosmtrek/air

# コンテナのポートを公開
EXPOSE 8080

# アプリケーションを実行
CMD ["air", "-c", ".air.toml"]
