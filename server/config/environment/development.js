'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,
  mongo: {
    uri: 	process.env.MONGO_URL ||
					'mongodb://localhost/fullstack-test'
  },

  seedDB: true
};
