define([
	'j/core/base/View',
	'text!j/ux/widgets/comments/Tpl.tpl'
], function(BaseView, Tpl) {
	return BaseView.extend({
		tpl: _.template(Tpl),

		doRender: function() {
			return this.tpl({
				collection: this.collection,
				author: J.app.instance().getUser().getFullName()
			})
		}
	});
});