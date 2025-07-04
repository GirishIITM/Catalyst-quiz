FROM python:3.12-slim-bookworm
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

COPY . .

RUN rm -rf .venv

RUN uv add pyproject.toml

CMD ["uv", "run", "gunicorn", "--bind=0.0.0.0:80", "--timeout=600", "main:app"]
