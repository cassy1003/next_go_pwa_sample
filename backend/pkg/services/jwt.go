package services

import (
	"app/pkg/models"
	"strings"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

func NewJwt() (*jwt.GinJWTMiddleware, error) {
	jwtMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:      "test zone",
		Key:        []byte("secret key"),
		Timeout:    time.Hour * 24,
		MaxRefresh: time.Hour * 24 * 7,
		SendCookie: false,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			return jwt.MapClaims{
				jwt.IdentityKey: data,
			}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var l models.LoginRequest

			if err := c.ShouldBind(&l); err != nil {
				return "", jwt.ErrMissingLoginValues
			}

			user, err := models.FindDummyUser(l)
			if err != nil {
				return "", jwt.ErrFailedAuthentication
			}

			return user, nil
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {
			pathType := "general"
			if strings.HasPrefix(c.Request.URL.Path, "/api/admin") {
				pathType = "admin"
			}

			user, ok := data.(map[string]interface{})
			return ok && user["Type"] == pathType
		},
	})

	if err != nil {
		return nil, err
	}

	err = jwtMiddleware.MiddlewareInit()

	if err != nil {
		return nil, err
	}

	return jwtMiddleware, nil
}

func UserInJwt(c *gin.Context) interface{} {
	claims := jwt.ExtractClaims(c)
	user := claims[jwt.IdentityKey]
	return user
}
