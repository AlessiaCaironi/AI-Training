# for windows containers
FROM python:3.11-alpine

# set environment variables
# PYTHONUNBUFFERED=1 means that python output is logged to the terminal, allowing Django logs to be monitored in real-time
ENV PYTHONUNBUFFERED=1                  
ENV PYTHONDONTWRITEBYTECODE=1

# set work directory
WORKDIR /app/backend

COPY requirements.txt /app/backend/

# specifico cache per i pacchetti da installare, per non doverli fetchare ogni volta
RUN --mount=type=cache,target=/root/.cache/pip pip install --upgrade pip \
    && pip install gunicorn \
    && pip install -r requirements.txt 

# copy project
COPY . /app/backend/

EXPOSE 8000

CMD [ "gunicorn", "backend.wsgi", "--bind 0.0.0.0:8000" ]