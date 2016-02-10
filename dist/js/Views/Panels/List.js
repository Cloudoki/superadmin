define (
	['mustache', 'Views/Panel'],
	function (Mustache, Panel)
	{
		var List = Panel.extend({
			
			events:
			{
				'click .addmodel': 'addGridModel'
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
				
				// Add Button
				if (this.addNew)				
					params.footer = '<button class="btn btn-default ion-ios7-plus addmodel"></button>';
	

				// Get template
				this.$el.html (Mustache.render (Templates.panel, params));
				this.$container = this.$el.find(".panel-body").eq(0);
				
				// Append grid
				if (this.grid)
				{	
					// append
					this.$container.append (this.grid.render ().el);
					
					if (this.addButton)
						
						this.$container.append (this.grid.render ().el);
						
				}
							
				return this;
			},
			
			addGridModel: function ()
			{
				this.grid.collection.add (this.addNew.required);
			}
		});
		
		return List;
	}
);