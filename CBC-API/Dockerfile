# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies
RUN apt-get update && \
    apt-get install -y libfuse2 wget fuse-overlayfs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Download and make OpenSCAD AppImage executable
RUN wget -O /app/openscad.AppImage https://files.openscad.org/OpenSCAD-2021.01-x86_64.AppImage && \
    chmod +x /app/openscad.AppImage

# Load fuse-overlayfs module and check OpenSCAD version
RUN modprobe fuse-overlayfs && /app/openscad.AppImage -v

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run the application
CMD ["gunicorn", "app:app"]