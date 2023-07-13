package handler

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func InitDB() *sql.DB {
	db, err := sql.Open("sqlite3", "../data/revenues.db")
	if err != nil {
		log.Fatal(err)
	}

	query := `
		CREATE TABLE IF NOT EXISTS revenue (
			id TEXT PRIMARY KEY,
			date DATETIME,
			name TEXT,
			comment TEXT,
			amount REAL,
			isIncome BOOLEAN NOT NULL CHECK (isIncome IN (0, 1))
		)
	`

	_, err = db.Exec(query)
	if err != nil {
		log.Fatal(err)
	}

	return db
}
