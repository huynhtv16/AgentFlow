SHELL := /bin/bash

.PHONY: setup test build web clean

setup:
	uv sync --extra dev

test:
	uv run pytest --cov=agentflow --cov-report=term-missing

build:
	uv build

web:
	cd frontend && npm run dev:web

clean:
	rm -rf build dist htmlcov .coverage .pytest_cache .ruff_cache
	find src tests -type d -name __pycache__ -prune -exec rm -rf {} +
