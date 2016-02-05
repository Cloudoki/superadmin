define(
	['backbone', 'Superadmin', 'Models/Me'],
	function (Backbone, Superadmin, Me)
	{
		Session = 
		{
			user : null,
			
			// Loads logged user data
			loadEssentialData : function (callback)
			{	
				this.user = new Me();

				this.user.once("activated", function () {	
					callback();
				}.bind(this));
				
				this.user.fetch({error: this.authError.bind(this)});
			},
			
			render: function ()
			{
				// Do some rendering
				$('#page').html (this.view.render ().el);
			},
			
			setView: function (view)
			{
				// Remove the old
				if (this.view) this.view.remove();
				
				Session.trigger('destroy:view');
				
				this.view = view;	
					
				this.render();
			},

			// Error on API, for example
			authError: function() {
				this.logout();
			},

			// Logout user
			logout: function() {

				this.authenticationtoken = null;
				localStorage.removeItem('token');

				var r = /[^\/]*$/;
				var path = window.location.href.replace(r, '');
				window.location = path;
			}
		}
		
		// Add events
		_.extend(Session, Backbone.Events);
		
		return Session;
	}
);