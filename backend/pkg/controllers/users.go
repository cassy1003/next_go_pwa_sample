package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type UsersController struct{}

func (ct UsersController) Role(c *gin.Context) {
	user, _ := c.Get("User")
	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}
