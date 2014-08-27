'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
	  uri: 		process.env.MONGO_URL ||
					  'mongodb://localhost/fullstack-test'
  }
};