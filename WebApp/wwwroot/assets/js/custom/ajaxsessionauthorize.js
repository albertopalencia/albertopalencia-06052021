// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="ajaxsessionauthorize.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
(function ($) {
    /// <summary>
    /// </summary>
    /// <param name="$">The $.</param>
    var namespace;
    namespace = {
        inicio: function () {
            /// <summary>
            /// </summary>
            if (window.jQuery) {
                $(document).ready(function () {
                    /// <summary>
                    /// </summary>
                    ajaxauthenticationvalidator.inicializar();
                });
            } else {
                window.onload = function () {
                    /// <summary>
                    /// </summary>
                    ajaxauthenticationvalidator.inicializar();
                }
            }
        },
        inicializar: function () {
            /// <summary>
            /// </summary>
            $.ajaxSetup({
                error: function (x, e) {
                    /// <summary>
                    /// </summary>
                    /// <param name="x">The x.</param>
                    /// <param name="e">The e.</param>
                    if (x.status == 403 || x.status == 401) {
                        window.location.reload();
                        return;
                    }
                }
            });
        }
    }
    window.ajaxauthenticationvalidator = namespace;
})(this.jQuery);
ajaxauthenticationvalidator.inicio();