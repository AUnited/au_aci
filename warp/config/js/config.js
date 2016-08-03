/* Copyright (C) YOOtheme GmbH, http://www.gnu.org/licenses/gpl.html GNU/GPL */
function parse_str(o, n) {
    var i, e, c, u, a, t, r, s, k, l, d, p, h, f, g, m = String(o).replace(/^&/, "").replace(/&$/, "").split("&"),
        v = m.length,
        b = function(o) {
            return decodeURIComponent(o.replace(/\+/g, "%20"))
        };
    for (n || (n = this.window), i = 0; v > i; i++) {
        for (l = m[i].split("="), d = b(l[0]), p = l.length < 2 ? "" : b(l[1]);
             " " === d.charAt(0);) d = d.slice(1);
        if (d.indexOf("\x00") > -1 && (d = d.slice(0, d.indexOf("\x00"))), d && "[" !== d.charAt(0)) {
            for (f = [], h = 0, e = 0; e < d.length; e++)
                if ("[" !== d.charAt(e) || h) {
                    if ("]" === d.charAt(e) && h && (f.length || f.push(d.slice(0, h - 1)), f.push(d.substr(h, e - h)), h = 0, "[" !== d.charAt(e + 1))) break
                } else h = e + 1;
            for (f.length || (f = [d]), e = 0; e < f[0].length && (k = f[0].charAt(e), (" " === k || "." === k || "[" === k) && (f[0] = f[0].substr(0, e) + "_" + f[0].substr(e + 1)), "[" !== k); e++);
            for (t = n, e = 0, g = f.length; g > e; e++)
                if (d = f[e].replace(/^['"]/, "").replace(/['"]$/, ""), r = e !== f.length - 1, a = t, "" !== d && " " !== d || 0 === e) t[d] === s && (t[d] = {}), t = t[d];
                else {
                    c = -1;
                    for (u in t) t.hasOwnProperty(u) && +u > c && u.match(/^\d+$/g) && (c = +u);
                    d = c + 1
                }
            a[d] = p
        }
    }
}! function(o, n) {
    function i(n, i) {
        function e(i) {
            var e = s.contents(),
                c = !0,
                u = !1,
                a = !1;
            o.each(n.less, function(n, t) {
                if (!u) {
                    var r = e.find("head [data-file='" + t.target + "']");
                    r.length && (o.less.getCSS(t.source, {
                        id: t.target,
                        variables: i.variables,
                        compress: !0
                    }).done(function(n) {
                        c && i.fonts && (n = i.fonts + "\n" + n), "rtl" == e.find("html").attr("dir") && (n = o.rtl.convert2RTL(n)), r.attr("href") ? r.replaceWith(o("<style>").attr("data-file", r.data("file")).text(n)) : r.text(n)
                    }).fail(function(o) {
                        l.trigger("show", o), u = !0
                    }), c = !1, a = !0)
                }
            }), u || (h.show(), s.css("visibility", "visible"), k.hide(), l.trigger("hide"), setTimeout(function() {
                return s[0].contentWindow && s[0].contentWindow.postMessage("customizer-update", location.origin)
            }, 150)), f.trigger(a ? "hide" : "show", "The current theme is not customizable.")
        }
        var c, u = o("#customizer"),
            a = o("select[name=style]", u),
            t = o("[href='#copy']", u),
            r = o("[href='#remove']", u).hide(),
            s = o("#cm-theme-preview", u).css("visibility", "hidden"),
            k = o("i.cm-spinner", u),
            l = o(".cm-error", u),
            d = i || {},
            p = [],
            h = o(".cm-sidebar-content", u),
            f = o(".cm-sidebar-message", u).hide();
        o.each(n.styles, function(i, e) {
            p.push({
                name: i,
                config: n.config,
                config_vars: n.config_vars,
                variables: o.less.getVars(e)
            })
        }), u.customizer({
            styles: p,
            updating: function(o, n) {
                r.toggle("default" != n.name), h.hide(), s.css("visibility", "hidden"), k.show()
            },
            updated: function(n, i) {
                var a;
                i.fonts = "", o("input[data-url]", u).each(function() {
                    (a = o(this).attr("data-url")) && -1 === i.fonts.indexOf("'" + a + "'") && (i.fonts += "@import '" + a + "';\n")
                }), e(c = i)
            }
        }), s.on("load", function() {
            c ? e(c) : u.trigger("update")
        }), l.on({
            show: function(n, i) {
                l.html(o.mustache('<h1 class="uk-h3">LESS {{type}} Error</h1><p>{{message}}</p>', i)).show(), s.css("visibility", "hidden")
            },
            hide: function() {
                l.hide(), s.css("visibility", "visible")
            }
        }), f.on({
            show: function(o, n) {
                f.html(n).show(), h.css("visibility", "hidden")
            },
            hide: function() {
                f.hide(), h.css("visibility", "visible")
            }
        }), t.on("click", function(i) {
            i.preventDefault();
            var e = prompt("Please enter a style name", "");
            e && !o('option[value="' + e + '"]', a).length && p.push({
                name: e,
                config: n.config,
                config_vars: n.config_vars,
                variables: o.extend({}, c.variables)
            }), u.trigger("update", e)
        }), r.on("click", function(n) {
            n.preventDefault();
            var i;
            o.each(p, function(o, n) {
                a.val() == n.name && (i = o)
            }), null !== i && p.splice(i, 1), u.trigger("update")
        }), o("[href='#save']", u).on("click", function(i) {
            i.preventDefault(), u.remove(), o.removeCookie(n.cookie, {
                path: "/"
            }), o.isFunction(d.save) && d.save.call(this, a.val(), p)
        }), o("[href='#reset']", u).on("click", function(i) {
            i.preventDefault();
            var e, c = a.val();
            o.each(p, function(o, n) {
                a.val() == n.name && (e = o)
            }), n.styles[c] && null !== e && (o.extend(p[e], {
                config: n.config,
                variables: o.less.getVars(n.styles[c]),
                groups: ""
            }), u.trigger("update", [c, !0]))
        }), o("[href='#cancel']", u).on("click", function(i) {
            i.preventDefault(), u.remove(), o.removeCookie(n.cookie, {
                path: "/"
            }), o.isFunction(d.cancel) && d.cancel.call(this)
        })
    }

    function e(n, i) {
        l = !1;
        var e = o.Deferred(),
            c = [],
            u = 0;
        return o.each(n.styles, function(i, e) {
            o.each(n.less, function(o, n) {
                c.push({
                    target: ("default" != i ? "/styles/" + i : "") + n.target,
                    less: n.source + "\n" + e,
                    css: "",
                    error: ""
                })
            })
        }), c.length ? (o.less.getCSS(c[u].less, i).always(function a(t) {
            "string" == o.type(t) ? c[u].css = t : c[u].error = t, c[u].css = o.less.rewriteUrls(c[u].css, n.baseurl + c[u].target), o.isFunction(i.progress) && i.progress.call(this, c[u], u, u / c.length * 100), c[++u] && !l ? setTimeout(function() {
                o.less.getCSS(c[u].less, i).always(a)
            }, 150) : e[l ? "reject" : "resolve"](c)
        }), e.promise()) : e.resolve(c)
    }

    function c() {
        l = !0
    }

    function u(i) {
        var e = i.find(".tm-sidebar ul"),
            c = i.find(".tm-main");
        e.on("click", "a", function(i) {
            i.preventDefault(), c.children().not("p").hide().filter(":eq(" + (n._index = e.children("li").removeClass("uk-active").index(o(this).parent().addClass("uk-active"))) + ")").show()
        }).find("li:eq(" + (n._index < c.children().length ? n._index : 0) + ") a").trigger("click")
    }

    function a(n) {
        function i() {
            var i = c.val(),
                u = e.val();
            o("[data-position]", n).each(function() {
                var n = o(this),
                    e = n.data("position"),
                    c = "" === u || u === e;
                n[c ? "show" : "hide"](), c && (n.find("tr[data-widget-name]").each(function() {
                    var n = o(this),
                        e = n.data("widget-name"),
                        c = "" === i || -1 !== e.toLowerCase().indexOf(i.toLowerCase());
                    n.toggle(c)
                }), n.find("tbody>tr:visible").length || n.hide())
            })
        }
        var e = o("[data-position-filter]", n).on("change", i),
            c = o("[data-widget-filter]", n).on("keyup", o.UIkit.Utils.debounce(i, 300)),
            u = o('<div class="tm-icon-picker"></div>').css({
                position: "absolute",
                display: "none"
            }).appendTo("body"),
            a = [],
            t = {
                "Web Application Icons": ["uk-icon-adjust", "uk-icon-anchor", "uk-icon-archive", "uk-icon-area-chart", "uk-icon-arrows", "uk-icon-arrows-h", "uk-icon-arrows-v", "uk-icon-asterisk", "uk-icon-at", "uk-icon-automobile", "uk-icon-balance-scale", "uk-icon-ban", "uk-icon-bank", "uk-icon-bar-chart", "uk-icon-bar-chart-o", "uk-icon-barcode", "uk-icon-bars", "uk-icon-battery-0", "uk-icon-battery-1", "uk-icon-battery-2", "uk-icon-battery-3", "uk-icon-battery-4", "uk-icon-battery-empty", "uk-icon-battery-full", "uk-icon-battery-half", "uk-icon-battery-quarter", "uk-icon-battery-three-quarters", "uk-icon-bed", "uk-icon-beer", "uk-icon-bell", "uk-icon-bell-o", "uk-icon-bell-slash", "uk-icon-bell-slash-o", "uk-icon-bicycle", "uk-icon-binoculars", "uk-icon-birthday-cake", "uk-icon-bolt", "uk-icon-bomb", "uk-icon-book", "uk-icon-bookmark", "uk-icon-bookmark-o", "uk-icon-briefcase", "uk-icon-bug", "uk-icon-building", "uk-icon-building-o", "uk-icon-bullhorn", "uk-icon-bullseye", "uk-icon-bus", "uk-icon-cab", "uk-icon-calculator", "uk-icon-calendar", "uk-icon-calendar-check-o", "uk-icon-calendar-minus-o", "uk-icon-calendar-o", "uk-icon-calendar-plus-o", "uk-icon-calendar-times-o", "uk-icon-camera", "uk-icon-camera-retro", "uk-icon-car", "uk-icon-caret-square-o-down", "uk-icon-caret-square-o-left", "uk-icon-caret-square-o-right", "uk-icon-caret-square-o-up", "uk-icon-cart-arrow-down", "uk-icon-cart-plus", "uk-icon-cc", "uk-icon-certificate", "uk-icon-check", "uk-icon-check-circle", "uk-icon-check-circle-o", "uk-icon-check-square", "uk-icon-check-square-o", "uk-icon-child", "uk-icon-circle", "uk-icon-circle-o", "uk-icon-circle-o-notch", "uk-icon-circle-thin", "uk-icon-clock-o", "uk-icon-clone", "uk-icon-close", "uk-icon-cloud", "uk-icon-cloud-download", "uk-icon-cloud-upload", "uk-icon-code", "uk-icon-code-fork", "uk-icon-coffee", "uk-icon-cog", "uk-icon-cogs", "uk-icon-comment", "uk-icon-comment-o", "uk-icon-commenting", "uk-icon-commenting-o", "uk-icon-comments", "uk-icon-comments-o", "uk-icon-compass", "uk-icon-copyright", "uk-icon-creative-commons", "uk-icon-credit-card", "uk-icon-crop", "uk-icon-crosshairs", "uk-icon-cube", "uk-icon-cubes", "uk-icon-cutlery", "uk-icon-dashboard", "uk-icon-database", "uk-icon-desktop", "uk-icon-diamond", "uk-icon-dot-circle-o", "uk-icon-download", "uk-icon-edit", "uk-icon-ellipsis-h", "uk-icon-ellipsis-v", "uk-icon-envelope", "uk-icon-envelope-o", "uk-icon-envelope-square", "uk-icon-eraser", "uk-icon-exchange", "uk-icon-exclamation", "uk-icon-exclamation-circle", "uk-icon-exclamation-triangle", "uk-icon-external-link", "uk-icon-external-link-square", "uk-icon-eye", "uk-icon-eye-slash", "uk-icon-eyedropper", "uk-icon-fax", "uk-icon-feed", "uk-icon-female", "uk-icon-fighter-jet", "uk-icon-file-archive-o", "uk-icon-file-audio-o", "uk-icon-file-code-o", "uk-icon-file-excel-o", "uk-icon-file-image-o", "uk-icon-file-movie-o", "uk-icon-file-pdf-o", "uk-icon-file-photo-o", "uk-icon-file-picture-o", "uk-icon-file-powerpoint-o", "uk-icon-file-sound-o", "uk-icon-file-video-o", "uk-icon-file-word-o", "uk-icon-file-zip-o", "uk-icon-film", "uk-icon-filter", "uk-icon-fire", "uk-icon-fire-extinguisher", "uk-icon-flag", "uk-icon-flag-checkered", "uk-icon-flag-o", "uk-icon-flash", "uk-icon-flask", "uk-icon-folder", "uk-icon-folder-o", "uk-icon-folder-open", "uk-icon-folder-open-o", "uk-icon-frown-o", "uk-icon-futbol-o", "uk-icon-gamepad", "uk-icon-gavel", "uk-icon-gear", "uk-icon-gears", "uk-icon-gift", "uk-icon-glass", "uk-icon-globe", "uk-icon-graduation-cap", "uk-icon-group", "uk-icon-hand-grab-o", "uk-icon-hand-lizard-o", "uk-icon-hand-paper-o", "uk-icon-hand-peace-o", "uk-icon-hand-pointer-o", "uk-icon-hand-rock-o", "uk-icon-hand-scissors-o", "uk-icon-hand-spock-o", "uk-icon-hand-stop-o", "uk-icon-hdd-o", "uk-icon-headphones", "uk-icon-heart", "uk-icon-heart-o", "uk-icon-heartbeat", "uk-icon-history", "uk-icon-home", "uk-icon-hotel", "uk-icon-hourglass", "uk-icon-hourglass-1", "uk-icon-hourglass-2", "uk-icon-hourglass-3", "uk-icon-hourglass-end", "uk-icon-hourglass-half", "uk-icon-hourglass-o", "uk-icon-hourglass-start", "uk-icon-i-cursor", "uk-icon-image", "uk-icon-inbox", "uk-icon-industry", "uk-icon-info", "uk-icon-info-circle", "uk-icon-institution", "uk-icon-key", "uk-icon-keyboard-o", "uk-icon-language", "uk-icon-laptop", "uk-icon-leaf", "uk-icon-legal", "uk-icon-lemon-o", "uk-icon-level-down", "uk-icon-level-up", "uk-icon-life-bouy", "uk-icon-life-buoy", "uk-icon-life-ring", "uk-icon-life-saver", "uk-icon-lightbulb-o", "uk-icon-line-chart", "uk-icon-location-arrow", "uk-icon-lock", "uk-icon-magic", "uk-icon-magnet", "uk-icon-mail-forward", "uk-icon-mail-reply", "uk-icon-mail-reply-all", "uk-icon-male", "uk-icon-map", "uk-icon-map-marker", "uk-icon-map-o", "uk-icon-map-pin", "uk-icon-map-signs", "uk-icon-meh-o", "uk-icon-microphone", "uk-icon-microphone-slash", "uk-icon-minus", "uk-icon-minus-circle", "uk-icon-minus-square", "uk-icon-minus-square-o", "uk-icon-mobile", "uk-icon-mobile-phone", "uk-icon-money", "uk-icon-moon-o", "uk-icon-mortar-board", "uk-icon-motorcycle", "uk-icon-mouse-pointer", "uk-icon-music", "uk-icon-navicon", "uk-icon-newspaper-o", "uk-icon-object-group", "uk-icon-object-ungroup", "uk-icon-paint-brush", "uk-icon-paper-plane", "uk-icon-paper-plane-o", "uk-icon-paw", "uk-icon-pencil", "uk-icon-pencil-square", "uk-icon-pencil-square-o", "uk-icon-phone", "uk-icon-phone-square", "uk-icon-photo", "uk-icon-picture-o", "uk-icon-pie-chart", "uk-icon-plane", "uk-icon-plug", "uk-icon-plus", "uk-icon-plus-circle", "uk-icon-plus-square", "uk-icon-plus-square-o", "uk-icon-power-off", "uk-icon-print", "uk-icon-puzzle-piece", "uk-icon-qrcode", "uk-icon-question", "uk-icon-question-circle", "uk-icon-quote-left", "uk-icon-quote-right", "uk-icon-random", "uk-icon-recycle", "uk-icon-refresh", "uk-icon-registered", "uk-icon-remove", "uk-icon-reorder", "uk-icon-reply", "uk-icon-reply-all", "uk-icon-retweet", "uk-icon-road", "uk-icon-rocket", "uk-icon-rss", "uk-icon-rss-square", "uk-icon-search", "uk-icon-search-minus", "uk-icon-search-plus", "uk-icon-send", "uk-icon-send-o", "uk-icon-server", "uk-icon-share", "uk-icon-share-alt", "uk-icon-share-alt-square", "uk-icon-share-square", "uk-icon-share-square-o", "uk-icon-shield", "uk-icon-ship", "uk-icon-shopping-cart", "uk-icon-sign-in", "uk-icon-sign-out", "uk-icon-signal", "uk-icon-sitemap", "uk-icon-sliders", "uk-icon-smile-o", "uk-icon-soccer-ball-o", "uk-icon-sort", "uk-icon-sort-alpha-asc", "uk-icon-sort-alpha-desc", "uk-icon-sort-amount-asc", "uk-icon-sort-amount-desc", "uk-icon-sort-asc", "uk-icon-sort-desc", "uk-icon-sort-down", "uk-icon-sort-numeric-asc", "uk-icon-sort-numeric-desc", "uk-icon-sort-up", "uk-icon-space-shuttle", "uk-icon-spinner", "uk-icon-spoon", "uk-icon-square", "uk-icon-square-o", "uk-icon-star", "uk-icon-star-half", "uk-icon-star-half-empty", "uk-icon-star-half-full", "uk-icon-star-half-o", "uk-icon-star-o", "uk-icon-sticky-note", "uk-icon-sticky-note-o", "uk-icon-street-view", "uk-icon-suitcase", "uk-icon-sun-o", "uk-icon-support", "uk-icon-tablet", "uk-icon-tachometer", "uk-icon-tag", "uk-icon-tags", "uk-icon-tasks", "uk-icon-taxi", "uk-icon-television", "uk-icon-terminal", "uk-icon-thumb-tack", "uk-icon-thumbs-down", "uk-icon-thumbs-o-down", "uk-icon-thumbs-o-up", "uk-icon-thumbs-up", "uk-icon-ticket", "uk-icon-times", "uk-icon-times-circle", "uk-icon-times-circle-o", "uk-icon-tint", "uk-icon-toggle-down", "uk-icon-toggle-left", "uk-icon-toggle-off", "uk-icon-toggle-on", "uk-icon-toggle-right", "uk-icon-toggle-up", "uk-icon-trademark", "uk-icon-trash", "uk-icon-trash-o", "uk-icon-tree", "uk-icon-trophy", "uk-icon-truck", "uk-icon-tty", "uk-icon-tv", "uk-icon-umbrella", "uk-icon-university", "uk-icon-unlock", "uk-icon-unlock-alt", "uk-icon-unsorted", "uk-icon-upload", "uk-icon-user", "uk-icon-user-plus", "uk-icon-user-secret", "uk-icon-user-times", "uk-icon-users", "uk-icon-video-camera", "uk-icon-volume-down", "uk-icon-volume-off", "uk-icon-volume-up", "uk-icon-warning", "uk-icon-wheelchair", "uk-icon-wifi", "uk-icon-wrench"],
                "Hand Icons": ["uk-icon-hand-grab-o", "uk-icon-hand-lizard-o", "uk-icon-hand-o-down", "uk-icon-hand-o-left", "uk-icon-hand-o-right", "uk-icon-hand-o-up", "uk-icon-hand-paper-o", "uk-icon-hand-peace-o", "uk-icon-hand-pointer-o", "uk-icon-hand-rock-o", "uk-icon-hand-scissors-o", "uk-icon-hand-spock-o", "uk-icon-hand-stop-o", "uk-icon-thumbs-down", "uk-icon-thumbs-o-down", "uk-icon-thumbs-o-up", "uk-icon-thumbs-up"],
                "Transportation Icons": ["uk-icon-ambulance", "uk-icon-automobile", "uk-icon-bicycle", "uk-icon-bus", "uk-icon-cab", "uk-icon-car", "uk-icon-fighter-jet", "uk-icon-motorcycle", "uk-icon-plane", "uk-icon-rocket", "uk-icon-ship", "uk-icon-space-shuttle", "uk-icon-subway", "uk-icon-taxi", "uk-icon-train", "uk-icon-truck", "uk-icon-wheelchair"],
                "Gender Icons": ["uk-icon-genderless", "uk-icon-intersex", "uk-icon-mars", "uk-icon-mars-double", "uk-icon-mars-stroke", "uk-icon-mars-stroke-h", "uk-icon-mars-stroke-v", "uk-icon-mercury", "uk-icon-neuter", "uk-icon-transgender", "uk-icon-transgender-alt", "uk-icon-venus", "uk-icon-venus-double", "uk-icon-venus-mars"],
                "File Type Icons": ["uk-icon-file", "uk-icon-file-archive-o", "uk-icon-file-audio-o", "uk-icon-file-code-o", "uk-icon-file-excel-o", "uk-icon-file-image-o", "uk-icon-file-movie-o", "uk-icon-file-o", "uk-icon-file-pdf-o", "uk-icon-file-photo-o", "uk-icon-file-picture-o", "uk-icon-file-powerpoint-o", "uk-icon-file-sound-o", "uk-icon-file-text", "uk-icon-file-text-o", "uk-icon-file-video-o", "uk-icon-file-word-o", "uk-icon-file-zip-o"],
                "Spinner Icons": ["uk-icon-circle-o-notch", "uk-icon-cog", "uk-icon-gear", "uk-icon-refresh", "uk-icon-spinner"],
                "Form Control Icons": ["uk-icon-check-square", "uk-icon-check-square-o", "uk-icon-circle", "uk-icon-circle-o", "uk-icon-dot-circle-o", "uk-icon-minus-square", "uk-icon-minus-square-o", "uk-icon-plus-square", "uk-icon-plus-square-o", "uk-icon-square", "uk-icon-square-o"],
                "Payment Icons": ["uk-icon-cc-amex", "uk-icon-cc-diners-club", "uk-icon-cc-discover", "uk-icon-cc-jcb", "uk-icon-cc-mastercard", "uk-icon-cc-paypal", "uk-icon-cc-stripe", "uk-icon-cc-visa", "uk-icon-credit-card", "uk-icon-google-wallet", "uk-icon-paypal"],
                "Chart Icons": ["uk-icon-area-chart", "uk-icon-bar-chart", "uk-icon-bar-chart-o", "uk-icon-line-chart", "uk-icon-pie-chart"],
                "Currency Icons": ["uk-icon-bitcoin", "uk-icon-btc", "uk-icon-cny", "uk-icon-dollar", "uk-icon-eur", "uk-icon-euro", "uk-icon-gbp", "uk-icon-gg", "uk-icon-gg-circle", "uk-icon-ils", "uk-icon-inr", "uk-icon-jpy", "uk-icon-krw", "uk-icon-money", "uk-icon-rmb", "uk-icon-rouble", "uk-icon-rub", "uk-icon-ruble", "uk-icon-rupee", "uk-icon-shekel", "uk-icon-sheqel", "uk-icon-try", "uk-icon-turkish-lira", "uk-icon-usd", "uk-icon-won", "uk-icon-yen"],
                "Text Editor Icons": ["uk-icon-align-center", "uk-icon-align-justify", "uk-icon-align-left", "uk-icon-align-right", "uk-icon-bold", "uk-icon-chain", "uk-icon-chain-broken", "uk-icon-clipboard", "uk-icon-columns", "uk-icon-copy", "uk-icon-cut", "uk-icon-dedent", "uk-icon-eraser", "uk-icon-file", "uk-icon-file-o", "uk-icon-file-text", "uk-icon-file-text-o", "uk-icon-files-o", "uk-icon-floppy-o", "uk-icon-font", "uk-icon-header", "uk-icon-indent", "uk-icon-italic", "uk-icon-link", "uk-icon-list", "uk-icon-list-alt", "uk-icon-list-ol", "uk-icon-list-ul", "uk-icon-outdent", "uk-icon-paperclip", "uk-icon-paragraph", "uk-icon-paste", "uk-icon-repeat", "uk-icon-rotate-left", "uk-icon-rotate-right", "uk-icon-save", "uk-icon-scissors", "uk-icon-strikethrough", "uk-icon-subscript", "uk-icon-superscript", "uk-icon-table", "uk-icon-text-height", "uk-icon-text-width", "uk-icon-th", "uk-icon-th-large", "uk-icon-th-list", "uk-icon-underline", "uk-icon-undo", "uk-icon-unlink"],
                "Directional Icons": ["uk-icon-angle-double-down", "uk-icon-angle-double-left", "uk-icon-angle-double-right", "uk-icon-angle-double-up", "uk-icon-angle-down", "uk-icon-angle-left", "uk-icon-angle-right", "uk-icon-angle-up", "uk-icon-arrow-circle-down", "uk-icon-arrow-circle-left", "uk-icon-arrow-circle-o-down", "uk-icon-arrow-circle-o-left", "uk-icon-arrow-circle-o-right", "uk-icon-arrow-circle-o-up", "uk-icon-arrow-circle-right", "uk-icon-arrow-circle-up", "uk-icon-arrow-down", "uk-icon-arrow-left", "uk-icon-arrow-right", "uk-icon-arrow-up", "uk-icon-arrows", "uk-icon-arrows-alt", "uk-icon-arrows-h", "uk-icon-arrows-v", "uk-icon-caret-down", "uk-icon-caret-left", "uk-icon-caret-right", "uk-icon-caret-square-o-down", "uk-icon-caret-square-o-left", "uk-icon-caret-square-o-right", "uk-icon-caret-square-o-up", "uk-icon-caret-up", "uk-icon-chevron-circle-down", "uk-icon-chevron-circle-left", "uk-icon-chevron-circle-right", "uk-icon-chevron-circle-up", "uk-icon-chevron-down", "uk-icon-chevron-left", "uk-icon-chevron-right", "uk-icon-chevron-up", "uk-icon-exchange", "uk-icon-hand-o-down", "uk-icon-hand-o-left", "uk-icon-hand-o-right", "uk-icon-hand-o-up", "uk-icon-long-arrow-down", "uk-icon-long-arrow-left", "uk-icon-long-arrow-right", "uk-icon-long-arrow-up", "uk-icon-toggle-down", "uk-icon-toggle-left", "uk-icon-toggle-right", "uk-icon-toggle-up"],
                "Video Player Icons": ["uk-icon-arrows-alt", "uk-icon-backward", "uk-icon-compress", "uk-icon-eject", "uk-icon-expand", "uk-icon-fast-backward", "uk-icon-fast-forward", "uk-icon-forward", "uk-icon-pause", "uk-icon-play", "uk-icon-play-circle", "uk-icon-play-circle-o", "uk-icon-random", "uk-icon-step-backward", "uk-icon-step-forward", "uk-icon-stop", "uk-icon-youtube-play"],
                "Brand Icons": ["uk-icon-500px", "uk-icon-adn", "uk-icon-amazon", "uk-icon-android", "uk-icon-angellist", "uk-icon-apple", "uk-icon-behance", "uk-icon-behance-square", "uk-icon-bitbucket", "uk-icon-bitbucket-square", "uk-icon-bitcoin", "uk-icon-black-tie", "uk-icon-btc", "uk-icon-buysellads", "uk-icon-cc-amex", "uk-icon-cc-diners-club", "uk-icon-cc-discover", "uk-icon-cc-jcb", "uk-icon-cc-mastercard", "uk-icon-cc-paypal", "uk-icon-cc-stripe", "uk-icon-cc-visa", "uk-icon-chrome", "uk-icon-codepen", "uk-icon-connectdevelop", "uk-icon-contao", "uk-icon-css3", "uk-icon-dashcube", "uk-icon-delicious", "uk-icon-deviantart", "uk-icon-digg", "uk-icon-dribbble", "uk-icon-dropbox", "uk-icon-drupal", "uk-icon-empire", "uk-icon-envira", "uk-icon-expeditedssl", "uk-icon-facebook", "uk-icon-facebook-f", "uk-icon-facebook-official", "uk-icon-facebook-square", "uk-icon-firefox", "uk-icon-flickr", "uk-icon-fonticons", "uk-icon-forumbee", "uk-icon-foursquare", "uk-icon-ge", "uk-icon-get-pocket", "uk-icon-gg", "uk-icon-gg-circle", "uk-icon-git", "uk-icon-git-square", "uk-icon-github", "uk-icon-github-alt", "uk-icon-github-square", "uk-icon-gitlab", "uk-icon-gittip", "uk-icon-glide", "uk-icon-glide-g", "uk-icon-google", "uk-icon-google-plus", "uk-icon-google-plus-square", "uk-icon-google-wallet", "uk-icon-gratipay", "uk-icon-hacker-news", "uk-icon-houzz", "uk-icon-html5", "uk-icon-instagram", "uk-icon-internet-explorer", "uk-icon-ioxhost", "uk-icon-joomla", "uk-icon-jsfiddle", "uk-icon-lastfm", "uk-icon-lastfm-square", "uk-icon-leanpub", "uk-icon-linkedin", "uk-icon-linkedin-square", "uk-icon-linux", "uk-icon-maxcdn", "uk-icon-meanpath", "uk-icon-medium", "uk-icon-odnoklassniki", "uk-icon-odnoklassniki-square", "uk-icon-opencart", "uk-icon-openid", "uk-icon-opera", "uk-icon-optin-monster", "uk-icon-pagelines", "uk-icon-paypal", "uk-icon-pied-piper", "uk-icon-pied-piper-alt", "uk-icon-pinterest", "uk-icon-pinterest-p", "uk-icon-pinterest-square", "uk-icon-qq", "uk-icon-ra", "uk-icon-rebel", "uk-icon-reddit", "uk-icon-reddit-square", "uk-icon-renren", "uk-icon-safari", "uk-icon-sellsy", "uk-icon-share-alt", "uk-icon-share-alt-square", "uk-icon-shirtsinbulk", "uk-icon-simplybuilt", "uk-icon-skyatlas", "uk-icon-skype", "uk-icon-slack", "uk-icon-slideshare", "uk-icon-snapchat", "uk-icon-snapchat-ghost", "uk-icon-snapchat-square", "uk-icon-soundcloud", "uk-icon-spotify", "uk-icon-stack-exchange", "uk-icon-stack-overflow", "uk-icon-steam", "uk-icon-steam-square", "uk-icon-stumbleupon", "uk-icon-stumbleupon-circle", "uk-icon-tencent-weibo", "uk-icon-trello", "uk-icon-tripadvisor", "uk-icon-tumblr", "uk-icon-tumblr-square", "uk-icon-twitch", "uk-icon-twitter", "uk-icon-twitter-square", "uk-icon-viacoin", "uk-icon-viadeo", "uk-icon-viadeo-square", "uk-icon-vimeo", "uk-icon-vimeo-square", "uk-icon-vine", "uk-icon-vk", "uk-icon-wechat", "uk-icon-weibo", "uk-icon-weixin", "uk-icon-whatsapp", "uk-icon-wikipedia-w", "uk-icon-windows", "uk-icon-wordpress", "uk-icon-wpbeginner", "uk-icon-wpforms", "uk-icon-xing", "uk-icon-xing-square", "uk-icon-y-combinator", "uk-icon-y-combinator-square", "uk-icon-yahoo", "uk-icon-yc", "uk-icon-yc-square", "uk-icon-yelp", "uk-icon-youtube", "uk-icon-youtube-play", "uk-icon-youtube-square"],
                "Medical Icons": ["uk-icon-ambulance", "uk-icon-h-square", "uk-icon-heart", "uk-icon-heart-o", "uk-icon-heartbeat", "uk-icon-hospital-o", "uk-icon-medkit", "uk-icon-plus-square", "uk-icon-stethoscope", "uk-icon-user-md", "uk-icon-wheelchair"],
                "Accessibility Icons": ["uk-icon-american-sign-language-interpreting", "uk-icon-asl-interpreting", "uk-icon-assistive-listening-systems", "uk-icon-audio-description", "uk-icon-blind", "uk-icon-braille", "uk-icon-cc", "uk-icon-deaf", "uk-icon-deafness", "uk-icon-hard-of-hearing", "uk-icon-low-vision", "uk-icon-question-circle-o", "uk-icon-sign-language", "uk-icon-signing", "uk-icon-tty", "uk-icon-universal-access", "uk-icon-volume-control-phone", "uk-icon-wheelchair", "uk-icon-wheelchair-alt"]
            };
        a.push('<ul class="uk-list uk-list-space">'), o.each(t, function(n, i) {
            a.push("<li><strong>" + n + "</strong></li>"), o.each(i, function() {
                a.push('<li><a href="" class="uk-link-reset" data-warp-icon="' + this + '"><i class="' + this + ' uk-icon-small uk-margin-small-right"></i> ' + this + "</a></li>")
            })
        }), a.push("</ul>"), u.append(a.join("\n")), o(".tm-main").on("focus", "input[name$='[icon]']", function(n) {
            n.preventDefault();
            var i = o(this),
                e = i.offset(),
                c = e.top + i.height() + 15;
            left = e.left, u.data("input", i).css({
                top: c,
                left: left
            }).show(), u[0].scrollTop = 0
        }), u.on("click", "[data-warp-icon*='uk-icon']", function(n) {
            n.preventDefault(), u.data("input").val(o(this).data("warpIcon")), u.hide()
        }), o(document).on("click", function(n) {
            u.is(":visible") && !o(n.target).is("input[name$='[icon]']") && u.hide()
        })
    }

    function t(n, i) {
        function e(n) {
            o('[value="' + n.prop("value") + '"]', p).not(n).attr("disabled", n.is(":checked") ? "disabled" : !1)
        }

        function c(n) {
            d.toggle("default" !== n), o("[data-layout]").not(o('[data-layout="' + n + '"]').show()).hide()
        }

        function u(n) {
            if (n && !o('option[value="' + n + '"]', k).length) {
                var e = o(i).clone(!0);
                t(e, n), o(i).parent().children("[data-layout]:last").after(e), k.append('<option value="' + n + '">' + n + "</option>").val(n).trigger("change"), o("[data-assignment]", e).show()
            }
        }

        function a(n, i) {
            i && n !== i && !o('option[value="' + i + '"]', k).length && (t(o('[data-layout="' + n + '"]'), i), k.find('option[value="' + n + '"]').attr("value", i).html(i))
        }

        function t(o, n) {
            var i = o.data("layout");
            o.attr("data-layout", n).find('[name^="' + l + "[" + i + ']"]').attr("name", function(o, e) {
                return e.replace(l + "[" + i + "]", l + "[" + n + "]")
            })
        }

        function r(n) {
            o('[data-layout="' + n + '"]').remove(), k.find('option[value="' + n + '"]').remove().end().trigger("change")
        }
        var s = o(n),
            k = o("[data-layout-selector]", s),
            l = s.data("field-name"),
            d = o("[data-action=rename], [data-action=remove]", s),
            p = o("[data-assignment]", s);
        p.filter('[data-layout="default"] [data-assignment]').hide(), o("input:checked", p).each(function() {
            e(o(this))
        }), k.on("change", function(o) {
            c(k.val())
        }).trigger("change"), s.on("change", "[data-assignment] input", function(n) {
            e(o(n.target))
        }).on("click", '[data-action="add"]', function(o) {
            o.preventDefault(), u(prompt("Please enter a layout name", ""))
        }).on("click", '[data-action="rename"]', function(o) {
            o.preventDefault();
            var n = k.val(),
                i = prompt("Please enter a layout name", n);
            a(n, i)
        }).on("click", '[data-action="remove"]', function(o) {
            o.preventDefault(), r(k.val())
        }), o("[data-layout]", s).each(function() {
            o('select[name$="[width]"]:first', this).on("change", function() {
                var n = o(this),
                    i = n.find('option[value="' + n.val() + '"]').data("gcf");
                n.closest("[data-layout]").find('select[name$="[width]"]:gt(0)').each(function() {
                    var e = o(this),
                        c = e.val();
                    e.empty().append(n.find("option").clone().filter(function() {
                        return o(this).val() % i === 0
                    })).val(e.find('option[value="' + c + '"]').length ? c : e.val())
                })
            }).trigger("change")
        })
    }

    function r(n) {
        o(n).on("click", "li", function(n) {
            n.preventDefault(), o(this).toggleClass("active").find("input").val(o(this).hasClass("active") ? "1" : "0")
        }).find("li").each(function() {
            o(this).toggleClass("active", "0" !== o(this).find("input").val())
        })
    }

    function s(n) {
        o("tr[data-level='1'] + tr[data-level='2']", n).each(function() {
            o(this).prev().find("td:first").prepend('<i class="uk-icon-angle-right"></i> ').wrapInner("<span data-toggler />")
        }), o("tbody tr[data-level!='1']", n).hide(), o(n).on("click", "[data-toggler]", function() {
            o(this).closest("tr").nextUntil("tr[data-level='1']", n).toggle(), o("i", this).toggleClass("uk-icon-angle-down")
        }), o("[data-menu-filter]", n).on("change", function() {
            o("[data-menu]").not(o('[data-menu="' + o(this).val() + '"]').show()).hide()
        }).trigger("change")
    }

    function k() {
        if (!window.btoa) return !1;
        try {
            return !!new Blob && void 0 !== typeof FormData
        } catch (o) {
            return !1
        }
    }
    var l;
    o(function() {
        function n(n, i) {
            f.css("width", "100%");
            var e = {};
            o.each(i.styles, function(o, n) {
                e[("default" != o ? "/styles/" + o : "/less") + "/style.less"] = n
            }), o.each(n, function(o, n) {
                n.error || (e[n.target] = n.css)
            }), g.text("Saving files..."), System.saveFiles(e).fail(function(o) {
                m.append('<div class="uk-alert uk-alert-danger">' + o + "</div>")
            }).done(function(o) {
                m.children().length || h.hide()
            })
        }

        function l(n, i, e) {
            var c = n.target.replace(/^.*[\/\\]/g, "").replace(/css$/g, "less");
            g.text(n.target), f.css("width", Math.ceil(e) + "%"), n.error && 0 === o("[data-file='" + c + "']").length && m.append('<div class="uk-alert uk-alert-danger" data-file="' + c + '"><strong>' + c + "</strong><br>" + n.error.message + "</div>")
        }

        function d(n) {
            b.each(function() {
                var i = o(this),
                    e = i.val(),
                    c = [];
                o.each(n.styles, function(o) {
                    "default" != o && c.push(o)
                }), c = o.merge(["default"], o.merge(c, i.data("style-css")).sort()), i.html(o.mustache('{{#styles}}<option value="{{.}}">{{.}}</option>{{/styles}}', {
                    styles: c
                })), i.trigger("update", e)
            })
        }
        var p = o("#config"),
            h = o.UIkit.modal("#compilemodal", {
                bgclose: !1
            }),
            f = h.element.find(".uk-progress-bar"),
            g = h.element.find(".file-name"),
            m = h.element.find(".error-list"),
            v = o("[data-customizer]"),
            b = o("[data-style-selector]", p);
        if (t("#layout", '[data-layout="default"]'), s(o("#menus", p)), u(p), a("#widgets"), r("[data-list-devices]"), h.element.find("button").on("click", function() {
                c(), h.hide()
            }), k() ? o("[href='#compile']").on("click", function(o) {
                o.preventDefault(), f.css("width", "0%"), m.html(""), g.html(""), h.show(), setTimeout(function() {
                    System.data().done(function(o) {
                        e(o, {
                            progress: l
                        }).done(function(i) {
                            n(i, o)
                        }).fail(function() {
                            h.hide()
                        })
                    }).fail(function(o) {
                        h.hide()
                    })
                }, 300)
            }) : o("[href='#compile']").attr("disabled", "disabled").on("click", function(o) {
                o.preventDefault()
            }), k()) {
            var w = !1;
            o("a", v).on("click", function(c) {
                c.preventDefault(), w || (w = !0, System.data().done(function(c) {
                    var u = o("body").addClass("cm-open");
                    o.cookie(c.cookie, "1", {
                        expires: 1,
                        path: "/"
                    }), p.append(o("[type*=template]", v).mustache()), i(c, {
                        cancel: function() {
                            u.removeClass("cm-open")
                        },
                        save: function(i, a) {
                            u.removeClass("cm-open");
                            var t = c.styles,
                                r = {};
                            c.styles = {}, o.each(a, function(n, e) {
                                if (i != e.name && t[e.name]) return void(c.styles[e.name] = t[e.name]);
                                var u = [];
                                e.fonts && u.push(e.fonts), o.each(e.variables, function(o, n) {
                                    u.push(o + ": " + n + ";")
                                }), c.styles[e.name] = r[e.name] = u.join("\n")
                            }), d(c), f.css("width", "0%"), m.html(""), g.html(""), h.show(), e(o.extend({}, c, {
                                styles: r
                            }), {
                                progress: l
                            }).done(function(o) {
                                n(o, c)
                            }).fail(function() {
                                h.hide()
                            })
                        }
                    })
                }).fail(function(n) {
                    o("a", v).after(o('<div class="uk-alert uk-alert-danger" />').text(n))
                }).always(function() {
                    w = !1
                }))
            })
        } else o("a", v).attr("disabled", "disabled").on("click", function(o) {
            o.preventDefault()
        }), p.prepend('<div class="uk-alert uk-alert-danger">Your browser does not support the customizing and LESS compiling features. Please update your browser.</div>');
        b.on("update", function(n, i) {
            var e = o(this);
            i || (i = e.data("selected")), e.val(e.find('option[value="' + i + '"]').length ? i : e.val())
        }).trigger("update")
    })
}(jQuery, window.sessionStorage || {}),
    function(o) {
        var n = function(n, i) {
            function e(n) {
                var i = o.Deferred();
                return n.groups ? i.resolve() : (o.ajax({
                    url: n.config,
                    cache: !1,
                    dataType: "json"
                }).done(function(e) {
                    var c = o.extend({}, n.config_vars);
                    n.config = e, n.groups = [], n.variables = n.variables || {}, n.matchName = u, o.each(n.config.groups, function(i, e) {
                        var a, t = {
                            label: e.label,
                            variables: [],
                            advanced: e.advanced || !1,
                            more: !1
                        };
                        o.each(e.vars, function(i, e) {
                            o.each(c, function(o, i) {
                                u(e, o) && (delete c[o], a = {
                                    name: o,
                                    "default": i,
                                    placeholder: i,
                                    label: o.replace(/^@/, "").replace(/^\w+\-/, "").replace(/\-/g, " "),
                                    more: -1 !== i.indexOf("@"),
                                    value: function() {
                                        return n.variables[o] ? n.variables[o] : ""
                                    }
                                }, a.more && (t.more = !0, a.placeholder = "@"), t.variables.push(a))
                            })
                        }), t.variables.length && n.groups.push(t)
                    }), i.resolve()
                }).fail(function(o, e, c) {
                    i.reject("Unable to retrieve " + n.config + " (" + c + ")")
                }), i.promise())
            }

            function c(n) {
                r.html(o.mustache(i.template.sidebar, n)), r.find("input[data-name]").each(function() {
                    var i, e, c = o(this),
                        a = c.val() || c.data("default"); - 1 === c.attr("data-default").indexOf("@") && o.each(n.config.controls, function(n, t) {
                        o.each(t.vars, function(n, r) {
                            if (u(r, c.attr("data-name"))) switch (t.type) {
                                case "color":
                                    var s = o('<div class="sp-placeholder"><div class="sp-placeholder-color"></div></div>').find("div").css("background-color", a).end().on("click", function() {
                                        var n;
                                        c.spectrum({
                                            showInput: !0,
                                            showAlpha: !0,
                                            color: a,
                                            change: function(o) {
                                                o.toRgb().a < 1 && c.val(o.toRgbString()).trigger("change")
                                            },
                                            show: function() {
                                                n || (n = o.fn.spectrum.get(c.data("spectrum.id")), n.container.find(".sp-cancel").after(o('<a href="#" class="sp-reset">reset</a>').on("click", function(o) {
                                                    o.preventDefault(), n.set(c.data("default")), n.hide(), c.val("")
                                                })))
                                            }
                                        }).on("show-spectrum", function() {
                                            parseInt(n.container.find(".sp-slider").css("top")) > n.container.find(".sp-hue").height() && n.container.find(".sp-slider").css("top", 0)
                                        }), s.remove(), setTimeout(function() {
                                            c.spectrum("show")
                                        }, 50)
                                    });
                                    c.hide().after(s);
                                    break;
                                case "font":
                                    e = [], o.isArray(t.options) ? e.push({
                                        group: "",
                                        options: t.options
                                    }) : o.each(t.options, function(o, n) {
                                        e.push({
                                            group: o,
                                            options: n
                                        })
                                    }), i = o(o.mustache('<select>{{#groups}}{{#group}}<optgroup label="{{group}}">{{/group}}{{#options}}<option value="{{value}}"{{#url}} data-fonturl="{{url}}"{{/url}}>{{name}}</option>{{/options}}{{#group}}</optgroup>{{/group}}{{/groups}}</select>', {
                                        groups: e
                                    })), dropdown = o('<div class="uk-form-select"></div>'), dropdown.append(i), i.before('<a class="uk-margin-small-left uk-text-muted"><i class="uk-icon-magic"></i></a>'), i.on("change", function() {
                                        c.val(i.val()).attr("data-url", this.options[this.selectedIndex].getAttribute("data-fonturl")).trigger("change")
                                    }), i.find("option[data-fonturl]").each(function() {
                                        this.getAttribute("value") == c.val() && c.attr("data-url", this.getAttribute("data-fonturl")).trigger("change")
                                    }), c.after(dropdown);
                                    break;
                                case "select":
                                    i = o(o.mustache('<select>{{#options}}<option value="{{value}}">{{name}}</option>{{/options}}</select>', {
                                        options: t.options
                                    })), c.replaceWith(i.val(a).attr("class", c.attr("class")).attr("name", c.attr("name")).attr("data-name", c.attr("data-name")))
                            }
                        })
                    })
                })
            }

            function u(o, n) {
                var i = "^" + o.replace(/\//g, "\\/").replace(/\*\*/g, "(\\/[^\\/]+)*").replace(/\*/g, "[^\\/]+").replace(/((?!\\))\?/g, "$1.") + "$";
                return i = "^" + i + "$", null !== n.match(new RegExp(i))
            }
            var a, t = o(i.select, n),
                r = o(i.sidebar, n),
                s = o(i.advanced, n),
                k = o(i.error, n);
            n.on({
                update: function(u, r, s) {
                    o("option", t).length != i.styles.length && t.html(o.mustache(i.template.select, i)), r && t.val(r);
                    var l = t.val(),
                        d = a;
                    o.each(i.styles, function(o, n) {
                        l == n.name && (a = n)
                    }), (a !== d || s) && (n.trigger("updating", a), e(a).done(function() {
                        c(a), n.trigger("updated", a)
                    }).fail(function(n) {
                        k.html(o.mustache('<h1 class="uk-h3">Error</h1><p>{{message}}</p>', {
                            message: n
                        })).show()
                    }))
                },
                updating: i.updating,
                updated: i.updated
            }), t.on("change", function(o) {
                setTimeout(function() {
                    n.trigger("update")
                }, 1)
            }), s.on("change", function(n) {
                r[o(this).prop("checked") ? "addClass" : "removeClass"]("cm-show-advanced")
            }).trigger("change"), n.on("click", "a.cm-more-link", function(n) {
                n.preventDefault(), o(this).parents("fieldset:first").toggleClass("cm-show-more")
            }), n.on("change", "input[name=vars], select[name=vars]", function(i) {
                i.preventDefault();
                var e = o(this).attr("data-name"),
                    c = o(this).val();
                "" === c ? delete a.variables[e] : a.variables[e] = c, n.trigger("updated", a)
            })
        };
        o.fn.customizer = function(i) {
            return this.each(function() {
                var e = {
                    updating: o.noop(),
                    updated: o.noop(),
                    select: "select[name=style]",
                    advanced: "input[name=advanced]",
                    sidebar: "section.cm-sidebar-content",
                    error: ".cm-error",
                    template: {
                        select: '{{#styles}}<option value="{{name}}">{{name}}</option>{{/styles}}',
                        sidebar: '<div class="cm-vars cm-form uk-form">                             {{#groups}}                             <fieldset{{#advanced}} class="cm-advanced"{{/advanced}}>                                 <h2 class="cm-form-title">{{label}}{{#more}} <a href="#" class="cm-more-link"></a>{{/more}}</h2>                                 {{#variables}}                                 <div class="uk-form-row{{#more}} cm-more{{/more}}">                                     <label class="uk-form-label" title="{{name}}">{{label}}</label>                                     <div class="uk-form-controls">                                         <input class="uk-form-small" name="vars" type="text"{{#value}} value="{{value}}"{{/value}} placeholder="{{placeholder}}" data-name="{{name}}" data-default="{{default}}">                                     </div>                                 </div>                                 {{/variables}}                             </fieldset>                             {{/groups}}                         </div>'
                    }
                };
                new n(o(this), o.extend({}, e, i))
            })
        }
    }(jQuery), "function" != typeof window.parse_str;