define (
	['backbone', 'mustache'],
	function (Backbone, Mustache)
	{
		var Panel = Backbone.View.extend({
			
			paneltype: 'default',
			title: 'Panel',
			
			events: {
				'remove' : 'destroy',
			},
		
			initialize: function (options)
			{
				if(options) $.extend(this, options);
			},
		
			render: function (options)
			{	
				if(options) $.extend(this, options);
				
				// Template data
				var params = {
					paneltype: this.paneltype,
					title: this.title,
					body: this.body
				};
				
				
				// Get template
				this.$el.html (Mustache.render (Templates.panel, params));
				this.$container = this.$el.find(".panel-body").eq(0);
								
				return this;
			}
		});
		
		return Panel;
	}
);