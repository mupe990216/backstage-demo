# [Backstage Demo](https://demo.backstage.io)

Source code for the demo [Backstage](https://backstage.io/) instance deployed to [demo.backstage.io](https://demo.backstage.io).

Instructions for building your own Backstage instance can be found at the [Getting Started](https://backstage.io/docs/getting-started/) portion of the docs.

Personal instructions for install this tool by a shell script:

```
#!/bin/bash

# Install NodeJS
VERSION=v18.17.1
DISTRO=linux-x64
archivo="./node-$VERSION-$DISTRO.tar.xz"
if [ ! -e "$archivo" ]; then 
 wget https://nodejs.org/dist/v18.17.1/node-$VERSION-$DISTRO.tar.xz 
else
 echo "El archivo $archivo existe."
fi

sudo mkdir -p /usr/local/lib/nodejs
sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs 

{
 echo "# Nodejs"
 echo "VERSION=v18.17.1"
 echo "DISTRO=linux-x64"
 echo "export PATH=/usr/local/lib/nodejs/node-\$VERSION-\$DISTRO/bin:\$PATH" 
} >> ~/.profile

. ~/.profile

# Install yarn
npm install --global yarn
yarn --version

# Install docker
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
# Add Docker's official GPG key:
sudo apt-get update -y
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
sudo apt install docker-compose -y
# sudo docker run hello-world

# Install git
sudo apt install git-all -y

# Install postgresql
sudo apt install postgresql -y

# Verify limit of ENOSPC if next cat is below 64534 you can chenge it temporaly
cat /proc/sys/fs/inotify/max_user_watches
sudo sysctl fs.inotify.max_user_watches=102400
```
