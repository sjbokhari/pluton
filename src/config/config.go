package config

import "flag"

type Config struct {
	URI  string
	Port int
}

func (cfg *Config) SetupFlags() *flag.FlagSet {
	fs := flag.NewFlagSet("application service", flag.ContinueOnError)
	fs.StringVar(&cfg.URI, "database", "postgres://admin@localhost:5432/pluton?sslmode=disable", "Database URI for Postgres")
	fs.IntVar(&cfg.Port, "port", 6889, "listen port for server")

	return fs
}
