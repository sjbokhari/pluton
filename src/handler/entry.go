package handler

import "pluton/database"

type Handler struct {
	eDB *database.EntryDatabase
}

func New(eDB *database.EntryDatabase) *Handler {
	return &Handler{
		eDB: eDB,
	}
}
