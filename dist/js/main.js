var pathname = window.location.pathname;

require.config({

	baseUrl : pathname+'js',
	shim: {
  		bootstrap: {
    		deps: ['jquery'],
    		exports: 'bootstrap'
  		},
		backgrid: {
			deps: ['jquery','backbone','underscore'],
			exports: 'Backgrid'
		}
	},

	paths: {
	    jquery: pathname+'vendor/jquery/dist/jquery.min',
	    backbone: pathname+'vendor/backbone/backbone-min',
	    requirejs: pathname+'vendor/requirejs/require',
	    underscore: pathname+'vendor/underscore/underscore-min',
	    mustache: pathname+'vendor/mustache.js/mustache',
	    bootstrap: pathname+'vendor/bootstrap/dist/js/bootstrap.min',
	    backgrid: pathname+'vendor/backgrid/lib/backgrid.min'
	},
	
	urlArgs: "bust=" +  (new Date()).getTime()
});

var Superadmin;

require(
  ['backbone', 'Superadmin', 'bootstrap'],
  function(Backbone, superadmin, Bootstrap)
  {
    $(document).ready(function()
    {     

      Superadmin = superadmin;
      Superadmin.init();
    });
  }
);
