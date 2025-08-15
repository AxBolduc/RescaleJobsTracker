FROM python:3.13-slim 

WORKDIR /app 

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install uv

COPY uv.lock .
COPY pyproject.toml .

RUN uv sync

COPY manage.py .
COPY backend_project backend_project
COPY jobs jobs

EXPOSE 8000

CMD ["uv", "run", "gunicorn", "--bind", "0.0.0.0:8000", "backend_project.wsgi:application"]
