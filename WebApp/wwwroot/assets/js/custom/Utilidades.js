// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="Utilidades.js" company="WebApp">
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
        getPartialView: function (action, requestData, container, httpType) {

            /// <summary>
            /// </summary>
            /// <param name="action">The action.</param>
            /// <param name="requestData">The request data.</param>
            /// <param name="container">The container.</param>
            /// <param name="httpType">Type of the HTTP.</param>
            if (typeof (httpType) === "undefined") { httpType = "GET"; }
            var actionUrl = action

            $.ajax({
                url: actionUrl,
                data: requestData,
                type: httpType,
                async: false,
                cache: false
            }).success(function (result) {
                /// <summary>
                /// </summary>
                /// <param name="result">The result.</param>
                container.html(result);
            }).error(function (xhr, status) {
                /// <summary>
                /// </summary>
                /// <param name="xhr">The XHR.</param>
                /// <param name="status">The status.</param>
                alert(xhr.responseText);
            })

        },

        EliminarAgregarRequired: function (contenedor, agregar) {

            /// <summary>
            /// </summary>
            /// <param name="contenedor">The contenedor.</param>
            /// <param name="agregar">The agregar.</param>
            var controles = (contenedor + ' input[type="text"]' + ', ' + contenedor + ' select' + ', ' + contenedor + ' textarea');

            if (agregar) {
                $(controles).addClass('required');
            }
            else {
                $(controles).removeClass('required');
            }
        },

       DiasEnUnMes: function(mes, año) {
            /// <summary>
            /// </summary>
            /// <param name="mes">The mes.</param>
            /// <param name="año">The año.</param>
            return new Date(año, mes, 0).getDate();
        },

        CargarValores: function (entidad, entidadNombre, contenedor) {

            /// <summary>
            /// </summary>
            /// <param name="entidad">The entidad.</param>
            /// <param name="entidadNombre">The entidad nombre.</param>
            /// <param name="contenedor">The contenedor.</param>
            if (contenedor == undefined) {
                contenedor = '';
            }

            $.each(entidad, function (name, value) {
                /// <summary>
                /// </summary>
                /// <param name="name">The name.</param>
                /// <param name="value">The value.</param>
                var valorControl;
                var control;

                if (entidadNombre != '' &&
                    contenedor != '') {
                    control = $(contenedor).find(entidadNombre + '_' + name);
                }
                else if (entidadNombre != '' &&
                        contenedor == '') {
                    control = $(entidadNombre + '_' + name);
                }
                else if (entidadNombre == '' &&
                        contenedor != '') {
                    control = $(contenedor).find('#' + name);
                }
                else {
                    control = $('#' + name);
                }

                if (control != undefined) {

                    var attr = $(control).attr('type');
                    var classDatePicker = $(control).hasClass('date-picker');

                    if (control.prop('id') != undefined) {
                        if (attr != 'radio' &&
                            attr != 'checkbox') {
                            if (!classDatePicker) {
                                control.val(value);
                            }
                            else {
                                control.val(utilidades.formatoFecha(value));
                            }
                        }
                        else if (attr == 'radio' &&
                            value != null) {

                            if (value != false &&
                                value != true) {
                                valorControl = value.trim();
                            }
                            else {
                                valorControl = value;
                            }

                            if (valorControl == '1' ||
                                valorControl == true) {
                                $('#' + control.prop('id') + '[value="true"]').prop("checked", true);

                            }
                            else if (valorControl == '0' ||
                                valorControl == false) {
                                $('#' + control.prop('id') + '[value="false"]').prop("checked", true);
                            }
                        }
                        else if (attr == 'checkbox' &&
                            value != null) {
                            $(control).prop("checked", value);
                        }
                    }
                }
            });
        },

        LimpiarControles: function (contenedor) {
            /// <summary>
            /// </summary>
            /// <param name="contenedor">The contenedor.</param>
            $(contenedor + ' input[type="text"]').val('');
            $(contenedor + ' input[type="text"]').prop('disabled', false);
            $(contenedor + ' select[class~="select2"]').prop('disabled', false);
            $(contenedor + ' textarea').val('');
            $(contenedor + ' select').val('');
            $(contenedor + ' input[type="radio"][value="true"]').prop("checked", false);
            $(contenedor + ' input[type="radio"][value="false"]').prop("checked", false);
            $(contenedor + ' input[type="checkbox"]').prop("checked", false);
            $(contenedor + ' select[class~="select2"]').select2('val', '');
            $(contenedor + ' input[type="checkbox"]').prop('disabled', false);
        },

        validarForm: function (form) {

            /// <summary>
            /// </summary>
            /// <param name="form">The form.</param>
            $.validator.addMethod("emailCustom", function (value, element, params) {
                /// <summary>
                /// </summary>
                /// <param name="value">The value.</param>
                /// <param name="element">The element.</param>
                /// <param name="params">The parameters.</param>
                var re = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                return re.test(value);
            }, "Por favor, escribe una dirección de correo válida.");


            $.validator.addClassRules("emailCustom", {
                emailCustom: true
            });

            $.validator.addMethod("password", function (value, element) {
                /// <summary>
                /// </summary>
                /// <param name="value">The value.</param>
                /// <param name="element">The element.</param>
                return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{0,20}$/.test(value);
            }, "digite mínimo una letra mayúscula, una minúscula y un numero.");

            $.validator.addClassRules("password", {
                required: true,
                password: true
            });

            $(form).validate({
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
                            if (!element.hasClass('date-picker') &&
                                !element.hasClass('date-picker-control')) {
                                element.parent().find("i").removeClass("ace-icon fa fa-times-circle red");
                            }
                        }

                        if (element.parent().hasClass('select-text')) {
                            element.parent().tooltip("destroy");
                        }
                    });

                    $.each(list, function (index, error) {
                        /// <summary>
                        /// </summary>
                        /// <param name="index">The index.</param>
                        /// <param name="error">The error.</param>
                        var element = $(error.element);
                        if (!element.parent().hasClass('has-error')) {
                            if (!element.hasClass('date-picker') &&
                                !element.is('select') &&
                                !element.hasClass('date-picker-control') &&
                                !element.hasClass('search')) {
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

                                element.attr("data-original-title", error.message);
                            } else {
                                if (!element.hasClass('select2-offscreen')) {
                                    element.parent().addClass('has-error');
                                }
                                else {
                                    if (!element.parent().hasClass('select-text')) {
                                        element.parent().append("<div class='select-text has-error tooltip-error'></div>");
                                        element.parent().find('.select2-offscreen, .select2-container')
                                            .appendTo(element.parent().find('.has-error'));
                                    }
                                    else {
                                        element.parent().removeAttr('class');
                                        element.parent().attr('class', 'select-text has-error tooltip-error');
                                    }
                                }
                            }
                            if (!element.is('select')) {
                                element.addClass('tooltip-error').attr("title", error.message).tooltip();
                            }
                            else {
                                if (!element.hasClass('select2-offscreen')) {
                                    element.attr("data-toggle", 'tooltip').attr('data-placement', 'top')
                                    .attr("data-original-title", error.message).addClass('tooltip-error')
                                    .tooltip({
                                        placement: $(this).data("placement") || 'top'
                                    });
                                }
                                else {
                                    element.parent().attr("data-toggle", 'tooltip').attr('data-placement', 'top')
                                   .attr("data-original-title", error.message)
                                   .tooltip({
                                       placement: $(this).data("placement") || 'top'
                                   });
                                }
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
        },

        validar: function (t) {
            /// <summary>
            /// </summary>
            /// <param name="t">The t.</param>
            var isValid = true;
            var grupo;

            if (t.is(":submit, :button, a")) {

                utilidades.RemoverValidador();

                grupo = t.attr("grupovalidacion");
                $("[grupovalidacion~=" + grupo + "]").not(":submit, :button, a").each(function (i, item) {

                    /// <summary>
                    /// </summary>
                    /// <param name="i">The i.</param>
                    /// <param name="item">The item.</param>
                    if (!$(item).valid())
                        isValid = false;
                });
            }

            var attrType = t.attr('data-type');

            utilidades.SeleccionarControlValidacion(isValid, attrType, grupo);

            if (typeof validacionesAdicionales == 'function' &&
                isValid == true &&
                attrType != undefined &&
                attrType == 'terminar') {
                isValid = validacionesAdicionales();
            }

            return isValid;
        },

        RemoverValidador: function () {
            /// <summary>
            /// </summary>
            var controles;

            controles = $('div, span').find('.has-error');

            if (controles.size() != 0) {

                for (var i = 0; i < controles.size() ; i++) {

                    var element = $(controles[i]);

                    if (element.is('span')) {
                        element.children('i').remove();
                        element.children('input, textarea').unwrap().removeClass('tooltip-error')
                            .removeAttr('aria-invalid').removeAttr('title').removeAttr('data-original-title');
                    }
                    else if (element.is('div')) {
                        element.removeClass('has-error');
                        element.children('select').removeClass('tooltip-error')
                            .removeAttr('aria-invalid').removeAttr('data-toggle').removeAttr('data-placement')
                            .removeAttr('data-original-title');
                    }
                }

            }
        },

        iniciarValidacion: function () {
            /// <summary>
            /// </summary>
            $(':submit[grupovalidacion], a[grupovalidacion]').unbind("click");
            $(':submit[grupovalidacion], a[grupovalidacion]').click(function (e) {
                /// <summary>
                /// </summary>
                /// <param name="e">The e.</param>
                if (!utilidades.validar($(this))) {
                    e.preventDefault();
                    return false;
                }
            });
        },

        formatoFecha: function (jsonDate) {

            /// <summary>
            /// </summary>
            /// <param name="jsonDate">The json date.</param>
            var shortDate = null;
            if (jsonDate) {
                var regex = /-?\d+/;
                var matches = regex.exec(jsonDate);
                var dt = new Date(parseInt(matches[0]));
                var month = dt.getMonth() + 1;
                var monthString = month > 9 ? month : '0' + month;
                var day = dt.getDate();
                var dayString = day > 9 ? day : '0' + day;
                var year = dt.getFullYear();
                shortDate = monthString + '/' + dayString + '/' + year;
            }
            return shortDate;
        },

        valorRadio: function (control) {

            /// <summary>
            /// </summary>
            /// <param name="control">The control.</param>
            if ($(control + '[value="true"]').is(':checked')) {
                return 1;
            } else {
                return 0;
            }
        },

        ValorCheckbox: function (nombreControl) {

            /// <summary>
            /// </summary>
            /// <param name="nombreControl">The nombre control.</param>
            if ($(nombreControl).is(':checked')) {
                return 1;
            } else {
                return 0;
            }
        },

        PresentarMensajeGeneral: function (text) {
            /// <summary>
            /// </summary>
            /// <param name="text">The text.</param>
            $('#mensajeModalGeneral').text(text);
            $('#presentarMensajeGeneral').click();
        },

        Modales: function () {

            /// <summary>
            /// </summary>
            var $body = $('body');
            var OPEN_MODALS_COUNT = 'fv_open_modals';
            var Z_ADJUSTED = 'fv-modal-stack';
            var defaultBootstrapModalZindex = 1040;

            if ($body.data(OPEN_MODALS_COUNT) === undefined) {
                $body.data(OPEN_MODALS_COUNT, 0);
            }

            $body.on('show.bs.modal', '.modal', function (event) {
                /// <summary>
                /// </summary>
                /// <param name="event">The event.</param>
                if (!$(this).hasClass(Z_ADJUSTED) &&
                    !$(this).hasClass('bootbox')) {
                    $body.data(OPEN_MODALS_COUNT, $body.data(OPEN_MODALS_COUNT) + 1);
                    $(this).addClass(Z_ADJUSTED);
                    $(this).css('z-index', defaultBootstrapModalZindex + (1 * $body.data(OPEN_MODALS_COUNT)));
                }
            });
            $body.on('hidden.bs.modal', '.modal', function (event) {
                /// <summary>
                /// </summary>
                /// <param name="event">The event.</param>
                $body.data(OPEN_MODALS_COUNT, $body.data(OPEN_MODALS_COUNT) - 1);
                $(this).removeClass(Z_ADJUSTED);
                if ($body.data(OPEN_MODALS_COUNT) > 0)
                    $body.addClass('modal-open');
            });
        },

        ExtendjQuery: function () {
            /// <summary>
            /// </summary>
            jQuery.fn.extend({
                scrollToControl: function () {
                    /// <summary>
                    /// </summary>
                    var x = jQuery(this).offset().top - 100;
                    jQuery('html,body').scrollTop(x);
                }
            });

            jQuery.fn.extend({
                validarEmail: function () {
                    /// <summary>
                    /// </summary>
                    if ($(this).val() != '') {
                        $(this).addClass('emailCustom');
                    }
                    else {
                        $(this).removeClass('emailCustom');
                    }
                }
            });
        },

        SeleccionarElementoVisible: function (element, attrType) {

            /// <summary>
            /// </summary>
            /// <param name="element">The element.</param>
            /// <param name="attrType">Type of the attribute.</param>
            var parent;
            var li;
            var ul;
            var active = 'active';
            var tabPane = '.tab-pane';

            if (element != undefined) {

                parent = element.parentsUntil(tabPane).parent().first();

                if (parent[0] != undefined &&
                    !parent.hasClass(active) &&
                    attrType != 'modal') {

                    $(tabPane).removeClass(active);
                    parent.addClass(active);

                    li = $('a[href$="' + parent.prop('id') + '"]').parents('li');
                    ul = li.parents('ul');

                    if (!li.hasClass(active)) {
                        ul.find('li').removeClass(active);
                        li.addClass(active);
                    }
                }

                if ($(element).is(':visible')) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },

        SeleccionarControlValidacion: function (isValid, attrType, grupo) {

            /// <summary>
            /// </summary>
            /// <param name="isValid">The is valid.</param>
            /// <param name="attrType">Type of the attribute.</param>
            /// <param name="grupo">The grupo.</param>
            if (isValid == false) {

                var element;
                var elements;

                if (grupo != undefined) {
                    elements = $(".has-error").find('input[grupovalidacion~=' + grupo + '], select[grupovalidacion~=' + grupo + '], textarea[grupovalidacion~=' + grupo + ']');
                }
                else {
                    elements = $(".has-error").find('input, select, textarea');
                }

                for (var i = 0; i < elements.size() ; i++) {
                    if (utilidades.SeleccionarElementoVisible($(elements[i]), attrType)) {
                        element = $(elements[i]);
                        break;
                    }
                }

                if (element != undefined) {
                    if (attrType != 'modal') {
                        element.focus().scrollToControl();
                    }
                    else {
                        element.focus();
                    }
                }
            }
        },

        ValidacionesAdicionales: function () {
            /// <summary>
            /// </summary>
            $.validator.addMethod("emailCustom", function (value, element, params) {
                /// <summary>
                /// </summary>
                /// <param name="value">The value.</param>
                /// <param name="element">The element.</param>
                /// <param name="params">The parameters.</param>
                var re = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                return re.test(value);
            }, "Por favor, escribe una dirección de correo válida.");


            $.validator.addClassRules("emailCustom", {
                emailCustom: true
            });

            $.validator.addMethod("password", function (value, element) {
                /// <summary>
                /// </summary>
                /// <param name="value">The value.</param>
                /// <param name="element">The element.</param>
                return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{0,20}$/.test(value);
            }, "digite mínimo una letra mayúscula, una minúscula y un numero.");

            $.validator.addClassRules("password", {
                required: true,
                password: true
            });
        },

        CargarComboAjax: function (action, select, data) {

            /// <summary>
            /// </summary>
            /// <param name="action">The action.</param>
            /// <param name="select">The select.</param>
            /// <param name="data">The data.</param>
            $.ajax({
                url: action,
                data: data,
                cache: false,
                type: 'POST',
                async: async,
                success: function (data) {
                    /// <summary>
                    /// </summary>
                    /// <param name="data">The data.</param>
                    var items = "";
                    $.each(data, function (i, item) {
                        /// <summary>
                        /// </summary>
                        /// <param name="i">The i.</param>
                        /// <param name="item">The item.</param>
                        items += "<option value=\"" + item.Value + "\">" + item.Text + "</option>";
                    });

                    $(select).html(items);

                    if ($(select).hasClass('select2-offscreen')) {
                        $(select).select2('val', '');
                    }
                },
                error: function (reponse) {
                    /// <summary>
                    /// </summary>
                    /// <param name="reponse">The reponse.</param>
                    alert("error : " + reponse);
                }
            });
        },
        CargarComboAjaxSync: function (action, select, data) {
            /// <summary>
            /// </summary>
            /// <param name="action">The action.</param>
            /// <param name="select">The select.</param>
            /// <param name="data">The data.</param>
            $.ajax({
                url: action,
                data: data,
                cache: false,
                type: 'POST',
                async: true,
                success: function (data) {
                    /// <summary>
                    /// </summary>
                    /// <param name="data">The data.</param>
                    var items = "";
                    $.each(data, function (i, item) {
                        /// <summary>
                        /// </summary>
                        /// <param name="i">The i.</param>
                        /// <param name="item">The item.</param>
                        items += "<option value=\"" + item.Value + "\">" + item.Text + "</option>";
                    });

                    $(select).html(items);

                    if ($(select).hasClass('select2-offscreen')) {
                        $(select).select2('val', '');
                    }
                },
                error: function (reponse) {
                    /// <summary>
                    /// </summary>
                    /// <param name="reponse">The reponse.</param>
                    alert("error : " + reponse);
                }
            });
        },
        FuncionAjax: function (action, data) {
            /// <summary>
            /// </summary>
            /// <param name="action">The action.</param>
            /// <param name="data">The data.</param>
            var actionUrl = baseURL + '/' + action
            var datos;

            $.ajax({
                url: actionUrl,
                data: data,
                type: 'POST',
                async: false,
                cache: false
            }).success(function (data) {
                /// <summary>
                /// </summary>
                /// <param name="data">The data.</param>
                datos = data;
            }).error(function (xhr, status) {
                /// <summary>
                /// </summary>
                /// <param name="xhr">The XHR.</param>
                /// <param name="status">The status.</param>
                alert(xhr.responseText);
            });

            return datos;
        },

        FuncionAjaxAction: function (action, data) {
            /// <summary>
            /// </summary>
            /// <param name="action">The action.</param>
            /// <param name="data">The data.</param>
            var actionUrl = action
            var datos;

            $.ajax({
                url: actionUrl,
                data: JSON.stringify(data),
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                async: false,
                cache: false
            }).success(function (data) {
                /// <summary>
                /// </summary>
                /// <param name="data">The data.</param>
                datos = data;
            }).error(function (xhr, status) {
                /// <summary>
                /// </summary>
                /// <param name="xhr">The XHR.</param>
                /// <param name="status">The status.</param>
                alert(xhr.responseText);
            });

            return datos;
        },

        CargarGrilla: function (grilla) {
            /// <summary>
            /// </summary>
            /// <param name="grilla">The grilla.</param>
            var grid = $('#' + grilla).data("kendoGrid");
            grid.dataSource.page(1);
        },

        CargarGrillaFinal: function (grilla) {
            /// <summary>
            /// </summary>
            /// <param name="grilla">The grilla.</param>
            var grid = $('#' + grilla).data("kendoGrid");
            grid.dataSource.read();
        },

        CambiarIconosGrilla: function (arg) {
            /// <summary>
            /// </summary>
            /// <param name="arg">The argument.</param>
            $(".k-grid-View").find("span").addClass("ui-icon ace-icon fa fa-search-plus grey")
               .attr('data-toggle', 'tooltip').attr('title', 'Seleccionar')
               .wrap('<div class="ui-pg-div text-center"></div>');
            $(".k-grid-View").removeClass('k-button');

            $(".k-grid-Edit").find("span").addClass("ui-icon ace-icon fa fa-pencil blue")
               .attr('data-toggle', 'tooltip').attr('title', 'Editar')
               .wrap('<div class="ui-pg-div text-center pull-left"></div>');
            $(".k-grid-Edit").removeClass('k-button');

            $(".k-grid-Destroy").find("span").addClass("ui-icon ace-icon fa fa-trash-o red")
               .attr('data-toggle', 'tooltip').attr('title', 'Eliminar')
               .wrap('<div class="ui-pg-div text-center pull-left"></div>');
            $(".k-grid-Destroy").removeClass('k-button');

            $('[data-toggle="tooltip"]').tooltip();
        },

        FuncionExiste: function (nombreFuncion) {
            /// <summary>
            /// </summary>
            /// <param name="nombreFuncion">The nombre funcion.</param>
            if (typeof window[nombreFuncion] == 'function') {
                return true;
            }
            else {
                return false;
            }
        },

        Error_handler: function (e) {
            /// <summary>
            /// </summary>
            /// <param name="e">The e.</param>
            if (e.errors) {
                var message = "Errors:\n";
                $.each(e.errors, function (key, value) {
                    /// <summary>
                    /// </summary>
                    /// <param name="key">The key.</param>
                    /// <param name="value">The value.</param>
                    if ('errors' in value) {
                        $.each(value.errors, function () {
                            /// <summary>
                            /// </summary>
                            message += this + "\n";
                        });
                    }
                });
                alert(message);
            }
        },

        CargueInicial: function (nombreFormulario) {

            /// <summary>
            /// </summary>
            /// <param name="nombreFormulario">The nombre formulario.</param>
            utilidades.ExtendjQuery();

            $(".onlynumber").numericInput({ allowNegative: true, allowFloat: true });

            $(".onlynumberPositive").numericInput({ allowNegative: false, allowFloat: true });

            $(".onlynumberNotFloat").numericInput({ allowNegative: false, allowFloat: false });

            utilidades.CargueControlFecha('.date-picker');

            $('.timepicker').mask("99:99", { placeholder: "hh:mm" });

            $('.timepicker').blur(function (e) {
                /// <summary>
                /// </summary>
                /// <param name="e">The e.</param>
                var today = new Date();

                if ($(this).val() == '' || $(this).val() == 'hh:mm') {
                    $(this).val(today.getHours() + ':' + today.getMinutes());
                    utilidades.CambiarHora($(this));
                }
            });

            $('.timepicker').keydown(function (e) {
                /// <summary>
                /// </summary>
                /// <param name="e">The e.</param>
                var keycode = (e.keyCode ? e.keyCode : e.which);

                if (keycode == 8 || keycode == 9 || utilidades.KeyCodeNumber(keycode)) {
                    if (keycode == 9) {
                        $('.bootstrap-timepicker-widget').removeClass('open');
                    }
                    return true;
                }
                else
                    return false;
            }).timepicker({
                minuteStep: 1,
                showMeridian: false,
                autoclose: true
            }).next().click(function (e) {
                /// <summary>
                /// </summary>
                /// <param name="e">The e.</param>
                $(this).prev().focus();
            });

            $('.timepicker').each(function () {
                /// <summary>
                /// </summary>
                utilidades.CambiarHora($(this));
            });

            $('.timepicker').timepicker().on('changeTime.timepicker', function (e) {
                /// <summary>
                /// </summary>
                /// <param name="e">The e.</param>
                utilidades.CambiarHora($(this));
            });

            $(".timepicker").each(function () {
                /// <summary>
                /// </summary>
                $(this).parent().find('span').addClass('cursor-pointer');
            });

            //$("select:not(.select2)").select2({ allowClear: true, dropdownCssClass: 'no-search' })
            $("select:not(.select2)").select2({ allowClear: true })
               .on('change', function () {
                   /// <summary>
                   /// </summary>
                   $(this).closest('form').validate().element($(this));
               }).removeClass('form-control').addClass('width-100 input-sm no-padding');

            $('.radio input[type="radio"]').addClass('ace');

            $('.checkbox label').children().each(function () {
                /// <summary>
                /// </summary>
                if ($(this).is("input") &&
                    $(this).attr('type') == 'hidden' &&
                    $(this).prev().attr('type') != 'hidden') {
                    $(this).val($(this).prev().is(':checked'));
                    $(this).appendTo($(this).parent());
                }
            });

            $('.checkbox label input').change(function () {
                /// <summary>
                /// </summary>
                $(this).nextAll('input[type=hidden]').val($(this).is(':checked'));
            });

            $('.checkbox2').change(function () {

                /// <summary>
                /// </summary>
                var control = $(this).find('input');

                if ($(control).prop('checked') == true) {
                    $(control).prop("checked", false);
                }
                else {
                    $(control).prop("checked", true);
                }
            });

            $('[data-toggle="tooltip"]').tooltip();

            if (nombreFormulario != '') {
                utilidades.validarForm('#' + nombreFormulario);
                utilidades.iniciarValidacion();

                $('#' + nombreFormulario).keypress(function (e) {
                    /// <summary>
                    /// </summary>
                    /// <param name="e">The e.</param>
                    if (e.which == 13) {
                        e.preventDefault();
                    }
                });
            }
        },

        CargueControlFecha: function (identificador) {
            /// <summary>
            /// </summary>
            /// <param name="identificador">The identificador.</param>
            $(identificador).datepicker({ autoclose: true }).next().click(function (e) {
                /// <summary>
                /// </summary>
                /// <param name="e">The e.</param>
                $(this).prev().focus();
            });            

            $(identificador).each(function () {
                /// <summary>
                /// </summary>
                $(this).parent().find('span').addClass('cursor-pointer');
            });

            $(".date-picker").datepicker({ autoclose: true}).next().click(function (e) {
                /// <summary>
                /// </summary>
                /// <param name="e">The e.</param>
                $(this).prev().focus();
            });

            $('.date-picker').each(function () {
                /// <summary>
                /// </summary>
                $(this).parent().find('span').addClass('cursor-pointer');
            });

            $(identificador).keydown(function (e) {
                /// <summary>
                /// </summary>
                /// <param name="e">The e.</param>
                var keycode = (e.keyCode ? e.keyCode : e.which);
                if (keycode == 8 || keycode == 9 || utilidades.KeyCodeNumber(keycode))
                    return true;
                else
                    return false;
            });
        },

        KeyCodeNumber: function (keycode) {
            /// <summary>
            /// </summary>
            /// <param name="keycode">The keycode.</param>
            if ((keycode >= 96 && keycode <= 105) || (keycode >= 48 && keycode <= 57)) {
                return true;
            }
            else {
                return false;
            }
        },

        CambiarHora: function (control) {
            /// <summary>
            /// </summary>
            /// <param name="control">The control.</param>
            var hora = parseInt($(control).val().substring(0, $(control).val().indexOf(':')));
            if (hora <= 9) {
                $(control).val('0' + $(control).val());
            }
        },

        Mensaje: function (titulo, mensaje) {
            /// <summary>
            /// </summary>
            /// <param name="titulo">The titulo.</param>
            /// <param name="mensaje">The mensaje.</param>
            bootbox.dialog({
                title: titulo,
                message: mensaje,
                buttons: {
                    cerrar: {
                        icon: "ace-icon fa fa-times",
                        label: "Cerrar",
                        className: "btn-default"
                    }
                }
            });
        },

        ConfirmacionEliminar: function (titulo, mensaje, funcion, id) {
            /// <summary>
            /// </summary>
            /// <param name="titulo">The titulo.</param>
            /// <param name="mensaje">The mensaje.</param>
            /// <param name="funcion">The funcion.</param>
            /// <param name="id">The identifier.</param>
            bootbox.dialog({
                title: titulo,
                message: mensaje,
                buttons: {
                    cerrar: {
                        icon: "ace-icon fa fa-times",
                        label: "Cerrar",
                        className: "btn-default"
                    },
                    aceptar: {
                        icon: "ace-icon fa fa-trash-o",
                        label: "Aceptar",
                        className: "btn-primary",
                        id:'confirmAceptar',
                        callback: function () {
                            /// <summary>
                            /// </summary>
                            bootbox.hideAll();
                            var codeToExecute = funcion + '(' + id + ')';
                            var tmpFunc = new Function(codeToExecute);
                            tmpFunc();   
                           
                        }   
                    }
                }
            });           
        },

        GetURLParameter: function (sParam) {
            /// <summary>
            /// </summary>
            /// <param name="sParam">The s parameter.</param>
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) {
                    return sParameterName[1];
                }
            }
        }
    };

    window.utilidades = namespace;

})(this.jQuery);