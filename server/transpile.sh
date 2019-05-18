mkdir lib
babel index.js -o lib/index.js
babel config.js -o lib/config.js
babel routes -d lib/routes
babel controllers -d lib/controllers
babel models -d lib/models
babel seeders -d lib/seeders
cp package.json lib/package.json
cp swagger.json lib/swagger.json
cp package-lock.json lib/package-lock.json
