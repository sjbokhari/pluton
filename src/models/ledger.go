package models

import (
	"time"
)

// Account holds the name and balance
type Account struct {
	Name    string
	Balance int64
	Comment string
}

// Transaction is the basis of a ledger. The ledger holds a list of transactions.
// A Transaction has a Payee, Date (with no time, or to put another way, with
// hours,minutes,seconds values that probably doesn't make sense), and a list of
// Account values that hold the value of the transaction for each account.
type Transaction struct {
	Date           time.Time
	Payee          string
	PayeeComment   string
	AccountChanges []Account
	Comments       []string
}

// Revenue adjusted to the current state of making taxes.
type Revenue struct {
	Id       string
	Name     string
	Comment  string
	Amount   float64
	IsIncome bool
}
