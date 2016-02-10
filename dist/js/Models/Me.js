define (
	['backbone'],
	function (Backbone)
	{
		var Account = Backbone.Model.extend({
		
			typestring: 'me',

			initialize: function() {
				this.once('change', this.activate);
			},

			activate: function() {
				this.trigger('activated');
			},	
			
			url: function ()
			{
				var url = Superadmin.config.apiurl + this.typestring;
				
				if (this.id) url += '/' + this.id;
				
				return this.parameters? url + "?" + $.param (this.parameters): url;
			}
		});
		
		return Account;
	}
);