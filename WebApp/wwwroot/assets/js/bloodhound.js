// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="bloodhound.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */

(function(root, factory) {
    /// <summary>
    /// </summary>
    /// <param name="root">The root.</param>
    /// <param name="factory">The factory.</param>
    if (typeof define === "function" && define.amd) {
        define("bloodhound", [ "jquery" ], function(a0) {
            /// <summary>
            /// </summary>
            /// <param name="a0">The a0.</param>
            return root["Bloodhound"] = factory(a0);
        });
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        root["Bloodhound"] = factory(jQuery);
    }
})(this, function($) {
    /// <summary>
    /// </summary>
    /// <param name="$">The $.</param>
    var _ = function() {
        /// <summary>
        /// </summary>
        "use strict";
        return {
            isMsie: function() {
                /// <summary>
                /// </summary>
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                /// <summary>
                /// </summary>
                /// <param name="str">The string.</param>
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                /// <summary>
                /// </summary>
                /// <param name="str">The string.</param>
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                /// <summary>
                /// </summary>
                /// <param name="obj">The object.</param>
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                /// <summary>
                /// </summary>
                /// <param name="obj">The object.</param>
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                /// <summary>
                /// </summary>
                /// <param name="obj">The object.</param>
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                /// <summary>
                /// </summary>
                /// <param name="obj">The object.</param>
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                /// <summary>
                /// </summary>
                /// <param name="obj">The object.</param>
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                /// <summary>
                /// To the string.
                /// </summary>
                /// <param name="s">The s.</param>
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                /// <summary>
                /// </summary>
                /// <param name="collection">The collection.</param>
                /// <param name="cb">The cb.</param>
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    /// <summary>
                    /// Reverses the arguments.
                    /// </summary>
                    /// <param name="index">The index.</param>
                    /// <param name="value">The value.</param>
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                /// <summary>
                /// </summary>
                /// <param name="obj">The object.</param>
                /// <param name="test">The test.</param>
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    /// <summary>
                    /// </summary>
                    /// <param name="key">The key.</param>
                    /// <param name="val">The value.</param>
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                /// <summary>
                /// </summary>
                /// <param name="obj">The object.</param>
                /// <param name="test">The test.</param>
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    /// <summary>
                    /// </summary>
                    /// <param name="key">The key.</param>
                    /// <param name="val">The value.</param>
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                /// <summary>
                /// </summary>
                /// <param name="x">The x.</param>
                return x;
            },
            clone: function(obj) {
                /// <summary>
                /// </summary>
                /// <param name="obj">The object.</param>
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                /// <summary>
                /// </summary>
                var counter = 0;
                return function() {
                    /// <summary>
                    /// </summary>
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                /// <summary>
                /// Templatifies the specified object.
                /// </summary>
                /// <param name="obj">The object.</param>
                return $.isFunction(obj) ? obj : template;
                function template() {
                    /// <summary>
                    /// Templates this instance.
                    /// </summary>
                    return String(obj);
                }
            },
            defer: function(fn) {
                /// <summary>
                /// </summary>
                /// <param name="fn">The function.</param>
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                /// <summary>
                /// </summary>
                /// <param name="func">The function.</param>
                /// <param name="wait">The wait.</param>
                /// <param name="immediate">The immediate.</param>
                var timeout, result;
                return function() {
                    /// <summary>
                    /// </summary>
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        /// <summary>
                        /// </summary>
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                /// <summary>
                /// </summary>
                /// <param name="func">The function.</param>
                /// <param name="wait">The wait.</param>
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    /// <summary>
                    /// </summary>
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    /// <summary>
                    /// </summary>
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                /// <summary>
                /// </summary>
                /// <param name="val">The value.</param>
                return _.isString(val) ? val : JSON.stringify(val);
            },
/// <summary>
/// </summary>
            noop: function() {}
        };
    }();
    var VERSION = "0.11.1";
    var tokenizers = function() {
        /// <summary>
        /// </summary>
        "use strict";
        return {
            nonword: nonword,
            whitespace: whitespace,
            obj: {
                nonword: getObjTokenizer(nonword),
                whitespace: getObjTokenizer(whitespace)
            }
        };
        function whitespace(str) {
            /// <summary>
            /// Whitespaces the specified string.
            /// </summary>
            /// <param name="str">The string.</param>
            str = _.toStr(str);
            return str ? str.split(/\s+/) : [];
        }
        function nonword(str) {
            /// <summary>
            /// Nonwords the specified string.
            /// </summary>
            /// <param name="str">The string.</param>
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
        function getObjTokenizer(tokenizer) {
            /// <summary>
            /// Gets the object tokenizer.
            /// </summary>
            /// <param name="tokenizer">The tokenizer.</param>
            return function setKey(keys) {
                /// <summary>
                /// Sets the key.
                /// </summary>
                /// <param name="keys">The keys.</param>
                keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);
                return function tokenize(o) {
                    /// <summary>
                    /// Tokenizes the specified o.
                    /// </summary>
                    /// <param name="o">The o.</param>
                    var tokens = [];
                    _.each(keys, function(k) {
                        /// <summary>
                        /// </summary>
                        /// <param name="k">The k.</param>
                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
                    });
                    return tokens;
                };
            };
        }
    }();
    var LruCache = function() {
        /// <summary>
        /// </summary>
        "use strict";
        function LruCache(maxSize) {
            /// <summary>
            /// Lrus the cache.
            /// </summary>
            /// <param name="maxSize">The maximum size.</param>
            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
            this.reset();
            if (this.maxSize <= 0) {
                this.set = this.get = $.noop;
            }
        }
        _.mixin(LruCache.prototype, {
            set: function set(key, val) {
                /// <summary>
                /// Sets the specified key.
                /// </summary>
                /// <param name="key">The key.</param>
                /// <param name="val">The value.</param>
                var tailItem = this.list.tail, node;
                if (this.size >= this.maxSize) {
                    this.list.remove(tailItem);
                    delete this.hash[tailItem.key];
                    this.size--;
                }
                if (node = this.hash[key]) {
                    node.val = val;
                    this.list.moveToFront(node);
                } else {
                    node = new Node(key, val);
                    this.list.add(node);
                    this.hash[key] = node;
                    this.size++;
                }
            },
            get: function get(key) {
                /// <summary>
                /// Gets the specified key.
                /// </summary>
                /// <param name="key">The key.</param>
                var node = this.hash[key];
                if (node) {
                    this.list.moveToFront(node);
                    return node.val;
                }
            },
            reset: function reset() {
                /// <summary>
                /// Resets this instance.
                /// </summary>
                this.size = 0;
                this.hash = {};
                this.list = new List();
            }
        });
        function List() {
            /// <summary>
            /// Lists this instance.
            /// </summary>
            this.head = this.tail = null;
        }
        _.mixin(List.prototype, {
            add: function add(node) {
                /// <summary>
                /// Adds the specified node.
                /// </summary>
                /// <param name="node">The node.</param>
                if (this.head) {
                    node.next = this.head;
                    this.head.prev = node;
                }
                this.head = node;
                this.tail = this.tail || node;
            },
            remove: function remove(node) {
                /// <summary>
                /// Removes the specified node.
                /// </summary>
                /// <param name="node">The node.</param>
                node.prev ? node.prev.next = node.next : this.head = node.next;
                node.next ? node.next.prev = node.prev : this.tail = node.prev;
            },
            moveToFront: function(node) {
                /// <summary>
                /// </summary>
                /// <param name="node">The node.</param>
                this.remove(node);
                this.add(node);
            }
        });
        function Node(key, val) {
            /// <summary>
            /// Nodes the specified key.
            /// </summary>
            /// <param name="key">The key.</param>
            /// <param name="val">The value.</param>
            this.key = key;
            this.val = val;
            this.prev = this.next = null;
        }
        return LruCache;
    }();
    var PersistentStorage = function() {
        /// <summary>
        /// </summary>
        "use strict";
        var LOCAL_STORAGE;
        try {
            LOCAL_STORAGE = window.localStorage;
            LOCAL_STORAGE.setItem("~~~", "!");
            LOCAL_STORAGE.removeItem("~~~");
        } catch (err) {
            LOCAL_STORAGE = null;
        }
        function PersistentStorage(namespace, override) {
            /// <summary>
            /// Persistents the storage.
            /// </summary>
            /// <param name="namespace">The namespace.</param>
            /// <param name="override">The override.</param>
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
            this.ls = override || LOCAL_STORAGE;
            !this.ls && this._noop();
        }
        _.mixin(PersistentStorage.prototype, {
            _prefix: function(key) {
                /// <summary>
                /// </summary>
                /// <param name="key">The key.</param>
                return this.prefix + key;
            },
            _ttlKey: function(key) {
                /// <summary>
                /// </summary>
                /// <param name="key">The key.</param>
                return this._prefix(key) + this.ttlKey;
            },
            _noop: function() {
                /// <summary>
                /// </summary>
                this.get = this.set = this.remove = this.clear = this.isExpired = _.noop;
            },
            _safeSet: function(key, val) {
                /// <summary>
                /// </summary>
                /// <param name="key">The key.</param>
                /// <param name="val">The value.</param>
                try {
                    this.ls.setItem(key, val);
                } catch (err) {
                    if (err.name === "QuotaExceededError") {
                        this.clear();
                        this._noop();
                    }
                }
            },
            get: function(key) {
                /// <summary>
                /// </summary>
                /// <param name="key">The key.</param>
                if (this.isExpired(key)) {
                    this.remove(key);
                }
                return decode(this.ls.getItem(this._prefix(key)));
            },
            set: function(key, val, ttl) {
                /// <summary>
                /// </summary>
                /// <param name="key">The key.</param>
                /// <param name="val">The value.</param>
                /// <param name="ttl">The TTL.</param>
                if (_.isNumber(ttl)) {
                    this._safeSet(this._ttlKey(key), encode(now() + ttl));
                } else {
                    this.ls.removeItem(this._ttlKey(key));
                }
                return this._safeSet(this._prefix(key), encode(val));
            },
            remove: function(key) {
                /// <summary>
                /// </summary>
                /// <param name="key">The key.</param>
                this.ls.removeItem(this._ttlKey(key));
                this.ls.removeItem(this._prefix(key));
                return this;
            },
            clear: function() {
                /// <summary>
                /// </summary>
                var i, keys = gatherMatchingKeys(this.keyMatcher);
                for (i = keys.length; i--; ) {
                    this.remove(keys[i]);
                }
                return this;
            },
            isExpired: function(key) {
                /// <summary>
                /// </summary>
                /// <param name="key">The key.</param>
                var ttl = decode(this.ls.getItem(this._ttlKey(key)));
                return _.isNumber(ttl) && now() > ttl ? true : false;
            }
        });
        return PersistentStorage;
        function now() {
            /// <summary>
            /// Nows this instance.
            /// </summary>
            return new Date().getTime();
        }
        function encode(val) {
            /// <summary>
            /// Encodes the specified value.
            /// </summary>
            /// <param name="val">The value.</param>
            return JSON.stringify(_.isUndefined(val) ? null : val);
        }
        function decode(val) {
            /// <summary>
            /// Decodes the specified value.
            /// </summary>
            /// <param name="val">The value.</param>
            return $.parseJSON(val);
        }
        function gatherMatchingKeys(keyMatcher) {
            /// <summary>
            /// Gathers the matching keys.
            /// </summary>
            /// <param name="keyMatcher">The key matcher.</param>
            var i, key, keys = [], len = LOCAL_STORAGE.length;
            for (i = 0; i < len; i++) {
                if ((key = LOCAL_STORAGE.key(i)).match(keyMatcher)) {
                    keys.push(key.replace(keyMatcher, ""));
                }
            }
            return keys;
        }
    }();
    var Transport = function() {
        /// <summary>
        /// </summary>
        "use strict";
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
        function Transport(o) {
            /// <summary>
            /// Transports the specified o.
            /// </summary>
            /// <param name="o">The o.</param>
            o = o || {};
            this.cancelled = false;
            this.lastReq = null;
            this._send = o.transport;
            this._get = o.limiter ? o.limiter(this._get) : this._get;
            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
        }
        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
            /// <summary>
            /// Sets the maximum pending requests.
            /// </summary>
            /// <param name="num">The number.</param>
            maxPendingRequests = num;
        };
        Transport.resetCache = function resetCache() {
            /// <summary>
            /// Resets the cache.
            /// </summary>
            sharedCache.reset();
        };
        _.mixin(Transport.prototype, {
            _fingerprint: function fingerprint(o) {
                /// <summary>
                /// Fingerprints the specified o.
                /// </summary>
                /// <param name="o">The o.</param>
                o = o || {};
                return o.url + o.type + $.param(o.data || {});
            },
            _get: function(o, cb) {
                /// <summary>
                /// </summary>
                /// <param name="o">The o.</param>
                /// <param name="cb">The cb.</param>
                var that = this, fingerprint, jqXhr;
                fingerprint = this._fingerprint(o);
                if (this.cancelled || fingerprint !== this.lastReq) {
                    return;
                }
                if (jqXhr = pendingRequests[fingerprint]) {
                    jqXhr.done(done).fail(fail);
                } else if (pendingRequestsCount < maxPendingRequests) {
                    pendingRequestsCount++;
                    pendingRequests[fingerprint] = this._send(o).done(done).fail(fail).always(always);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    /// <summary>
                    /// Dones the specified resp.
                    /// </summary>
                    /// <param name="resp">The resp.</param>
                    cb(null, resp);
                    that._cache.set(fingerprint, resp);
                }
                function fail() {
                    /// <summary>
                    /// Fails this instance.
                    /// </summary>
                    cb(true);
                }
                function always() {
                    /// <summary>
                    /// Alwayses this instance.
                    /// </summary>
                    pendingRequestsCount--;
                    delete pendingRequests[fingerprint];
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function(o, cb) {
                /// <summary>
                /// </summary>
                /// <param name="o">The o.</param>
                /// <param name="cb">The cb.</param>
                var resp, fingerprint;
                cb = cb || $.noop;
                o = _.isString(o) ? {
                    url: o
                } : o || {};
                fingerprint = this._fingerprint(o);
                this.cancelled = false;
                this.lastReq = fingerprint;
                if (resp = this._cache.get(fingerprint)) {
                    cb(null, resp);
                } else {
                    this._get(o, cb);
                }
            },
            cancel: function() {
                /// <summary>
                /// </summary>
                this.cancelled = true;
            }
        });
        return Transport;
    }();
    var SearchIndex = window.SearchIndex = function() {
        /// <summary>
        /// </summary>
        "use strict";
        var CHILDREN = "c", IDS = "i";
        function SearchIndex(o) {
            /// <summary>
            /// Searches the index.
            /// </summary>
            /// <param name="o">The o.</param>
            o = o || {};
            if (!o.datumTokenizer || !o.queryTokenizer) {
                $.error("datumTokenizer and queryTokenizer are both required");
            }
            this.identify = o.identify || _.stringify;
            this.datumTokenizer = o.datumTokenizer;
            this.queryTokenizer = o.queryTokenizer;
            this.reset();
        }
        _.mixin(SearchIndex.prototype, {
            bootstrap: function bootstrap(o) {
                /// <summary>
                /// Bootstraps the specified o.
                /// </summary>
                /// <param name="o">The o.</param>
                this.datums = o.datums;
                this.trie = o.trie;
            },
            add: function(data) {
                /// <summary>
                /// </summary>
                /// <param name="data">The data.</param>
                var that = this;
                data = _.isArray(data) ? data : [ data ];
                _.each(data, function(datum) {
                    /// <summary>
                    /// </summary>
                    /// <param name="datum">The datum.</param>
                    var id, tokens;
                    that.datums[id = that.identify(datum)] = datum;
                    tokens = normalizeTokens(that.datumTokenizer(datum));
                    _.each(tokens, function(token) {
                        /// <summary>
                        /// </summary>
                        /// <param name="token">The token.</param>
                        var node, chars, ch;
                        node = that.trie;
                        chars = token.split("");
                        while (ch = chars.shift()) {
                            node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode());
                            node[IDS].push(id);
                        }
                    });
                });
            },
            get: function get(ids) {
                /// <summary>
                /// Gets the specified ids.
                /// </summary>
                /// <param name="ids">The ids.</param>
                var that = this;
                return _.map(ids, function(id) {
                    /// <summary>
                    /// </summary>
                    /// <param name="id">The identifier.</param>
                    return that.datums[id];
                });
            },
            search: function search(query) {
                /// <summary>
                /// Searches the specified query.
                /// </summary>
                /// <param name="query">The query.</param>
                var that = this, tokens, matches;
                tokens = normalizeTokens(this.queryTokenizer(query));
                _.each(tokens, function(token) {
                    /// <summary>
                    /// </summary>
                    /// <param name="token">The token.</param>
                    var node, chars, ch, ids;
                    if (matches && matches.length === 0) {
                        return false;
                    }
                    node = that.trie;
                    chars = token.split("");
                    while (node && (ch = chars.shift())) {
                        node = node[CHILDREN][ch];
                    }
                    if (node && chars.length === 0) {
                        ids = node[IDS].slice(0);
                        matches = matches ? getIntersection(matches, ids) : ids;
                    } else {
                        matches = [];
                        return false;
                    }
                });
                return matches ? _.map(unique(matches), function(id) {
                    /// <summary>
                    /// </summary>
                    /// <param name="id">The identifier.</param>
                    return that.datums[id];
                }) : [];
            },
            all: function all() {
                /// <summary>
                /// Alls this instance.
                /// </summary>
                var values = [];
                for (var key in this.datums) {
                    values.push(this.datums[key]);
                }
                return values;
            },
            reset: function reset() {
                /// <summary>
                /// Resets this instance.
                /// </summary>
                this.datums = {};
                this.trie = newNode();
            },
            serialize: function serialize() {
                /// <summary>
                /// Serializes this instance.
                /// </summary>
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        });
        return SearchIndex;
        function normalizeTokens(tokens) {
            /// <summary>
            /// Normalizes the tokens.
            /// </summary>
            /// <param name="tokens">The tokens.</param>
            tokens = _.filter(tokens, function(token) {
                /// <summary>
                /// </summary>
                /// <param name="token">The token.</param>
                return !!token;
            });
            tokens = _.map(tokens, function(token) {
                /// <summary>
                /// </summary>
                /// <param name="token">The token.</param>
                return token.toLowerCase();
            });
            return tokens;
        }
        function newNode() {
            /// <summary>
            /// News the node.
            /// </summary>
            var node = {};
            node[IDS] = [];
            node[CHILDREN] = {};
            return node;
        }
        function unique(array) {
            /// <summary>
            /// Uniques the specified array.
            /// </summary>
            /// <param name="array">The array.</param>
            var seen = {}, uniques = [];
            for (var i = 0, len = array.length; i < len; i++) {
                if (!seen[array[i]]) {
                    seen[array[i]] = true;
                    uniques.push(array[i]);
                }
            }
            return uniques;
        }
        function getIntersection(arrayA, arrayB) {
            /// <summary>
            /// Gets the intersection.
            /// </summary>
            /// <param name="arrayA">The array a.</param>
            /// <param name="arrayB">The array b.</param>
            var ai = 0, bi = 0, intersection = [];
            arrayA = arrayA.sort();
            arrayB = arrayB.sort();
            var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
            while (ai < lenArrayA && bi < lenArrayB) {
                if (arrayA[ai] < arrayB[bi]) {
                    ai++;
                } else if (arrayA[ai] > arrayB[bi]) {
                    bi++;
                } else {
                    intersection.push(arrayA[ai]);
                    ai++;
                    bi++;
                }
            }
            return intersection;
        }
    }();
    var Prefetch = function() {
        /// <summary>
        /// </summary>
        "use strict";
        var keys;
        keys = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        };
        function Prefetch(o) {
            /// <summary>
            /// Prefetches the specified o.
            /// </summary>
            /// <param name="o">The o.</param>
            this.url = o.url;
            this.ttl = o.ttl;
            this.cache = o.cache;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = o.transport;
            this.thumbprint = o.thumbprint;
            this.storage = new PersistentStorage(o.cacheKey);
        }
        _.mixin(Prefetch.prototype, {
            _settings: function settings() {
                /// <summary>
                /// Settingses this instance.
                /// </summary>
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            store: function store(data) {
                /// <summary>
                /// Stores the specified data.
                /// </summary>
                /// <param name="data">The data.</param>
                if (!this.cache) {
                    return;
                }
                this.storage.set(keys.data, data, this.ttl);
                this.storage.set(keys.protocol, location.protocol, this.ttl);
                this.storage.set(keys.thumbprint, this.thumbprint, this.ttl);
            },
            fromCache: function fromCache() {
                /// <summary>
                /// Froms the cache.
                /// </summary>
                var stored = {}, isExpired;
                if (!this.cache) {
                    return null;
                }
                stored.data = this.storage.get(keys.data);
                stored.protocol = this.storage.get(keys.protocol);
                stored.thumbprint = this.storage.get(keys.thumbprint);
                isExpired = stored.thumbprint !== this.thumbprint || stored.protocol !== location.protocol;
                return stored.data && !isExpired ? stored.data : null;
            },
            fromNetwork: function(cb) {
                /// <summary>
                /// </summary>
                /// <param name="cb">The cb.</param>
                var that = this, settings;
                if (!cb) {
                    return;
                }
                settings = this.prepare(this._settings());
                this.transport(settings).fail(onError).done(onResponse);
                function onError() {
                    /// <summary>
                    /// Ons the error.
                    /// </summary>
                    cb(true);
                }
                function onResponse(resp) {
                    /// <summary>
                    /// Ons the response.
                    /// </summary>
                    /// <param name="resp">The resp.</param>
                    cb(null, that.transform(resp));
                }
            },
            clear: function clear() {
                /// <summary>
                /// Clears this instance.
                /// </summary>
                this.storage.clear();
                return this;
            }
        });
        return Prefetch;
    }();
    var Remote = function() {
        /// <summary>
        /// </summary>
        "use strict";
        function Remote(o) {
            /// <summary>
            /// Remotes the specified o.
            /// </summary>
            /// <param name="o">The o.</param>
            this.url = o.url;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = new Transport({
                cache: o.cache,
                limiter: o.limiter,
                transport: o.transport
            });
        }
        _.mixin(Remote.prototype, {
            _settings: function settings() {
                /// <summary>
                /// Settingses this instance.
                /// </summary>
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            get: function get(query, cb) {
                /// <summary>
                /// Gets the specified query.
                /// </summary>
                /// <param name="query">The query.</param>
                /// <param name="cb">The cb.</param>
                var that = this, settings;
                if (!cb) {
                    return;
                }
                query = query || "";
                settings = this.prepare(query, this._settings());
                return this.transport.get(settings, onResponse);
                function onResponse(err, resp) {
                    /// <summary>
                    /// Ons the response.
                    /// </summary>
                    /// <param name="err">The error.</param>
                    /// <param name="resp">The resp.</param>
                    err ? cb([]) : cb(that.transform(resp));
                }
            },
            cancelLastRequest: function cancelLastRequest() {
                /// <summary>
                /// Cancels the last request.
                /// </summary>
                this.transport.cancel();
            }
        });
        return Remote;
    }();
    var oParser = function() {
        /// <summary>
        /// </summary>
        "use strict";
        return function parse(o) {
            /// <summary>
            /// Parses the specified o.
            /// </summary>
            /// <param name="o">The o.</param>
            var defaults, sorter;
            defaults = {
                initialize: true,
                identify: _.stringify,
                datumTokenizer: null,
                queryTokenizer: null,
                sufficient: 5,
                sorter: null,
                local: [],
                prefetch: null,
                remote: null
            };
            o = _.mixin(defaults, o || {});
            !o.datumTokenizer && $.error("datumTokenizer is required");
            !o.queryTokenizer && $.error("queryTokenizer is required");
            sorter = o.sorter;
            o.sorter = sorter ? function(x) {
                /// <summary>
                /// </summary>
                /// <param name="x">The x.</param>
                return x.sort(sorter);
            } : _.identity;
            o.local = _.isFunction(o.local) ? o.local() : o.local;
            o.prefetch = parsePrefetch(o.prefetch);
            o.remote = parseRemote(o.remote);
            return o;
        };
        function parsePrefetch(o) {
            /// <summary>
            /// Parses the prefetch.
            /// </summary>
            /// <param name="o">The o.</param>
            var defaults;
            if (!o) {
                return null;
            }
            defaults = {
                url: null,
                ttl: 24 * 60 * 60 * 1e3,
                cache: true,
                cacheKey: null,
                thumbprint: "",
                prepare: _.identity,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("prefetch requires url to be set");
            o.transform = o.filter || o.transform;
            o.cacheKey = o.cacheKey || o.url;
            o.thumbprint = VERSION + o.thumbprint;
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            return o;
        }
        function parseRemote(o) {
            /// <summary>
            /// Parses the remote.
            /// </summary>
            /// <param name="o">The o.</param>
            var defaults;
            if (!o) {
                return;
            }
            defaults = {
                url: null,
                cache: true,
                prepare: null,
                replace: null,
                wildcard: null,
                limiter: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("remote requires url to be set");
            o.transform = o.filter || o.transform;
            o.prepare = toRemotePrepare(o);
            o.limiter = toLimiter(o);
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            delete o.replace;
            delete o.wildcard;
            delete o.rateLimitBy;
            delete o.rateLimitWait;
            return o;
        }
        function toRemotePrepare(o) {
            /// <summary>
            /// To the remote prepare.
            /// </summary>
            /// <param name="o">The o.</param>
            var prepare, replace, wildcard;
            prepare = o.prepare;
            replace = o.replace;
            wildcard = o.wildcard;
            if (prepare) {
                return prepare;
            }
            if (replace) {
                prepare = prepareByReplace;
            } else if (o.wildcard) {
                prepare = prepareByWildcard;
            } else {
                prepare = idenityPrepare;
            }
            return prepare;
            function prepareByReplace(query, settings) {
                /// <summary>
                /// Prepares the by replace.
                /// </summary>
                /// <param name="query">The query.</param>
                /// <param name="settings">The settings.</param>
                settings.url = replace(settings.url, query);
                return settings;
            }
            function prepareByWildcard(query, settings) {
                /// <summary>
                /// Prepares the by wildcard.
                /// </summary>
                /// <param name="query">The query.</param>
                /// <param name="settings">The settings.</param>
                settings.url = settings.url.replace(wildcard, encodeURIComponent(query));
                return settings;
            }
            function idenityPrepare(query, settings) {
                /// <summary>
                /// Idenities the prepare.
                /// </summary>
                /// <param name="query">The query.</param>
                /// <param name="settings">The settings.</param>
                return settings;
            }
        }
        function toLimiter(o) {
            /// <summary>
            /// To the limiter.
            /// </summary>
            /// <param name="o">The o.</param>
            var limiter, method, wait;
            limiter = o.limiter;
            method = o.rateLimitBy;
            wait = o.rateLimitWait;
            if (!limiter) {
                limiter = /^throttle$/i.test(method) ? throttle(wait) : debounce(wait);
            }
            return limiter;
            function debounce(wait) {
                /// <summary>
                /// Debounces the specified wait.
                /// </summary>
                /// <param name="wait">The wait.</param>
                return function debounce(fn) {
                    /// <summary>
                    /// Debounces the specified function.
                    /// </summary>
                    /// <param name="fn">The function.</param>
                    return _.debounce(fn, wait);
                };
            }
            function throttle(wait) {
                /// <summary>
                /// Throttles the specified wait.
                /// </summary>
                /// <param name="wait">The wait.</param>
                return function throttle(fn) {
                    /// <summary>
                    /// Throttles the specified function.
                    /// </summary>
                    /// <param name="fn">The function.</param>
                    return _.throttle(fn, wait);
                };
            }
        }
        function callbackToDeferred(fn) {
            /// <summary>
            /// Callbacks to deferred.
            /// </summary>
            /// <param name="fn">The function.</param>
            return function wrapper(o) {
                /// <summary>
                /// Wrappers the specified o.
                /// </summary>
                /// <param name="o">The o.</param>
                var deferred = $.Deferred();
                fn(o, onSuccess, onError);
                return deferred;
                function onSuccess(resp) {
                    /// <summary>
                    /// Ons the success.
                    /// </summary>
                    /// <param name="resp">The resp.</param>
                    _.defer(function() {
                        /// <summary>
                        /// </summary>
                        deferred.resolve(resp);
                    });
                }
                function onError(err) {
                    /// <summary>
                    /// Ons the error.
                    /// </summary>
                    /// <param name="err">The error.</param>
                    _.defer(function() {
                        /// <summary>
                        /// </summary>
                        deferred.reject(err);
                    });
                }
            };
        }
    }();
    var Bloodhound = function() {
        /// <summary>
        /// </summary>
        "use strict";
        var old;
        old = window && window.Bloodhound;
        function Bloodhound(o) {
            /// <summary>
            /// Bloodhounds the specified o.
            /// </summary>
            /// <param name="o">The o.</param>
            o = oParser(o);
            this.sorter = o.sorter;
            this.identify = o.identify;
            this.sufficient = o.sufficient;
            this.local = o.local;
            this.remote = o.remote ? new Remote(o.remote) : null;
            this.prefetch = o.prefetch ? new Prefetch(o.prefetch) : null;
            this.index = new SearchIndex({
                identify: this.identify,
                datumTokenizer: o.datumTokenizer,
                queryTokenizer: o.queryTokenizer
            });
            o.initialize !== false && this.initialize();
        }
        Bloodhound.noConflict = function noConflict() {
            /// <summary>
            /// Noes the conflict.
            /// </summary>
            window && (window.Bloodhound = old);
            return Bloodhound;
        };
        Bloodhound.tokenizers = tokenizers;
        _.mixin(Bloodhound.prototype, {
            __ttAdapter: function ttAdapter() {
                /// <summary>
                /// Tts the adapter.
                /// </summary>
                var that = this;
                return this.remote ? withAsync : withoutAsync;
                function withAsync(query, sync, async) {
                    /// <summary>
                    /// Withes the asynchronous.
                    /// </summary>
                    /// <param name="query">The query.</param>
                    /// <param name="sync">The synchronize.</param>
                    /// <param name="async">The asynchronous.</param>
                    return that.search(query, sync, async);
                }
                function withoutAsync(query, sync) {
                    /// <summary>
                    /// Withouts the asynchronous.
                    /// </summary>
                    /// <param name="query">The query.</param>
                    /// <param name="sync">The synchronize.</param>
                    return that.search(query, sync);
                }
            },
            _loadPrefetch: function loadPrefetch() {
                /// <summary>
                /// Loads the prefetch.
                /// </summary>
                var that = this, deferred, serialized;
                deferred = $.Deferred();
                if (!this.prefetch) {
                    deferred.resolve();
                } else if (serialized = this.prefetch.fromCache()) {
                    this.index.bootstrap(serialized);
                    deferred.resolve();
                } else {
                    this.prefetch.fromNetwork(done);
                }
                return deferred.promise();
                function done(err, data) {
                    /// <summary>
                    /// Dones the specified error.
                    /// </summary>
                    /// <param name="err">The error.</param>
                    /// <param name="data">The data.</param>
                    if (err) {
                        return deferred.reject();
                    }
                    that.add(data);
                    that.prefetch.store(that.index.serialize());
                    deferred.resolve();
                }
            },
            _initialize: function initialize() {
                /// <summary>
                /// Initializes this instance.
                /// </summary>
                var that = this, deferred;
                this.clear();
                (this.initPromise = this._loadPrefetch()).done(addLocalToIndex);
                return this.initPromise;
                function addLocalToIndex() {
                    /// <summary>
                    /// Adds the index of the local to.
                    /// </summary>
                    that.add(that.local);
                }
            },
            initialize: function initialize(force) {
                /// <summary>
                /// Initializes the specified force.
                /// </summary>
                /// <param name="force">The force.</param>
                return !this.initPromise || force ? this._initialize() : this.initPromise;
            },
            add: function add(data) {
                /// <summary>
                /// Adds the specified data.
                /// </summary>
                /// <param name="data">The data.</param>
                this.index.add(data);
                return this;
            },
            get: function get(ids) {
                /// <summary>
                /// Gets the specified ids.
                /// </summary>
                /// <param name="ids">The ids.</param>
                ids = _.isArray(ids) ? ids : [].slice.call(arguments);
                return this.index.get(ids);
            },
            search: function search(query, sync, async) {
                /// <summary>
                /// Searches the specified query.
                /// </summary>
                /// <param name="query">The query.</param>
                /// <param name="sync">The synchronize.</param>
                /// <param name="async">The asynchronous.</param>
                var that = this, local;
                local = this.sorter(this.index.search(query));
                sync(this.remote ? local.slice() : local);
                if (this.remote && local.length < this.sufficient) {
                    this.remote.get(query, processRemote);
                } else if (this.remote) {
                    this.remote.cancelLastRequest();
                }
                return this;
                function processRemote(remote) {
                    /// <summary>
                    /// Processes the remote.
                    /// </summary>
                    /// <param name="remote">The remote.</param>
                    var nonDuplicates = [];
                    _.each(remote, function(r) {
                        /// <summary>
                        /// </summary>
                        /// <param name="r">The r.</param>
                        !_.some(local, function(l) {
                            /// <summary>
                            /// </summary>
                            /// <param name="l">The l.</param>
                            return that.identify(r) === that.identify(l);
                        }) && nonDuplicates.push(r);
                    });
                    async && async(nonDuplicates);
                }
            },
            all: function all() {
                /// <summary>
                /// Alls this instance.
                /// </summary>
                return this.index.all();
            },
            clear: function clear() {
                /// <summary>
                /// Clears this instance.
                /// </summary>
                this.index.reset();
                return this;
            },
            clearPrefetchCache: function clearPrefetchCache() {
                /// <summary>
                /// Clears the prefetch cache.
                /// </summary>
                this.prefetch && this.prefetch.clear();
                return this;
            },
            clearRemoteCache: function clearRemoteCache() {
                /// <summary>
                /// Clears the remote cache.
                /// </summary>
                Transport.resetCache();
                return this;
            },
            ttAdapter: function ttAdapter() {
                /// <summary>
                /// Tts the adapter.
                /// </summary>
                return this.__ttAdapter();
            }
        });
        return Bloodhound;
    }();
    return Bloodhound;
});