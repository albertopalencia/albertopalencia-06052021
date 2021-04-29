// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="elements.spinner.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
/**
 <b>Spinner</b>. A wrapper for FuelUX spinner element.
 It's just a wrapper so you still need to include FuelUX spinner script first.
*/
(function($ , undefined) {
	//a wrapper for fuelux spinner
	/// <summary>
	/// </summary>
	/// <param name="$">The $.</param>
	/// <param name="undefined">The undefined.</param>
	function Ace_Spinner(element , options) {
		/// <summary>
		/// Aces the spinner.
		/// </summary>
		/// <param name="element">The element.</param>
		/// <param name="options">The options.</param>
		var max = options.max
		max = (''+max).length
		var width = parseInt(Math.max((max * 20 + 40) , 90))

		var $element = $(element);
		$element.addClass('spinner-input form-control').wrap('<div class="ace-spinner">')

		var $parent_div = $element.closest('.ace-spinner').spinner(options).wrapInner("<div class='input-group'></div>")
		var $spinner = $parent_div.data('spinner');
		
		if(options.on_sides)
		{
			$element
			.before('<div class="spinner-buttons input-group-btn">\
					<button type="button" class="btn spinner-down btn-xs '+options.btn_down_class+'">\
						<i class="'+ ace.vars['icon'] + options.icon_down+'"></i>\
					</button>\
				</div>')
			.after('<div class="spinner-buttons input-group-btn">\
					<button type="button" class="btn spinner-up btn-xs '+options.btn_up_class+'">\
						<i class="'+ ace.vars['icon'] + options.icon_up+'"></i>\
					</button>\
				</div>');

			$parent_div.addClass('touch-spinner')
			$parent_div.css('width' , width+'px')
		}
		else {
			 $element
			 .after('<div class="spinner-buttons input-group-btn">\
					<button type="button" class="btn spinner-up btn-xs '+options.btn_up_class+'">\
						<i class="'+ ace.vars['icon'] + options.icon_up+'"></i>\
					</button>\
					<button type="button" class="btn spinner-down btn-xs '+options.btn_down_class+'">\
						<i class="'+ ace.vars['icon'] + options.icon_down+'"></i>\
					</button>\
				</div>')

			if(ace.vars['touch'] || options.touch_spinner) {
				$parent_div.addClass('touch-spinner')
				$parent_div.css('width' , width+'px')
			}
			else {
				$element.next().addClass('btn-group-vertical');
				$parent_div.css('width' , width+'px')
			}
		}

		$element.on('mousewheel.spinner DOMMouseScroll.spinner', function(event){
			/// <summary>
			/// </summary>
			/// <param name="event">The event.</param>
			var delta = event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0 ? 1 : -1
			$spinner.step(delta > 0);
			$spinner.triggerChangedEvent();
			return false
		})

		$parent_div.on('changed', function(){
			/// <summary>
			/// </summary>
			$element.trigger('change')//trigger the input's change event
		});

		this._call = function(name, arg) {
			/// <summary>
			/// </summary>
			/// <param name="name">The name.</param>
			/// <param name="arg">The argument.</param>
			$spinner[name](arg);
		}
	}


	$.fn.ace_spinner = function(option, value) {
		/// <summary>
		/// </summary>
		/// <param name="option">The option.</param>
		/// <param name="value">The value.</param>
		var retval;

		var $set = this.each(function() {
			/// <summary>
			/// </summary>
			var $this = $(this);
			var data = $this.data('ace_spinner');
			var options = typeof option === 'object' && option;

			if (!data) {
				options = $.extend({}, $.fn.ace_spinner.defaults, option);
				$this.data('ace_spinner', (data = new Ace_Spinner(this, options)));
			}
			if (typeof option === 'string') retval = data._call(option, value);
		});

		return (retval === undefined) ? $set : retval;
	}
	
	$.fn.ace_spinner.defaults = {
		'icon_up' : 'fa fa-chevron-up',
		'icon_down': 'fa fa-chevron-down',
		
		'on_sides': false,		
		'btn_up_class': '',
		'btn_down_class' : '',
		
		'max' : 999,
		'touch_spinner': false
     }


})(window.jQuery);
