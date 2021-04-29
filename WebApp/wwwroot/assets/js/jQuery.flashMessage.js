// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="jQuery.flashMessage.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
$.fn.flashMessage = function (options) {
    /// <summary>
    /// </summary>
    /// <param name="options">The options.</param>
    var target = this;
    options = $.extend({}, options, { timeout: 120000 });

    if (!options.alert) {
        options = $.extend({}, options, { alert: 'info' });
    }

    if (!options.message) {
        setFlashMessageFromCookie(options);
    }

    if (options.message) {
        $(target).addClass(('alert alert-' + options.alert.toString().toLowerCase()));

        if (typeof options.message === "string") {
            $('strong', target).html("<span>" + options.message + "</span>");
        } else {
            target.empty().append(options.message);
        }
    } else {
        return;
    }

    if (target.children().length === 0) return;

    target.fadeIn().one("click", function () {
        /// <summary>
        /// </summary>
        $(this).fadeOut();
    });

    if (options.timeout > 0) {
        /// <summary>
        /// </summary>
        setTimeout(function () { target.fadeOut(); }, options.timeout);
    }

    return this;

    // Get the first alert message read from the cookie
    function setFlashMessageFromCookie() {
        /// <summary>
        /// Sets the flash message from cookie.
        /// </summary>
        $.each(new Array('Success', 'Danger', 'Warning', 'Info'), function (i, alert) {
            /// <summary>
            /// </summary>
            /// <param name="i">The i.</param>
            /// <param name="alert">The alert.</param>
            var cookie = $.cookie("Flash." + alert);

            if (cookie) {
                options.message = cookie;
                options.alert = alert;

                deleteFlashMessageCookie(alert);
                return;
            }
        });
    }

    // Delete the named flash cookie
    function deleteFlashMessageCookie(alert) {
        /// <summary>
        /// Deletes the flash message cookie.
        /// </summary>
        /// <param name="alert">The alert.</param>
        $.cookie("Flash." + alert, null, { path: '/' });
    }
};