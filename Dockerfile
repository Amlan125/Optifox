FROM mcr.microsoft.com/devcontainers/python:0-3.10
# Packages required to run the Azure CLI installation
RUN	apt-get update && apt-get -y install curl ffmpeg libsm6 libxext6

# [Optional] If your pip requirements rarely change, uncomment this section to add them to the image.
COPY ./requirements.txt .
RUN pip3 --disable-pip-version-check --no-cache-dir install -r requirements.txt
