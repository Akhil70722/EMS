#!/bin/sh

echo "⏳ Waiting for PostgreSQL..."

# Loop until DB is ready
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "✅ PostgreSQL is up - running migrations..."
python manage.py migrate

echo "🚀 Starting server..."
python manage.py runserver 0.0.0.0:8000
