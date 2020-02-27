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