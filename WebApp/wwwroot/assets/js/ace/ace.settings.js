// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="ace.settings.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
/**
 <b>Settings box</b>. It's good for demo only. You don't need this.
*/
ace.settings_box = function($) {
 /// <summary>
 /// </summary>
 /// <param name="$">The $.</param>
 $('#ace-settings-btn').on(ace.click_event, function(e){
	/// <summary>
	/// </summary>
	/// <param name="e">The e.</param>
	e.preventDefault();

	$(this).toggleClass('open');
	$('#ace-settings-box').toggleClass('open');
 });

 $('#ace-settings-navbar').on('click', function(){
	/// <summary>
	/// </summary>
	ace.settings.navbar_fixed(this.checked);//@ ace-extra.js
	//$(window).triggerHandler('resize.navbar');
	
	//force redraw?
	//if(ace.vars['webkit']) ace.helper.redraw(document.body);
 /// <summary>
 /// </summary>
 }).each(function(){this.checked = ace.settings.is('navbar', 'fixed')})

 $('#ace-settings-sidebar').on('click', function(){
	/// <summary>
	/// </summary>
	ace.settings.sidebar_fixed(this.checked);//@ ace-extra.js
	
	//if(ace.vars['webkit']) ace.helper.redraw(document.body);
 /// <summary>
 /// </summary>
 }).each(function(){this.checked = ace.settings.is('sidebar', 'fixed')})

 $('#ace-settings-breadcrumbs').on('click', function(){
	/// <summary>
	/// </summary>
	ace.settings.breadcrumbs_fixed(this.checked);//@ ace-extra.js
	
	//if(ace.vars['webkit']) ace.helper.redraw(document.body);
 /// <summary>
 /// </summary>
 }).each(function(){this.checked = ace.settings.is('breadcrumbs', 'fixed')})

 $('#ace-settings-add-container').on('click', function(){
	/// <summary>
	/// </summary>
	ace.settings.main_container_fixed(this.checked);//@ ace-extra.js
	
	//if(ace.vars['webkit']) ace.helper.redraw(document.body);
 /// <summary>
 /// </summary>
 }).each(function(){this.checked = ace.settings.is('main-container', 'fixed')})



 $('#ace-settings-compact').removeAttr('checked').on('click', function(){
	/// <summary>
	/// </summary>
	if(this.checked) {
		$('#sidebar').addClass('compact');
		var hover = $('#ace-settings-hover');
		if( hover.length > 0 && !hover.get(0).checked ) {
			hover.removeAttr('checked').trigger('click');
		}
	}
	else {
		$('#sidebar').removeClass('compact');
		if('sidebar_scroll' in ace.helper) ace.helper.sidebar_scroll.reset();
	}
 });


 $('#ace-settings-highlight').removeAttr('checked').on('click', function(){
	/// <summary>
	/// </summary>
	if(this.checked) $('#sidebar .nav-list > li').addClass('highlight');
	else $('#sidebar .nav-list > li').removeClass('highlight');
 });


 $('#ace-settings-hover').removeAttr('checked').on('click', function(){
	/// <summary>
	/// </summary>
	if($('.sidebar').hasClass('h-sidebar')) return;
	if(this.checked) {
		$('#sidebar li').addClass('hover')
		.filter('.open').removeClass('open').find('> .submenu').css('display', 'none');
		//and remove .open items
	}
	else {
		$('#sidebar li.hover').removeClass('hover');

		var compact = $('#ace-settings-compact');
		if( compact.length > 0 && compact.get(0).checked ) {
			compact.trigger('click');
		}
		
		if('sidebar_hover' in ace.helper) ace.helper.sidebar_hover.reset();
	}
	
	if('sidebar_scroll' in ace.helper) ace.helper.sidebar_scroll.reset();
 });

}