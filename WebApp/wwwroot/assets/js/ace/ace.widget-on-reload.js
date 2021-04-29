// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="ace.widget-on-reload.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
/**
 The widget box reload button/event handler. You should use your own handler. An example is available at <i class="text-info">examples/widgets.html</i>.
 <u><i class="glyphicon glyphicon-flash"></i> You don't need this. Used for demo only</u>
*/

ace.widget_reload_handler = function($) {
	//***default action for reload in this demo
	//you should remove this and add your own handler for each specific .widget-box
	//when data is finished loading or processing is done you can call $box.trigger('reloaded.ace.widget')
	/// <summary>
	/// </summary>
	/// <param name="$">The $.</param>
	$(document).on('reload.ace.widget', '.widget-box', function (ev) {
		/// <summary>
		/// </summary>
		/// <param name="ev">The ev.</param>
		var $box = $(this);
		
		//trigger the reloaded event to remove the spinner icon after 1-2 seconds
		setTimeout(function() {
			/// <summary>
			/// </summary>
			$box.trigger('reloaded.ace.widget');
		}, parseInt(Math.random() * 1000 + 1000));
	});

	//you may want to do something like this:
	/**
	$('#my-widget-box').on('reload.ace.widget', function(){
		//load new data here
		//and when finished trigger "reloaded" event
		$(this).trigger('reloaded.ace.widget');
	});
	*/
}