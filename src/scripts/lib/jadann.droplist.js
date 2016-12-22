; (function (win, $, Jadann) {
    var utility = win.Jadann.utility, db = Jadann.DB;
    // 当前显示的droplist
    // 考虑异步加载
    /**
     * 1.考虑异步加载
     * 2.选择改变事件
     * 3.选中值
     * 4.缓存
     * @param $container    {jQuery} 
     */
    function droplist($container) {
        this.$container = $container;

        if (!this.$container || !this.$container.length) {
            return;
        }

        this._async = (this.$container.attr("kd-async") || "N") === "Y";
        this._loaded = this._async ? false : true;
        this._url = this.$container.attr("kd-url");

        this._valueField = this.$container.attr("kd-valuefield") || "Value";
        this._textField = this.$container.attr("kd-textfield") || "Text";
        this._selectedData = null;
        this._disabled = false;
        this.value = this.$container.attr("kd-value");
        this.text = this.$container.attr("kd-text");
        this._onchange = this.$container.attr("kd-change");
        this._linkage = this.$container.attr("kd-linkage");
        this._fromlinkage = this.$container.attr("kd-fromlinkage");
        // 必填时，当仅有一项则默认选中它
        this._required = this.$container.attr("kd-required") === "Y" ? true : false;
        var defaultOpt = this.$container.attr("kd-defaultopt");
        if (defaultOpt) {
            this._defaultOpt = {};
            this._defaultOpt[this._valueField] = defaultOpt.split("|")[0];
            this._defaultOpt[this._textField] = defaultOpt.split("|")[1];
        }


        this._isInit = false;

        if (!this._isInit) {
            this._isInit = true;

            this._init();
        }
    }

    droplist.isInit = false;
    droplist.instance = null;
    droplist.bindEvent = function () {
        var $doc = $(document);

        $doc.on("click", ".Jadann-droplist", function () {
            var droplist = $(this).data("droplist")

            if (droplist && !droplist.disabled()) {
                droplist._show();
            }

            return false;
        });

        // 选中事件
        $doc.on("click", ".Jadann-droplist>ul>li", function () {
            var $this = $(this),
                val = $this.attr("kd-value"),
                droplist = $this.parent().parent().data("droplist"),
                oldVal = droplist.value;

            if (!droplist) {
                return;
            }

            droplist._setSelectOption("", $this);
            droplist._hide();
            if (val !== oldVal) {
                droplist.$container.trigger("droplistChange");
            }

            if (val && droplist.$container.children(".select-value").hasClass("prompt-warn")) {
                droplist.$container.children(".select-value").removeClass("prompt-warn").poshytip('disable');
            }


            return false;
        });

        // 单击空白弹出层消失
        $doc.on("click", function (event) {
            if (droplist.instance) {
                droplist.instance._hide();
            }
        });

        //$(".Jadann-droplist").droplist();
    };
    droplist.factory = function ($elem) {
        return new droplist($elem);
    }

    droplist.prototype = {
        _init: function () {
            var that = this;
            this.$selectValue = this.$container.children(".select-value");

            this.$container.on("droplistChange", function () {
                if (typeof that._onchange === "function") {
                    that._onchange(that.value, that.text);
                }


                that.triggerLinkage();
            });

            // 所属联动不获取值，等上级下拉设置值后再触发取值
            if (this._fromlinkage) {
                return;
            }

            if (this._async) {
                this._loadDataList(null, function () {
                    that.triggerLinkage();
                });
            }
            else {
                this._setSelectOption();
            }
        },
        _loadDataList: function (param, callback) {
            var that = this, otherParam;
            param = param || {};
            if (this._fromlinkage) {
                if (this.$container.attr("kd-paramfield")) {
                    param[this.$container.attr("kd-paramfield")] = $("#" + this._fromlinkage).attr("kd-value");
                    if (!param[this.$container.attr("kd-paramfield")]) {
                        this._loadCallback({});
                        return;
                    }
                }
                else {
                    param["code"] = $("#" + this._fromlinkage).attr("kd-value");

                    if (!param["code"]) {
                        this._loadCallback({});
                        return;
                    }
                }

                // 传其他参数
                otherParam = this.$container.attr("kd-param");
                if (otherParam) {
                    otherParam = otherParam.split("=");
                    param[otherParam[0]] = otherParam[1];
                }
            }

            utility.ajax((db.g(this._url) || this._url), param, function (data, status) {
                // 返回400
                if (!utility.verifyLogining(data)) {
                    return;
                }

                //if (data["code"] === 200)
                //{
                that._loadCallback(data, callback);
                //}
                //else
                //{
                //    that.$container.children("ul").remove();
                //    //that.$container.addClass("disabled");
                //    //throw new Error("ID为" + that.$container.attr("id") + "的droplist控件获取数据源失败");
                //}
            }, "json", "GET");
        },
        _loadCallback: function (data, callback) {
            data = data["data"] || [];
            this._loaded = true;
            if (utility.isArray(data)) {
                //that.$container.removeClass("disabled");
                this._defaultOpt && data.unshift(this._defaultOpt);
                this.dataSource = data;
                this.$container.children("ul").remove();
                this._renderDataList();

                if (typeof callback === "function") {
                    callback();
                }
            }
        },
        _renderDataList: function () {
            var liHtml = '<li kd-value="{$value}" title="{$text}"><div>{$text}</div></li>',
                lis = [];

            if (this.dataSource && this.dataSource.length > 0) {
                for (var i = 0, len = this.dataSource.length; i < len; i++) {
                    if (i === 0 && (!this.dataSource[i].hasOwnProperty(this._valueField) ||
                            !this.dataSource[i].hasOwnProperty(this._textField))) {
                        throw (this.$container.attr("id") + "加载数据源无" + this._valueField
                            + "或" + this._textField + "属性");
                    }

                    lis.push(liHtml.replace("{$value}", this.dataSource[i][this._valueField])
                            .replace(/\{\$text\}/g, this.dataSource[i][this._textField]));
                }

                this.$container.append($('<ul class="data-list">' + lis.join("") + '<ul>'));
                // 必填且选项唯一，默认选中它
                if (this._required && this._defaultOpt && len === 2) {
                    this.value = this.dataSource[1][this._valueField];
                }

                this._setSelectOption();
            }
        },
        _setSelectOption: function (value, $selectLi) {
            if (!this._loaded) {
                return;
            }

            value = arguments.length === 0 ? this.value : value;

            $selectLi = $selectLi || this.$container.children("ul").children("li[kd-value='" + value + "']");

            if ($selectLi.length === 0) {
                $selectLi = this.$container.children("ul").children("li:first");
            }

            // 去除选中项样式
            if (this.$selectOptons) {
                this.$selectOptons.removeClass("droplist-select");
            }

            this.value = $selectLi.attr("kd-value");
            this.text = $selectLi.text();

            this.$container.attr("kd-value", this.value)
                .attr("kd-text", this.text);
            this.$selectValue.val(this.text);

            this.$selectOptons = $selectLi.addClass("droplist-select");
        },
        _hide: function () {
            droplist.instance = null;
            this.$container.children("ul").stop().slideUp(100);
        },
        _show: function () {
            if (droplist.instance) {
                droplist.instance._hide();
            }

            this.$container.children("ul").stop().slideDown(100);
            droplist.instance = this;
        },
        setValue: function (val) {
            this.value = val;
            this.$container.attr("kd-value", val);
            this._setSelectOption();
            this.triggerLinkage();
        },
        getValue: function () {
            return this.$container.attr("kd-value");
        },
        triggerLinkage: function () {
            if (this._linkage) {
                var list = $("#" + this._linkage).data("droplist");

                if (list) {
                    list._loaded = false;
                    list._loadDataList();
                }
            }
        },
        disabled: function (disabled) {
            if (utility.isBoolean(disabled)) {
                this._disabled = disabled;

                if (this._disabled) {
                    this.$container.addClass("disabled")
                        .children(".select-value").prop("disabled", true);
                }
                else {
                    this.$container.removeClass("disabled")
                        .children(".select-value").prop("disabled", false);
                }

                return;
            }

            return this._disabled;
        }
    };

    $.fn.droplist = function (options) {
        if (typeof options === "string") {
            var args = Array.prototype.slice.call(arguments, 0),
				method = options;

            Array.prototype.shift.call(args);

            return this.each(function () {
                var dl = $(this).data('droplist');
                if (dl && dl[method])
                    dl[method].apply(dl, args);
            });
        }


        return this.each(function () {
            var $this = $(this);

            var dl = $this.data("droplist");

            if (!dl) {
                $this.data("droplist", droplist.factory($this));
            }
        });
    };

    droplist.bindEvent();
})(window, jQuery, Jadann);