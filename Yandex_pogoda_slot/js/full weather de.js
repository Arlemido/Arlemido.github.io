var Weather = 
{
    currentCountry : "", currentCity : "", currentCityCoords : {}, cities : {}, CityTemperatures : {},
    i : "//i.yandex.st/weather/i", isRussia : 1
};
y5.namespace("Weather", "weather.js", "utf-8");
y5.on("Weather:1april", function ()
{
    y5.require("Weather:IFeelLucky", function ()
    {
        new Weather.IFeelLucky()
    })
},
Weather, null, {
    runOnce : true
});
if (window.location.search.indexOf("?game") !=- 1) {
    y5.flag("Weather:1april", Weather)
}
y5.on("dom:loaded", function ()
{
    if (Math.floor(Math.random() * 10) == 7)
    {
        y5.on("click", function (d)
        {
            var b = y5.Dom.parent(d.target, "a"), c;
            if (b && (c = /js-counter-([a-z]+)/.exec(b.className)) && (c = c[1])) {
                Lego.ch("weather.tabs." + c, b)
            }
        },
        y5.$("tabs"))
    }
    var a = y5.$$("span.b-rasp-rotator")[Math.floor(Math.random() * 2)];
    if (a) {
        a.style.visibility = "visible";
    }
}, y5);
y5.require(["Classes", "cssQuery", "Dom", "Element"], function ()
{
    Weather.AnimatedMaps_Type = function (d)
    {
        var c = ["temp-max", "precipitation", "water", "wind", "temp-min", "temp-hourly"], g = 
        {
            "central-russia" : [1, 1, 0, 1, 1, 0], russia : [1, 1, 0, 1, 1, 1], europe : [1, 0, 1, 0, 
            1, 0], "southeast-asia" : [0, 0, 1, 0, 0, 0], "southwest-asia" : [0, 0, 1, 0, 0, 0]
        },
        b = /#(.*?)(?:_(.*))?$/.exec(window.location.hash), e;
        if (b) {
            b = b[2]
        }
        else {
            b = ""
        }
        y5.on("Weather:MapRegion:select", function (h)
        {
            f(h)
        }, Weather);
        y5.on("click", function (j)
        {
            j.preventDefault();
            var h = y5.Dom.parent(j.target, "a"), i;
            if (h && h.href.indexOf("current-type") ==- 1) {
                y5.fire("click", document);
                i = /#(.*)$/.exec(h.href)[1];
                a(i)
            }
        },
        y5.$$(".g-js ul", d)[0]);
        function f(h)
        {
            e = h;
            y5.$$(".g-js li", d).slice(1).forEach(function (j, k)
            {
                y5.Classes.assign(j, "g-hidden", !g[h][k])
            });
            if (!b || !g[h][c.indexOf(b)]) {
                b = c[g[h].indexOf(1)]
            }
            a(b)
        }
        function a(i)
        {
            y5.Classes.remove(y5.$$(".g-js li.js-" + b, d)[0], "g-hidden");
            b = i;
            window.location.hash = e + "_" + b;
            var h = y5.$$(".g-js li.js-" + b, d)[0];
            y5.$$(".g-js li.visible span span", d)[0].innerHTML = y5.Element.text(h);
            y5.$$("span.nochoose", d)[0].innerHTML = y5.Element.text(h);
            y5.Classes.add(h, "g-hidden");
            var j = y5.$$(".g-js li:not(.g-hidden)", d).length == 1;
            y5.Classes.assign(y5.$$(".g-js", d)[0], "g-hidden", j);
            y5.Classes.assign(y5.$$("span.nochoose", d)[0], "g-hidden", !j);
            y5.flag("Weather:AnimatedMaps:new", Weather, b)
        }
    };
    y5.loaded("Weather:AnimatedMaps_Type")
});
y5.require(["Components.Slider", "Dom", "Element", "Number", "Template", "Timer", "Widget.Popup"], function ()
{
    var g = y5.Element, f = y5.$$, c = y5.on;
    var b = 
    {
        "4" : "при нагревании от 0 до 4&deg;C вода сжимается. Благодаря этому могут жить рыбы в замерзающих водоёмах. Когда температура падает ниже 4&deg;C, более холодная вода, как менее плотная, остаётся на поверхности и замерзает, а подо льдом сохраняется положительная температура.", 
        "-18" : '&ndash;18&deg; Цельсия &mdash; это 0&deg; по <a href="http://slovari.yandex.ru/search.xml?text=%D1%88%D0%BA%D0%B0%D0%BB%D0%B0+%D0%A4%D0%B0%D1%80%D0%B5%D0%BD%D0%B3%D0%B5%D0%B9%D1%82%D0%B0">шкале Фаренгейта</a>.', 
        "-39" : 'температура плавления <a href="http://slovari.yandex.ru/search.xml?text=%D1%80%D1%82%D1%83%D1%82%D1%8C">ртути</a> &mdash; &ndash;39&deg;C', 
        "-40" : 'температура &ndash;40&deg; по Цельсию точно равна температуре &ndash;40&deg; <a href="http://slovari.yandex.ru/search.xml?text=%D1%88%D0%BA%D0%B0%D0%BB%D0%B0+%D0%A4%D0%B0%D1%80%D0%B5%D0%BD%D0%B3%D0%B5%D0%B9%D1%82%D0%B0">по Фаренгейту</a>. Это единственная температура, в которой две шкалы сходятся.'
    },
    e = 0;
    if (!window.isMoscow) {
        window.isMoscow = 1
    }
    function a(p, J)
    {
        var l = y5.$("slider-data");
        y5.$$("div.no-data", l).forEach(function (i)
        {
            i.style.display = "none";
        });
        if (isNaN(parseInt(p))) {
            p = e
        }
        else {
            e = p
        }
        var D = 0;
        if (p > 0) {
            D = "+" + p
        }
        else {
            if (p < 0) {
                D = p.toString().replace("-", String.fromCharCode(8722));
            }
        }
        var y = 0, S = [];
        if (y5.$("slider-swim").checked) {
            y = 1
        }
        var H = Weather.CityTemperatures[p], k = "";
        if (!d(J) && H && H[y][0] > 0)
        {
            var u = "", T = "", K, C = "", q = "", s, w;
            T = H[y + 2];
            H = H[y];
            w = y5.Number.pluralize(H[0], ["город", "города", "городов"]);
            if (y) {
                u = "&nbsp;&nbsp;вода ${water}";
                k = "купаться при "
            }
            if (H[0] > 3) {
                s = "</a>.<br />Среди них: "
            }
            else {
                s = "</a>:"
            }
            var M = new y5.Template('<li><a href="/maps/##{maplat}_#{maplng}_#{mapzoom}" title="На карте">#{name} (#{state})</a>' + u + "</li>");
            var O = new y5.Template('<li><b class="#{className}">#{temp}</b>&nbsp;<a href="/#{id}/">#{name} (#{state})</a>' + u + ' &mdash; <a class="gettour" style="color:#060" href="http://market.yandex.ru/search.xml?hid=91440&clid=515&text=#{name}&fesh=' + (window.fesh ? window.fesh : "") + '">выбрать тур</a></li>');
            var E = new y5.Template('&mdash;&nbsp;<a href="http://weather.yandex.ru/#{id}/">#{name} (#{state})</a>' + u + "<br />");
            for (var R = 0, Q = H[1].length; R < Q; R++)
            {
                var v = H[1][R];
                K = 
                {
                    name : v[1], id : v[0], className : "t" + (p % 2 == 0 ? p : p + 1), temp : D, state : v[2], 
                    water : v[3] < 0 ? v[3].toString().replace("-", String.fromCharCode(8722)) : "+" + v[3], 
                    maplat : v[y ? 4 : 3], maplng : v[y ? 5 : 4], mapzoom : v[y ? 6 : 5]
                };
                C += M.evaluate(K);
                q += E.evaluate(K)
            }
            var m = "/delivery/" + (y ? "water/" : "") + p + "/";
            C = 'Погода доставлена в <a href="' + m + '">' + w + s.replace("<br />", " ") + "<ul>" + C + "</ul>";
            var V = new y5.Template('<table><tr><td><a href="http://weather.yandex.ru' + m + '"><img src="' + Weather.i + '/delivery/pogodaman2.png" border="0" alt="Доставка погоды"></a></td><td width="10"></td><td valign="top">Я сказал, что хочу #{add}#{tempe}' + String.fromCharCode(176) + 'С, и мою погоду <a href="http://weather.yandex.ru/delivery#{with_water}/#{temp}/">доставили в #{all}' + s + "<br />" + q + 'А вашу?<br /><a href="http://weather.yandex.ru">Доставка и прогноз погоды</a></td></tr></table>');
            S[0] = V.evaluate({
                wt : y, with_water : y ? "/water" : "", tempe : D, temp : p, pos : p + 50, add : k, all : w
            });
            var U = y5.$$("div.data", l)[0];
            U.innerHTML = C;
            U.style.display = ""
        }
        else
        {
            y5.$$("div.data", l)[0].style.display = "none";
            var t;
            if (b[p])
            {
                S[0] = "Я сказал, что хочу " + k + D + String.fromCharCode(176) + "С и мою погоду никуда не доставили. Зато рассказали, что " + b[p] + '<br /><a href="http://weather.yandex.ru">Доставка и познавательный прогноз погоды</a>';
                t = y5.$$("div.interesting-facts", l)[0];
                y5.$$("p", t)[0].innerHTML = b[p];
                t.style.display = ""
            }
            else
            {
                if (d(J)) {
                    t = y5.$$("div.eq366", l)[0]
                }
                else
                {
                    if (p ==- 50) {
                        t = y5.$$("div.eq-50", l)[0]
                    }
                    else
                    {
                        if (p == 50) {
                            t = y5.$$("div.eq50", l)[0]
                        }
                        else
                        {
                            if (p <=- 41) {
                                t = y5.$$("div.lt-41", l)[0]
                            }
                            else
                            {
                                if (p >= 37) {
                                    t = y5.$$("div.gt37", l)[0]
                                }
                                else {
                                    if (p <= 0) {
                                        t = y5.$$("div.lt0", l)[0]
                                    }
                                    else {
                                        if (p > 0) {
                                            t = y5.$$("div.gt0", l)[0];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var n;
                var B, P;
                if (y) {
                    B = "noswim";
                    P = "swim"
                }
                else {
                    B = "swim";
                    P = "noswim"
                }
                var G = y5.$$("h3.title.hidden", t);
                if (G.length > 0)
                {
                    var X = y5.$$("h3.title.shown", t)[0];
                    if (X) {
                        X.style.display = "none";
                        y5.Classes.add(X, "hidden");
                        y5.Classes.remove(X, "shown")
                    }
                    var z =- 1;
                    var I = 0;
                    while (z ==- 1)
                    {
                        z = Math.floor(Math.random() * G.length);
                        var F = G[z].className.indexOf(B);
                        if (F >= 0 && (F == 0 || G[z].className.charAt(F - 1) == " ")) {
                            z =- 1
                        }
                        I++;
                        if (I > 20) {
                            break
                        }
                    }
                    if (z !=- 1)
                    {
                        for (var R = 0, Q = G.length; R < Q; R++)
                        {
                            if (R == z)
                            {
                                G[R].style.display = "";
                                y5.Classes.remove(G[R], "hidden");
                                y5.Classes.add(G[R], "shown");
                                n = G[R].className.match(/(link[0-9]+)/);
                                if (n) {
                                    n = n[1];
                                }
                            }
                            else
                            {
                                G[R].style.display = "none";
                                y5.Classes.remove(G[R], "shown");
                                y5.Classes.add(G[R], "hidden")
                            }
                        }
                    }
                    else {
                        X.style.display = "";
                        y5.Classes.remove(X, "hidden");
                        y5.Classes.add(X, "shown")
                    }
                }
                if (n)
                {
                    y5.Dom.getElementsByTagName("img", t).forEach(function (i)
                    {
                        i.style.display = "none";
                        y5.Classes.add(i, "hidden")
                    });
                    y5.Dom.getElementsByTagName("dl", t).forEach(function (i)
                    {
                        i.style.display = "none";
                        y5.Classes.add(i, "hidden")
                    });
                    y5.$$("." + n, t).forEach(function (i)
                    {
                        i.style.display = "";
                        y5.Classes.add(i, "shown")
                    })
                }
                else
                {
                    var o = y5.$$(".link1, .link2, .link3, .link4, .link5", t);
                    if (o) {
                        o.forEach(function (i)
                        {
                            i.style.display = "none";
                            y5.Classes.add(i, "hidden")
                        })
                    }
                    o = y5.$$("." + B, t);
                    if (o.length) {
                        o.forEach(function (i)
                        {
                            i.style.display = "none";
                            y5.Classes.add(i, "hidden")
                        })
                    }
                    var A = y5.$$("img.random.hidden", t);
                    var N = y5.$$("img.random.shown", t)[0];
                    if (N) {
                        N.style.display = "none";
                        y5.Classes.remove(N, "shown");
                        y5.Classes.add(N, "hidden")
                    }
                    if (A.length > 0)
                    {
                        var r = true;
                        if (y5.Classes.test(A[0], B)) {
                            r = false
                        }
                        if (r)
                        {
                            var W = Math.floor(Math.random() * A.length);
                            n = A[W].className.match(/(link[0-9]+)/);
                            if (n)
                            {
                                P = n[1];
                                A.forEach(function (i)
                                {
                                    i.style.display = "none";
                                    y5.Classes.add(i, "hidden")
                                });
                                y5.$$("dl", t).forEach(function (i)
                                {
                                    i.style.display = "none";
                                });
                                A[W].style.display = "";
                                y5.Classes.remove(A[W], "hidden");
                                y5.Classes.add(A[W], "shown")
                            }
                            else
                            {
                                for (var R = 0, Q = A.length; R < Q; R++)
                                {
                                    if (R == W)
                                    {
                                        A[R].style.display = "";
                                        y5.Classes.remove(A[R], "hidden");
                                        y5.Classes.add(A[R], "shown")
                                    }
                                    else
                                    {
                                        A[R].style.display = "none";
                                        y5.Classes.add(A[R], "hidden");
                                        y5.Classes.remove(A[R], "shown")
                                    }
                                }
                            }
                        }
                        else
                        {
                            y5.$$("img." + P, t).forEach(function (i)
                            {
                                i.style.display = "";
                                y5.Classes.add(i, "hidden")
                            })
                        }
                    }
                    else
                    {
                        y5.$$("img." + P, t).forEach(function (i)
                        {
                            i.style.display = "";
                            y5.Classes.add(i, "hidden")
                        })
                    }
                    y5.$$("dl." + P, t).forEach(function (i)
                    {
                        i.style.display = "";
                        y5.Classes.remove(i, "hidden");
                        y5.Classes.add(i, "shown")
                    });
                    y5.$$("dt." + P, t).forEach(function (i)
                    {
                        i.style.display = "";
                        y5.Classes.remove(i, "hidden");
                        y5.Classes.add(i, "shown")
                    })
                }
                t.style.display = "";
                var L = y5.$$("img", "shown", t)[0];
                if (!L) {
                    L = y5.$$("img", t)[0]
                }
                var x = y5.$$(".shown", t)[0];
                if (!x) {
                    x = y5.$$(".title", t)[0]
                }
                if (!x.innerHTML) {
                    x = y5.$$("dl:not(.hidden) dt", t)[0]
                }
                S[0] = '<img src="' + L.src + '" style="float:left" /> Я сказал, что хочу ' + k + D + String.fromCharCode(176) + "С и мою погоду никуда не доставили. Намекнули еще: " + String.fromCharCode(171) + y5.String.trim(x.innerHTML.replace(/onclick=".*?"|\n|\r/g, 
                "")) + String.fromCharCode(187) + '<br /><a href="http://weather.yandex.ru">Доставка и прогноз погоды</a>';
                if ((36.3 < J && J < 36.8)) {
                    S[0] = S[0].replace("+36", "36,6");
                }
            }
        }
        Weather.Delivery.code = S[0]
    }
    function d(i)
    {
        return (36.3 < i && i < 36.7)
    }
    Weather.Delivery = function (i)
    {
        var l = f(".b-current-weather td.t span:first-child")[0], k = parseInt(l.innerHTML.match(/(\d+)/)[1]);
        if (isNaN(k)) {
            k = 0
        }
        else {
            if (l.innerHTML.charAt(0) != "+") {
                k =- k
            }
        }
        y5.on("click", function (n, m)
        {
            n.preventDefault();
            m = y5.Dom.parent(m, "*", "game");
            y5.Widget.make(y5.$("weather-order-code"), "Widget.Popup", 
            {
                element : m, className : "Weather-Delivery",
                onmake : function (o)
                {
                    y5.$$("textarea", o.container)[0].value = Weather.Delivery.code;
                }
            })
        },
        y5.$$(".b-slider-code a.b-pseudo-link")[0]);
        y5.on("click", function ()
        {
            Lego.c("stred/pid=7/cid=2353");
            a()
        },
        y5.$("slider-swim"));
        this.valueNode = f(".value", i)[0];
        this.grab = f(".y5-Slider-Grab", i)[0];
        this.slider = f(".b-slider", i)[0];
        y5.Classes.add(this.slider, "y5-c-Components-Slider");
        this.counter = false;
        y5.on("y5:allComponentsCreated", function ()
        {
            this.onMove(k);
            c("y5:Slider:move", this.onMove, this.slider, this);
            c("y5:Slider:change", function ()
            {
                if (!this.counter) {
                    h()
                }
            },
            this.slider, this);
            this.valueNode.style.visibility = "visible";
        },
        this.slider, this);
        y5.on("Weather:Games:open", function ()
        {
            y5.Classes.add(this.slider, "y5-c-Components-Slider");
            y5.Components.init(this.slider)
        },
        i, this, {
            runOnce : true
        });
        var j = f("td.l-slider-l i.b-icon, td.l-slider-r i.b-icon", i);
        c("mouseup", this.stopMoving, j[0], this);
        c("mouseup", this.stopMoving, j[1], this);
        c("mousedown", function (n, m)
        {
            this.mouseDown(n, m);
            this.iterator = 1;
        },
        j[1], this);
        c("mousedown", function (n, m)
        {
            this.mouseDown(n, m);
            this.iterator =- 1
        },
        j[0], this);
        this.grabWidth = 7;
        this.scaleWidth = 250;
    };
    Weather.Delivery.prototype = new function ()
    {
        var i = String.fromCharCode(8722);
        this.onMove = function (m)
        {
            var l = m, n, k = this.valueNode;
            m = Math.round(m);
            if (m > 0) {
                n = "+" + m
            }
            else {
                if (m < 0) {
                    n = m.toString().replace("-", i)
                }
                else {
                    n = m;
                }
            }
            k.className = "value t" + ((m % 2) ? m + 1 : m);
            k.innerHTML = n;
            var j = k.offsetWidth, p = g.css(this.grab, "left") + this.grabWidth / 2 - j / 2, o = this.scaleWidth - j - 2;
            if (p <= 2) {
                p = 2
            }
            else {
                if (p >= o) {
                    p = o;
                }
            }
            g.css(k, "left", p);
            if (d(l)) {
                k.innerHTML = "+36,6"
            }
            a(m, l);
        };
        this.mouseDown = function (k, j)
        {
            y5.Classes.add(j, "b-icon_" + (j.className.indexOf("snow") !=- 1 ? "snow" : "sun") + "_on");
            if (!this.executer) {
                this.executer = new y5.Timer(this.iterate, 100, this);
            }
        };
        this.stopMoving = function (k, j)
        {
            y5.Classes.remove(j, "b-icon_" + (j.className.indexOf("snow") !=- 1 ? "snow" : "sun") + "_on");
            if (this.executer) {
                this.executer.disable();
                this.executer = null;
                this.iterator = 0
            }
            this.iterate();
            this.counter = false;
            h()
        };
        this.iterate = function ()
        {
            this.counter = true;
            var j = e + this.iterator;
            if (-50 <= j && j <= 50) {
                y5.fire("y5:Slider:set", this.slider, j)
            }
        }
    };
    function h()
    {
        Lego.c("stred/pid=7/cid=1406/path=" + e)
    }
    Weather.Delivery.code = "";
    y5.loaded("Weather:Delivery")
});
y5.require(["cssQuery"], function ()
{
    Weather.Games = function (b)
    {
        var a = y5.$$("li", b), d = y5.$$("div.game", b.parentNode), c = true;
        a.forEach(function (e)
        {
            y5.on("click", function (g)
            {
                g.preventDefault();
                if (!y5.Classes.test(this, "current"))
                {
                    var f = this.className;
                    if (!c) {
                        Lego.c("stred/pid=7/cid=249" + (f === "js-delivery" ? "7" : "8"))
                    }
                    c = false;
                    d.forEach(function (h)
                    {
                        y5.Classes.add(h, "g-hidden")
                    });
                    a.forEach(function (h)
                    {
                        y5.Classes.remove(h, "current")
                    });
                    y5.fire("Weather:Games:open", y5.$$("div." + f)[0]);
                    y5.Classes.remove(y5.$$("div." + f)[0], "g-hidden");
                    y5.Classes.add(y5.$$("li." + f)[0], "current")
                }
            }, e)
        });
        y5.Classes.remove(b, "g-hidden");
        y5.fire("click", a[0])
    };
    y5.loaded("Weather:Games")
});
y5.require("cssQuery", "Fx", "Number", function ()
{
    Weather.IFeelLucky = function (b)
    {
        this.element = b;
        this.message = y5.$$(".js-message", b)[0];
        this.codeBlock = y5.$$("div.js-arm-code", b)[0];
        this.code = y5.$$("textarea", this.codeBlock)[0];
        this.allCnt = 0;
        this.wins = 0;
        this.LoosesInSuccession = 0;
        this.finished =- 1;
        this.cloudCnt = 0;
        this.noRainOrSnow = true;
        y5.on("click", function (d, c)
        {
            d.preventDefault();
            y5.Widget.make(y5.$("weather-order-code"), "Widget.Popup", 
            {
                element : y5.Dom.parent(c, "*", "game"), className : "Weather-Delivery",
                onmake : function (e)
                {
                    y5.$$("textarea", e.container)[0].value = Weather.IFeelLucky.code;
                    Lego.c("stred/pid=7/cid=2615")
                }
            })
        },
        y5.$$(".b-slider-code a", b)[0]);
        y5.on("Weather:1April:complete", function (h, e)
        {
            if (this.results[e])
            {
                var d = this.results[e].push(h);
                if (d >= this.resultMaxCnt.cnt) {
                    this.updateCounter(e, d)
                }
            }
            else {
                this.results[e] = [h];
                if (1 >= this.resultMaxCnt.cnt) {
                    this.updateCounter(e, 1)
                }
            }
            if (++this.finished == 3)
            {
                this.allCnt++;
                var g, c =- 1;
                if (this.resultMaxCnt.cnt == 3)
                {
                    this.wins++;
                    this.LoosesInSuccession = 0;
                    Lego.c("stred/pid=7/cid=2339");
                    c = this.resultMaxCnt.num.sort()[0];
                    switch (c)
                    {
                        case 0:
                            g = "snow";
                            break;
                        case 1:
                            g = "rain";
                            break;
                        case 2:
                            g = "sun";
                            break;
                        case 3:
                            g = "storm";
                            break;
                        case 4:
                            g =++this.cloudCnt >= 2 ? "cloud2" : "cloud";
                            break;
                        case 5:
                            g = "snowstorm";
                            break;
                        case 6:
                            g = "fog";
                            break
                    }
                }
                else
                {
                    var f =++this.LoosesInSuccession;
                    Lego.c("stred/pid=7/cid=2338");
                    if (this.resultMaxCnt.cnt === 2 && this.resultMaxCnt.num[0] == 2) {
                        g = "sun_2"
                    }
                    else
                    {
                        if (this.resultMaxCnt.num.indexOf(0) !=- 1 || this.resultMaxCnt.num.indexOf(1) !=- 1) {
                            if (this.allCnt > 1 && this.noRainOrSnow) {
                                g = "bad_weather"
                            }
                            this.noRainOrSnow = false
                        }
                        else {
                            this.noRainOrSnow = true
                        }
                        if (!g)
                        {
                            if (f === 3) {
                                g = "loose3"
                            }
                            else
                            {
                                if (f === 5) {
                                    g = "loose5"
                                }
                                else {
                                    if (f === 7) {
                                        g = "loose7"
                                    }
                                    else {
                                        if (f === 10) {
                                            g = "loose10"
                                        }
                                        else {
                                            g = "loose";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                this.showMessage(g);
                this.finished =- 1
            }
        }, Weather, this);
        this.els = [];
        y5.on("click", this.init, y5.$$(".js-arm", b)[0], this);
        this.css = 
        {
            "b-bandit__weekday__dayname" : "font-size:190%;display:block;margin:0;font-weight:normal;", 
            "b-bandit__head" : "font-size:180%;text-align:center;padding-right:65px;", "b-bandit__automat_broken" : "width:400px;height:200px;margin:5px 0 0 0;background:url(" + Weather.i + "/1april/one_armed_bandit_broken_for_blog.png) no-repeat;border-collapse:collapse;border:0;line-height:normal;", 
            "b-bandit__automat" : "width:350px;height:200px;margin:5px 0 0 0;background:url(" + Weather.i + "/1april/one_armed_bandit_for_blog.png) no-repeat;border-collapse:collapse;border:0;line-height:normal;", 
            "b-bandit__fake-th_broken" : "background:none;border:0;width:112px", "b-bandit__fake-th" : "background:none;border:0;width:62px", 
            "b-bandit__weekday__wrapper" : "padding:0 10px 10px 15px;", "b-bandit__weekday" : "margin:0;padding:0;background:none;border:0;text-align:left;border-collapse:collapse;font-size:13px;font-weight:normal;width:96px !important;height:76px;vertical-align:bottom;white-space:nowrap;", 
            "b-bandit__weekend" : "margin:0;padding:0;background:none;border:0;text-align:left;border-collapse:collapse;font-size:13px;font-weight:normal;width:96px !important;height:76px;vertical-align:bottom;white-space:nowrap;color:#FF3300;", 
            "b-bandit__precipitation" : "text-align:left;border:0;border-collapse:collapse;font-size:11px;height:86px;padding:0 10px 0 15px;vertical-align:top;", 
            "b-bandit__temperature__wrapper" : "padding:0 10px 8px 15px;", "b-bandit__temperature" : "background:none;border:0;height: 38px;margin:0;padding:0;vertical-align:bottom;border-collapse:collapse;", 
            "b-bandit__light" : "font-size:20px;display:block;margin:0;white-space:nowrap;font-weight:normal;", 
            "b-bandit__dark" : "font-size:100%;display:block;margin:0;white-space:nowrap;color:#71716f;font-weight:normal;", 
            "b-bandit__hint" : "font-size:120%;margin-top:10px;", "b-wea-icon" : "display:block;float:none;margin-bottom:0.6em;", 
            "b-wea_img" : "display:block", "b-bandit__arm" : "position:absolute;top:4em;left:288px;", 
            "b-bandit" : "position:relative;width:350px;min-height:250px;"
        };
        this.armURL = Weather.i + "/1april/ruchka.gif";
        this.armBrokenURL = Weather.i + "/1april/ruchka-broken.gif";
        this.createBaraban()
    };
    Weather.IFeelLucky.prototype = new function ()
    {
        var c = "", b = 7, e = 20, f = 
        {
            bad_weather : ["Осторожнее, вы так погоду испортите.", "Становится только хуже."], broken : "Поздравляем, вы ручку сломали.", 
            cloud : 'Пора в <a href="http://video.yandex.ru/search.xml?text=%D1%82%D0%B8%D0%BB%D0%B8%D0%BC%D0%B8%D0%BB%D0%B8%D1%82%D1%80%D1%8F%D0%BC%D0%B4%D0%B8%D1%8F">Тилимилитрямдию</a>.', 
            cloud2 : "У меня уже всё остыло, а они по облакам бегают.", fog : ["Если вы пилот самолёта — советуем остаться дома.", 
            "И ни одного сиреневого.", "ЙООО-ЖЫК!"], loose : ["Просто продолжайте.", "Снова не повезло — зато разнообразие.", 
            "Погода и удача непредсказуемы. Продолжайте.", "А что вы хотите получить-то?", "Вот такая дёрганая погода.", 
            "Рычаг — один, а вас много. Еще раз — и до послезавтра.", "Чем дальше — тем интереснее.", 
            "Мне повезет!", "Сложно управлять погодой.", "Ну еще разок!"], loose3 : ["Третий проигрыш подряд — это почти выигрыш. Попробуйте еще раз.", 
            "Иногда лучше вовремя остановиться.", "Четвертого раза обычно не бывает."], loose5 : ["Даже интересно, повезет ли вам в конце концов?", 
            "А некоторые, бывает, выигрывают."], loose7 : ["Пилите, Шура, пилите. Они золотые.", "А некоторые, бывает, выигрывают."], 
            loose10 : ["Все идёт по плану.", "А у вас молоко убежало.", "А некоторые, бывает, выигрывают."], 
            rain : ["Поздравляем. Вы испортили погоду.", "Вам досталось три дождя. Вот счастье-то."], 
            snow : ["А в Антарктиде так всегда.", "Вам выпал снег. Поздравляем."], snowstorm : ["Вас заносит.", 
            "Поздравляем. Вы испортили погоду."], storm : ["Поздравляем. Вы испортили погоду.", "В континентальной Африке такую погоду считают счастьем.", 
            "Попробуйте ещё раз — может, выиграете торнадо, смерч, наводнение и всякие другие хорошие вещи.", 
            "Гроза! Побежим домой! Поскорее."], sun : ["Самое время пойти загорать.", "Вы обыграли погоду на три солнечных дня.", 
            "Вы выиграли три дня хорошей погоды. Незаменимый человек в нашем климате.", "Ура! Солнца много не бывает.", 
            "Вы выиграли три солнца — духовное, интеллектуальное и материальное."], sun_2 : "Скоро будет солнечно."
        };
        var g = [2, 4, 7, 8, 16, 17, 18];
        function d()
        {
            return y5.Number.random(0, b - 1)
        }
        this.createBaraban = function ()
        {
            c = '<div class="b-scroll-wrapper b-scroll-wrapper-weather"><div class="scrollable">' + [2, 
            4, 7, 8, 16, 17, 18].map(function (h)
            {
                return '<div class="cell g-png"><i class="b-wea-icon g-png"><img src="' + Weather.i + "/icons/" + h + '.png" alt="" /></i></div>';
            }).join("") + "</div></div>"
        };
        this.randomizer = function ()
        {
            var h = new Array(3);
            if (y5.Number.random(0, 5) === 0) {
                h[0] = h[1] = h[2] = d()
            }
            else {
                h[0] = d();
                h[1] = d();
                h[2] = d()
            }
            Weather.randoms = h;
        };
        this.updateCounter = function (h, i)
        {
            if (this.resultMaxCnt.cnt == i) {
                this.resultMaxCnt.num.push(h)
            }
            else {
                this.resultMaxCnt.num = [h];
                this.resultMaxCnt.cnt = i;
            }
        };
        this.showMessage = function (h)
        {
            h = f[h];
            if (y5.Types.array(h)) {
                h = h[y5.Number.random(0, h.length - 1)]
            }
            this.message.innerHTML = h;
            Weather.IFeelLucky.code = this.getCode();
            this.message.style.visibility = "visible";
            this.codeBlock.style.visibility = "visible";
        };
        this.getCode = function ()
        {
            var j = this.element.cloneNode(true);
            y5.Dom.removeChild(y5.$$("div.js-arm-code", j)[0]);
            y5.$$("td.js-scrollable", j).forEach(function (m, l)
            {
                var k = g[Weather.randoms[l]];
                m.innerHTML = '<i class="b-wea-icon"><img class="b-wea_img" alt="" src="' + Weather.i + "/icons/" + k + '.png" /></i>' + a.prototype.texts[k];
            });
            j = j.innerHTML.replace(/\s*js-\w+\s*|g-hidden|\t|\n|\r|\s{2,}/g, "").replace(/(<h3.*?>)(.*?)(<\/h3>)/i, 
            '$1Я&nbsp;&nbsp;<span style="color:red">' + this.wins + ":" + (this.allCnt - this.wins) + "</span>&nbsp;&nbsp;Яндекс.Погода$3").replace(/style="visibility:.*?"/i, 
            "").replace(/<\/th><\/tr>/i, '</th><th rowspan="3" class="b-bandit__fake-th' + (this.broken ? "_broken" : "") + '"></th></tr>').replace(/<div class=(")?b-bandit__arm.*?<\/div>/i, 
            "").replace(/(<div\s*class="?b-bandit__hint.*?>.*?)(<\/div>)/i, '$1<br /><br /><a href="http://weather.yandex.ru/?fromArm">Переиграйте Яндекс.Погоду!</a>$2');
            if (this.broken) {
                j = j.replace("b-bandit__automat", "b-bandit__automat_broken")
            }
            for (var h in this.css) {
                j = j.replace(new RegExp('class=(")?' + h + '(")?', "g"), 'style="' + this.css[h] + '"')
            }
            return j;
        };
        this.prepare = function ()
        {
            (new Image()).src = this.armURL;
            (new Image()).src = this.armBrokenURL;
            var h = 86;
            a.prototype._cellHeight = h;
            a.prototype._height = h * b;
            this.els = y5.$$(".js-scrollable", this.element).map(function (l, k)
            {
                y5.Dom.clearNode(l);
                l.innerHTML = c;
                var j = l.firstChild.firstChild;
                j.style.top = (-h * d()) + "px";
                return new a(j, b, k);
            });
            this.prepare = function () {}
        };
        this.init = function (i, h)
        {
            i.preventDefault();
            if (this.finished !=- 1) {
                return
            }
            Lego.c("stred/pid=7/cid=2334");
            this.results = {};
            this.resultMaxCnt = {
                num : [], cnt : 0
            };
            this.finished = 0;
            this.prepare();
            this.randomizer();
            this.message.style.visibility = "hidden";
            this.codeBlock.style.visibility = "hidden";
            if (this.allCnt >= e)
            {
                this.broken = true;
                y5.Dom.replaceChild('<img src="' + this.armBrokenURL + '" alt="" title="Все! Доигрались! :)" />', 
                h);
                this.showMessage("broken")
            }
            else
            {
                h.src = Weather.i + "/1april/ruchka.gif";
                window.setTimeout((function (j)
                {
                    return function ()
                    {
                        j.els.forEach(function (k)
                        {
                            k.start()
                        })
                    }
                })(this), 600)
            }
        }
    };
    var a = function (d, c, b)
    {
        this.element = d;
        this.position = b;
        this.cellsCount = c;
        y5.on("fx:complete", this._oncomplete, d, this)
    };
    a.prototype = new function ()
    {
        var c = 2, b = [0, 1, 1, 1];
        var d = ["", "", "снег", "мокрый снег", "дождь", "", "переменная облачность", "ясно", "гроза", 
        "переменная облачность, небольшие осадки", "переменная облачность, небольшой дождь", "облачно, небольшой дождь", 
        "переменная облачность, небольшой снег", "облачно, небольшой снег", "", "", "облачно", "метель", 
        "туман"];
        this.texts = d;
        this._cellHeight = 0;
        this._height = 0;
        this._getDuration = function ()
        {
            return b[this._step];
        };
        this._animate = function ()
        {
            var j = this._cellHeight;
            this._step++;
            var g = this._getDuration(), k = y5.Fx.Transitions.linear;
            var e = g / (this._height / this._cellHeight);
            if (this._step > c)
            {
                k = y5.Fx.Transitions.sinIn;
                var i = this.random = Weather.randoms[this.position];
                j =- i * this._cellHeight;
                g = (7 - i) * e;
                var h = this.element.childNodes[i];
                var f = /icons\/(\d+)\.png/.exec(h.innerHTML)[1];
                h.innerHTML += "<span>" + d[f] + "</span>"
            }
            else
            {
                if (this._step == 1)
                {
                    k = y5.Fx.Transitions.sinOut;
                    g *= (Math.abs(parseInt(this.element.style.top, 10)) + this._cellHeight) / this._cellHeight * e
                }
            }
            y5.Fx.Morph(this.element, {
                top : j
            },
            {
                start : true, duration : g, fps : 15, delay : 0, transition : k
            })
        };
        this._oncomplete = function ()
        {
            if (this._step <= c) {
                this.element.style.top = "-" + (this._height - this._cellHeight) + "px";
                this._animate()
            }
            else {
                y5.fire("Weather:1April:complete", Weather, this.element, this.random)
            }
        };
        this.start = function ()
        {
            this._step = 0;
            y5.$$("span", this.element).forEach(function (e)
            {
                y5.Dom.removeChild(e)
            });
            this._animate()
        }
    };
    y5.loaded("Weather:IFeelLucky")
});
y5.require(["cssQuery"], function ()
{
    var a = ' selected="selected" ';
    Weather.InformerSetup = function (d)
    {
        this.control = d;
        this.textarea = y5.$$("div.b-informer-code textarea", d)[0];
        this.city = /(\d+)\.png/i.exec(y5.$$(".b-informer-size img:first", d)[0].src)[1];
        this.color = "";
        this.size = null;
        this.imgs = y5.$$("div.b-informer-size img", d);
        y5.$$('input[type="radio"]', d).forEach(function (e)
        {
            y5.on("click", this.changeColor, e, this)
        }, this);
        y5.on("click", function (e)
        {
            window.clipboardData.setData("Text", y5.String.unescapeHTML(y5.$$("textarea", e.parentNode)[0].value))
        },
        y5.$$("div.b-informer-code a.clipboard", d)[0]);
        y5.$$("div.b-informer-size li", d).forEach(function (e)
        {
            y5.on("click", this.changeSize, e, this)
        }, this);
        var c = y5.$$("input.js-suggest", d)[0], b = y5.$$("div.b-notify", d)[0];
        new Weather.Suggest(c, "/suggest-map.xml");
        y5.on("y5:Suggest:open", function ()
        {
            y5.Classes.add(b, "g-hidden")
        }, c);
        y5.on(["y5:Suggest:select", "y5:Suggest:noresult"], function (e)
        {
            y5.Classes.assign(b, "g-hidden", !(c.value && !e));
            if (!e) {
                return
            }
            this.changeCity(e)
        }, c, this)
    };
    Weather.InformerSetup.prototype = 
    {
        changeCity : function (b)
        {
            this.city = b;
            this.changeInformer();
            this.changeCode()
        },
        changeInformer : function ()
        {
            this.imgs.forEach(function (b, c)
            {
                b.src = "http://weather.yandex.ru/static/perblock-informer" + (c + 1) + "" + this.color + "/" + this.city + ".png";
            }, this)
        },
        changeColor : function (c, b)
        {
            this.color = b.value == 1 ? "_white" : "";
            this.changeInformer();
            this.changeCode()
        },
        changeSize : function (c, b)
        {
            y5.$$(".b-informer-size .active").forEach(function (d)
            {
                y5.Classes.remove(d, "active")
            });
            y5.Classes.add(b, "active");
            this.size = y5.$$("h4", b)[0].innerHTML.replace(/\D/, "x");
            this.changeCode()
        },
        changeCode : function ()
        {
            if ((this.color != null) && (this.size != null) && (this.city != null)) {
                this.textarea.className = "code";
                this.textarea.value = this.generateCode()
            }
            else {
                this.textarea.className = "";
                this.textarea.value = this.textarea.defaultValue;
            }
        },
        generateCode : function ()
        {
            return '<a href="http://clck.yandex.ru/redir/dtype=stred/pid=7/cid=1228/*http://weather.yandex.ru/index.xml?city=' + this.city + '"><img src="http://info.weather.yandex.net/informer/' + this.size + this.color + "/" + this.city + '.png" border="0" alt="Яндекс.Погода"/><img width="1" height="1" src="http://clck.yandex.ru/click/dtype=stred/pid=7/cid=1227/*http://img.yandex.ru/i/pix.gif" alt="" border="0"/></a>';
        }
    };
    y5.loaded("Weather:InformerSetup")
});
y5.require([], function ()
{
    Weather.Local = function (a)
    {
        y5.on("Yandex:Local", function (b)
        {
            if (b)
            {
                a.className = "b-local b-local_small " + (b == 2 ? "b-local-disabled" : "");
                a.innerHTML = '<a href="http://local.yandex.ru/?status=' + (b == 1 ? "in" : "out") + '"><i class="b-icon"><i></i></i><b>Яндекс ' + (b == 1 ? "" : "не ") + "локален</b></a>";
            }
        }, Weather)
    };
    y5.loaded("Weather:Local")
});
y5.require(["Classes", "cssQuery", "Dom"], function ()
{
    Weather.MapRegion = function (b, e)
    {
        var d, c = e.defaultRegion, f = y5.$$("ul.regions", b)[0];
        if (!f) {
            return
        }
        y5.on("click", function (h)
        {
            h.preventDefault();
            var g = y5.Dom.parent(h.target, "a");
            if (g && !y5.Classes.test(g.parentNode, "current")) {
                a(/#(.*)$/.exec(g.href)[1])
            }
        },
        y5.$$("ul.regions", b)[0]);
        y5.on("Weather:MapRegion:clearSelect", function ()
        {
            y5.$$("li.current", b).forEach(function (g)
            {
                y5.Classes.remove(g, "current")
            })
        }, Weather);
        function a(h)
        {
            y5.$$("li.current", b).forEach(function (i)
            {
                y5.Classes.remove(i, "current")
            });
            var g = y5.$$("li.js-" + h, b)[0];
            if (!g) {
                if (c) {
                    g = y5.$$(".regions li:first a", b)[0];
                    y5.fire("click", g)
                }
                return
            }
            y5.Classes.add(g, "current");
            y5.flag("Weather:MapRegion:select", Weather, h)
        }
        d = /#(.*?)(?:_(.*))?$/.exec(window.location.hash);
        if (d) {
            d = d[1]
        }
        else {
            if (!c) {
                return
            }
            d = Weather.isRussia ? "central-russia" : "europe"
        }
        a(d);
    };
    y5.loaded("Weather:MapRegion")
});
y5.require("Request.XML", "Url", function ()
{
    Weather.OnMap = function (d)
    {
        this.regionCoordinates = 
        {
            asia : {
                center : new YMaps.GeoPoint(75, 25), zoom : 4
            },
            africa : {
                center : new YMaps.GeoPoint(20, 5), zoom : 3
            },
            australia : {
                center : new YMaps.GeoPoint(145, - 31), zoom : 4
            },
            belarus : {
                center : new YMaps.GeoPoint(27.916746, 53.809025), zoom : 6
            },
            "central-russia" : {
                center : new YMaps.GeoPoint(38.268402, 56.00099), zoom : 6
            },
            europe : {
                center : new YMaps.GeoPoint(15, 52), zoom : 4
            },
            kazakhstan : {
                center : new YMaps.GeoPoint(66.905283, 48.55694), zoom : 5
            },
            "north-america" : {
                center : new YMaps.GeoPoint(-100, 50), zoom : 3
            },
            russia : {
                center : new YMaps.GeoPoint(105, 59), zoom : 3
            },
            ukraine : {
                center : new YMaps.GeoPoint(31.154176, 48.533755), zoom : 6
            },
            "south-america" : {
                center : new YMaps.GeoPoint(-70, - 25), zoom : 3
            }
        };
        this.forceUpdate = false;
        var c = y5.Element.size(y5.Dom.parent(d, "td"));
        c.width -= 20;
        y5.Element.size(y5.$("YMapsID"), c);
        this.yMap = new YMaps.Map(y5.$("YMapsID"));
        var a = new YMaps.TypeControl([]);
        var g = new YMaps.MapType(YMaps.MapType.MAP.getLayers(), "Схема", {
            minZoom : 1, maxZoom : 11
        });
        var b = new YMaps.MapType(YMaps.MapType.HYBRID.getLayers(), "Гибрид", {
            minZoom : 1, maxZoom : 11
        });
        a.addType(g);
        a.addType(b);
        this.yMap.addControl(a);
        this.yMap.setType(b);
        this.yMap.addControl(new YMaps.Zoom());
        this.yMap.addControl(new YMaps.MiniMap());
        this.yMap.enableScrollZoom();
        this.manager = new YMaps.ObjectManager({
            padding : 10, trackObjects : false
        });
        this.yMap.addOverlay(this.manager);
        this.zoom = 0;
        var e = new YMaps.Style();
        e.iconStyle = new YMaps.IconStyle(new YMaps.Template('<div class="b-balloon b-balloon_1" onclick="Lego.c(\'stred/pid=7/cid=2519/path=$[id]\');window.location=\'/$[id]/\'" title="$[name]"><img src="' + Weather.i + '/balloon/balloon.png" width="70" height="42" alt="" /><div class="g-png icon"><img src="http://img.yandex.net/i/wiz$[image].png" width="24" height="24" alt="" title="$[name]" /></div><div class="temp">$[temperature]</div></div>'));
        e.iconStyle.offset = new YMaps.Point(-22, - 40);
        YMaps.Styles.add("weather#onMap1", e);
        e = new YMaps.Style();
        e.iconStyle = new YMaps.IconStyle(new YMaps.Template('<div class="b-balloon b-balloon_2" onclick="Lego.c(\'stred/pid=7/cid=2519/path=$[id]\');window.location=\'/$[id]/\'" title="$[name]"><img src="' + Weather.i + '/balloon/balloon2.png" width="94" height="42" alt="" /><div class="g-png icon"><img src="http://img.yandex.net/i/wiz$[image].png" width="48" height="24" alt="" title="$[name]" /></div><div class="temp">$[temperature]</div></div>'));
        e.iconStyle.offset = new YMaps.Point(-22, - 40);
        YMaps.Styles.add("weather#onMap2", e);
        YMaps.Events.observe(this.yMap, this.yMap.Events.MoveEnd, this.getWeather, this);
        YMaps.Events.observe(this.yMap, this.yMap.Events.Update, function ()
        {
            var h = this.yMap.getZoom();
            if (h != this.zoom || this.forceUpdate) {
                this.zoom = h;
                this.getWeather()
            }
            this.forceUpdate = false;
        }, this);
        var f;
        if (window.location.hash)
        {
            if (window.location.hash == "#earth") {
                this.yMap.setCenter(new YMaps.GeoPoint(0, 0), 1)
            }
            else
            {
                f = window.location.hash.substr(1).split("_");
                if (f && f.length == 3) {
                    this.yMap.setCenter(new YMaps.GeoPoint(f[1], f[0]), f[2])
                }
            }
        }
        else
        {
            if (Weather.currentCityCoords && Weather.currentCityCoords.zoom)
            {
                f = Weather.currentCityCoords;
                this.yMap.setCenter(new YMaps.GeoPoint(f.lng, f.lat), f.zoom)
            }
        }
        y5.on("Weather:onMap:go", function (h)
        {
            this.forceUpdate = true;
            this.yMap.setCenter(new YMaps.GeoPoint(parseFloat(h.longitude, 10), parseFloat(h.latitude, 
            10)), h.geozoom)
        }, Weather, this);
        y5.on("Weather:MapRegion:select", function (h)
        {
            this.dontClearSelector = true;
            this.forceUpdate = true;
            this.yMap.setCenter(this.regionCoordinates[h].center, this.regionCoordinates[h].zoom)
        }, Weather, this);
        y5.on("Weather:onMap:setForecastDay", function (h)
        {
            this.base_url.set("day", h);
            this.manager.removeAll();
            this.cache = {};
            this.points = {};
            this.getWeather()
        }, Weather, this)
    };
    Weather.OnMap.prototype = new function ()
    {
        var e = /^n/;
        this.cache = {};
        this.points = {};
        this.base_url = new y5.Url("/maps-forecast.xml?day=0");
        this.createPlacemark = function (j)
        {
            var i = new YMaps.GeoPoint(j.lng, j.lat), g = j.image.replace(e, "");
            if (this.points[i.toString()]) {
                return false
            }
            this.points[i.toString()] = true;
            var h = new YMaps.Placemark(i, 
            {
                hasBalloon : false, style : "weather#onMap" + (g == 1 || g == 2 || (g >= 4 && g <= 7) || (g >= 16 && g <= 18) ? 1 : 2)
            });
            h.name = j.name;
            h.id = j.id;
            h.image = j.image;
            h.temperature = j.temperature > 0 ? ("+" + j.temperature) : j.temperature;
            this.manager.add(h, j.zoom);
            return true;
        };
        this.getWeather = function ()
        {
            if (!this.dontClearSelector) {
                y5.fire("Weather:MapRegion:clearSelect", Weather)
            }
            this.dontClearSelector = false;
            var g = this.yMap.getCenter();
            y5.flag("Weather:OnMap:currentCenter", Weather, [g.getLat(), g.getLng(), this.zoom]);
            var h = this.getTiles(), m, j = 0, l = h.length, k, n;
            for (; j < l; j++)
            {
                n = f(h[j], this.zoom);
                if (this.cache[n] === true || this.cache[n] === null) {
                    continue
                }
                k = this.getHandler(n);
                m = {
                    lt : h[j].lt, rb : h[j].rb, zoom : this.zoom
                };
                if (this.cache[n] === false) {
                    m.rnd = y5.Id.generateUnique()
                }
                this.cache[n] = null;
                y5.Get.XML(this.base_url.copy().set(m), {
                    onload : k, onerror : k, onexception : k, callbackContext : this
                })
            }
        };
        this.getHandler = function (g)
        {
            return function (h)
            {
                try {
                    var i = h.json()
                }
                catch (j) {}
                if (h.status == 200 && i) {
                    this.cache[g] = true;
                    this.addOverlays(i)
                }
                else {
                    this.cache[g] = false;
                }
            }
        };
        var a = 
        {
            "3" : {
                lat : 25, lng : 90
            },
            "4" : {
                lat : 17, lng : 52
            },
            "5" : {
                lat : 10, lng : 28
            },
            "6" : {
                lat : 5, lng : 16
            },
            "7" : {
                lat : 2.5, lng : 8.5
            },
            "8" : {
                lat : 1.3, lng : 4.2
            },
            "9" : {
                lat : 0.65, lng : 2
            },
            "10" : {
                lat : 0.34, lng : 1
            },
            "11" : {
                lat : 0.16, lng : 0.5
            }
        };
        this.getTiles = function ()
        {
            var v = this.yMap.getZoom(), s = this.yMap.getBounds(), h = s.getLeft(), q = s.getTop(), u = s.getRight(), 
            g = s.getBottom();
            if (h > 0 && u < 0) {
                u = 360 + u
            }
            if (v == 1 || v == 2) {
                return [ {
                    lt : "-180,90", rb : "180,-90"
                }]
            }
            var r = a[v].lng, o = a[v].lat, k = b(h, u, r), n = b(g, q, o), t = [];
            for (var m = 0, p = k.length; m < p; m++)
            {
                for (var l = n.length - 1; l >= 0; l--) {
                    t.push({
                        lt : c(k[m]) + "," + d((n[l] + o)), rb : c((k[m] + r)) + "," + d(n[l])
                    })
                }
            }
            return t;
        };
        function d(g)
        {
            if (g > 90) {
                g = 90
            }
            else {
                if (g <- 90) {
                    g =- 90
                }
            }
            return g.toFixed(6)
        }
        function c(g)
        {
            if (g > 180) {
                g =- 360 + g
            }
            else {
                if (g <- 180) {
                    g = 360 + g;
                }
            }
            return g.toFixed(6)
        }
        this.addOverlays = function (g)
        {
            g.forEach(this.createPlacemark, this)
        };
        function b(k, i, j)
        {
            var h = [], g = Math.floor(k / j) * j;
            while (g < i) {
                h.push(g);
                g += j
            }
            return h
        }
        function f(h, g)
        {
            return h.lt + ":" + h.rb + ":" + g;
        }
    };
    y5.loaded("Weather:OnMap")
});
y5.require("Weather:OnMap", function ()
{
    Weather.OnMap.Link = function (c)
    {
        var b = y5.$$(".js-input", c)[0], f = y5.$$(".js-close-link", c)[0], d = y5.$$(".js-link", c)[0];
        y5.on("click", e, d);
        y5.on("click", a, f);
        y5.Shortcut.down("ESC", a, b, null, {
            checkTarget : false
        });
        y5.on("Weather:OnMap:currentCenter", function (g)
        {
            b.value = "http://weather.yandex.ru/maps/#" + g.join("_");
        }, Weather);
        function a()
        {
            y5.Classes.remove(c, "b-link2map__open")
        }
        function e(g)
        {
            g.preventDefault();
            Lego.c("stred/pid=7/cid=2807");
            y5.Classes.add(c, "b-link2map__open");
            window.setTimeout(function ()
            {
                b.select()
            }, 50)
        }
    };
    y5.loaded("Weather:OnMap.Link")
});
y5.require("cssQuery", "Date", "Template", function ()
{
    Weather.OnMapForecast = function (d)
    {
        var e = new Date(), c = "", b = 0, a = new y5.Template('<span class="b-pseudo-link day js-day${day}" title="${title}"><span>${text}</span></span> ');
        for (; b <= 10; b++)
        {
            c += a.evaluate(
            {
                day : b, text : b == 0 ? "сейчас" : y5.Date.format(e, y5.Vars.dayShortNames[(e.getDay() + 6) % 7].toLowerCase() + ", %e" + ((b == 1 || e.getDate() == 1) ? " %B" : "")), 
                title : y5.Date.format(e, y5.Vars.dayNames[(e.getDay() + 6) % 7].toLowerCase() + ", %e %B")
            });
            e.setDate(e.getDate() + 1)
        }
        d.innerHTML = c;
        y5.on("click", function (h)
        {
            var g = y5.Dom.parent(h.target, "span", "b-pseudo-link");
            if (g)
            {
                y5.Classes.add(y5.$$(" > span.day:not(.b-pseudo-link)", g.parentNode)[0], "b-pseudo-link");
                y5.Classes.remove(g, "b-pseudo-link");
                var f = /js-day(\d+)/.exec(g.className)[1];
                Lego.c("stred/pid=7/cid=2517/path=" + f);
                y5.fire("Weather:onMap:setForecastDay", Weather, f)
            }
        }, d, this);
        y5.Classes.remove(y5.$$("span.js-day0")[0], "b-pseudo-link")
    };
    y5.loaded("Weather:OnMapForecast")
});
y5.require("Classes", "cssQuery", "Element", "Fx", "Template", function ()
{
    Weather.Player = function (a)
    {
        this.element = a;
        this.playState = false;
        this.playerTable = y5.$$("table.b-map-player:eq(0)", this.element)[0];
        y5.on("click", this.toggleStopPlay, y5.$$("a.play", a)[0], this);
        y5.on("click", this.toggleStopPlay, y5.$$(".icon", a)[0], this);
        y5.on("click", this.toggleStopPlay, y5.$$(".b-map-player-menu .play a", a)[0], this);
        y5.on("click", function (b)
        {
            b.preventDefault();
            this.playState = false;
            this.turnOffPlayer();
            if (this.currentImage == 0) {
                this.currentImage = this.Images.length - 2
            }
            else {
                this.currentImage -= 2
            }
            this.play(true)
        },
        y5.$$(".back", a)[0], this);
        y5.on("click", function (b)
        {
            b.preventDefault();
            this.playState = false;
            this.turnOffPlayer();
            this.play(true)
        },
        y5.$$(".forward", a)[0], this);
        this.playIcon = y5.$$(".b-map-player-menu .play", a)[0];
        this.counter = y5.$$(".b-map-player-menu .count")[0];
        this.scale = y5.$$(".scale_temp img", a)[0];
        this.currentImage = 0;
        this.oldImg = y5.$$("img.old", a)[0];
        this.newImg = y5.$$("img.new", a)[0];
        y5.on("fx:complete", this.oncomplete, this.oldImg, this);
        y5.on("fx:complete", this.oncomplete, this.newImg, this);
        y5.on("Weather:AnimatedMaps:new", function (e)
        {
            this.counted = false;
            y5.Classes.remove(this.playerTable, "b-map-player_on");
            this.element.style.visibility = "visible";
            this.playState = false;
            this.turnOffPlayer();
            var f = "/data/animations/" + window.location.hash.substr(1) + "_01.png";
            this.oldImg.src = f;
            this.newImg.src = f;
            this.scale.src = Weather.i + "/scales/" + (e.indexOf("temp") ==- 1 ? e : "temp") + ".png";
            this.Images = [];
            var d = 5;
            if (e == "wind" || e == "temp-hourly") {
                d = 15
            }
            for (var c = 0; c < d; c++)
            {
                var b = 
                {
                    src : this.oldImg.src.replace(/(\d+)(\.png)$/, (c + 1 < 10 ? "0" + (c + 1) : c + 1) + "$2"), 
                    loaded : false
                };
                b.tmbl = b.src.replace(/animations/, "animations/frames");
                b.id = c + 1;
                this.Images.push(b)
            }
            this.ImagesCount = this.Images.length;
            this.currentImage = 0;
            this.updateCounter(true)
        }, Weather, this)
    };
    Weather.Player.prototype = new function ()
    {
        var a = 500, b = new y5.Template('<li><a href="#${id}"><img src="${tmbl}" alt="" width="31" height="20" /><span class="dis">${id}</span></a></li>');
        this.toggleStopPlay = function (c)
        {
            c.preventDefault();
            this.playState = !this.playState;
            this.turnOffPlayer();
            if (this.playState) {
                this.play(true)
            }
            else {
                this.toggleImgs()
            }
        };
        this.setPlayIcon = function ()
        {
            this.playIcon.className = (this.playState ? "pause" : "play")
        };
        this.turnOffPlayer = function ()
        {
            window.clearTimeout(this.timer);
            if (this.effect) {
                this.effect.reset();
                this.effect.cancel()
            }
            this.setPlayIcon()
        };
        this.play = function (f)
        {
            if (!this.counted) {
                Lego.c("stred/pid=7/cid=2378");
                this.counted = true
            }
            y5.Classes.add(this.playerTable, "b-map-player_on");
            window.clearTimeout(this.timer);
            var e = this.Images[++this.currentImage];
            if (!e) {
                this.currentImage = 0;
                e = this.Images[0]
            }
            this.callMorphByPreLoader = false;
            this.callMorphByTimer = false;
            if (!e.loaded) {
                var c = new Image();
                y5.on("load", this.morph, c, this);
                c.src = e.src
            }
            else {
                this.callMorphByPreLoader = true
            }
            if (this.playState && !f)
            {
                var d = this;
                this.timer = window.setTimeout(function (g)
                {
                    return function ()
                    {
                        g.morph()
                    }
                }
                (d), a)
            }
            else {
                this.morph()
            }
        };
        this.oncomplete = function ()
        {
            var c = this.oldImg;
            this.oldImg = this.newImg;
            this.newImg = c;
            this.effect = null;
            if (this.playState && this.currentImage + 1 < this.Images.length) {
                this.play()
            }
            else {
                this.playState = false;
                this.turnOffPlayer()
            }
        };
        this.morph = function ()
        {
            if (arguments.length) {
                this.callMorphByPreLoader = true
            }
            else {
                this.callMorphByTimer = true
            }
            if (this.callMorphByTimer && this.callMorphByPreLoader)
            {
                this.toggleImgs();
                this.Images[this.currentImage].loaded = true;
                this.newImg.src = this.Images[this.currentImage].src;
                this.effect = y5.Fx.Morph(this.oldImg, {
                    opacity : 0
                },
                {
                    delay : 0, duration : 0.5, start : true
                });
                this.updateCounter()
            }
        };
        this.toggleImgs = function ()
        {
            y5.Element.css(this.newImg, {
                zIndex : 9, opacity : 1
            });
            y5.Element.css(this.oldImg, {
                zIndex : 10
            })
        };
        this.change = function (d, c)
        {
            d.preventDefault();
            this.playState = false;
            this.currentImage = /#(\d+)/.exec(c.firstChild.href)[1] - 2;
            this.turnOffPlayer();
            this.play(true)
        };
        this.updateCounter = function (c)
        {
            if (c)
            {
                y5.$$(".thumb")[0].innerHTML = b.evaluate(this.Images);
                y5.$$(".thumb")[0].style.width = (this.ImagesCount * 35 + (y5.Browser.ie ? 6 : 2)) + "px";
                y5.$$(".thumb li").forEach(function (d)
                {
                    y5.on("click", this.change, d, this)
                }, this)
            }
            this.counter.innerHTML = (this.currentImage + 1) + "/" + this.ImagesCount;
            y5.Classes.remove(y5.$$(".thumb .current", this.element)[0], "current");
            y5.Classes.add(y5.$$(".thumb li", this.element)[this.currentImage], "current")
        }
    };
    y5.loaded("Weather:Player")
});
y5.require("cssQuery", "Dom", "Element", function ()
{
    var c = y5.Dom, a = y5.Element, b = ' selected="selected" ';
    Weather.RegionSelector = function (g)
    {
        this.element = g;
        var d, h = y5.$$("select.country", g)[0], f, e = '<select name="country" class="country" ' + (h.disabled ? ' disabled="disabled" ' : "") + ">";
        for (f in Weather.cities) {
            e += "<option" + (Weather.currentCountry == f ? b : "") + ">" + f + "</option>"
        }
        e += "</select>";
        d = a.create(e);
        c.replaceChild(d, h);
        y5.on("change", this.changeCountry, d, this);
        if (!y5.Browser.ie) {
            y5.on("keyup", this.changeCountry, d, this)
        }
        this.changeCountry(null, d)
    };
    Weather.RegionSelector.prototype = new function ()
    {
        function d(e)
        {
            y5.fire("Weather:changeRegion", Weather, e.value, e.innerHTML)
        }
        this.changeCountry = function (m, l)
        {
            var n = y5.$$("select.city", this.element)[0], h = '<select size="10" name="city" class="city" ' + (n.disabled ? ' disabled="disabled" ' : "") + ">", 
            k = Weather.cities[l.options[l.selectedIndex].innerHTML], g, f, j;
            for (g in k) {
                h += "<option " + (g == Weather.currentCity ? b : "") + 'value="' + k[g] + '">' + g + "</option>"
            }
            h += "</select>";
            f = a.create(h);
            c.replaceChild(f, n);
            y5.on("change", function (o, i)
            {
                d(i.options[i.selectedIndex])
            }, f);
            if (m != null)
            {
                j = f.options[0];
                j.selected = true;
                a.attributes(j, "selected", "selected");
                Weather.currentCity = j.innerHTML;
                d(j)
            }
        }
    };
    y5.loaded("Weather:RegionSelector")
});
y5.require("Request.XML", "Suggest", function ()
{
    Weather.Suggest = function (a, b)
    {
        try {
            a.setAttribute("type", "search")
        }
        catch (d) {}
        a.blur();
        var c = new y5.Suggest(a, 
        {
            process : function (e)
            {
                if (!e) {
                    y5.fire("y5:Suggest:onData", a, {
                        query : e, elements : []
                    });
                    return
                }
                e = e.toLowerCase();
                y5.Get.XML(b, 
                {
                    onload : function (f)
                    {
                        var g = new RegExp(e.toUpperCase(), "gi");
                        try
                        {
                            f = f.json().filter(function (i)
                            {
                                if (!i.name && !i.country) {
                                    return false
                                }
                                i.value = i.name || i.country;
                                i.html = i.value.replace(g, "<strong>$&</strong>");
                                if (y5.Types.def(i.temperature))
                                {
                                    i.html += '<span class="temp">' + (i.temperature > 0 ? "+" + i.temperature : i.temperature.toString().replace("-", 
                                    "&minus;")) + " </span>";
                                    i.className = "t" + (i.temperature % 2 == 0 ? i.temperature : i.temperature + 1)
                                }
                                return true;
                            })
                        }
                        catch (h) {
                            c.closeWidget();
                            return
                        }
                        y5.fire("y5:Suggest:onData", a, {
                            query : e, elements : f
                        })
                    }
                },
                {
                    query : e
                })
            }
        },
        {
            ci : true
        })
    };
    y5.loaded("Weather:Suggest")
});
y5.require("cssQuery", "Weather:Suggest", function ()
{
    Weather.Suggest.Header = function (c, d)
    {
        var b = y5.$$("input.js-suggest", c)[0], a = y5.$$("div.b-notify", c)[0];
        new Weather.Suggest(b, d.url ? d.url : "/suggest.xml");
        d = null;
        y5.on("y5:Suggest:open", function ()
        {
            y5.Classes.add(a, "g-hidden")
        }, b);
        y5.on(["y5:Suggest:select", "y5:Suggest:noresult"], function (h, f, g)
        {
            y5.Classes.assign(a, "g-hidden", !(b.value && !h));
            if (!h) {
                return
            }
            var e = /^\d+$/.test(h) ? "/" + h + "/" : "/region/" + h + "/";
            if (g) {
                b.value = f;
                b.form.action = e
            }
            else {
                window.location = e;
            }
        }, b);
        y5.on("submit", function (g, f)
        {
            g.preventDefault();
            window.location = f.action;
        }, c, true)
    };
    y5.loaded("Weather:Suggest.Header")
});
y5.require("cssQuery", "Weather:Suggest", function ()
{
    Weather.Suggest.Map = function (c, d)
    {
        var b = y5.$$("input.js-suggest", c)[0], a = y5.$$("div.b-notify", c)[0];
        new Weather.Suggest(b, d.url ? d.url : "/suggest.xml");
        d = null;
        y5.on("y5:Suggest:open", function ()
        {
            y5.Classes.add(a, "g-hidden")
        }, b);
        y5.on(["y5:Suggest:select", "y5:Suggest:noresult"], function (i, f, h, g)
        {
            y5.Classes.assign(a, "g-hidden", !(b.value && !i));
            if (!i) {
                return
            }
            y5.fire("Weather:onMap:go", Weather, g);
            var e = "/maps/#" + g.longitude + "_" + g.latitude + "_" + g.geozoom;
            h = true;
            b.value = f;
            b.form.action = e;
        }, b);
        y5.on("submit", function (h, f)
        {
            h.preventDefault();
            var g = /#(.*)/.exec(f.action);
            if (g)
            {
                g = g[1].split("_");
                y5.fire("Weather:onMap:go", Weather, {
                    longitude : g[0], latitude : g[1], geozoom : g[2]
                })
            }
            else {
                window.location = f.action;
            }
        }, c, true)
    };
    y5.loaded("Weather:Suggest.Map")
});
y5.require("cssQuery", function ()
{
    Weather.Tune = function (e)
    {
        var c = y5.$$("div.b-tune-field", e)[0], b = y5.$$("#tune, #tune-ch")[0], a = y5.$$("input.js-suggest", 
        e)[0], d = y5.$$("div.b-notify", e)[0];
        y5.$$('input[type="radio"]').forEach(function (g)
        {
            y5.on("click", f, g)
        });
        function f(i, g)
        {
            var h = !(g.id == "tune" || g.id == "tune-ch");
            a.disabled = h;
            y5.Classes.assign(c, "g-hidden", h)
        }
        new Weather.Suggest(a, "/suggest-map.xml");
        y5.on("y5:Suggest:open", function ()
        {
            y5.Classes.add(d, "g-hidden")
        }, a);
        y5.on(["y5:Suggest:select", "y5:Suggest:noresult"], function (g)
        {
            y5.Classes.assign(d, "g-hidden", !(a.value && !g));
            if (!g) {
                return
            }
            b.value = g;
        }, a)
    };
    y5.loaded("Weather:Tune")
});