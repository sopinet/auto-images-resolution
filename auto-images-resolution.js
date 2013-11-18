// similar example: https://github.com/senatorpetelarson/Jquery-Resolution-Switch-Plugin/blob/master/jquery.resolutionswitch.1.0.js
// another: https://github.com/imulus/retinajs
/*
 * Fernando Hidalgo
 * Sopinet - 2013
 * Auto-Images-Resolution jQuery library
*/
!function( $ ) {
	var AutoImagesResolution = function(element, options){
		// Declaración de variables
		this.element = element;
		this.el = $(element);
		this.suffix_hd = "_hd";
		this.suffix_movil = "_movil";
		this.suffix_normal = "";
		
		this.urlNormal = this.getNormal();
		var suffix = this.getSuffix();
		var re = this.getReplace(suffix);
		
		if ( this.el.is('img') ){
			this.el.attr('src', re);
		} else {
			this.el.css('background-image', "url('" + re + "')");
		}
	};
	
	AutoImagesResolution.prototype = {
		constructor: AutoImagesResolution,
		
		getNormal: function() {
		 	if ( this.el.is('img') ){
		 		return this.element.getAttribute('src');
		 	} else {
		 		return this.el.css('background-image').replace(/^url|[\(\)]/g, '');
		 	}
			//alert(this.el.getAttribute("src"));
		},
		
		getSuffix: function() {
			if ($(window).width() > 1024) return this.suffix_hd;
			else if ($(window).width() <= 1024) return this.suffix_movil;
			else return this.suffix_normal;
		},
		
		getReplace: function(suffix) {
			var ext = this.urlNormal.substr(this.urlNormal.length-3);
			return this.urlNormal.replace("." + ext, suffix + "." + ext);
		}
	};
	
	$.fn.AutoImagesResolution = function ( option, val ) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('AutoImagesResolution'),
				options = typeof option === 'object' && option;
			if (!data) {
				$this.data('AutoImagesResolution', (data = new AutoImagesResolution(this, $.extend({}, $.fn.AutoImagesResolution.defaults,options))));
			}
		});
	};	
	
	$.fn.AutoImagesResolution.defaults = {
		onRender: function() {
			return '';
		}
	};
	$.fn.AutoImagesResolution.Constructor = AutoImagesResolution;	
		
}( window.jQuery );

