var Weather = 
{
    currentCountry : "", currentCity : "", currentCityCoords : {}, cities : {}, CityTemperatures : {},
    i : "", isRussia : 1
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
            "b-bandit__head" : "font-size:180%;text-align:center;padding-right:65px;", "b-bandit__automat_broken" : "width:400px;height:200px;margin:5px 0 0 0;background:url(" + Weather.i + "icons/one_armed_bandit_broken_for_blog.png) no-repeat;border-collapse:collapse;border:0;line-height:normal;", 
            "b-bandit__automat" : "width:350px;height:200px;margin:5px 0 0 0;background:url(" + Weather.i + "icons/one_armed_bandit_for_blog.png) no-repeat;border-collapse:collapse;border:0;line-height:normal;", 
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
        this.armURL = Weather.i + "icons/ruchka.gif";
        this.armBrokenURL = Weather.i + "icons/ruchka-broken.gif";
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
                return '<div class="cell g-png"><i class="b-wea-icon g-png"><img src="' + Weather.i + "icons/" + h + '.png" alt="" /></i></div>';
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
                m.innerHTML = '<i class="b-wea-icon"><img class="b-wea_img" alt="" src="' + Weather.i + "icons/" + k + '.png" /></i>' + a.prototype.texts[k];
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
                h.src = Weather.i + "icons/ruchka.gif";
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