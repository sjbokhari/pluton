package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	_ "github.com/mattn/go-sqlite3"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func main() {
	db := initDB()
	defer db.Close()

	e := echo.New()

	e.GET("/users", getUsers(db))
	e.GET("/users/:id", getUser(db))
	e.POST("/users", createUser(db))
	e.PUT("/users/:id", updateUser(db))
	e.DELETE("/users/:id", deleteUser(db))

	e.Logger.Fatal(e.Start(":6606"))
}

func initDB() *sql.DB {
	db, err := sql.Open("sqlite3", "../data/users.db")
	if err != nil {
		log.Fatal(err)
	}

	query := `
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			email TEXT
		)
	`

	_, err = db.Exec(query)
	if err != nil {
		log.Fatal(err)
	}

	return db
}

func getUsers(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		rows, err := db.Query("SELECT id, name, email FROM users")
		if err != nil {
			return err
		}
		defer rows.Close()

		users := []User{}
		for rows.Next() {
			var user User
			err := rows.Scan(&user.ID, &user.Name, &user.Email)
			if err != nil {
				return err
			}
			users = append(users, user)
		}

		return c.JSON(http.StatusOK, users)
	}
}

func getUser(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")

		var user User
		err := db.QueryRow("SELECT id, name, email FROM users WHERE id = ?", id).Scan(&user.ID, &user.Name, &user.Email)
		if err != nil {
			if err == sql.ErrNoRows {
				return echo.NewHTTPError(http.StatusNotFound, "User not found")
			}
			return err
		}

		return c.JSON(http.StatusOK, user)
	}
}

func createUser(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		user := new(User)
		if err := c.Bind(user); err != nil {
			return err
		}

		result, err := db.Exec("INSERT INTO users (name, email) VALUES (?, ?)", user.Name, user.Email)
		if err != nil {
			return err
		}

		id, _ := result.LastInsertId()
		user.ID = int(id)

		return c.JSON(http.StatusCreated, user)
	}
}

func updateUser(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")

		user := new(User)
		if err := c.Bind(user); err != nil {
			return err
		}

		_, err := db.Exec("UPDATE users SET name = ?, email = ? WHERE id = ?", user.Name, user.Email, id)
		if err != nil {
			return err
		}

		return c.NoContent(http.StatusOK)
	}
}

func deleteUser(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")

		_, err := db.Exec("DELETE FROM users WHERE id = ?", id)
		if err != nil {
			return err
		}

		return c.NoContent(http.StatusOK)
	}
}
