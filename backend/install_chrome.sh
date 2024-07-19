#!/bin/bash

# Actualizar los paquetes e instalar dependencias necesarias
apt-get update
apt-get install -y wget unzip

# Descargar e instalar Chrome
wget -q -O /tmp/chrome.zip https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
unzip /tmp/chrome.zip -d /opt/chrome
ln -s /opt/chrome/chrome /usr/bin/google-chrome
