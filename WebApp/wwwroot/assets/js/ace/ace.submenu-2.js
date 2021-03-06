// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="ace.submenu-2.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
/**
<b>Toggle sidebar submenus</b>. This approach uses <u>jQuery</u> animation and works on all browsers.
*/

ace.submenu = {
 show : function(sub, duration) {
	/// <summary>
	/// </summary>
	/// <param name="sub">The sub.</param>
	/// <param name="duration">The duration.</param>
	var $ = window.jQuery;
	var $sub = $(sub);

	var event;
	$sub.trigger(event = $.Event('show.ace.submenu'))
	if (event.isDefaultPrevented()) return false;
	
	$sub
	.css({height:0, overflow:'hidden', display:'block'})
	.removeClass('nav-hide').addClass('nav-show')//only for window < 992px and .sidebar.navbar-collapse.menu-min
	
	var complete = function() {
		/// <summary>
		/// </summary>
		$sub
		.css({overflow:'', height:''})

		if(ace.vars.webkit) ace.helper.redraw(sub);//little webkit issue, force redraw ;)

		$sub.trigger($.Event('shown.ace.submenu'))
	}

	$sub.parent().addClass('open');
	if(duration > 0) {
		$sub.animate({height:sub.scrollHeight} , {
			duration: duration,
			complete: complete
		})
	} else complete();

	return true;
 }
 ,
 hide : function(sub, duration) {
	/// <summary>
	/// </summary>
	/// <param name="sub">The sub.</param>
	/// <param name="duration">The duration.</param>
	var $ = window.jQuery;
	var $sub = $(sub);
		
	var event;
	$sub.trigger(event = $.Event('hide.ace.submenu'))
	if (event.isDefaultPrevented()) return false;

	var complete = function() {
		/// <summary>
		/// </summary>
		$sub
		.css({display:'none', overflow:'', height:''})
		.removeClass('nav-show').addClass('nav-hide')//only for window < @grid-float-breakpoint and .navbar-collapse.menu-min
		
		$sub.trigger($.Event('hidden.ace.submenu'))
	}

	$sub
	.css({overflow:'hidden', height:sub.scrollHeight})
	.parent().removeClass('open');

	if(duration > 0) {
		$sub.animate({height:0}, {
			duration: duration,
			complete: complete
		})
	} else complete();

	return true;
 }
 ,
 toggle : function(element, duration) {
	/// <summary>
	/// </summary>
	/// <param name="element">The element.</param>
	/// <param name="duration">The duration.</param>
	if( element.scrollHeight == 0 ) {//if an element is hidden scrollHeight is 0
		if(ace.submenu.show(element, duration)) return 1;
	} else {
		if(ace.submenu.hide(element, duration)) return -1;
	}
	return 0;
 }
}