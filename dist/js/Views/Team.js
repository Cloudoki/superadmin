define (
	['mustache', 'Views/Pageview', 'Views/Panel', 'Views/Panels/List', 'Views/Panels/Jumbotron'],
	function (Mustache, Pageview, Panel, List, Jumbotron)
	{
		var Team = Pageview.extend(
		{
			title : "Team",

			quotes: [
				"I love deadlines. I like the whooshing sound they make as they fly by.",
				"An expert is a person who has made all the mistakes that can be made in a very narrow field.",
				"Nothing is so embarrassing as watching someone do something that you said couldn’t be done."
			],

			render: function ()
			{
				// Build Pageview
				this.$el.html (Mustache.render (Templates.pageview, {}));

				// Panels parent
				this.$container = this.$el.find("#container").eq(0);

				// Jumbotron
				var quote = this.quotes[Math.floor(this.quotes.length * Math.random())];
				var jumbo = new Jumbotron ({title: 'Cloudoki Team', body: quote});
				this.appendPanel (jumbo, 12);

				// Documentation
				var docs = new List ({title: 'Useful Docs', list: this.doclist});
				this.appendPanel (docs, 3);

				// Team
				var team = new Panel ({template: Templates.teamlist, className: 'teamlist', team: this.teamlist});
				this.appendPanel (team, 9);

				// Servers
				for (n in this.servers)
				{
					srv = this.servers[n];
					this.appendPanel (new Panel ({title: srv.title, body: srv.body, footer: "More info on <a href='http://blog.cloudoki.com'>blog</a>."}), 4);
				}

				return this;
			},

			doclist :
			[
				{a: "https://gettingreal.37signals.com/", name: 'Getting Real (lean software)'},
				{a: "https://laravel.com/docs/5.2/contributions#coding-style", name: 'Coding standards'},
				{hr: true},
				{a: "http://laravel.com/docs/5.2/", name: 'Laravel 5.2 docs'},
				{a: "http://www.betsens.be/blog/category/web/3-layer/", name: '3-Layer Structure (API centric)'},
				{a: "http://swagger.io/", name: 'Swagger code docs'},
				{hr: true},
				{a: "http://backbonejs.org/", name: 'Backbone.js framework'},
				{a: "http://getbootstrap.com/components/", name: 'Bootstrap template'},
				{a: "#", name: 'How to use Gulp'},
				{hr: true},
				{a: "http://blog.cloudoki.com/nginx-on-ubuntu/", name: 'Nginx Server setup'},
			],

			teamlist :
			[
				{avatar:'https://pbs.twimg.com/profile_images/460710408500695041/eZGWaSPZ.png', github:'koenbetsens', name: 'Koen Betsens', twitter: 'koenbetsens', email: 'koen@betsens.be', skype: 'koenbetsens'},
				{avatar:'https://avatars0.githubusercontent.com/u/9537580?v=3&s=460', github:'bramvanoost', name: 'Bram Van Oost', twitter: 'ort', email: 'bramvanoost@gmail.com'},
				{avatar:'http://cloudoki.com/images/team/rui.png', github:'Muffles', name: 'Rui Molefas', twitter: 'RuiMolefas', email: 'rui@cloudoki.com'},
				{avatar:'https://avatars0.githubusercontent.com/u/5969933?v=3&s=460', github:'k7y', name: 'Cátia Araújo', twitter: 'p1ra73', email: 'catia@cloudoki.com'},
				{avatar:'https://avatars2.githubusercontent.com/u/11738330?v=3&s=460', github:'efmr', name: 'Edgar Ribeiro', twitter: 'EdgarPH9', email: 'edgar@cloudoki.com'},
				{avatar:'https://avatars3.githubusercontent.com/u/15686822?v=3&s=460', github:'mariaribeiro', name: 'Maria Ribeiro', twitter: 'msalgadoribeiro', email: 'maria@cloudoki.com'},
				{avatar:'https://avatars0.githubusercontent.com/u/11923809?v=3&s=460', github:'a31859', name: 'Délio Amaral', twitter: 'dnva_13', email: 'delio@cloudoki.com'},
				{avatar:'https://avatars1.githubusercontent.com/u/5833937?v=3&s=460', github:'ErikRFerreira', name: 'Erik Ferreira', twitter: 'Erik__Ferreira', email: 'erik@cloudoki.com'},
				{avatar:'https://avatars3.githubusercontent.com/u/17081313?v=3&s=460', github:'TomasTM', name: 'Tomás',  email: 'tomas@cloudoki.com'},
				{avatar:'https://avatars2.githubusercontent.com/u/5064023?v=3&s=460', github:'ricmalta', name: 'Ricardo Malta', twitter: 'ricmalta', email: 'ricardo@cloudoki.com'},
				{avatar:'https://avatars1.githubusercontent.com/u/7128601?v=3&s=460', github:'nmcpcj', name: 'Nuno Jorge', twitter: 'rnmcpcj', email: 'nuno@cloudoki.com'},
				{avatar:'https://avatars0.githubusercontent.com/u/19777410?v=3&s=460', github:'tiagoraposeira', name: 'Tiago Raposeira', twitter: 'TRaposeira', email: 'tiago@cloudoki.com'},
				{avatar:'https://pbs.twimg.com/profile_images/628572134529331201/TK59DD-D_400x400.jpg', name: 'Tim de Coninck', twitter: 'a_cup_of_t', email: 'tim@cloudoki.com'},
				{avatar:'https://avatars2.githubusercontent.com/u/1303775?v=3&s=460', github:'simonverboven', name: 'Simon', email: 'simon@cloudoki.com'},
				{avatar:'https://pbs.twimg.com/profile_images/498552217461202944/WFCiQEGR_400x400.jpeg', name: "Hannes D'Hulster", twitter: 'hannesdh', email: 'hannes@cloudoki.com'},
			],

			servers :
			[
				{ title: "Apps Server (dev)", body: "<h4>176.62.163.66</h4><a href='#'>Cloudoki <strong>t-fe001</strong></a><br><br>Sudo password: ***<br><br>"},
				{ title: "Worker Server (dev)", body: "<h4>176.62.163.67</h4><a href='#'>Cloudoki <strong>t-be001</strong></a><br><br>Sudo password: ***<br>Mysql password: when-Witches-brew-46848-Siamese-kittens<br>"},
				{ title: "Apps Server (stable)", body: "<h4>176.62.163.68</h4><a href='#'>Cloudoki <strong>p-fe001</strong></a><br><br>Sudo password: ***<br><br>"},
				{ title: "API Server (stable)", body: "<h4>176.62.163.69</h4><a href='#'>Cloudoki <strong>p-api001</strong></a><br><br>Sudo password: ***<br><br>"},
				{ title: "Worker Server (stable)", body: "<h4>176.62.163.70</h4><a href='#'>Cloudoki <strong>p-be001</strong></a><br><br>Sudo password: ***<br><br>"},
				{ title: "DB Server (stable)", body: "<h4>176.62.163.71</h4><a href='#'>Cloudoki <strong>p-db001</strong></a><br><br>Sudo password: ***<br>Mysql password: ccRxWoZAsDYRAvh<br>"}
			]

		});

		return Team;
	}
);
