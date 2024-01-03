package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type UsersController struct{}

func (ct UsersController) Role(c *gin.Context) {
	userID, _ := c.Get("UserID")
	c.JSON(http.StatusOK, gin.H{
		"userID": userID,
	})
}
