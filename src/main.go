package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/mattn/go-sqlite3"
	"github.com/sjbokhari/pluton/models"
)

func main() {
	db := initDB()
	defer db.Close()

	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/transactions", getTransactions(db))
	e.GET("/transactions/:id", getTransaction(db))
	e.POST("/transactions", createTransaction(db))
	e.PUT("/transactions/:id", updateTransaction(db))
	e.DELETE("/transactions/:id", deleteTransaction(db))

	e.Logger.Fatal(e.Start(":6606"))
}

func initDB() *sql.DB {
	db, err := sql.Open("sqlite3", "../data/transactions.db")
	if err != nil {
		log.Fatal(err)
	}

	query := `
		CREATE TABLE IF NOT EXISTS revenue (
			id TEXT PRIMARY KEY,
			name TEXT,
			comment TEXT
			amount NUMERIC
			isIncome BOOL
		)
	`

	_, err = db.Exec(query)
	if err != nil {
		log.Fatal(err)
	}

	return db
}

func getTransactions(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		rows, err := db.Query("SELECT * FROM revenue")
		if err != nil {
			return err
		}
		defer rows.Close()

		revenues := []models.Revenue{}
		for rows.Next() {
			var revenue models.Revenue
			err := rows.Scan(&revenue.Id, &revenue.Name, &revenue.Comment, &revenue.Amount, &revenue.IsIncome)
			if err != nil {
				return err
			}
			revenues = append(revenues, revenue)
		}

		return c.JSON(http.StatusOK, revenues)
	}
}

func getTransaction(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")

		var revenue models.Revenue
		err := db.QueryRow("SELECT id, name, comment, amount, isIncome FROM revenue WHERE id = ?", id).Scan(&revenue.Id, &revenue.Name, &revenue.Comment, &revenue.Amount, &revenue.IsIncome)
		if err != nil {
			if err == sql.ErrNoRows {
				return echo.NewHTTPError(http.StatusNotFound, "Revenue not found")
			}
			return err
		}

		return c.JSON(http.StatusOK, revenue)
	}
}

func createTransaction(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		revenue := new(models.Revenue)
		if err := c.Bind(revenue); err != nil {
			return err
		}
		revenue.Id = uuid.NewString()
		_, err := db.Exec("INSERT INTO revenue (id, name, comment, amount, isIncome) VALUES (?, ?, ?, ?, ?)", revenue.Id, revenue.Name, revenue.Comment, revenue.Amount, revenue.IsIncome)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusCreated, revenue)
	}
}

func updateTransaction(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")

		revenue := new(models.Revenue)
		if err := c.Bind(revenue); err != nil {
			return err
		}

		_, err := db.Exec("UPDATE users SET name = ?, comment = ?, amount = ?, isIncome = ? WHERE id = ?", revenue.Name, revenue.Comment, revenue.Amount, revenue.IsIncome, id)
		if err != nil {
			return err
		}

		return c.NoContent(http.StatusOK)
	}
}

func deleteTransaction(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")

		_, err := db.Exec("DELETE FROM revenue WHERE id = ?", id)
		if err != nil {
			return err
		}

		return c.NoContent(http.StatusOK)
	}
}
