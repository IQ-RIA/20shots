define(function() {
	// CUSTOM JQUERY FUNCTIONS
	// code for fade in element by element with delay
    $.fn.fadeInWithDelay = function(){
        var delay = 0;
        return this.each(function(){
            $(this).delay(delay).animate({opacity:1}, 200);
            delay += 100;
        });
    };

    jQuery.validator.addMethod("validate", function(value, element, config) { 
  		return config.fn.apply(config.scope || this, arguments);
	}, jQuery.format("{0}"));

	return {
		animation: {
			shuffle: function(b, d) {
				b.css({
					position: 'relative'
				});
				
				b.stop(true, true)
				.animate({left: 10}, d)
				.animate({left: -10}, d)
				.animate({left: 10}, d)
				.animate({left: -10}, d)
				.animate({left: 0}, d)
				.animate({left: -10}, d)
				.animate({left: 0}, d);
			}
		},
		validation: {
			email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
		},
		setActiveMenuItem: function() {
			
		},
		ellipsis: function(value, len, word) {
	        if (value && value.length > len) {
	            if (word) {
	                var vs = value.substr(0, len - 2),
	                index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
	                if (index !== -1 && index >= (len - 15)) {
	                    return vs.substr(0, index) + "...";
	                }
	            }
	            return value.substr(0, len - 3) + "...";
	        }
	        return value;
	    },
	    capitalize: function(str) {
	    	return str.charAt(0).toUpperCase() + str.substr(1, str.length);
	    },
	    htmlDecode: function(str) {
	    	return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<g').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
	    },

	    /**
	     * helps me to create required route for difficult url
	     * @param {Object} config
	     * @returns {String}
	     */
	    createRoute: function(config) {
	    	var route = '';

	    	if(config.countryId) {
	    		route += '/country/' + config.countryId;
	    	}

	    	if(config.cityId) {
	    		route += '/city/' + config.cityId;
	    	}

	    	if(config.universityId) {
	    		route += '/university/' + config.universityId;
	    	}

	    	if(config.facultyId) {
	    		route += '/faculty/' + config.facultyId;
	    	}

	    	return route;
	    }
	};
});