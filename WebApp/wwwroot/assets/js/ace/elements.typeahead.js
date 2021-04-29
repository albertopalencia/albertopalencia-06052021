// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="elements.typeahead.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
/**
  <b>Bootstrap 2 typeahead plugin.</b> With Bootstrap <u>3</u> it's been dropped in favor of a more advanced separate plugin.
  Pretty good for simple cases such as autocomplete feature of the search box and required for <u class="text-danger">Tag input</u> plugin.
*/

/* =============================================================
 * bootstrap-typeahead.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  /// <summary>
  /// </summary>
  /// <param name="$">The $.</param>
  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    /// <summary>
    /// </summary>
    /// <param name="element">The element.</param>
    /// <param name="options">The options.</param>
    this.$element = $(element)
    this.options = $.extend({}, $.fn.bs_typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      /// <summary>
      /// </summary>
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      /// <summary>
      /// </summary>
      /// <param name="item">The item.</param>
      return item
    }

  , show: function () {
      /// <summary>
      /// </summary>
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      /// <summary>
      /// </summary>
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      /// <summary>
      /// </summary>
      /// <param name="event">The event.</param>
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      /// <summary>
      /// </summary>
      /// <param name="items">The items.</param>
      var that = this

      items = $.grep(items, function (item) {
        /// <summary>
        /// </summary>
        /// <param name="item">The item.</param>
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      /// <summary>
      /// </summary>
      /// <param name="item">The item.</param>
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      /// <summary>
      /// </summary>
      /// <param name="items">The items.</param>
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      /// <summary>
      /// </summary>
      /// <param name="item">The item.</param>
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        /// <summary>
        /// </summary>
        /// <param name="$1">The $1.</param>
        /// <param name="match">The match.</param>
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      /// <summary>
      /// </summary>
      /// <param name="items">The items.</param>
      var that = this

      items = $(items).map(function (i, item) {
        /// <summary>
        /// </summary>
        /// <param name="i">The i.</param>
        /// <param name="item">The item.</param>
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      /// <summary>
      /// </summary>
      /// <param name="event">The event.</param>
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      /// <summary>
      /// </summary>
      /// <param name="event">The event.</param>
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      /// <summary>
      /// </summary>
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
    }

  , eventSupported: function(eventName) {
      /// <summary>
      /// </summary>
      /// <param name="eventName">Name of the event.</param>
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      /// <summary>
      /// </summary>
      /// <param name="e">The e.</param>
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      /// <summary>
      /// </summary>
      /// <param name="e">The e.</param>
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      /// <summary>
      /// </summary>
      /// <param name="e">The e.</param>
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      /// <summary>
      /// </summary>
      /// <param name="e">The e.</param>
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , focus: function (e) {
      /// <summary>
      /// </summary>
      /// <param name="e">The e.</param>
      this.focused = true
    }

  , blur: function (e) {
      /// <summary>
      /// </summary>
      /// <param name="e">The e.</param>
      this.focused = false
      if (!this.mousedover && this.shown) this.hide()
    }

  , click: function (e) {
      /// <summary>
      /// </summary>
      /// <param name="e">The e.</param>
      e.stopPropagation()
      e.preventDefault()
      this.select()
      this.$element.focus()
    }

  , mouseenter: function (e) {
      /// <summary>
      /// </summary>
      /// <param name="e">The e.</param>
      this.mousedover = true
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  , mouseleave: function (e) {
      /// <summary>
      /// </summary>
      /// <param name="e">The e.</param>
      this.mousedover = false
      if (!this.focused && this.shown) this.hide()
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.bs_typeahead

  $.fn.bs_typeahead = function (option) {
    /// <summary>
    /// </summary>
    /// <param name="option">The option.</param>
    return this.each(function () {
      /// <summary>
      /// </summary>
      var $this = $(this)
        , data = $this.data('bs_typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('bs_typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.bs_typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.bs_typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.bs_typeahead.noConflict = function () {
    /// <summary>
    /// </summary>
    $.fn.bs_typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.bs_typeahead.data-api', '[data-provide="bs_typeahead"]', function (e) {
    /// <summary>
    /// </summary>
    /// <param name="e">The e.</param>
    var $this = $(this)
    if ($this.data('bs_typeahead')) return
    $this.bs_typeahead($this.data())
  })

}(window.jQuery);