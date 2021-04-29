// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="ace.submenu-1.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
/**
<b>Toggle sidebar submenus</b>. This approach uses <u>CSS3</u> transitions.
It's a bit smoother but the transition does not work on IE9 and below and it is sometimes glitchy on Android's default browser.
*/

//CSS3 transition version, no animation on IE9 and below
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
	.css({
		height: 0,
		overflow: 'hidden',
		display: 'block'
	})
	.removeClass('nav-hide').addClass('nav-show')//only for window < @grid-float-breakpoint and .navbar-collapse.menu-min
	.parent().addClass('open');

	if( duration > 0 ) {
	  $sub.css({height: sub.scrollHeight,
		'transition-property': 'height',
		'transition-duration': (duration/1000)+'s'})
	}

	var complete = function(ev, trigger) {
		/// <summary>
		/// </summary>
		/// <param name="ev">The ev.</param>
		/// <param name="trigger">The trigger.</param>
		ev && ev.stopPropagation();
		$sub
		.css({'transition-property': '', 'transition-duration': '', overflow:'', height: ''})
		//if(ace.vars['webkit']) ace.helper.redraw(sub);//little Chrome issue, force redraw ;)

		if(ace.vars['transition']) $sub.off('.trans');
		if(trigger !== false) $sub.trigger($.Event('shown.ace.submenu'))
	}
	if( duration > 0 && ace.vars['transition'] ) {
	  $sub.one('transitionend.trans webkitTransitionEnd.trans mozTransitionEnd.trans oTransitionEnd.trans', complete);
	}
	else complete();
	
	//there is sometimes a glitch, so maybe retry
	if(ace.vars['android']) {
		setTimeout(function() {
			/// <summary>
			/// </summary>
			complete(null, false);
		}, duration + 20);
	}

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

	$sub
	.css({
		height: sub.scrollHeight,
		overflow: 'hidden'
	})
	.parent().removeClass('open');

	sub.offsetHeight;
	//forces the "sub" to re-consider the new 'height' before transition

	if( duration > 0 ) {
	  $sub.css({'height': 0,
		'transition-property': 'height',
		'transition-duration': (duration/1000)+'s'});
	}


	var complete = function(ev, trigger) {
		/// <summary>
		/// </summary>
		/// <param name="ev">The ev.</param>
		/// <param name="trigger">The trigger.</param>
		ev && ev.stopPropagation();
		$sub
		.css({display: 'none', overflow:'', height: '', 'transition-property': '', 'transition-duration': ''})
		.removeClass('nav-show').addClass('nav-hide')//only for window < @grid-float-breakpoint and .navbar-collapse.menu-min

		if(ace.vars['transition']) $sub.off('.trans');
		if(trigger !== false) $sub.trigger($.Event('hidden.ace.submenu'))
	}
	if( duration > 0 && ace.vars['transition'] ) {
	  $sub.one('transitionend.trans webkitTransitionEnd.trans mozTransitionEnd.trans oTransitionEnd.trans', complete);
	}
	else complete();


	//there is sometimes a glitch, so maybe retry
	if(ace.vars['android']) {
		setTimeout(function() {
			/// <summary>
			/// </summary>
			complete(null, false);
		}, duration + 20);
	}

	return true;
 }
 ,
 toggle : function(element, duration) {
	/// <summary>
	/// </summary>
	/// <param name="element">The element.</param>
	/// <param name="duration">The duration.</param>
	if( element.scrollHeight == 0 ) {//if an element is hidden scrollHeight becomes 0
		if(ace.submenu.show(element, duration)) return 1;
	} else {
		if(ace.submenu.hide(element, duration)) return -1;
	}
	return 0;
 }
}
