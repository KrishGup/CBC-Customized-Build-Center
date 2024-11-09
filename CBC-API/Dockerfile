# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies
RUN apt-get update && \
    apt-get install -y libfuse2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Make OpenSCAD AppImage executable
RUN chmod +x ./bin/openscad.AppImage

# Check OpenSCAD version
RUN ./bin/openscad.AppImage -v

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run the application
CMD ["gunicorn", "app:app"]