#!/bin/bash
#Start Stop pm2 for socket and start
cd /var/www/connectbudFE
/usr/bin/npm install
/usr/bin/npm run build
cp /var/www/connectbudFE/.htaccess /var/www/connectbudFE/build
/usr/bin/sudo service apache2 restart

