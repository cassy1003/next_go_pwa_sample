package middleware

import (
	"app/pkg/services"

	"github.com/gin-gonic/gin"
)

func SetCORS(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // FIXME
	c.Writer.Header().Set("Access-Control-Max-Age", "86400")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

	if c.Request.Method == "OPTIONS" {
		c.AbortWithStatus(204)
		return
	}

	c.Next()
}

func SetUser(c *gin.Context) {
	c.Set("User", services.UserInJwt(c))
}
