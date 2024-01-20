package services

import (
	"context"
	"fmt"
	"log"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
	"google.golang.org/api/option"
)

type Message struct {
	Topic string
	Title string
	Body  string
	Tag   string
}

func PushMessage(token string, msg Message) {
	ctx := context.Background()
	// Firebase初期化
	client, err := firebaseInit(ctx)
	if err != nil {
		log.Fatal(err)
	}

	message := createMessage(token, msg)

	// Send a message to the devices subscribed to the provided topic.
	response, err := client.Send(ctx, message)
	if err != nil {
		log.Fatalln(err)
	}
	// Response is a message ID string.
	log.Println("Successfully sent message:", response)
}

func createMessage(token string, msg Message) *messaging.Message {
	/*
		// android用の設定初期化
		android := new(messaging.AndroidConfig)
		// 通知優先度設定
		android.Priority = "high"
		// android用の通知設定初期化
		androirNotification := new(messaging.AndroidNotification)
		// チャンネル設定(Android8以降は必須。受信する側の設定と合わせる)
		androirNotification.ChannelID = "channel_1"
		// タグ設定(あってもなくてもいい)
		androirNotification.Tag = tag
		android.Notification = androirNotification
	*/
	// 大本の通知設定の初期化
	notification := new(messaging.Notification)
	// タイトル
	notification.Title = msg.Title + "!"
	// 本文
	notification.Body = msg.Body + "!"
	// メッセージ構造体の初期化
	message := &messaging.Message{
		// データの設定(通知を出す前にデータだけ受け取りたいときはこっちに設定する)
		Data: map[string]string{
			"title": msg.Title,
			"body":  msg.Body,
		},
		// Android用の設定
		//Android: android,
		// 通知設定
		Notification: notification,
		// 配信先(トピック)
		//Topic: topic,
		//Token: "ckulxlSCUrtky5kc5X0ebl:APA91bHDUmzDAh8WC4HR0O8aGwCgRQsN9CWz0-m4ZDKMSayfrlF3tSXS5lcKls7Wn0kxrIw9aS5ExJ4ioFtIwDcBl33QxJk0RqoyfToD-7Hw5yAZT0p1KB_fDCE6RrLcYMGbaAEqfVn5",
		Token: token,
	}
	return message
}

// firebaseInit Firebaseの初期化
func firebaseInit(ctx context.Context) (*messaging.Client, error) {
	// Use a service account
	opt := option.WithCredentialsFile("pkg/services/fcm_account_key.json")
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		fmt.Println(err)
		log.Fatalln(err)
		return nil, err
	}

	client, err := app.Messaging(ctx)
	if err != nil {
		log.Fatalln(err)
		return nil, err
	}

	return client, nil
}
