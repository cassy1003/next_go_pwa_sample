package router

import (
	"app/pkg/controllers"
	"app/pkg/middleware"
	"app/pkg/services"
	"log"

	"net/http"

	"github.com/gin-gonic/gin"
)

func Init() {
	router := gin.Default()

	// CORS設定
	router.Use(middleware.SetCORS)

	// 認証設定
	jwtMiddleware, err := services.NewJwt()
	if err != nil {
		log.Fatal(err)
		return
	}

	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	api := router.Group("/api")
	{
		authCtl := controllers.AuthController{}

		// 認証が不要なエンドポイント
		api.POST("/login", authCtl.Login)
		api.GET("/refresh_token", authCtl.RefreshToken)

		// 認証が必要なエンドポイント
		api.Use(jwtMiddleware.MiddlewareFunc())
		api.Use(middleware.SetUser)
		users := api.Group("/users")
		{
			usersCtl := controllers.UsersController{}
			users.GET("/role", usersCtl.Role)
		}
	}

	// サーバー起動
	router.Run(":8080")
}
