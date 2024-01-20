package controllers

import (
	"app/pkg/services"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type UsersController struct{}

type NoticeTokenRequest struct {
	Token string `json:"token"`
}

func (ct UsersController) Role(c *gin.Context) {
	user, _ := c.Get("User")
	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

func (ct UsersController) NoticeToken(c *gin.Context) {
	var req NoticeTokenRequest
	if err := c.BindJSON(&req); err != nil {
		// error処理
	}
	fmt.Println(req.Token)
	time.Sleep(time.Second * 10)
	services.PushMessage(req.Token, services.Message{Topic: "トピック", Title: "タイトル", Body: "ボディ", Tag: "タグ"})
}
