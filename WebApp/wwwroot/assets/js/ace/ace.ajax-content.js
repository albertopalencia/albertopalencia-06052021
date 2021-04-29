// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="ace.ajax-content.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
/**
 <b>Load content via Ajax </b>. For more information please refer to documentation #basics/ajax
*/

ace.enable_ajax_content = function($, options) {
	//var has_history = 'history' in window && typeof window.history.pushState === 'function';
	
	 /// <summary>
	 /// </summary>
	 /// <param name="$">The $.</param>
	 /// <param name="options">The options.</param>
	 var content_url = options.content_url || false
	 var default_url = options.default_url || false;
	var loading_icon = options.loading_icon || 'fa-spinner fa-2x orange';
	var loading_text = options.loading_text || '';
	var update_breadcrumbs = options.update_breadcrumbs || typeof options.update_breadcrumbs === 'undefined';
	var update_title = options.update_title || typeof options.update_title === 'undefined';
	var update_active = options.update_active || typeof options.update_active === 'undefined';
	var close_active = options.close_active || typeof options.close_active === 'undefined';

	$(window)
	.off('hashchange.ajax')
	.on('hashchange.ajax', function(e, manual_trigger) {
		/// <summary>
		/// </summary>
		/// <param name="e">The e.</param>
		/// <param name="manual_trigger">The manual trigger.</param>
		var hash = $.trim(window.location.hash);
		if(!hash || hash.length == 0) return;
		
		hash = hash.replace(/^(\#\!)?\#/, '');
		var url = false;
		
		if(typeof content_url === 'function') url = content_url(hash);
		if(typeof url === 'string') getUrl(url, hash, manual_trigger || false);
	}).trigger('hashchange.ajax', [true]);
	
	/**
	if(has_history) {
		window.onpopstate = function(event) {
		  JSON.stringify(event.state);
		  //getUrl(event.state.url, event.state.hash, true);
		}
	}
	*/
	
	if(default_url && window.location.hash == '') window.location.hash = default_url;


	function getUrl(url, hash, manual_trigger) {
		/// <summary>
		/// Gets the URL.
		/// </summary>
		/// <param name="url">The URL.</param>
		/// <param name="hash">The hash.</param>
		/// <param name="manual_trigger">The manual trigger.</param>
		var event
		$(document).trigger(event = $.Event('ajaxloadstart'), {url: url, hash: hash})
		if (event.isDefaultPrevented()) return;

		
		var contentArea = $('.page-content-area');
		contentArea
		.css('opacity', 0.25)
		
		var loader = $('<div style="position: fixed; z-index: 2000;" class="ajax-loading-overlay"><i class="ajax-loading-icon fa fa-spin '+loading_icon+'"></i> '+loading_text+'</div>').insertBefore(contentArea);
		var offset = contentArea.offset();
		loader.css({top: offset.top, left: offset.left})
	
		$.ajax({
			'url': url
		})
		.complete(function() {
			/// <summary>
			/// </summary>
			contentArea.css('opacity', 0.8)
			$(document).on('ajaxscriptsloaded', function() {
				/// <summary>
				/// </summary>
				contentArea.css('opacity', 1)
				contentArea.prevAll('.ajax-loading-overlay').remove();
			});
		})
		.error(function() {
			/// <summary>
			/// </summary>
			$(document).trigger('ajaxloaderror', {url: url, hash: hash});
		})
		.done(function(result) {
			/// <summary>
			/// </summary>
			/// <param name="result">The result.</param>
			$(document).trigger('ajaxloaddone', {url: url, hash: hash});
		
			var link_element = $('a[data-url="'+hash+'"]');
			var link_text = '';
			if(link_element.length > 0) {
				var nav = link_element.closest('.nav');
				if(nav.length > 0) {
					if(update_active) {
						nav.find('.active').each(function(){
							/// <summary>
							/// </summary>
							var $class = 'active';
							if( $(this).hasClass('hover') || close_active ) $class += ' open';
							
							$(this).removeClass($class);							
							if(close_active) {
								$(this).find(' > .submenu').css('display', '');
								//var sub = $(this).find(' > .submenu').get(0);
								//if(sub) ace.submenu.hide(sub, 200)
							}
						})
						link_element.closest('li').addClass('active').parents('.nav li').addClass('active open');
						if('sidebar_scroll' in ace.helper) {
							ace.helper.sidebar_scroll.reset();
							//first time only
							if(manual_trigger) ace.helper.sidebar_scroll.scroll_to_active();
						}
					}
					if(update_breadcrumbs) {
						link_text = updateBreadcrumbs(link_element);
					}
				}
			}

			//convert "title" and "link" tags to "div" tags for later processing
			result = String(result)
				.replace(/<(title|link)([\s\>])/gi,'<div class="hidden ajax-append-$1"$2')
				.replace(/<\/(title|link)\>/gi,'</div>')
		
			contentArea.empty().html(result);
			contentArea.css('opacity', 0.6);

			//remove previous stylesheets inserted via ajax
			setTimeout(function() {
				/// <summary>
				/// </summary>
				$('head').find('link.ajax-stylesheet').remove();
				var ace_style = $('head').find('link#main-ace-style');
				contentArea.find('.ajax-append-link').each(function(e) {
					/// <summary>
					/// </summary>
					/// <param name="e">The e.</param>
					var $link = $(this);
					if ( $link.attr('href') ) {
						var new_link = jQuery('<link />', {type : 'text/css', rel: 'stylesheet', 'class': 'ajax-stylesheet'})
						if( ace_style.length > 0 ) new_link.insertBefore(ace_style);
						else new_link.appendTo('head');
						new_link.attr('href', $link.attr('href'));//we set "href" after insertion, for IE to work
					}
					$link.remove();
				})
			}, 10);

			//////////////////////

			if(update_title) updateTitle(link_text, contentArea);
			if( !manual_trigger ) {
				$('html,body').animate({scrollTop: 0}, 250);
			}

			//////////////////////
			$(document).trigger('ajaxloadcomplete', {url: url, hash: hash});
		})
	 }
	 

	 
	 function updateBreadcrumbs(link_element) {
		/// <summary>
		/// Updates the breadcrumbs.
		/// </summary>
		/// <param name="link_element">The link element.</param>
		var link_text = '';
	 
		//update breadcrumbs
		var breadcrumbs = $('.breadcrumb');
		if(breadcrumbs.length > 0 && breadcrumbs.is(':visible')) {
			breadcrumbs.find('> li:not(:first-child)').remove();

			var i = 0;		
			link_element.parents('.nav li').each(function() {
				/// <summary>
				/// </summary>
				var link = $(this).find('> a');
				
				var link_clone = link.clone();
				link_clone.find('i,.fa,.glyphicon,.ace-icon,.menu-icon,.badge,.label').remove();
				var text = link_clone.text();
				link_clone.remove();
				
				var href = link.attr('href');

				if(i == 0) {
					var li = $('<li class="active"></li>').appendTo(breadcrumbs);
					li.text(text);
					link_text = text;
				}
				else {
					var li = $('<li><a /></li>').insertAfter(breadcrumbs.find('> li:first-child'));
					li.find('a').attr('href', href).text(text);
				}
				i++;
			})
		}
		
		return link_text;
	 }
	 
	 function updateTitle(link_text, contentArea) {
		/// <summary>
		/// Updates the title.
		/// </summary>
		/// <param name="link_text">The link text.</param>
		/// <param name="contentArea">The content area.</param>
		var $title = contentArea.find('.ajax-append-title');
		if($title.length > 0) {
			document.title = $title.text();
			$title.remove();
		}
		else if(link_text.length > 0) {
			var extra = $.trim(String(document.title).replace(/^(.*)[\-]/, ''));//for example like " - Ace Admin"
			if(extra) extra = ' - ' + extra;
			link_text = $.trim(link_text) + extra;
		}
	 }

}

ace.load_ajax_scripts = function(scripts, callback) {

 /// <summary>
 /// </summary>
 /// <param name="scripts">The scripts.</param>
 /// <param name="callback">The callback.</param>
 /// <summary>
 /// </summary>
 /// <param name="opts">The opts.</param>
 jQuery.ajaxPrefilter('script', function(opts) {opts.cache = true});
 setTimeout(function() {

	//let's keep a list of loaded scripts so that we don't load them more than once!
	/// <summary>
	/// </summary>
	if(! ('ajax_loaded_scripts' in ace.vars) ) ace.vars['ajax_loaded_scripts'] = {}

	var deferreds = [];
	for(var i = 0; i < scripts.length; i++) if(scripts[i]) {
		(function() {
			/// <summary>
			/// </summary>
			var script_name = "js-"+scripts[i].replace(/[^\w\d\-]/g, '-').replace(/\-\-/g, '-');
			//only load scripts that are not loaded yet!
			if(! (script_name in ace.vars['ajax_loaded_scripts']) ) {
				deferreds.push( jQuery.getScript(scripts[i]).done(function() {
					/// <summary>
					/// </summary>
					ace.vars['ajax_loaded_scripts'][script_name] = true;
				}));
			}
		})()
	}

	if(deferreds.length > 0) {
		/// <summary>
		/// </summary>
		/// <param name="deferred">The deferred.</param>
		deferreds.push(jQuery.Deferred(function( deferred ){jQuery( deferred.resolve )}));

		jQuery.when.apply( null, deferreds ).then(function() {
			/// <summary>
			/// </summary>
			if(typeof callback === 'function') callback();
			jQuery('.btn-group[data-toggle="buttons"] > .btn').button();
			
			$(document).trigger('ajaxscriptsloaded');
		})
	}
	else {
		if(typeof callback === 'function') callback();
		jQuery('.btn-group[data-toggle="buttons"] > .btn').button();
		$(document).trigger('ajaxscriptsloaded');
	}

 }, 10)
}
