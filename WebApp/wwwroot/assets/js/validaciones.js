// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="validaciones.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
function InicializarValidaciones(idForma) {
    /// <summary>
    /// Inicializars the validaciones.
    /// </summary>
    /// <param name="idForma">The identifier forma.</param>
    $("#" + idForma).validate({
        onsubmit: false,
        showErrors: function (map, list) {
            /// <summary>
            /// </summary>
            /// <param name="map">The map.</param>
            /// <param name="list">The list.</param>
            $.each(this.validElements(), function (index, element) {
                /// <summary>
                /// </summary>
                /// <param name="index">The index.</param>
                /// <param name="element">The element.</param>
                var element = $(element);
                if (element.parent().hasClass('has-error')) {
                    element.tooltip("destroy");
                    element.removeClass('tooltip-error').attr("title", "").parent().removeClass('has-error');
                    if (!element.hasClass('date-picker') && !element.hasClass('date-timepicker')) {
                        element.parent().find("i").removeClass("ace-icon fa fa-times-circle red");
                    }
                }
            });

            $.each(list, function (index, error) {
                /// <summary>
                /// </summary>
                /// <param name="index">The index.</param>
                /// <param name="error">The error.</param>
                var element = $(error.element);
                if (!element.parent().hasClass('has-error')) {
                    if (!element.hasClass('date-picker') && !element.hasClass('date-timepicker') && !element.is('select') && !element.is(':file')) {
                        var span;
                        if (!element.parent().is("span")) {
                            span = $("<span>").appendTo(element.parent());
                            span.addClass("block input-icon input-icon-right");
                            element.appendTo(span);
                        } else {
                            span = element.parent();
                        }
                        span.addClass('has-error');
                        if (span.find("i").length > 0) {
                            span.find("i").addClass("ace-icon fa fa-times-circle red");
                        } else {
                            $("<i>").appendTo(span).addClass("ace-icon fa fa-times-circle red");
                        }
                    } else {
                        element.parent().addClass('has-error');
                    }
                    if (!element.is('select')) {
                        element.addClass('tooltip-error').attr("title", error.message).tooltip();
                    }
                } else {
                    if (!element.is('select')) {
                        element.tooltip("destroy");
                        element.attr("title", error.message).tooltip();
                    }
                }
            });
        }
    });

    $(':submit[grupovalidacion], a[grupovalidacion]').unbind("click");
    $(':submit[grupovalidacion], a[grupovalidacion]').click(function (e) {
        /// <summary>
        /// </summary>
        /// <param name="e">The e.</param>
        if (!validarForma($(this))) {
            e.preventDefault();
            return false;
        }
    });
}

function validarForma(t) {
    /// <summary>
    /// Validars the forma.
    /// </summary>
    /// <param name="t">The t.</param>
    var isValid = true;
    if (t.is(":submit, :button, a")) {
        var grupo = t.attr("grupovalidacion");
        $("[grupovalidacion=" + grupo + "]").not(":submit, :button, a").each(function (i, item) {
            /// <summary>
            /// </summary>
            /// <param name="i">The i.</param>
            /// <param name="item">The item.</param>
            if (!$(item).valid())
                isValid = false;
        });
    }
    return isValid;
}