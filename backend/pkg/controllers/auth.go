package controllers

import (
	"app/pkg/services"

	"github.com/gin-gonic/gin"
)

type AuthController struct{}

var jwtMiddleware, err = services.NewJwt()

func (ct AuthController) Login(c *gin.Context) {
	jwtMiddleware.LoginHandler(c)
}

func (ct AuthController) RefreshToken(c *gin.Context) {
	jwtMiddleware.RefreshHandler(c)
}
