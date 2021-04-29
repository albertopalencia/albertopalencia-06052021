// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="reporting.js" company="WebApp">
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
                    Reporting.inicializar();
                });
            } else {
                window.onload = function () {
                    /// <summary>
                    /// </summary>
                    Reporting.inicializar();
                }
            }
        },

        inicializar: function () {
            /// <summary>
            /// </summary>
            $(":button").filter("[data-tipo='reporte']").click(function (event) {
                /// <summary>
                /// </summary>
                /// <param name="event">The event.</param>
                window.open("/Reporting/ReportViewer.aspx?CacheKey=" + $(this).attr("data-cache-key"));
                event.preventDefault();
            });;
        }
    };

    window.Reporting = namespace;

})(this.jQuery);

Reporting.inicio();