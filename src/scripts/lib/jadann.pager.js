; (function (win, Jadann)
{
    var utility = Jadann.utility, bInit = false,
    // 绑定事件
    bindEvent = function () {
        var $doc = Jadann.$doc;

        function executeEvent(elem, fun) {
            var $elem = $(elem), $pager = $elem.closest(".Jadann-pager"), pager;

            var $pager = $elem.closest(".Jadann-pager");

            if ($pager.length === 0) {
                return;
            }

            pager = $pager.data("pager");
            if (!pager) {
                return;
            }

            if (utility.isFunction(fun)) {
                return fun(pager, $elem);
            }
        };

        $doc.on("click", ".Jadann-pager .pager-btn", function (event) {
            return executeEvent(this, function (pager, $this) {
                var turnPageIndex = null, className = $this.attr("class");

                if (className) {
                    // 不可用时直接返回
                    if (className.indexOf("disabled") != -1) {
                        event.preventDefault();
                        return;
                    }

                    className.indexOf("pager-first") != -1 && (turnPageIndex = 1);
                    className.indexOf("pager-prev") != -1 && (turnPageIndex = pager._getRequestIndex(pager.currentIndex - 1));
                    className.indexOf("pager-next") != -1 && (turnPageIndex = pager._getRequestIndex(pager.currentIndex + 1));
                    className.indexOf("pager-last") != -1 && (turnPageIndex = pager.pageCount);
                    className.indexOf("pager-page") != -1 && (turnPageIndex = parseInt($this.text(), 10));
                }

                turnPageIndex = turnPageIndex || pager.currentIndex;
                pager.turnPageIndex = turnPageIndex;
                pager.turnPage(turnPageIndex);
            });
        });

        // 页数改变
        $doc.on("change", ".Jadann-pager .pager-size", function () {
            return executeEvent(this, function (pager, $this) {
                pager._setConfig(pager.currentIndex, pager.total, parseInt($this.val(), 10));
                pager.turnPage(pager.currentIndex);
            });
        });

        // 输入页码
        $doc.on("blur", ".Jadann-pager .pager-current", function () {
            return executeEvent(this, function (pager, $this) {
                var val = parseInt($this.val(), 10);

                if (utility.isPositiveInt(val) && val >= 1 && val <= pager.pageCount) {
                    pager.turnPageIndex = val;
                    pager.turnPage.call(pager, val);
                } else {
                    $this.val(pager.currentIndex);
                }
            });
        });
    },
    // 获取分页种类：投后监控版分页、新版分页
    getTypeState = function (typeName, pager) {
        var type = {
            "thjk": thjkPager,
            "new": newPager
        };

        if (type[typeName]) {
            return new type[typeName](pager);
        }

        return new type["thjk"](pager);
    },
    generateOptions = function (pageSizeOptions) {
        var html = "";
        for (var i = 0, len = pageSizeOptions.length; i < len; i++) {
            html += '<option value="' + pageSizeOptions[i] + '">' + pageSizeOptions[i] + '</option>';
        }

        return html;
    }

    // 分页类型的基类：必须实现render方法
    function basePager() {

    }
    basePager.prototype = {
        render: function () {
            throw "分页渲染html未实现";
        }
    };

    // 投后监控的分页类型
    function thjkPager(pager){
        this.pager = pager;
        this.isInit = false;
    }
    thjkPager.prototype = new basePager();
    thjkPager.prototype.render = function () {
        if (!this.isInit) {
            this.isInit = true;
            this._init();
        }

        this.$pagerSize.val(this.pager.pageSize);
        this.$pagerStart.text(this.pager.total === 0 ? 0 : ((this.pager.currentIndex - 1) * this.pager.pageSize + 1));
        this.$pagerEnd.text(this.pager.pageCount === this.pager.currentIndex ? this.pager.total : this.pager.currentIndex * this.pager.pageSize);
        this.$pagerTotal.text(this.pager.total);
        this.$pagerPagecount.text(this.pager.pageCount);
        this.$pagerCurrrent.val(this.pager.currentIndex);

        (this.pager.total === 0 || this.pager.currentIndex === 1)
            ? (this.$pagerPrev.addClass("disabled") && this.$pagerFirst.addClass("disabled"))
            : (this.$pagerPrev.removeClass("disabled") && this.$pagerFirst.removeClass("disabled"));
        (this.pager.total === 0 || this.pager.pageCount === this.pager.currentIndex)
            ? (this.$pagerNext.addClass("disabled") && this.$pagerLast.addClass("disabled"))
            : (this.$pagerNext.removeClass("disabled") && this.$pagerLast.removeClass("disabled"));
    };
    thjkPager.prototype._init = function () {
        var that = this,
            html = ['<div class="float-left">',
                        '<a class="pager-btn pager-refresh"></a>',
                        '<span class="pager-start p5">1</span><span>-</span><span class="pager-end p5">20</span>',
                        '<span class="mr10">行</span><span class="p5">共</span><span class="pager-total">1</span>',
                    '</div><div class="float-right">',
                        '<a class="pager-btn pager-first"></a><a class="pager-btn pager-prev mr5"></a>',
                        '<input class="pager-current input" type="text" value="1" /><span class="p5">共</span>',
                        '<span class="pager-pagecount">1</span><span class="p5">页</span><a class="pager-btn pager-next">',
                        '<span>下一页</span></a><a class="pager-btn pager-last"><span>末页</span></a>',
                        '<select class="pager-size">',
                        generateOptions(that.pager.pageSizeOptions),
                        '</select>' +
                     '</div>'];


        this.pager.$container.append(html.join(""));
        this.$pagerStart = this.pager.$container.find(".pager-start");
        this.$pagerEnd = this.pager.$container.find(".pager-end");
        this.$pagerTotal = this.pager.$container.find(".pager-total");
        this.$pagerSize = this.pager.$container.find(".pager-size");
        this.$pagerPagecount = this.pager.$container.find(".pager-pagecount");
        this.$pagerCurrrent = this.pager.$container.find(".pager-current");
        this.$pagerPrev = this.pager.$container.find(".pager-prev");
        this.$pagerNext = this.pager.$container.find(".pager-next");
        this.$pagerFirst = this.pager.$container.find(".pager-first");
        this.$pagerLast = this.pager.$container.find(".pager-last");
    }


    // 新版分页类型
    function newPager(pager) {
        this.pager = pager;
        this.isInit = false;
    }
    newPager.prototype = new newPager();
    newPager.prototype.render = function () {
        if (!this.isInit) {
            this.isInit = true;
            this._init();
        }

        this.$pagerSize.val(this.pager.pageSize);
        this.$pagerPagecount.text(this.pager.pageCount);
        this.$pagerCurrrent.val(this.pager.currentIndex);

        this.$pagerBtnWrap.children().remove().end()
            .append(this.generatePagerBtns());

        (this.pager.total === 0 || this.pager.currentIndex === 1)
            ? this.$pagerPrev.addClass("disabled")
            : this.$pagerPrev.removeClass("disabled");
        (this.pager.total === 0 || this.pager.pageCount === this.pager.currentIndex)
            ? this.$pagerNext.addClass("disabled")
            : this.$pagerNext.removeClass("disabled");
    };
    newPager.prototype._init = function () {
        var that = this,
            html = ['<div class="float-right">',
                        '<span>每页显示<select class="pager-size">',
                        generateOptions(that.pager.pageSizeOptions),
                        '</select>条结果</span>',
                        '<span class="pager-btn-wrap">',
                            '<a href="javascript:void(0)" class="pager-btn pager-prev {$disable}" title="上一页"></a>',
                            '<a href="javascript:void(0)" class="pager-btn pager-next {$disable}" title="下一页"></a>',
                        '</span>',
                        '<span>',
                            '共<span class="pager-pagecount">0</span>页',
                            '<span style="margin:0 20px;">到第',
                                '<input class="pager-current input" type="text" value="1" />页',
                            '</span>',
                            '<button class="pager-refresh">确定</button>',
                        '</span>',
                    '</div>'];

        this.pager.$container.addClass("pager-partysu").append(html.join(""));
        this.$pagerSize = this.pager.$container.find(".pager-size");
        this.$pagerPagecount = this.pager.$container.find(".pager-pagecount");
        this.$pagerCurrrent = this.pager.$container.find(".pager-current");
        this.$pagerPrev = this.pager.$container.find(".pager-prev");
        this.$pagerNext = this.pager.$container.find(".pager-next");
        this.$pagerBtnWrap = this.pager.$container.find(".pager-btn-wrap");
    };
    newPager.prototype.generatePagerBtns = function () {
        var that = this, htmlTemplate = {
            prev: '<a href="javascript:void(0)" class="pager-btn pager-prev {$disable}" title="上一页"><</a>',
            next: '<a href="javascript:void(0)" class="pager-btn pager-next {$disable}" title="下一页">></a>',
            link: '<a href="javascript:void(0)" class="pager-btn pager-page {$currentPager}" >{$index}</a>',
            currentClass: 'pager-active',
            ellipsis: '<a href="javascript:void(0)" class="ellipsis-page">...</a>'
        }, pagerHtml = [],
           addPageFun = function (i) {
               pagerHtml.push(function (index) {
                   if (index > 0) {
                       return htmlTemplate["link"].replace(/\{\$currentPager\}/g,
                        ((that.pager.currentIndex === index) ? htmlTemplate["currentClass"] : ""))
                        .replace(/\{\$index\}/g, index);
                   }
                   else {
                       return htmlTemplate["ellipsis"]
                   }
               }(i));
           }, forEachPage = function (start, end, fun) {
               for (var i = start; i < (end + 1) ; i++) {
                   fun(i);
               }
           };

        // 前一页
        pagerHtml.push(htmlTemplate["prev"].replace(/\{\$disable\}/g, this.pager.currentIndex <= 1 ? "disabled" : ""));
        if (this.pager.pageCount !== 0) {
            // 小于显示页码
            if (this.pager.pageCount <= this.pager.showPageCount) {
                forEachPage(1, this.pager.pageCount, addPageFun);
            }
            else {
                // 第一页
                addPageFun(1);

                // 当前页在前this.showPageCount-3
                if (this.pager.currentIndex <= this.pager.showPageCount - 3) {
                    forEachPage(2, this.pager.showPageCount - 1, addPageFun);

                    // 加省略符
                    addPageFun();
                }
                    // 当前页在后this.showPageCount-3
                else if (this.pager.currentIndex >= this.pager.pageCount - (this.pager.showPageCount - 5)) {
                    // 加省略符
                    addPageFun();

                    forEachPage(this.pager.pageCount - (this.pager.showPageCount - 3), this.pager.pageCount, addPageFun);
                }
                else {
                    // 头尾加省略号
                    addPageFun();

                    forEachPage(this.pager.currentIndex - Math.floor((this.pager.showPageCount - 4) / 2),
                        this.pager.currentIndex + Math.ceil((this.pager.showPageCount - 4) / 2), addPageFun);

                    addPageFun();
                }
            }
        }

        // 下一页
        pagerHtml.push(htmlTemplate["next"].replace(/\{\$disable\}/g, this.pager.currentIndex >= this.pager.pageCount ? "disabled" : ""));

        return pagerHtml.join("");
    };

    /** 分页控件
     *  作者：张敏强
     *  日期：2015-06-7
     *  @param options  {object} 初始化参数配置，属性如下
     * {
     *      @param $container  {jquery} 树容器
     *      @param total       {int} 数据条数
     *      @param pageSize    {int} 每页数据条数
     *      @param currentIndex {int} 当前页码
     *      @param showPageCount {int} 显示的页码按钮数，不包含上一页、下一页，默认且最小为7
     *      @param callback(@pageIndex, @fun(@pageIndex, @total, @pageSize)) {fun} 点击链接触发事件，
     *                              // @pageIndex为要跳转的页码, @total当前数据条数，@pageSize当前每页条数
     * }
     * // 状态模式： 变化点：分页渲染、刷新
     **/
    function pager(options)
    {
        options = options || {};

        this.$container = options.$container;
        if (!this.$container || this.$container.length === 0)
        {
            return;
        }

        this.$container.addClass("Jadann-pager clearfix");
        this.pageSizeOptions = options.pageSizeOptions || [10, 50, 100];
        // 显示的页码按钮数，不包含上一页、下一页
        this.showPageCount = options.showPageCount && options.showPageCount > 6 ? options.showPageCount : 6;
        this._setConfig((options.currentIndex || 1),
            (options.total || 0), options.pageSize || 10);
        // 点击事件
        this.callback = options.callback;
        this.$container.data("pager", this);
        this.currTypeState = getTypeState(options.type, this);
        this._init();
    }

    // 设置基本配置
    pager.prototype._setConfig = function (currentIndex, total, pageSize) {
        // 数据总数
        this.total = total <= 0 ? 0 : (total || this.total);
        // 每页条数
        this.pageSize = pageSize || this.pageSize || 10;
        this.turnPageIndex = 1;
        this._setPageCount();

        // 当前页码
        this._setCurrentIndex(currentIndex);
    }
    // 设置页码数
    pager.prototype._setPageCount = function () {
        this.pageCount = this.total === 0 ? 0 : Math.ceil(this.total / this.pageSize);
    }

    // 初始化
    pager.prototype._init = function ()
    {
        this.currTypeState.render();
        if (!bInit)
        {
            bInit = true;
            bindEvent();
        }
    }

    // 设置页码
    pager.prototype._setCurrentIndex = function (index) {
        this.currentIndex = index <= 0 ? 1 : (
            this.pageCount <= index ? this.pageCount : index);
    }

    // 请求的页码
    pager.prototype._getRequestIndex = function(index){
        return (index <=0 ? 1 : ( this.pageCount <= index ? this.pageCount : index));
    }

    // 页码调整:index将要跳转的页码
    pager.prototype.turnPage = function (index) {
        var _this = this;

        if (typeof this.callback === "function")
        {
            this.callback.call(this, index, function (index, total, pageSize) {
                _this.reLoad.call(_this, index, total, pageSize);
            });
        }
        else {
            this.reLoad(index, this.total, this.pageSize);
        }
    }

    // 重新
    pager.prototype.reLoad = function (index, total, pageSize) {
        this._setConfig(index, total, pageSize);
        this.currTypeState.render();
    }

    Jadann.expand("Control", { "Pager": pager });
})(window, Jadann);