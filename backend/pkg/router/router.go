package router

import (
	"app/pkg/controllers"
	"app/pkg/services"
	"log"

	"net/http"

	"github.com/gin-gonic/gin"
)

func Init() {

	//Ginフレームワークのデフォルトの設定を使用してルータを作成
	router := gin.Default()

	// CORS設定
	router.Use(setCORS)

	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	api := router.Group("/api")
	{
		authCtl := controllers.AuthController{}
		api.POST("/login", authCtl.Login)
		api.GET("/refresh_token", authCtl.RefreshToken)

		jwtMiddleware, err := services.NewJwt()

		if err != nil {
			log.Fatal(err)
			return
		}

		api.Use(jwtMiddleware.MiddlewareFunc())
		api.Use(func(c *gin.Context) {
			c.Set("UserID", services.UserIdInJwt(c))
		})
		users := api.Group("/users")
		{
			usersCtl := controllers.UsersController{}
			users.GET("/role", usersCtl.Role)
		}
	}

	// サーバー起動
	router.Run(":8080")
}

func setCORS(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
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
