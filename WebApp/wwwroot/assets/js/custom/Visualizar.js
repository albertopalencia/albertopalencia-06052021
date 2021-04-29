// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="Visualizar.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
(function ($) {

    /// <summary>
    /// </summary>
    /// <param name="$">The $.</param>
    $(document).ready(function () {
        /// <summary>
        /// </summary>
        $('select, input[type="file"], input[type="checkbox"], input[type="radio"]').prop('disabled', true);
        $('input[type="text"], textarea').prop('readonly', true);
        $('button[data-no-visualizar="true"], span[data-no-visualizar="true"], input[data-no-visualizar="true"], a[data-no-visualizar="true"], div[data-no-visualizar="true"]').remove();
    });

})(this.jQuery);