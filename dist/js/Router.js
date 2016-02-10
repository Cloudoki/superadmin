define(
	['backbone', 'Session', 'Views/Dashboard', 'Views/Team'],
	function (Backbone, Session, Dashboard, Team)
	{
		var Router = Backbone.Router.extend (
		{
			routes :
			{
				'team': 'team',
				'*path': 'dashboard'
			},
			
			/**
			 *	General
			 **/
		
			dashboard : function ()
			{
				Session.setView (new Dashboard ());
			},
			
			team : function ()
			{
				Session.setView (new Team ());
			}
		});
		
		return Router;
	}
);