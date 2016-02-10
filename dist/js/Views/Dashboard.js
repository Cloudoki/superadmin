define (
	['mustache', 'backgrid', 'Collections/Accounts', 'Collections/Users', 'Views/Pageview', 'Views/Panels/List'],
	function (Mustache, Backgrid, Accounts, Users, Pageview, ListPanel)
	{
		// custom cell for deleting row/models
		var DeleteCell = Backgrid.Cell.extend({
		    template: _.template('<button class="btn btn-danger btn-xs ion-minus removemodel"></button>'),
		    events: {
		      "click .removemodel": "deleteRow"
		    },
		    // destroys the model
		    deleteRow: function (e) {
		      e.preventDefault();
		      this.model.destroy();
		    },
		    // render the delete button
		    render: function () {
		      this.$el.html(this.template());
		      this.delegateEvents();
		      return this;
		    }
		});

		var Dashboard = Pageview.extend(
		{
			title : "Dashboard",

			render: function ()
			{

				// Build Pageview
				this.$el.html (Mustache.render (Templates.pageview, {'title' : this.title}));

				// Panels parent
				this.$container = this.$el.find("#container").eq(0);

				// Accounts
				var grid = this.accountsgrid ();
				var accountslist = new ListPanel ({title: 'Accounts', grid: grid, addNew: {required: grid.collection.required}});
				this.appendPanel (accountslist, 6);

				grid.collection.on('newaccount:save', function() {
					this.fetch ({reset: true});
				});

				grid.collection.fetch ({reset: true});

				// Users
				grid = this.usersgrid ();
				var userslist = new ListPanel ({title: 'Users', grid: grid, addNew: {required: grid.collection.required}});
				this.appendPanel (userslist, 6);

				grid.collection.on('newuser:save', function() {
					this.fetch ({reset: true});
				});

				grid.collection.fetch ({reset: true});

				return this;
			},

			accountsgrid: function ()
			{
				return new Backgrid.Grid (
				{
					collection: new Accounts (),
					columns:
					[
						{ name: "id", label: "ID", editable: false,  cell: "string"},
						{ name: "unique", label: "Unique Name", cell: "string"},
						{ name: "name", label: "Name", cell: "string"},
						{ name: "delete", sortable: false, label: "Delete", cell: DeleteCell }
					]
				});
			},

			usersgrid: function ()
			{
				return new Backgrid.Grid (
				{
					collection: new Users (),
					columns:
					[
						{ name: "id", label: "ID", editable: false,  cell: "string"},
						{ name: "email", label: "E-mail", cell: "email"},
						{ name: "firstname", label: "First Name", cell: "string"},
						{ name: "lastname", label: "Last Name", cell: "string"},
						{ name: "delete", sortable: false, label: "Delete", cell: DeleteCell }
					]
				});
			}


		});

		return Dashboard;
	}
);
