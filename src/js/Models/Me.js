define (
	['Models/User'],
	function (User)
	{
		var Me = User.extend({
		
			url: function () 
			{
				return Superadmin.config.url + "me?" + $.param ({display: 'full'});
			}
		});
		
		return Me;
	}
);