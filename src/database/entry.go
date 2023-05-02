package database

import (
	"pluton/entity"

	"github.com/jmoiron/sqlx"
)

type EntryDatabase struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) *EntryDatabase {
	return &EntryDatabase{
		db: db,
	}
}

func (entryDatabase *EntryDatabase) FetchAllNotes() ([]entity.Entry, error) {
	var notes []entity.Entry
	err := entryDatabase.db.Select(&notes, "SELECT * FROM note_app")
	if err != nil {
		return nil, err
	}
	return notes, nil

}

func (NotesDB *EntryDatabase) FetchNoteByID(id string) ([]entity.Entry, error) {
	var notes []entity.Entry
	err := NotesDB.db.Get(&notes, "SELECT * FROM note_app WHERE id=$1", id)
	if err != nil {
		return nil, err
	}
	return notes, nil
}

func (NotesDB *EntryDatabase) SaveNote(note []entity.Entry) error {
	_, err := NotesDB.db.Exec("INSERT INTO note_app (id, title, content) VALUES (:id, :title, :content)", note)
	if err != nil {
		return err
	}
	return nil
}
