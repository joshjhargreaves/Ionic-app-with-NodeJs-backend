var gith = require('gith').create(9004); // ensure to match the port you entered in Github

gith({
  repo: 'loranbriggs/Sandbox'
}).on( 'all', function( payload ) {
  console.log( 'Post-receive happened!' );
});