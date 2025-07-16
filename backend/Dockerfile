# Use official slim Python image
FROM python:3.10-slim

# Install system dependencies needed for psycopg2 and netcat
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    netcat-openbsd \
 && rm -rf /var/lib/apt/lists/*

# Set working directory inside container
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django project files
COPY . .

# Copy and make entrypoint script executable
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose port 8000 for Django dev server
EXPOSE 8000

# Set the default command
CMD ["./entrypoint.sh"]
