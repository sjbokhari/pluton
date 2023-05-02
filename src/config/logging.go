package config

import (
	"context"

	"golang.org/x/exp/slog"
)

type logCtxKey struct{}

func WithLogger(ctx context.Context, logger *slog.Logger) {

}
