define(
	['backbone', 'Session', 'Router', 'config'],
	function (Backbone, Session, Router, config)
	{
		var Superadmin = {

			version : 1,
			authentication: false,	// Ignores token
			dev: true,

			init : function ()
			{
				// Load configs
				Superadmin.config = config;
				Superadmin.Api = config.apiurl;
				Superadmin.Session = Session;

				if (this.authentication) {
					if (this.dev)	this.authenticate(true);
					else			this.authenticate();

					this.loadUserData();
				}
				else
					this.begin();

				return this;
			},

			// Oauth2 Authentication
			authenticate: function(dev) {

				var token = window.localStorage.getItem('token');

				//Check if there is authentication
				if(token && token.length > 9)
				{
					Superadmin.Session.authenticationtoken = token;
					Backbone.accesstoken = token;

				}
				else {
					if (dev)
						this.authenticationtoken = "the-Golden-Key-28chars-token";
					else
						window.location = "/login.html";
				}
			},

			// Get User data after authentication;
			// Inits the backbone views & router
			loadUserData: function() {

				this.Session.loadEssentialData (function ()	{

					this.begin();
				});
			},

			// Callbak function after user authentication
			begin: function() {

				// Router
				Superadmin.Router = new Router ();

				Backbone.history.start();
			}
		};

		/*
		 *	Add authorization headers to each Backbone.sync call
		 */
		Backbone.ajax = function()
		{
			// Is there a auth token?
			if(Session.authenticationtoken)

				arguments[0].headers = {
		            'Authorization': 'Bearer ' + Session.authenticationtoken,
		            'Accept': "application/json"
		        };

			return Backbone.$.ajax.apply(Backbone.$, arguments);
		};

    	return Superadmin;
	}
);


