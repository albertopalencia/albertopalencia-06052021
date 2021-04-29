// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="bootstrap-datepicker.no.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
/**
 *  Norwegian translation for bootstrap-datepicker
 **/
;(function($){
  /// <summary>
  /// </summary>
  /// <param name="$">The $.</param>
  $.fn.datepicker.dates['no'] = {
    days: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
    daysShort: ['Søn','Man','Tir','Ons','Tor','Fre','Lør'],
    daysMin: ['Sø','Ma','Ti','On','To','Fr','Lø'],
    months: ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'],
    monthsShort: ['Jan','Feb','Mar','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Des'],
    today: 'I dag',
    clear: 'Nullstill',
    weekStart: 1,
    format: 'dd.mm.yyyy'
  };
}(jQuery));
