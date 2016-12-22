;(function (Jadann)
{
    var defaultConfig = {
        title: "温馨提示",
        message: "请确认当前操作",
        // 默认大尺寸
        size: "m",
        isShowBtn: true,
        isShowTitle: true,
        btns: [],
        alone: true,
        $container: null,
        complete: null,
        beforeShow: null,
        onShow: null,
        hideCallback: null,
        promptBoxClass: ""
    }, utility = Jadann.utility;

    /**
    * 作者：张敏强
    * 日期：2016-01-11
    * 提供两种弹出层：
    * 1.共用的弹出层，用于一般的提示信息：
    * PromptBox.show(@title, @message, @btns[,@width]); 或者 PromptBox.show(@options);
    * 2.非共用的弹出层，例如，新增弹出层、删除弹出层等
    * @param @options           {object}配置信息
    * {
    *       @title              {string} 标题
    *       @message            {string} 提示信息
    *       @btns               {array} 格式例如：[{name:"取消", click:function(){PromptBox.instance.hide();},...] 
    *       @size              {string} 提示框尺寸："l":650px、"m":450px、"s": 320px，默认为"m"
    *       @isShowBtn          {boolean} 是否显示按钮区，默认显示
    *       @isShowTitle        {boolean} 是否显示标题，默认显示
    *       @alone              {boolean} 是否独立的弹出层，默认为true
    *       @$container         {jQuery} 包含提示内容的jQuery对象，需提前在页面上构建html
    *       @complete           {function} 弹出层对象生成后的事件，可以初始化弹出层内的元素事件
    *       @beforeShow         {function} 在显示之前调用方法，可以对弹出层内容进行操作
    *       @onShow             {function} 在显示之后调用方法，可以对元素尽心尺寸操作
    *       @hideCallback       {function} 在弹出层隐藏后对弹出层内容进行操作
    * }
    * PromptBox.hide();  // 隐藏提示框
    **/
    function PromptBox(options)
    {
        options = options || {};

        // 是否初始化
        this._isInit = false;
        // 当前配置
        this._defaultConfig = defaultConfig;
        this._currentConfig = $.extend(true, $.extend(true, {}, this._defaultConfig), options);
        this._currentConfig.$container && this._currentConfig.$container.hide();
        PromptBox.count = PromptBox.count + 1;
        this._promptBoxID = "promptBox_wrap" + PromptBox.count;
        //this._zIndex = 1050 + (PromptBox.count - 1) * 10;
    }

    // 初始化弹出层背景遮罩
    PromptBox._init = function ()
    {
        var backDorpHtml = '<div class="promptBox-backdrop"></div>';

        PromptBox.$contentBox = $("body");
        PromptBox.$contentBox.append(backDorpHtml);
        PromptBox.$backdrop = PromptBox.$contentBox.children("div.promptBox-backdrop");
        PromptBox.isInit = true;

        var $doc = $(document);

        $doc.on("click", ".promptBox-btn-wrap", function (e)
        {
            var $promptBox = $(this).closest(".promptBox-wrap"),
                promptBox = $promptBox.data("promptBox"),
                $target = $(e.target);

            if ($target.attr("type") === "button")
            {
                var $btns = promptBox.$btnsWrap.find("input[type='button']");

                if ($btns.index(e.target) != -1)
                {
                    var btn = promptBox._currentConfig["btns"][$btns.index(e.target)];
                    if (typeof btn["click"] === "function")
                    {
                        btn["click"]($target);
                    }

                    if (typeof btn['autoClose'] === "boolean" && btn['autoClose'])
                    {
                        promptBox.hide();

                    }
                }
            }
        });

        // 隐藏
        $doc.on("click", ".promptBox-title-wrap", function (e)
        {
            var $promptBox = $(this).closest(".promptBox-wrap"),
                promptBox = $promptBox.data("promptBox");

            if ($(e.target).hasClass("close"))
            {
                promptBox.hide.call(promptBox);
            }
        });
    };

    PromptBox.visibleBoxTool = (function ()
    {
        var visibleBox = [], tool = {}, zIndex = 1050;

        tool.indexOf = function (promptBox)
        {
            for (var i = 0, len = visibleBox.length; i < len; i++)
            {
                if (promptBox === visibleBox[i])
                {
                    return i;
                }
            }

            return -1;
        };

        tool.insert = function (promptBox)
        {
            tool.del(promptBox);
            visibleBox.push(promptBox);
        }

        tool.del = function (promptBox)
        {
            var index = tool.indexOf(promptBox);

            index !== -1 && visibleBox.splice(index, 1);
        }

        tool.isEmpty = function ()
        {
            return visibleBox.length === 0;
        }

        tool.getLowerBox = function ()
        {
            return visibleBox.length > 0 ? visibleBox[visibleBox.length - 1] : null;
        }

        tool.hide = function (promptBox)
        {
            promptBox.$promptBox.hide();

            tool.del(promptBox);
            if (tool.isEmpty())
            {
                PromptBox.$backdrop.hide();
            }
            else
            {
                var box = tool.getLowerBox();
                if (box)
                {
                    PromptBox.$backdrop.css({ "z-index": (box.$promptBox.css("z-index") - 1) });
                }
            }

            if(promptBox._currentConfig["promptBoxClass"])
            {
                promptBox.$promptBox.removeClass(promptBox._currentConfig["promptBoxClass"]);
            }
        };

        tool.show = function (promptBox)
        {
            tool.insert(promptBox);
            zIndex = zIndex + 10;
            promptBox.$promptBox.css("z-index", zIndex);
            PromptBox.$backdrop.css({ "z-index": (zIndex - 1), "display": "block" });
            if(promptBox._currentConfig["promptBoxClass"])
            {
                promptBox.$promptBox.addClass(promptBox._currentConfig["promptBoxClass"]);
            }
            promptBox.$promptBox.show();
        };

        return tool;
    })(PromptBox);

    PromptBox.count = 0;

    PromptBox.prototype._init = function ()
    {
        this._isInit = true;
        // 构建html
        this._renderHtml();
        //this.$promptBox.css("z-index", this._zIndex);
        this._afreshRender();

        typeof this._currentConfig.complete === "function"
            && this._currentConfig.complete(this._currentConfig.$container, this);
    }

    PromptBox.prototype._renderHtml = function ()
    {
        var htmlTemplate = {
            promptBoxWrap: '<div id={$promptBoxID} class="promptBox-wrap"><div class="promptBox-message-wrap">{$titleWrap}{$messageWrap}{$btnWrap}'
                    + '</div></div>',
            titleWrap: '<div class="promptBox-title-wrap">'
                    + '<div class="promptBox-close-wrap"><button type="button" title="关闭" class="close"><span>×</span></button><div style="clear:both;"></div></div>'
                    + '<h4 class="promptBox-title"><a class="title-link" href="#"><span class="title-icon"></span></a></h4>'
                    + '</div>',
            messageWrap: '<div class="promptBox-message"></div>',
            btnWrap: '<div class="promptBox-btn-wrap"></div>'
        };

        PromptBox.$contentBox.append($(htmlTemplate["promptBoxWrap"].replace(/\{\$titleWrap\}/g, htmlTemplate["titleWrap"])
            .replace(/\{\$messageWrap\}/g, htmlTemplate["messageWrap"])
            .replace(/\{\$btnWrap\}/g, htmlTemplate["btnWrap"]).replace(/\{\$promptBoxID\}/g, this._promptBoxID)));

        this.$promptBox = $("#" + this._promptBoxID);
        this.$promptBox.data("promptBox", this);
        this.$messageWrap = this.$promptBox.children("div.promptBox-message-wrap");
        this.$titleWrap = this.$promptBox.find("div.promptBox-title-wrap");
        this.$title = this.$titleWrap.find("h4.promptBox-title");
        this.$message = this.$promptBox.find("div.promptBox-message");
        this._currentConfig.$container && this.$message.append(this._currentConfig.$container.show());
        this.$btnsWrap = this.$promptBox.find("div.promptBox-btn-wrap");
    }
    // 显示
    PromptBox.prototype.show = function (options)
    {
        if (!PromptBox.isInit)
        {
            PromptBox._init();
        }

        if (!this._isInit)
        {
            this._init();
        }

        //PromptBox.visibleBoxTool.insert(this);
        options && this._reset.apply(this, Array.prototype.slice.call(arguments, 0));

        typeof this._currentConfig.beforeShow === "function"
            && this._currentConfig.beforeShow(this._currentConfig.$container, this);

        //PromptBox.$backdrop.css({ "z-index": (this.$promptBox.css("z-index") - 1), "display": "block" });
        PromptBox.visibleBoxTool.show(this);
        //this.$promptBox.show();

        this.adjustPos();

        typeof this._currentConfig.onShow === "function"
            && this._currentConfig.onShow(this._currentConfig.$container, this);

        Jadann.$win.trigger("resize");
    }

    PromptBox.prototype.adjustPos = function () {
        var top = (Jadann.$win.height() - this.$messageWrap.height()) / 2;
       
        this.$messageWrap.css({ "margin-top": (top < 50 ? 50 : top) });
    };

    // 重新设置
    PromptBox.prototype._reset = function (options)
    {
        var promptBoxConfig, args= arguments;

        if (typeof options === "object")
        {
            if (!options["reset"] && utility.isArray(options["btns"]))
            {
                this._currentConfig["btns"] = [];
            }

            this._currentConfig = $.extend(true, $.extend(true, {}, (options["reset"] ? this._defaultConfig : this._currentConfig)), options);
        }
        else if (typeof options === "string")
        {
            promptBoxConfig = {};
            typeof args[0] === "string" ? promptBoxConfig["title"] = args[0] : "";
            typeof args[1] === "string" ? promptBoxConfig["message"] = args[1] : "";
            Object.prototype.toString.apply(args[2]) === '[object Array]' ? promptBoxConfig["btns"] = args[2] : "";
            typeof args[3] === "string" ? promptBoxConfig["size"] = args[3] : "";

            this._currentConfig = $.extend(true, $.extend(true, {}, this._defaultConfig), promptBoxConfig);
        }

        // 重新渲染：标题、按钮、内容
        this._afreshRender();
    }

    // 重新渲染：标题、按钮、内容
    PromptBox.prototype._afreshRender = function ()
    {
        var size = {
            "l": 650, // 650px
            "m": 450, // 450px
            "s": 320,// 320px
            "large": 650,
            "small": 320,
            "medium": 450,
        }, currentConfig = this._currentConfig;
        // 设置标题
        this.$title.html(currentConfig["title"]);
        // 设置提示信息
        !currentConfig.$container && this.$message.html(currentConfig["message"]);
        // 设置按钮
        this.$btnsWrap.html(this._generateBtnsHtml(currentConfig["btns"]));

        currentConfig["isShowTitle"] ? this.$titleWrap.show() : this.$titleWrap.hide();
        currentConfig["isShowBtn"] ? this.$btnsWrap.show() : this.$btnsWrap.hide();
        this.$messageWrap.css("width", size[currentConfig["size"]] ? size[currentConfig["size"]] : currentConfig["size"]);
    }

    PromptBox.prototype._generateBtnsHtml = function (btns)
    {
        var htmlTemplate = '<input type="button" class="btn btn-default mr10" data-index="{$index}" value="{$name}" />', btnsHtml = [];
        btns = btns;

        for (i = 0, len = btns.length; i < len; i++)
        {
            btnsHtml.push(htmlTemplate.replace(/\{\$name\}/g, btns[i]["name"]).replace(/\{\$index\}/g, i));
        }

        return btnsHtml.join("");
    }

    // 隐藏
    PromptBox.prototype.hide = function ()
    {
        PromptBox.visibleBoxTool.hide(this);
        //PromptBox.visibleBoxTool.del(this);
        //if (PromptBox.visibleBoxTool.isEmpty())
        //{
        //    PromptBox.$backdrop.hide();
        //}
        //else
        //{
        //    var box = PromptBox.visibleBoxTool.getLowerBox();
        //    if (box)
        //    {
        //        PromptBox.$backdrop.css({ "z-index": (box.$promptBox.css("z-index") - 1) });
        //    }
        //}

        typeof this._currentConfig.hideCallback === "function"
            && this._currentConfig.hideCallback(this._currentConfig.$container, this);
    }

    PromptBox.prototype.setTitle= function(title)
    {
        this.$title.html(title);
    }

    PromptBox.prototype.setBtnsOption = function (btnsOption) {
        if (!utility.isArray(btnsOption))
        {
            throw "弹出层设置按钮配置错误。";
        }

        this._currentConfig["btns"] = btnsOption || [];
    }

    /**
     * 共用的一个模板，隐藏后立马消失
     * @param title 提示框标题
     * @param message 提示信息
     * @param closeCallback 关闭提示框执行方法
     * 例如：    
     *  Jadann.Control.PromptBox.alert("温馨提示", "删除成功");
     */
    PromptBox.alert = function (title, message, closeCallback, width, promptBoxClass)
    {
        if (!PromptBox.commonBox)
        {
            PromptBox.commonBox = new PromptBox();
        }

        //var params = Array.prototype.slice.call(arguments, 0);

        //params[2] = [{ name: "关闭", click: function () { typeof closeCallback === "function" && closeCallback(); Jadann.Control.PromptBox.hide(); } }];

        var options = {
            title: title,
            message: message,
            btns: [{
                name: "关闭", click: function () {
                    typeof closeCallback === "function" && closeCallback();
                    PromptBox.commonBox.hide();
                }
            }]
        };

        width && (options["size"] = width);
        promptBoxClass && (options["promptBoxClass"]= promptBoxClass);
        // 重新设置信息
        PromptBox.commonBox.show.call(PromptBox.commonBox, options);
    };

    // 确认框
    /**
     * @param title  确认标题信息
     * @param message 确认信息
     * @param confirmCallback(hideFun) 确认后执行的方法，自带一个隐藏弹出层的方法，需隐藏时直接调用
     * 例如：
     * Jadann.Control.PromptBox.confirm("请确认操作", "确定删除该信息？删除后不可恢复。", function (boxHide) { alert("确认操作！"); boxHide();//隐藏确认层 });
     */
    PromptBox.confirm = function (title, message, confirmCallback, width, promptBoxClass)
    {
        if (!PromptBox.commonBox)
        {
            PromptBox.commonBox = new PromptBox();
        }

       /* var params = Array.prototype.slice.call(arguments, 0);

        params[2] = [
            { name: "确定", click: function ($btn) { typeof confirmCallback === "function" && confirmCallback(Jadann.Control.PromptBox.hide, $btn); } },
            { name: "取消", click: function () { Jadann.Control.PromptBox.hide(); } }
        ];*/
        var options = {
            title: title,
            message: message,
            btns: [{ name: "确定", click: function ($btn) { typeof confirmCallback === "function" && confirmCallback(function () { Jadann.Control.PromptBox.hide(); }, $btn); }  }, { name: "取消", autoClose: true }]

        };
        width && (options["size"] = width);
        promptBoxClass && (options["promptBoxClass"]= promptBoxClass);
        PromptBox.commonBox.show.call(PromptBox.commonBox, options);
    };

    // 等待框
    /**
     * @param message {string/boolean} 提示信息或者关闭窗口
     * @param intervalFun {function} 间隔调用方法
     */
    PromptBox.waiting = function (message, intervalFun) {
        if (!PromptBox.waitingBox) {
            PromptBox.waitingBox = new PromptBox({
                isShowBtn: false,
                isShowTitle: false,
            });
        }

        function msgInterval()
        {
            clearMsgTimer();

            PromptBox.msgTimer = window.setTimeout(function () {
                message = intervalFun(message);
                PromptBox.waitingBox.show({ message: message });
                msgInterval();
            }, 1000);
        }

        function clearMsgTimer(){
            if (PromptBox.msgTimer) {
                window.clearTimeout(PromptBox.msgTimer);
            }
        }


        if (utility.isFunction(intervalFun)) {
            msgInterval();
        }
        else {
            clearMsgTimer();
        }

        if(utility.isString(message))
        {
            PromptBox.waitingBox.show({ message: "<div class='text-center'>" + message + "</div>" });
        } else if (utility.isBoolean(message))
        {
            message ? PromptBox.waitingBox.show() : PromptBox.waitingBox.hide();
        }
    };

    // 弹出层隐藏
    PromptBox.hide = function ()
    {
        PromptBox.commonBox && PromptBox.commonBox.hide();
    };

    $.fn.promptBox = function (options)
    {
        if (typeof options === "string")
        {
            var args = arguments,
				method = options;

            Array.prototype.shift.call(args);

            return this.each(function ()
            {
                var pbox = $(this).data('promptBox');
                if (pbox && pbox[method])
                    pbox[method].apply(pbox, args);
            });
        }


        return this.each(function ()
        {
            var $this = $(this);

            options = options || {};
            options["$container"] = $this;

            $this.data("promptBox", new PromptBox(options));
        });
    };

    Jadann.expand("Control", { PromptBox: PromptBox });
})(Jadann);