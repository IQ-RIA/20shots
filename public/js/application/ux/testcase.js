define([
	'j/core/base/View'
], function(View) {
	Layout = View.extend({
		el: "body",

		events: {
			"click .a": "onBodyClick"
		},

		doRender: function() {
			$(this.el).html("<div class='a' style='background:red;width:500px;height:400px;'>it works</div>");
		},

		onBodyClick: function() {
			alert('clicked');
		}
	});

	Sub1 = View.extend({
		el: ".a",

		events: {
			"click .a1": "onBodyClick"
		},

		doRender: function() {
			$(this.el).html("<div class='a1' style='background:gold;width:300px;height:300px;'>it works</div>");
		},

		onBodyClick: function(e) {
			e.stopPropagation();
			alert('clicked a1');
		}
	});

	Sub2 = View.extend({
		el: ".a1",

		events: {
			"click .a2": "onBodyClick"
		},

		doRender: function() {
			$(this.el).html("<div class='a2' style='background:blue;width:100px;height:100px;'>it works</div>");
		},

		onBodyClick: function(e) {
			e.stopPropagation();
			alert('clicked a2');
		}
	});

	(new Layout).render();
	(new Sub1).render();
	(new Sub2).render();
});