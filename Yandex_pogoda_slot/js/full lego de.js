(function (a)
{
    if (!a) {
        a = window.Lego = {}
    }
    a.c = function (c, b)
    {
        var d = function (g, j, i)
        {
            return location.protocol + "//clck.yandex.ru/" + i + "/dtype=" + g + "/rnd=" + ((new Date()).getTime() + Math.round(Math.random() * 100)) + "/*" + (j.match(/^http/) ? j : location.protocol + "//" + location.host + (j.match("^/") ? j : "/" + j));
        };
        var f = function ()
        {
            var g = document.createElement("script");
            g.src = d(c, location.href, "jclck");
            document.documentElement.getElementsByTagName("head")[0].appendChild(g)
        };
        if (b)
        {
            if (b.className.match(/b-pseudo-link/)) {
                f()
            }
            else
            {
                if (b.href) {
                    var e = b.href;
                    b.href = d(c, e, "redir");
                    setTimeout(function ()
                    {
                        b.href = e;
                    }, 500)
                }
                else
                {
                    if (b.form)
                    {
                        if (b.type.match(/submit|button|image/))
                        {
                            var e = b.form.action;
                            b.form.action = d(c, e, "redir");
                            setTimeout(function ()
                            {
                                b.form.action = e;
                            }, 500)
                        }
                        else {
                            f()
                        }
                    }
                    else
                    {
                        if (b.action) {
                            b.action = d(c, b.action, "redir")
                        }
                        else {
                            throw "counter.js: not link and not form!"
                        }
                    }
                }
            }
        }
        else {
            f()
        }
    }
})(window.Lego);
(function (a)
{
    if (!a) {
        a = window.Lego = {}
    }
    a.cp = function (e, c, d, b)
    {
        a.c("stred/pid=" + e + "/cid=" + c + "/path=" + d, b)
    }
})(window.Lego);
(function (a)
{
    if (!a) {
        a = window.Lego = {}
    }
    a.ch = function (c, b)
    {
        if (!a.params || a.params["show-counters"]) {
            a.cp(0, 2219, c, b)
        }
    }
})(window.Lego);
(function (a)
{
    if (!a) {
        a = window.Lego = {}
    }
    a.getCookie = function (h)
    {
        var g = document.cookie;
        if (g.length < 1) {
            return false
        }
        var d = g.indexOf(h + "=");
        if (d ==- 1) {
            return false
        }
        d += (h.length + 1);
        var f = g.indexOf(";", d);
        return decodeURIComponent((f ==- 1) ? g.substring(d) : g.substring(d, f));
    }
})(window.Lego);
(function (a)
{
    if (!a) {
        a = window.Lego = {}
    }
    a.isSessionValid = function ()
    {
        var b = a.getCookie("Session_id");
        if (!b) {
            return false
        }
        var c = b.split(".");
        if (c[2] == "1") {
            return true
        }
        var e = parseFloat(((new Date().getTime()) - c[0] * 1000 - c[1]) / 1000);
        if (c[2] == "3") {
            return e < 1209600
        }
        return e < 7200;
    }
})(window.Lego);
(function (b)
{
    if (!b) {
        b = window.Lego = {}
    }
    var a, c;
    b.login = function (n, k, r, e)
    {
        if (b.isSessionValid()) {
            return true
        }
        if (!k) {
            k = location.href
        }
        k = encodeURIComponent(k);
        var m = document.forms.LOGIN;
        if (!m)
        {
            var i = "tabindex=1";
            var l = b.params["passport-host"] + "/passport?mode=";
            var h = "position:absolute;";
            var p = "font-size:11px;padding:0;vertical-align:middle";
            var d = "font:120% Arial,sans-serif;margin:0;vertical-align:middle";
            var s = '<iframe frameborder=0 style="position:absolute;background:#fff' + ((!(navigator.userAgent.match(/MSIE [67]/) && !navigator.userAgent.match(/Opera/)) && !(navigator.platform.match(/Linux/) && !navigator.userAgent.match(/Konqueror/))) ? ";display:none" : "") + '"></iframe>';
            var q = ' style="' + p + '"';
            e = e || "mail";
            m = document.createElement("div");
            m.innerHTML += '<div style="font-size:12px;' + h + 'z-index:9999;top:33px;left:50%;display:none;width:21.1em;margin-left:-10.5em;">' + s + s + '<form name=LOGIN class=login action="' + l + 'auth"method=post onsubmit="this.timestamp.value=new Date().getTime()"style="' + h + 'background:#333"><div style="position:relative;top:-3px;left:-3px;border:1px solid #000;border-top-color:#666;border-left-color:#666;background:#fff"><span style="font-family:Verdana,sans-serif;font-size:85%;' + h + 'padding:0.05em 0.55em 0.25em;color:#f8d471;background:#900">&#1087;&#1072;&#1089;&#1087;&#1086;&#1088;&#1090;</span><table cellspacing=5 style="width:100%;margin-top:17px;border-spacing:5px;border-collapse:separate;border:15px solid #fff;color:#000"><tr><td><td style="' + p + ';width:99%;padding-bottom:10px"><a ' + i + ' style="color:#666"href="' + l + "register&amp;msg=" + e + "&amp;retpath=" + k + '">&#1047;&#1072;&#1088;&#1077;&#1075;&#1080;&#1089;&#1090;&#1088;&#1080;&#1088;&#1086;&#1074;&#1072;&#1090;&#1100;&#1089;&#1103;</a><tr><td' + q + ">&#1051;&#1086;&#1075;&#1080;&#1085;:<td" + q + '><input name=login style="width:99%;' + d + '"' + i + "><tr><td" + q + ">&#1055;&#1072;&#1088;&#1086;&#1083;&#1100;:<td" + q + '><input name=passwd type=password style="width:99%;' + d + '"' + i + "><tr><td><td" + q + "><input id=z name=twoweeks " + i + ' type=checkbox value=yes style="' + d + '"> <label for=z>&#1079;&#1072;&#1087;&#1086;&#1084;&#1085;&#1080;&#1090;&#1100; &#1084;&#1077;&#1085;&#1103;</label> <a style="margin-left:4px"tabindex=3 href="http://help.yandex.ru/passport/?id=922493"target=help><img src="//img.yandex.net/i/i-help2.gif"width=10 height=10 border=0 alt="[?]"></a><div style="padding-top:.9em"><input type=hidden name=retpath value="' + k + '"><input type=hidden name=timestamp>' + (r ? "<input type=hidden name=kspace>" : "") + '<input style="' + d + ';margin-right:9px"type=submit ' + i + ' value="&#1042;&#1086;&#1081;&#1090;&#1080;"><input type=button style="' + d + '"' + i + ' onclick="Lego.loginHide()"value="&#1047;&#1072;&#1082;&#1088;&#1099;&#1090;&#1100;"><div style="margin-top:1.4em"><a tabindex=2 style="color:#666"href="' + l + "remember&amp;msg=" + e + "&amp;retpath=" + k + '">&#1047;&#1072;&#1073;&#1099;&#1083;&#1080; &#1087;&#1072;&#1088;&#1086;&#1083;&#1100;?</a></div></div></table></div></form>';
            document.body.appendChild(m);
            m = document.forms.LOGIN
        }
        c = document.onkeydown;
        document.onkeydown = function (f)
        {
            f = f || window.event;
            if ((f.keyCode == 27) && (!f.ctrlKey) && (!f.altKey)) {
                b.loginHide()
            }
        };
        if (n == 2)
        {
            var o = getCookie("yandex_login");
            n = (o && o.length > 1);
            if (n) {
                if (m.login.value != o) {
                    m.login.value = o;
                    m.passwd.value = "";
                    n =- 1
                }
            }
        }
        m.twoweeks.checked = (n == 3);
        if (r) {
            m.kspace.value = r
        }
        m.parentNode.style.display = "block";
        var j = m.previousSibling;
        var g = j.previousSibling;
        j.style.width = g.style.width = m.scrollWidth + "px";
        j.style.height = g.style.height = m.scrollHeight + "px";
        g.style.margin = "-3px 0 0 -3px";
        setTimeout("document.forms.LOGIN." + (n !=- 1 ? "login" : "passwd") + ".focus()", 1);
        a = m;
        return false;
    };
    b.loginHide = function ()
    {
        document.onkeydown = c;
        var d = a.parentNode;
        d.style.display = "none";
        a.login.value = a.passwd.value = "";
        a = null;
    }
})(window.Lego);
(function (b, a)
{
    if (!a) {
        a = window.Lego = {}
    }
    a.init = function (c)
    {
        c = c || {};
        c.id = c.id || "";
        c.login = c.login || (a.isSessionValid() ? a.getCookie("yandex_login") : "");
        c.login = c.login || "";
        c.locale = c.locale || "ru";
        c["passport-host"] = c["passport-host"] || "//passport.yandex.ru";
        c["show-counters-percent"] = c["show-counters-percent"] || 100;
        c["show-counters"] = Math.round(Math.random() * 100) <= c["show-counters-percent"];
        a.params = c;
        return c;
    };
    a.block = {};
    a.blockInit = function (c, d)
    {
        c = c || document;
        d = d || ".g-js";
        b.$$(d, c).forEach(function (f)
        {
            var h = f.onclick ? f.onclick() : {}, e = h.name || "", g = a.block[e];
            if (g && !b.Element.data(f, e)) {
                g.call(f, h);
                b.Element.data(f, e, true)
            }
        })
    };
    b.on("dom:loaded", function ()
    {
        a.blockInit()
    }, b)
})(y5, window.Lego);
(function (b)
{
    if (!b) {
        b = window.Lego = {}
    }
    var a = {};
    b.tabs = function (c)
    {
        if (document.getElementById && (typeof (encodeURIComponent) == "function"))
        {
            var h = document.getElementById("tabs");
            if (h)
            {
                var i = document.getElementById("b-head-search");
                h = h.getElementsByTagName("a");
                var d = h.length - 1;
                var j = document.getElementById("advanced");
                var g;
                if (j) {
                    g = j.href;
                    g = g.replace(/([?&])text=[^&]*/g, "$1");
                    g += g.indexOf("?") ==- 1 ? "?" : "&"
                }
                var e = 527;
                switch (c) {
                    case "www":
                        e = 505;
                        break;
                    case "search":
                        e = 521;
                        break;
                    case "images":
                        e = 526;
                        break
                }
                setInterval(function ()
                {
                    var n = "";
                    for (var m = 0; m < i.length; m++) {
                        if (i[m].type == "text") {
                            n = i[m].value.replace(/^\s+|\s+$/g, "");
                            break
                        }
                    }
                    if (j) {
                        j.href = g + (n != "" ? "text=" + encodeURIComponent(n) : "")
                    }
                    for (var m = 0; m < d; m++)
                    {
                        var k = "";
                        var f = h[m];
                        var o = f.host.split(".")[0];
                        if (o == "clck" || f.className.match(/or|b-pseudo-link/)) {
                            continue
                        }
                        if (n != "")
                        {
                            if ((o == "www") || (o == "images")) {
                                k = "yandsearch?"
                            }
                            else
                            {
                                if (o == "news") {
                                    k = "yandsearch?rpt=nnews&grhow=clutop&"
                                }
                                else
                                {
                                    if (o == "yaca") {
                                        k = "yandsearch?rpt=rs2&"
                                    }
                                    else
                                    {
                                        if (o == "market") {
                                            k = "search.xml?clid=" + e + "&cvredirect=1&"
                                        }
                                        else
                                        {
                                            if (o == "blogs") {
                                                k = "search.xml?ft=blog&"
                                            }
                                            else
                                            {
                                                if (o == "maps") {
                                                    k = "?"
                                                }
                                                else
                                                {
                                                    if ((o == "auto") || (o == "adresa") || (o == "video") || (o == "slovari")) {
                                                        k = "search.xml?"
                                                    }
                                                    else {
                                                        continue
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            k += "text=" + encodeURIComponent(n)
                        }
                        else {
                            if (o == "market") {
                                k = "?clid=" + e + "&cvredirect=1&";
                            }
                        }
                        var p = a[o] || (a[o] = (f.search.match(/[&?]clid=(\d+)/) || [])[1]);
                        if (p && o != "market" && !(o == "www" && n == "")) {
                            k += (k.indexOf("?") !=- 1 ? "&" : "?") + "clid=" + p
                        }
                        var l = f.protocol + "//" + f.host + "/" + k;
                        if ((f.parentNode.tagName.toLowerCase() != "strong") && (f.href != l)) {
                            f.href = l;
                        }
                    }
                }, 200)
            }
        }
    }
})(window.Lego);
(function (b, a)
{
    a.block["b-dropdown"] = function ()
    {
        var f = this, h = b.Element.create('<div class="b-dropdown-popup"><iframe frameborder="0" src="javascript:\'<body style=\\\'background:none;overflow:hidden\\\'>\'"></iframe></div>'), 
        g = f.cloneNode(true), e = true, c = (function ()
        {
            if (e) {
                return
            }
            h.style.visibility = "hidden";
            h.style.display = "none";
            b.Dom.insertBefore(f, h);
            g.style.display = "none";
            e = true;
        }), d;
        b.Classes.remove(g, "g-js");
        g.style.display = "none";
        b.Dom.insertBefore(h, f);
        b.Dom.insertAfter(g, h);
        b.on(["keydown", "click"], function (i)
        {
            if (((i.keyCode == 27) && !(i.ctrlKey || i.altKey)) || !b.Dom.isChild(i.target, f)) {
                c()
            }
        }, document);
        b.on("mouseout", function ()
        {
            d = setTimeout(c, 1000);
        }, h);
        b.on("mouseover", function ()
        {
            clearTimeout(d)
        }, h);
        b.on("click", function (j)
        {
            j.preventDefault();
            if (e)
            {
                var i = g.innerHTML;
                g.style.display = "";
                h.appendChild(f);
                h.style.visibility = "";
                h.style.display = "";
                e = false
            }
            else {
                c()
            }
        },
        b.$$(".or", this)[0])
    }
})(y5, window.Lego);
(function (b, a)
{
    a.block["b-head-userinfo.user"] = function ()
    {
        function c(e)
        {
            var g = b.$$("td.exit")[0], f = window.location.href;
            if (e)
            {
                g.className = "exit";
                g.innerHTML = '<a href="http://passport.yandex.ru/passport?mode=logout&yandexuid=' + a.getCookie("yandexuid") + "&retpath=" + f + '">Выйти</a>'
            }
            else
            {
                g.className = "entry";
                g.innerHTML = '<a class="b-pseudo-link" onclick="return Lego.login(0,\'' + f + '\')" href="http://passport.yandex.ru/passport?mode=auth&retpath=' + f + '"><span>Войти</span></a>';
            }
        }
        if (a.params.login != "")
        {
            var d = this;
            b.Get.XML("/local.xml", 
            {
                onload : function (g)
                {
                    g = g.json();
                    if (!g || !g.services) {
                        return
                    }
                    var e = g.login || a.params.login;
                    var f = '<div class="g-js b-dropdown" onclick="return {name:\'b-dropdown\'}"><ul><li class="visible"><a href="http://i.yandex.ru" class="or"><span class="b-pseudo-link"><span><b class="b-user"><b>' + e.substring(0, 
                    1) + "</b>" + e.substring(1) + '</b></span></span><i class="arrow"><i class="b-icon"><i></i></i></i></a></li>';
                    g.services.forEach(function (h)
                    {
                        f += "<li>";
                        if (a.params.id == h.id) {
                            f += "<strong>" + h.title + "</strong>"
                        }
                        else
                        {
                            f += '<a href="' + h.url + '"onmousedown="Lego.ch(\'' + a.params.id + ".login.myservices." + h.id + "',this)\">" + h.title + "</a>"
                        }
                        f += "</li>"
                    });
                    f += '<li class="line"><a href="http://passport.yandex.ru/">Паспорт</a></li>';
                    f += '<li><a href="http://passport.yandex.ru/passport?mode=changepass&retpath=http://i.yandex.ru/">Сменить пароль</a></li>';
                    f += "</ul></div>";
                    b.Dom.replaceChild(f, b.$$(".b-user", d)[0]);
                    a.blockInit(d, ".b-dropdown");
                    c(true);
                    b.flag("Yandex:Local", Weather, parseInt(g.local || 0, 10))
                }
            },
            {
                login : a.getCookie("yandex_login")
            })
        }
        else {
            c()
        }
    }
})(y5, window.Lego);
(function (b, a)
{
    a.block["b-hint-input"] = function ()
    {
        var g = this, d = b.$(g.getAttributeNode("for").nodeValue), f = function ()
        {
            b.Classes.add(g, "g-hidden")
        },
        c = function ()
        {
            if (!d.value) {
                b.Classes.remove(g, "g-hidden")
            }
        };
        b.on("focus", f, d);
        b.on("blur", c, d);
        b.on(["change", "mouseover"], function ()
        {
            if (d.value) {
                f()
            }
        }, d);
        b.on("click", function ()
        {
            d.focus()
        }, g);
        b.fire("change", d);
        var e = d.value;
        (function ()
        {
            if (d.value != e) {
                b.fire("change", d);
                e = d.value
            }
            setTimeout(arguments.callee, 200);
        })()
    }
})(y5, window.Lego);