'use strict';

var fs = require('fs'),
    path = require('path');

var flaschenpost = require('flaschenpost'),
    processEnv = require('processenv');

var Chord = require('../lib/Chord');

var chord,
    logger = flaschenpost.getLogger();

/*eslint-disable no-process-env*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
/*eslint-enable no-process-env*/

chord = new Chord({
  host: processEnv('HOST') || 'localhost',
  port: processEnv('PORT') || 3000,
  privateKey: fs.readFileSync(path.join(__dirname, 'keys', 'privateKey.pem')),
  certificate: fs.readFileSync(path.join(__dirname, 'keys', 'certificate.pem')),
  serviceInterval: processEnv('SERVICE_INTERVAL') || '30s'
});

chord.on('changed-successor', function (successor) {
  logger.info('Changed successor.', {
    successor: successor,
    status: chord.status()
  });
});

chord.on('changed-predecessor', function (predecessor) {
  logger.info('Changed predecessor.', {
    predecessor: predecessor,
    status: chord.status()
  });
});
