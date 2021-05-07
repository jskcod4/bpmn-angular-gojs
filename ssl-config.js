const fs = require('fs');

exports.privateKey = fs.readFileSync('/etc/ssl/virtwoo/private.pem').toString();
exports.certificate = fs.readFileSync('/etc/ssl/virtwoo/bundle.crt').toString();

