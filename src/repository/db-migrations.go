package repository

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	migrate "github.com/rubenv/sql-migrate"
)

func Migrate(db *sqlx.DB, driver string) error {
	migrations := migrate.MemoryMigrationSource{
		Migrations: []*migrate.Migration{
			{
				Id: "create-table",
				Up: []string{
					`
					CREATE TABLE IF NOT EXISTS note_app
					(
						id uuid default gen_random_uuid(),
						title text not null,
						content text not null,
						primary key (id)
					);
					`,
				},
				Down: []string{
					"DROP TABLE notes_app",
				},
			},
		},
	}

	no, err := migrate.Exec(db.DB, driver, migrations, migrate.Up)
	if err != nil {
		return err
	}

	fmt.Printf("performed %v migrations", no)

	return nil
}
