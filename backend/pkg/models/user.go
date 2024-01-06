package models

import (
	"errors"
)

type User struct {
	ID    string
	Email string
	Type  string
}

type LoginRequest struct {
	Email    string `form:"email" json:"email" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
	Type     string `form:"type" json:"type" binding:"required"`
}

func FindLoginUser(req LoginRequest) (User, error) {
	// FIXME: DBから取得する
	return FindDummyUser(req)
}

// ここから
// DB作成前のダミーデータ

func DummyUsers() []map[string]string {
	return []map[string]string{
		{"id": "1", "type": "admin", "email": "admin@enechange.co.jp", "password": "admin"},
		{"id": "2", "type": "general", "email": "test@enechange.co.jp", "password": "test"},
	}
}

func FindDummyUser(req LoginRequest) (User, error) {
	for _, item := range DummyUsers() {
		if item["email"] == req.Email && item["password"] == req.Password && item["type"] == req.Type {
			return User{
				ID:    item["id"],
				Email: item["email"],
				Type:  item["type"],
			}, nil
		}
	}
	return User{}, errors.New("user not found")
}
