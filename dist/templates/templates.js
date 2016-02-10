Templates = {
  "jumbotron": "<div class=\"jumbotron col-sm-9\">\n\t<h1>...</h1>\n</div>",
  "pageview": "<h1 class=\"page-header\">{{title}}</h1>\n\n<div id=\"container\" class=\"row\"></div>",
  "panel": "<div class=\"panel panel-{{paneltype}}\">\n\t{{#title}}\n\t<div class=\"panel-heading\">\n\t\t<h3 class=\"panel-title\">{{title}}</h3>\n\t</div>\n\t{{/title}}\n\t\n\t<div class=\"panel-body\">\n\t\t{{#body}}{{{body}}}{{/body}}\n\t</div>\n\t\n\t{{#footer}}\n\t\t<div class=\"panel-footer\">{{{footer}}}</div>\n\t{{/footer}}\n</div>",
  "row": "<div class=\"row\"></div>"
}