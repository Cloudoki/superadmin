define (
	['mustache', 'Views/Pageview', 'Views/Panel'],
	function (Mustache, Pageview, StatusPanel, Panel)
	{
		var Team = Pageview.extend(
		{
			title : "Team",
			
			render: function ()
			{
				// Build Pageview
				this.$el.html (Mustache.render (Templates.pageview, {'title' : this.title}));
				
				// Panels parent
				this.$container = this.$el.find("#container").eq(0);
			
				return this;
			}
		
		});
		
		return Team;
	}
);