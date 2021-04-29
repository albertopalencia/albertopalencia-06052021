// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="ace.autohide-sidebar.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
/**
 <b>Autohide mobile view menu</b>. Automatically hide the sidebar in mobile view (default style) when clicked/tapped outside of it.
*/
ace.auto_hide_sidebar = function($) {
	/// <summary>
	/// </summary>
	/// <param name="$">The $.</param>
	$(document).on(ace.click_event+'.ace.hide', function(e) {
		/// <summary>
		/// </summary>
		/// <param name="e">The e.</param>
		var toggler = $('#menu-toggler');
		if( toggler.length == 0 || toggler[0].scrollHeight == 0 || !toggler.hasClass('display') ) return;
		//toggle button is not visible, so we are not in mobile view, or the sidebar is not displayed, so return

		var sidebar = $('#sidebar');
		if( $.contains(sidebar[0], e.target) ) {
			e.stopPropagation();
			return;
		}

		sidebar.removeClass('display');
		toggler.removeClass('display');
	})
}