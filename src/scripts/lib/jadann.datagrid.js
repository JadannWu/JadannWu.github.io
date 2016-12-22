; (function ($, win, Jadann)
{
    var layout = {
        "pixel": 0,
        "percent": 1
    }, utility = win.Jadann.utility, scm = win.Jadann.scm;

    /*
    * 表格
    * 作者：张敏强
    * 日期：2016-01-12
    * @param options                 {object} 表格容器对象，相关配置属性如下：
    *       @attribute headvisible       {boolean} 是否显示表头，默认显示；
    *       @attribute cssClass        {string} 指定表格样式；
    *       @attribute sizeUnit          {"pixel"/"percent"} 表格尺寸，默认为“pixel”，宽度按像素统计；若为percent，则指定所有列宽度之和为100
    *       @attribute isTree            {boolean} 默认为普通表格；
    *       @attribute idField           {string} 指定行ID的字段名称
    *       @attribute parentIDField     {string} 树形父级ID
    *       @attribute rootValue          {string} 根值
    *       @attibute expandLevel           {number} 展开层级，默认0，全部展开
    *       @attribute pagination        {boolean} 是否显示分页，默认为false
    *       @attribute pageSize          {number} 指定页数，默认为10
    *       @attribute showPrefixLevel    {number} 第几层级显示层级前缀图标，默认为0
    *       @attribute columns           {Array} 指定列信息
    *           [{
    *               "ColumnID":         {string} 指定列字段名称
    *               "Caption":          {string} 列名称
    *               "DefaultCellType":  {string} 默认的列类型，span
    *               "Width":            {number} 宽度
    *               "Format":           {function} 列格式化函数，自定义可用
    *               "CellFormat":      {function} 单元格格式化，可扩展跨行.fun(val, columnID, rowData, treeRow, parentTreeRow)
    *               "HeaderFormat":     {function} 表格头格式化函数，自定义可用。fun(@Caption, @Column), @Caption列标题，@Column列信息
    *               "Align":            {string} 对齐方式
    *               "Fixed"            {boolean} 是否滚定列
    *               "MainField"          {boolean} 树形时指定的层级关系列、指标主列
    *               "Sortable"          {boolean} 是否可排序
    *               "Checkbox"          {boolean} 列头是否显示checkbox
    *              
    *              
    *               Childrens:           {array} 子列
    *           }]
    *       @attribute url               {string} 异步获取数据的url
    *       @attribute postType          {string} 请求数据类型 POST/GET
    *       @attribute getLoadParam      {fun} 返回一个参数对象，取数据时调用
    *       @attribute debug              {boolean} 本地调试模式
    *       @attribute checkbox         {boolean} 是否显示行的checkbox
    *       @attribute loadComplete     {function} 加载完成后的事件
    *       @attribute dataLoadComplete {function} 数据加载完成之后立即执行的函数，fun(@data)@data为异步获取的数据，可对数据进行梳理；
    *       @attribute onCellClick      {function} 单元格单击事件
    *       @attribute onRowClik        {function} 行点击事件
    *       @attribute onCellDbClick    {function} 单元格双击事件
    *       @attribute onRowDbClick     {function} 单元格双击事件
    *       @attribute sortField        {string} 指定排序字段名称
    *       @attribute sortOrder        {string} 排序顺序，"Desc/Asc" 
    *       @attribute $scrollContainer {string} 滚动容器，默认为window，若表格显示在存在滚动条的容器时需指定   
    *       @attribute headerFixedTop   {number} 表头固定top位置
    * */
    function dataGrid(options)
    {
        options = options || {};

        this.$container = options.$container;

        if (!this.$container || this.$container.length === 0)
        {
            return;
        }

        this._headerVisible = typeof options.headVisible === "boolean" ? options.headVisible : true;
        this._cssClass = options.cssClass || "";
        this._sizeUnit = layout[options.sizeUnit] || layout["pixel"];
        this._isTree = options.isTree || false;
        this._bPagination = options.pagination || false;
        this._pager = null;
        this._pagesize = options.pageSize || 10;
        this._dataSource = options.dataSource || [];
        this._columnsDD = {};
        this._isInitComplete = false;
        this._isDebug = options.debug || false;
        this._checkbox = options.checkbox || false;
        this._loadComplete = options.loadComplete;
        this._dataLoadComplete = options.dataLoadComplete;
        this._getLoadParam = options.getLoadParam;
        this._columns = options.columns || [];
        this._mainField = null;
        this.$win = $(win);
        this._idField = options.idField || "ID";
        this._onCellClick = options.onCellClick;
        this._onRowClick = options.onRowClick;
        this._onCellDbClick = options.onCellDbClick;
        this._onRowDbClick = options.onRowDbClick;
        this._onCheckRow = options.onCheckRow;
        this._onCheckColumn = options.onCheckColumn;
        this._onRowMouseover = options.onRowMouseover;
        this._onRowMouseout = options.onRowMouseout;
        this._url = options.url;
        this._sortField = options.sortField;
        this._sortOrder = options.sortOrder;
        this.$scrollContainer = options.$scrollContainer;
        this._postType = options.postType || "POST";
        this._showPrefixLevel = options.showPrefixLevel || 0;
        this._scrollSpeed = options.scrollSpeed || 3;
        this._idDD = {};
        this.bAjaxParamStringify = options.bAjaxParamStringify || false;
        this.$container.data("dataGrid", this);
        this._headerFixedTop = options.headerFixedTop || 0;

        if (this._isTree)
        {

            this._parentIDField = options.parentIDField || "ParentID";
            this._rootValue = options.rootValue;
            this._tree = [];
            this._childrenDD = {};
            this._treeDD = {};
            this._expandLevel = parseInt((options.expandLevel || 0), 10);
        }

        this._init();
    }

    dataGrid.isInit = false;

    dataGrid._init = function ($win, $doc) {
        var $doc = Jadann.$doc;
        dataGrid.isInit = true;

        function getInstance($JadannTable) {
            return $JadannTable.children(".Jadann-datagrid").data("dataGrid");
        }

        // 显示滚动条
        $doc.on("mouseover", ".Jadann-table", function () {
            var $this = $(this),
                inst = getInstance($this);

            inst && inst._showSideScrollBtn($this);
        });
        // 延迟隐藏滚动条
        $doc.on("mouseout", ".Jadann-table", function () {
            var $this = $(this),
                inst = getInstance($this);

            inst && inst._delayHideSideScrollBtn($this);
        });

        // 取消延迟隐藏
        $doc.on("mouseover", ".Jadann-table>a", function () {
            var $this = $(this),
                inst = getInstance($this.parent());

            if (inst) {
                inst._clearHssTimer();
                inst._triggerAutoScroll($this.hasClass("btn-scroll-left"));
            }
        });

        // 延迟隐藏滚动条
        $doc.on("mouseout", ".Jadann-table>a", function () {
            var $JadannTable = $(this).parent(),
                inst = getInstance($JadannTable);

            if (inst) {
                inst._delayHideSideScrollBtn($JadannTable);
                inst.cancelAutoScroll();
            }
        });
    };

    dataGrid.prototype = {
        _init: function ()
        {
            var that = this;
            this._initHeader();
            this._initPager();
            this._loadDataSource();
            this._bindEvent();

            if (!dataGrid.isInit)
            {
                dataGrid._init();
            }
        },
        /**
         * columns:列信息，异步加载同时返回表头信息，重新渲染表头
         */
        _initHeader: function (columns)
        {
            if (columns)
            {
                this._columns = columns;
                this.$container.children().remove();
            }
            this._teaseHeaderColumns();
            this._generateHeader();

            if (columns)
            {
                this._initPager();
            }
        },
        _loadDataSource: function ()
        {
            var that = this;

            if (this._isDebug)
            {
                that._reset();
                that._initHeader(this._columns);
                that._initCallback(this._dataSource);
                
                this._bPagination && that._pager.reLoad(that._pager.pageIndex || 1, this._dataSource.length, that._pager.pageSize || 10);

                this._bPagination && ((!this._columns || this._columns.length === 0) ? that._pager.$container.hide() : that._pager.$container.show());
            }
            else
            {
                this.reSetLoadParam();

                //utility.ajax(this._url, this.laodParam, function (data)
                //{
                //    // 返回400
                //    if (!utility.verifyLogining(data))
                //    {
                //        return;
                //    }

                //    if (data && data["code"] === 200 || data["code"] === 1000)
                //    {
                //        data = data["data"] || [];
                //        that._reset();
                //        typeof that._dataLoadComplete === "function" && that._dataLoadComplete(data);
                //        data.columns && that._initHeader(data.columns);
                //        that._initCallback((utility.isArray(data) ? data : data["results"]) || []);

                //        if (that._bPagination)
                //        {
                //            // 没有数据分页控件隐藏
                //            data.columns && (data.columns.length === 0 ? that._pager.$container.hide() : that._pager.$container.show());
                //            that._pager.reLoad((data["offset"] || 0), (data["totalRecord"] || 0), (data["limit"] || 0));
                //            data.results && data.results.length === 0 ? that._pager.$container.hide() : that._pager.$container.show();
                //        }

                //        typeof that._loadComplete === "function" && that._loadComplete(data);
                //    }
                //}, "json", this._postType);

                utility.post(this._url, this.bAjaxParamStringify ? JSON2.stringify(this.loadParam) : this.loadParam,
                    function (success, msg, data) {
                        if (success) {
                            data = data || [];
                            that._reset();
                            typeof that._dataLoadComplete === "function" && that._dataLoadComplete(data);
                            data.columns && that._initHeader(data.columns);
                            that._initCallback((utility.isArray(data) ? data : data["results"]) || []);

                            if (that._bPagination) {
                                // 没有数据分页控件隐藏
                                data.columns && (data.columns.length === 0 ? that._pager.$container.hide() : that._pager.$container.show());
                                that._pager.reLoad((data["offset"] || 0), (data["totalRecord"] || 0), (data["limit"] || 0));
                                data.results && data.results.length === 0 ? that._pager.$container.hide() : that._pager.$container.show();
                            }

                            typeof that._loadComplete === "function" && that._loadComplete(data);
                        }
                        else {
                            throw new Error("初始化列表失败：" + msg);
                        }
                    }, this.bAjaxParamStringify, this._postType);
            }
        },
        reSetLoadParam: function ()
        {
            var param = {};
            this._pager && (param.offset = this._pager.turnPageIndex || 1);
            this._pager && (param.limit = this._pager.pageSize || 20);
            this._sortField && (param.sortField = this._sortField);
            this._sortOrder && (param.sortOrder = this._sortOrder);

            if (typeof this._getLoadParam === "function")
            {
                $.extend(true, param, (this._getLoadParam() || {}));
            }


            this.loadParam = param;
        },
        _bindEvent: function ()
        {
            var $doc = Jadann.$doc, that = this,
                $win = this.$win,
                $scrollElem = this.$scrollContainer || $win;

            // 收缩子集
            this.$container.on("click", ".row-collapse", function ()
            {
                var fieldID = $(this).closest("tr").attr("id"),
                    treeRow = that._treeDD[fieldID],
                    btnType = {
                        lastChildRoww: "row-expand row-last-child",
                        lastChildRowCollapse: "row-collapse row-last-child-collapse",
                        brosChildRow: "row-expand row-bros-child",
                        brosChildRowCollapse: "row-collapse row-bros-child-collapse"
                    };

                // 切换样式
                $(this).removeClass(treeRow.isLastChildren ? btnType["lastChildRowCollapse"] : btnType["brosChildRowCollapse"])
                    .addClass(treeRow.isLastChildren ? btnType["lastChildRow"] : btnType["brosChildRow"]);

                // 隐藏子集
                that._hideChildrenRow.call(that, treeRow);

                return false;
            });

            // 显示子集
            this.$container.on("click", ".row-expand", function ()
            {
                var fieldID = $(this).closest("tr").attr("id"),
                    treeRow = that._treeDD[fieldID],
                    $this = $(this),
                    callBack = function ()
                    {
                        if (treeRow.children && this.$container.find("#" + treeRow.children[0]["id"]).length === 0)
                        {
                            this._renderChildrenRow(treeRow);
                        }
                        else
                        {
                            this._showChildrenRow(treeRow, false);
                        }

                        this._setRowCollapsePrefix(treeRow, $this);
                    };

                // 扩展：考虑异步加载子集
                if (typeof that._onExpand === "function")
                {
                    that._onExpand.call(that, fieldID, treeRow, function ()
                    {
                        callBack.call(that);
                    });
                }
                else
                {
                    callBack.call(that);
                }

                return false;
            });

            // 显示新增按钮，考虑行高亮样式、选中样式
            this.$container.on("mouseover", ".table-show>tbody>tr", function ()
            {
                var $this = $(this), id = $this.attr("id");

                that.$fixColumn.find("#" + id).addClass("mouse-active");
                that.$tableBody.find("#" + id).addClass("mouse-active");

                if (utility.isFunction(that._onRowMouseover)) {
                    that._onRowMouseover($this, id);
                }
            });

            // 隐藏新增按钮
            this.$container.on("mouseout", ".table-show>tbody>tr", function ()
            {
                var $this = $(this), id = $this.attr("id");

                that.$fixColumn.find("#" + id).removeClass("mouse-active");
                that.$tableBody.find("#" + id).removeClass("mouse-active");

                if (utility.isFunction(that._onRowMouseout)) {
                    that._onRowMouseout($this, id, that);
                }
            });

            // 行单击、双击事件
            this.$container.on("click dbclick", ".table-show>tbody>tr", function (e)
            {
                var $this = $(this),
                        rowID = $this.attr("id"),
                        rowData = that._getRowData(rowID),
                            $checkbox;

                switch (e.type)
                {
                    case "click":
                        if(that._checkbox)
                        {
                            $checkbox = $this.find("td:first :checkbox");
                            // 事件源非checkbox本身需要事件
                            $checkbox[0] !== e.target && $checkbox.prop("checked", !$checkbox.prop("checked"));
                            $checkbox[0] !== e.target && that._triggerCheckRow($checkbox);
                        }
                        typeof that._onRowClick === "function" && that._onRowClick(rowID, rowData, $this, e);
                        break;
                    case "dbclick":
                        typeof that._onRowDbClick === "function" && that._onRowDbClick(rowId, rowData, $this, e);
                        break;
                }
            });

            // 单元格单击事件
            this.$container.on("click dbclick", ".table-show>tbody>tr>td", function (e)
            {
                var $this = $(this),
                    rowID = $this.parent().attr("id"),
                    column = $this.attr("column"),
                    rowData = that._getRowData(rowID);

                if (!column)
                {
                    return;
                }

                switch (e.type)
                {
                    case "click":
                        typeof that._onCellClick === "function" && that._onCellClick(rowData[column] || "", column, rowData);
                        break;
                    case "dbclick":
                        typeof that._onCellDbClick === "function" && that._onCellDbClick(rowData[column] || "", column, rowData);
                        break;
                }
            });

            // 单元格title提示
            this.$container.on("mouseover", ".table-show>tbody>tr>td", function ()
            {
                var $this = $(this), title = $this.attr("title");

                if (!title)
                {
                    $this.attr('title', $this.text());
                }
            });

            // 排序
            this.$container.on("click", ".table-show>thead>tr>.column-sortable", function ()
            {
                var $this = $(this), $sortElem = $this.find(".sort-desc,.sort-asc"),
                    sortField = $this.attr("data-columnid"), sortOrder;

                if ($sortElem.length === 0)
                {
                    that.$container.find("th.column-sortable .sort-asc, th.column-sortable .sort-desc").remove();
                    $this.children("div").append('<span class="sort-asc"></span>');
                    sortOrder = "ASC";
                }
                else
                {
                    if ($sortElem.hasClass("sort-desc"))
                    {
                        sortOrder = "ASC";
                        $sortElem.removeClass("sort-desc").addClass("sort-asc");
                    }
                    else
                    {
                        sortOrder = "DESC";
                        $sortElem.removeClass("sort-asc").addClass("sort-desc")
                    }
                }

                that._sortField = sortField;
                that._sortOrder = sortField;
                that._loadDataSource();
            });

            // 滚动条事件
            this.enableScroll = false;
            this.$container.on("mousedown", ".scroll-btn", function (event)
            {
                that.enableScroll = true;
                that.$scrollBar.data({ "start": event.pageX, "left": parseInt(that.$scrollBar.css("left"), 10) });
                return false;
            });
            // 禁止事件冒泡
            this.$container.on("click", ".right-corner,.scroll-btn", function ()
            {
                return false;
            });
            this.$container.on("click", ".scroll-bar-wrap", function (event)
            {
                var left = parseInt(that.$scrollBar.css("left"), 10) - that.$scrollBar.width();
                that.$scrollBar.data({ "start": that.$scrollBar.offset().left, "left": left });
                that._scrollTableBody(event.pageX);
                return false;
            });

            // 全选
            this.$container.on("click", ".checkAll", function ()
            {
                var $this = $(this);

                that.$container.find("tbody input.checkbox").prop("checked", $this.prop("checked"));
            });

            // 选中行事件
            this.$container.on("click", ".checkbox", function ()
            {
                that._triggerCheckRow($(this));
            });

            // 选中列事件
            this.$container.on("click", ".column-checkbox", function ()
            {
                var columnID, $this;

                if (typeof that._onCheckColumn === "function")
                {
                    $this = $(this);
                    columnID = $this.closest("th").attr("data-columnid");

                    that._onCheckColumn(columnID, $this.prop("checked"));
                }
            });

            $doc.on("mousemove", function (event)
            {
                var _that = that;
                if (that.enableScroll)
                {
                    if (!that._barSrcollTimer)
                    {
                        that._barSrcollTimer = win.setTimeout(function ()
                        {
                            _that._scrollTableBody(event.pageX);
                            that._barSrcollTimer = null;
                        }, 100);
                    }
                    return false;
                }
            }).on("mouseup", function ()
            {
                that.enableScroll = false;
            });

            $scrollElem.on("scroll", function ()
            {
                var _that = that,
                    height = _that.$container.height(),
                    headerFixedTop = _that._headerFixedTop,
                    top = that.$scrollContainer ? _that.$container.position().top : _that.$container.offset().top,
                    scrollTop = that.$scrollContainer ? that.$scrollContainer.scrollTop() : $doc.scrollTop();

                if (!that._scrollTimer)
                {
                    _that._scrollTimer = win.setTimeout(function ()
                    {
                        _that._scrollTimer = null;
                        if (_that.isOverflow)
                        {
                            _that._adjustScrollBarPos();
                        }
                    }, 100);
                }

                if (that.$scrollContainer && top > headerFixedTop)
                {
                    _that.$container.children(".fixed-header, .top-header").css("top", 0);
                    return;
                }
                else if (!that.$scrollContainer && top > scrollTop + headerFixedTop || top + height < scrollTop)
                {
                    _that.$container.children(".fixed-header, .top-header").css("top", 0);
                    return;
                }

                _that.$container.children(".fixed-header, .top-header").css("top", that.$scrollContainer ? (Math.abs(top) + headerFixedTop) : (scrollTop + headerFixedTop - Math.abs(top)));
            });

            $win.resize(function ()
            {
                that._resetOverflow();
            });
        },
        _bindSideScroll: function () {
            var that = this;
            // 显示滚动条
            this.$JadannTable.on("mouseover", function () {
                that._showSideScrollBtn();

                return false;
            });
            // 延迟隐藏滚动条
            this.$JadannTable.on("mouseout", function () {
                that._delayHideSideScrollBtn();

                return false;
            });

            // 取消延迟隐藏
            this.$JadannTable.on("mouseover", ">a", function () {
                var $this = $(this);
                that._clearHssTimer();
                that._triggerAutoScroll($this.hasClass("btn-scroll-left"));

                return false;
            });

            // 延迟隐藏滚动条
            this.$JadannTable.on("mouseout", ">a", function () {
                that._delayHideSideScrollBtn();
                that.cancelAutoScroll();

                return false;
            });
        },
        reload: function ()
        {
            this._loadDataSource();
        },
        _reset: function ()
        {
            this._idDD = {};

            if (this._isTree)
            {
                this._tree = [];
                this._treeDD = {};
                this._childrenDD = {};
            }

            this.$container.find("table>tbody>tr").remove();
        },
        _initCallback: function (data)
        {
            this._dataSource = data;
            this._teaseDataSource();
            this._sort();
            this._buildTreeCollection();
            this._generateRowsHtml();
            this._resetOverflow();
            this._initComplete();
        },
        _initPager: function (pager)
        {
            var options = {}, that = this,
                pager = pager || {};

            if (this._bPagination)
            {
                options.$container = this.$container.find(".Jadann-pager");
                options.currentIndex = pager["pageIndex"] || 1;
                options.total = pager["total"] || 0;
                options.pageSize = that._pagesize || 10;
                options.type = "new";
                options.$container.addClass("mt5");
                options.callback = function ()
                {
                    that._loadDataSource();
                }

                this._pager = new Jadann.Control.Pager(options);
            }
        },
        _initComplete: function ()
        {
            // 仅有一个固定列
            this.$TopHeaderTable.find("tr").length === 0 && this.$tableBody.parent().height(40 + this.$fixColumn.parent().height());
            this.$win.trigger("resize");
        },
        _teaseHeaderColumns: function ()
        {
            var columnMatrix = [], column, columnWrap,
            bodyRowColumn = [];
            // 默认为1行表头
            this._headerRowCount = 1;
            this._columnsDD = {};

            for (var i = 0, len = this._columns.length; i < len; i++)
            {
                column = this._columns[i];
                columnMatrix[i] = [];
                columnWrap = [];
                columnWrap.push(column);
                columnMatrix[i].push(columnWrap);

                if (!this._columnsDD[column["ColumnID"]])
                {
                    this._columnsDD[column["ColumnID"]] = column;
                    column["ParentColumnID"] = "";

                    column["MainField"] && !this._mainField && (this._mainField = column);
                }

                column["Fixed"] = column["Fixed"] || false;
                this._addChildrenColumnsToMatrix(column, columnMatrix[i], bodyRowColumn, 1);
            }

            this._bodyRowColumn = bodyRowColumn;
            this._columnMatrix = columnMatrix;
        },
        _addChildrenColumnsToMatrix: function (parentColumns, columnMatrix, bodyRowColumn, rowLevel)
        {
            var childrenColumns = parentColumns["Childrens"] || [];

            if (childrenColumns.length > 0)
            {
                columnMatrix[rowLevel] = [];
                // 取最大
                this._headerRowCount = columnMatrix.length > this._headerRowCount ? columnMatrix.length : this._headerRowCount;

                for (var i = 0, len = childrenColumns.length; i < len; i++)
                {
                    columnMatrix[rowLevel].push(childrenColumns[i]);
                    childrenColumns[i]["Fixed"] = parentColumns["Fixed"];

                    if (!this._columnsDD[childrenColumns[i]["ColumnID"]])
                    {
                        this._columnsDD[childrenColumns[i]["ColumnID"]] = childrenColumns[i];
                        childrenColumns[i]["ParentColumnID"] = parentColumns["ColumnID"];

                        //column["MainField"] && !this._mainField && (this._mainField = column);
                    }

                    this._addChildrenColumnsToMatrix(childrenColumns[i], columnMatrix, bodyRowColumn, rowLevel + 1);
                }
            }
            else
            {
                bodyRowColumn.push(parentColumns);
            }
        },
        _setOffspringCount: function (column)
        {
            var childrens = column["Childrens"];
            column["Offspring"] = 0;
            if (childrens)
            {
                for (var i = 0, len = childrens.length; i < len; i++)
                {
                    // 因为表头是由底级往上遍历，childrens[i]["Offspring"]会累计加末节点列
                    column["Offspring"] = column["Offspring"] + (childrens[i]["Offspring"] || 1);
                }
            }
        },
        _generateHeader: function (isReset)
        {
            var topHeader = ['<div class="top-header"><table class="table-show">', '<thead>', '</thead></table></div>'],
                fixedHeader = ['<div class="fixed-header"><table class="table-show">', '<thead>', '</thead></table></div>'],
                fixedColumn = ['<div class="fix-column"><table class="table-show">', '<thead>', '</thead></table></div>'],
                tableBody = ['<div class="table-body"><table class="table-show">', '<thead>', '</thead></table></div>'],
                pagination = (this._bPagination ? '<div class="Jadann-pager"></div>' : ""),
                scrollBar = '<div class="scroll-bar-wrap"><div class="scroll-bar left-corner" title=""><div class="right-corner"><a class="scroll-btn" href="javascript:void(0)"></a></div></div></div>',
                thHtml, unit = (this._sizeUnit ? "%" : "px"),
                tRowHtml, fRowHtml, fixColHead, tablebodyHead, columns, isHasChildren,
                i, len, mtop, mleft, topHeaderWidth = 0, fixHeaderWidth = 0,
                isMutilHead = this._headerRowCount > 1;

            // 生成表头
            for (i = this._headerRowCount, len = this._headerRowCount; i > 0; i--)
            {
                tRowHtml = [];
                fRowHtml = [];
                fixColHead = [];
                tablebodyHead = [];
                for (var j = 0, colLen = this._columnMatrix.length; j < colLen; j++)
                {
                    columns = this._columnMatrix[j][i - 1];

                    if (columns)
                    {
                        for (var z = 0, zLen = columns.length; z < zLen; z++)
                        {
                            column = columns[z];

                            this._setOffspringCount(column);

                            isHasChildren = column["Childrens"] && column["Childrens"].length > 0 ? true : false;

                            sortable = column["Sortable"];

                            thHtml = ('<th ' + (typeof column["ColumnID"] === "string" ? (' data-columnid="' + column["ColumnID"] + '"') : '')
                                + (this._headerRowCount > 1 && isHasChildren ? (' colspan="' + column["Offspring"] + '"') : (' rowspan="' + (this._headerRowCount + 1 - i) + '" class="rowspan-' + (this._headerRowCount + 1 - i) + (column["Sortable"] ? ' column-sortable' : '') + '"'))
                                + '>');

                            column["Fixed"] ? fixColHead.push(thHtml + '</th>') : tablebodyHead.push(thHtml + '</th>');
                            thHtml += '<div class="text-nowrap">' + (typeof column["HeaderFormat"] === "function" ? column["HeaderFormat"](column["Caption"], column) : column["Caption"])
                                + (column["Checkbox"] ? '<input class="column-checkbox" type="checkbox" />' : '') +
                                (column["Sortable"] && column["ColumnID"] === this._sortField ? ('<span class="' +
                               (this._sortOrder === "Desc" ? 'sort-desc' : 'sort-asc') + '"></span>') : '') + '</div></th>';
                            column["Fixed"] ? fRowHtml.push(thHtml) : tRowHtml.push(thHtml);
                        }
                    }
                }

                // 设置checkbox
                if (this._checkbox)
                {
                    (fRowHtml.length > 0 ? fRowHtml : tRowHtml).splice(0, 0, '<th><div class="text-nowrap"><input type="checkbox" class="checkbox checkAll"/></th>');
                    (fixColHead.length > 0 ? fixColHead : tablebodyHead).splice(0, 0, '<th></th>');
                }

                tRowHtml.length > 0 && topHeader.splice(2, 0, ('<tr>' + tRowHtml.join('') + '</tr>'));
                fRowHtml.length > 0 && fixedHeader.splice(2, 0, ('<tr>' + fRowHtml.join('') + '</tr>'));
                fixColHead.length > 0 && fixedColumn.splice(2, 0, ('<tr>' + fixColHead.join('') + '</tr>'));
                tablebodyHead.length > 0 && tableBody.splice(2, 0, ('<tr>' + tablebodyHead.join('') + '</tr>'));
            }

            // fixedColumn、tableBody同步表头宽度
            var fixColGroup = [];
            var bodyColGroup = [];
            fixColHead = [];
            tablebodyHead = [];

            for (i = 0, len = this._bodyRowColumn.length; i < len; i++)
            {
                column = this._bodyRowColumn[i];

                if (isMutilHead)
                {
                    thHtml = ('<th ' + (typeof column["ColumnID"] === "string" ? (' data-columnid="' + column["ColumnID"] + '"') : '')
                      + '></th>');
                }

                if (column["Fixed"])
                {
                    isMutilHead && fixColHead.push(thHtml);
                    fixHeaderWidth += column["Width"] ? parseInt(column["Width"], 10) : 0;
                    fixColGroup.push('<col style="width:' + column["Width"] + unit + '" />');
                }
                else
                {
                    isMutilHead && tablebodyHead.push(thHtml);
                    topHeaderWidth += column["Width"] ? parseInt(column["Width"], 10) : 0;
                    bodyColGroup.push('<col style="width:' + column["Width"] + unit + '" />');
                }

                if (!this._MainFieldTable && column["MainField"])
                {
                    this._MainFieldTable = column["Fixed"] ? "fixedColumn" : "tableBody";
                }
            }

            if (fixColGroup.length > 0)
            {
                if (this._checkbox)
                {
                    fixColGroup.splice(0, 0, '<col style="width:30px" />');
                    fixColHead.splice(0, 0, '<td></td>');
                }
                fixedHeader.splice(1, 0, '<colgroup>' + fixColGroup.join('') + '</colgroup>');
                isMutilHead && fixedColumn.splice(fixedColumn.length - 1, 0, '<tr>' + fixColHead.join("") + '</tr>');
                fixedColumn.splice(1, 0, '<colgroup>' + fixColGroup.join('') + '</colgroup>');

            }

            if (bodyColGroup.length > 0)
            {
                if (this._checkbox && fixColGroup.length === 0)
                {
                    bodyColGroup.splice(0, 0, '<col style="width:30px" />');
                    tablebodyHead.splice(0, 0, '<td></td>');
                }

                topHeader.splice(1, 0, '<colgroup>' + bodyColGroup.join('') + '</colgroup>');
                isMutilHead && tableBody.splice(tableBody.length - 1, 0, '<tr>' + tablebodyHead.join("") + '</tr>');
                tableBody.splice(1, 0, '<colgroup>' + bodyColGroup.join('') + '</colgroup>');
            }

            if (isReset)
            {
                fixedHeader.length > 2 && this.$fixedHeaderTable.children("colgroup").remove()
                    .end().children("thead").before(fixedHeader.slice(1, 2))
                    .children().remove()
                    .end().append(fixedHeader.slice(3, fixedHeader.length - 1).join(""));

                topHeader.length > 2 && this.$TopHeaderTable.children("colgroup").remove()
                    .end().children("thead").before(topHeader.slice(1, 2))
                    .children().remove()
                    .end().append(topHeader.slice(3, topHeader.length - 1).join(""));

                fixedColumn.length > 2 && this.$fixColumn.children("colgroup").remove()
                    .end().children("thead").before(fixedColumn.slice(1, 2))
                    .children().remove()
                    .end().append(fixedColumn.slice(3, fixedColumn.length - 1).join(""));

                tableBody.length > 2 && this.$tableBody.children("colgroup").remove()
                    .end().children("thead").before(tableBody.slice(1, 2))
                    .children().remove()
                    .end().append(tableBody.slice(3, tableBody.length - 1).join(""));
            }
            else
            {
                this.$container.addClass("Jadann-datagrid")
                    .append($(fixedHeader.join('') + topHeader.join('') + fixedColumn.join('') + tableBody.join('') + scrollBar + pagination));

                if (!this.$container.parent().hasClass("Jadann-table")) {
                    this.$container.wrap("<div class='Jadann-table'></div>");
                    this.$JadannTable = this.$container.parent();
                    this.$JadannTable.append("<a class='btn-scroll-left'><span><</span></a><a class='btn-scroll-right'><span>></span></a>");
                }

                this.$fixedHeaderTable = this.$container.children(".fixed-header").children("table");
                mleft = this.$fixedHeaderTable.outerWidth();
                this.$topHeader = this.$container.children(".top-header");
                this.$TopHeaderTable = this.$topHeader.css({ "margin-left": (this._sizeUnit ? 0 : (fRowHtml.length > 0 ? (mleft - 1 + (this._checkbox ? -5 : 0)) : 0)), "display": (this._headerVisible ? "block" : "none") })
                    .children("table");
                mtop = this.$container.children(".top-header").height();

                this.$fixColumn = this.$container.children(".fix-column").css({ "top": (this._sizeUnit ? 0 : this.$fixedHeaderTable.parent().height() - 1) })
                    .children("table");

                this.$bodyWrap = this.$container.children(".table-body");
                this.$tableBody = this.$bodyWrap.css({ "padding-left": (this._sizeUnit ? 0 : (mleft - 1 + (this._checkbox ? -5 : 0))), "margin-top": (this._headerVisible ? -1 : 0) })
                    .children("table");
                this.$scrollBarWrap = this.$container.children(".scroll-bar-wrap").css("left", (this._sizeUnit ? 0 : mleft - 1 + (this._checkbox ? -5 : 0)));
                this.$scrollBar = this.$scrollBarWrap.children();

                // 确认树形前缀在哪张表格
                if (this._MainFieldTable)
                {
                    if (this._MainFieldTable === "fixedColumn")
                    {
                        this.$MainFieldTable = this.$fixColumn;
                        this.$MinorFieldTable = this.$tableBody;
                    }
                    else
                    {
                        this.$MainFieldTable = this.$tableBody;
                        this.$MinorFieldTable = this.$fixColumn;
                    }
                }
            }

            // 列固定宽度
            if (!this._sizeUnit)
            {
                this.$TopHeaderTable.css("width", topHeaderWidth + unit);
                this.$tableBody.css("width", this.$TopHeaderTable.outerWidth());
                this.$fixedHeaderTable.css("width", fixHeaderWidth + unit);
                this.$fixColumn.css("width", this.$fixedHeaderTable.outerWidth());
            }
        },
        _teaseDataSource: function ()
        {
            var row, relationIDs, rowID, rowParentID;

            if (!this._dataSource || this._dataSource.length === 0)
            {
                return;
            }

            for (var i = 0; i < this._dataSource.length; i++)
            {
                row = this._dataSource[i];
                rowID = row[this._idField];
                this._idDD[rowID] = row;

                if (this._isTree)
                {
                    rowParentID = row[this._parentIDField];
                    this._treeDD[rowID] = { id: rowID, parentID: rowParentID, children: [] };

                    if (!this._childrenDD[rowParentID])
                    {
                        this._childrenDD[rowParentID] = [];
                    }

                    this._childrenDD[rowParentID].push(rowID);
                }
            }
        },
        _sort: function ()
        {
            if (this._isTree && this._sortColIndex)
            {
                for (var parentID in this._childrenDD)
                {
                    this._sortChildren(parentID);
                }
            }
        },
        _sortChildren: function (parentID)
        {
            var that = this;

            if (this._childrenDD[parentID])
            {
                this._childrenDD[parentID].sort(function (fieldID1, fieldID2)
                {
                    var row1 = that._getRowData(fieldID1)["Cells"],
                        row2 = that._getRowData(fieldID2)["Cells"],
                        sortValue1, sortValue2;

                    if (typeof that._sortFun === "function")
                    {
                        return that._sortFun(row1, row2);
                    }

                    sortValue1 = row1[that._sortField];
                    sortValue2 = row2[that._sortField];

                    return sortValue1 > sortValue2 ? that.orderValue : (sortValue1 < sortValue2 ? -(that.orderValue) : 0);
                });
            }
        },
        getRowID: function ($target)
        {
            return $target.closest("tr").attr("id");
        },
        _getRowData: function (rowID)
        {
            return this._idDD[rowID];
        },
        _getChildrenIDs: function (id)
        {
            return this._childrenDD[id];
        },
        _buildTreeCollection: function ()
        {
            var childrenIDs, i, len;

            if (this._isTree)
            {
                // 根级存在
                if (this._treeDD[this._rootValue])
                {
                    this._tree.push(this._treeDD[this._rootValue])
                }
                else
                {
                    childrenIDs = this._getChildrenIDs(this._rootValue);
                    if (childrenIDs)
                    {
                        for (i = 0, len = childrenIDs.length; i < len; i++)
                        {
                            this._tree.push(this._treeDD[childrenIDs[i]]);
                        }
                    }
                    else
                    {
                        return;
                    }
                }

                for (i = 0, len = this._tree.length; i < len; i++)
                {
                    this._levelIncrease(1);
                    this._setChildrenPreFix(this._tree[i], null, (i === len - 1));
                    this._buildChildrenCollection(this._tree[i]);
                }
            }
        },
        _buildChildrenCollection: function (parentRow)
        {
            var that = this, row, i, len,
                childrenIDs = this._getChildrenIDs(parentRow["id"]);

            if (childrenIDs && childrenIDs.length > 0)
            {
                for (i = 0, len = childrenIDs.length; i < len; i++)
                {
                    row = this._treeDD[childrenIDs[i]];

                    if (!row.prefix)
                    {
                        parentRow.children.push(row);

                        this._setChildrenPreFix(row, parentRow, i === len - 1);
                    }

                    // 限制展开层级
                    if (this._addLevelEnabled())
                    {
                        this._buildChildrenCollection(row);
                    }
                }
            }
        },
        _setChildrenPreFix: function (row, parentRow, isLastChildren)
        {
            var template = '<span class="row-prefix {$prefix}"></span>',
                preType = isLastChildren ? "row-blank" : "row-line";

            row.isLastChildren = isLastChildren;
            row.level = (parentRow && parentRow.level || 0) + 1;

            row.prefix = row.level < this._showPrefixLevel ? "" : ((parentRow && parentRow.prefix || "") + template.replace(/\{\$prefix\}/g, preType));
        },
        _setRowCollapsePrefix: function (treeRow, $this)
        {
            $this = $this || this.$MainFieldTable.find("tr[id='" + treeRow["id"] + "']").find(".row-expand,.row-bros,.row-last");
            var prefix = {
                lastChildRow: "row-expand row-last-child row-last",
                lastChildRowCollapse: "row-collapse row-last-child-collapse",
                brosChildRow: "row-expand row-bros-child row-bros",
                brosChildRowCollapse: "row-collapse row-bros-child-collapse"
            }

            $this.removeClass(treeRow.isLastChildren ? prefix["lastChildRow"] : prefix["brosChildRow"])
                            .addClass(treeRow.isLastChildren ? prefix["lastChildRowCollapse"] : prefix["brosChildRowCollapse"]);
        },
        _setBrosRowPrefix: function (treeRow, $treeRow)
        {
            var $prefix;
            $treeRow = $treeRow || this.$MainFieldTable.find("tr#" + treeRow["id"]);
            $prefix = $treeRow.find(".row-last")

            if ($prefix.length === 0)
            {
                $prefix = $treeRow.find(".row-last-child");
                $prefix.length === 0 ? $treeRow.find(".row-last-child-collapse").removeClass("row-last-child-collapse").addClass("row-bros-child-collapse")
                    : $prefix.removeClass("row-last-child").addClass("row-bros-child");
            }
            else
            {
                $prefix.removeClass("row-last").addClass("row-bros");
            }
        },
        _setAllChildrenPreFix : function (parentRow)
        {
            var childrens = parentRow.children, row, i, len;

            for (i = 0, len = childrens.length; i < len; i++)
            {
                row = childrens[i];

                this._setChildrenPreFix(row, parentRow, i === len - 1);
                this._setAllChildrenPreFix(row);
            }
        },
        _setAllChildrenLinkRowPrefix: function (treeRow, level)
        {
            var children = treeRow.children;

            for (var i = 0, len = children.length; i < len; i++)
            {
                this.$MainFieldTable.find("tr#" + children[i]["id"]).find(".row-prefix").eq(level - 1)
                    .removeClass("row-blank").addClass("row-line");

                this._setAllChildrenLinkRowPrefix(children[i]);
            }
        },
        _setAllChildrenBlankRowPrefix : function (treeRow, level)
        {
            var children = treeRow.children;

            for (var i = 0, len = children.length; i < len; i++)
            {
                this.$MainFieldTable.find("tr#" + children[i]["id"]).find(".row-prefix").eq(level - 1)
                    .removeClass("row-line").addClass("row-blank");

                this._setAllChildrenBlankRowPrefix(children[i]);
            }
        },
        _setLastRowPrefix : function (treeRow, $treeRow)
        {
            var $prefix;
            $treeRow = $treeRow || this.$MainFieldTable.find("tr#" + treeRow["id"]);
            $prefix = $treeRow.find(".row-bros");

            if ($prefix.length === 0)
            {
                $prefix = $treeRow.find(".row-bros-child");
                $prefix.length === 0 ? $treeRow.find(".row-bros-child-collapse").removeClass("row-bros-child-collapse").addClass("row-last-child-collapse")
                    : $prefix.removeClass("row-bros-child").addClass("row-last-child");
            }
            else
            {
                $prefix.removeClass("row-bros").addClass("row-last");
            }
        },
        _getRowPrefix : function (row, parentRow)
        {
            var prefixHtml = '<span class="row-prefix {$prefix}"></span>',
                preType,
            prefixClass = {
                lastChildRow: "row-expand row-last-child",
                lastChildRowCollapse: "row-collapse row-last-child-collapse",
                lastRow: "row-last",
                brosRow: "row-bros",
                brosChildRow: "row-expand row-bros-child",
                brosChildRowCollapse: "row-collapse row-bros-child-collapse"
            };

            row.isHasChildren = row.children && row.children.length > 0;
            preType = row.isLastChildren ? (row.isHasChildren ?
                (this._isShowLastLevel(true) ? "lastChildRow" : "lastChildRowCollapse") : "lastRow") : (row.isHasChildren ?
                (this._isShowLastLevel(true) ? "brosChildRow" : "brosChildRowCollapse") : "brosRow");

            if (row.level < this._showPrefixLevel)
            {
                return "";
            }

            return ((parentRow && parentRow.prefix || "") + prefixHtml.replace(/\{\$prefix\}/g, prefixClass[preType]));
        },
        _clearRowCollapsePrefix : function (treeRow)
        {
            var $treeRow = this.$MainFieldTable.find("#" + treeRow["id"]),
                $prefix = $treeRow.find(".row-bros-child-collapse"),
                prefix = {
                    lastChildRowCollapse: "row-collapse row-last-child-collapse",
                    brosChildRowCollapse: "row-collapse row-bros-child-collapse"
                };

            $prefix.length === 0 ? $treeRow.find(".row-last-child-collapse").removeClass("row-collapse row-last-child-collapse").addClass("row-last")
                : $prefix.removeClass("row-collapse row-bros-child-collapse").addClass("row-bros");
        },
        _getLastBottomMostChildren: function (parentRow)
        {
            var children = parentRow.children, lastChildren;

            if (children.length > 0)
            {
                lastChildren = children[children.length - 1];

                $lastChildren = this.$MainFieldTable.find("tr#" + lastChildren["id"]);

                if ($lastChildren.length === 0)
                {
                    return parentRow;
                }
                else
                {
                    return this._getLastBottomMostChildren(lastChildren);
                }
            }
            else
            {
                return parentRow;
            }
        },
        _generateRowsHtml: function ()
        {
            var i, len, row, leftRowsHtml = [], bodyRowsHtml = [];

            if (!this._dataSource || this._dataSource.length === 0)
            {
                return;
            }

            if (this._isTree)
            {
                if (this._tree.length > 0)
                {
                    this._resetLevel();
                    this._levelIncrease(1)
                    this._addLevelEnabled(true);

                    for (var i = 0, len = this._tree.length; i < len; i++)
                    {
                        this._generateTreeRowHtml(this._tree[i], null, leftRowsHtml, bodyRowsHtml, true);
                    }
                }
            }
            else
            {
                for (i = 0, len = this._dataSource.length; i < len; i++)
                {
                    row = this._dataSource[i];

                    this._generateRowHtml(row, leftRowsHtml, bodyRowsHtml);
                    this._appendRowHtml(leftRowsHtml, bodyRowsHtml);
                }
            }

            this._appendRowHtml(leftRowsHtml, bodyRowsHtml, true);
        },
        _appendRowHtml: function (leftRowsHtml, bodyRowsHtml, isLast, index)
        {
            if (leftRowsHtml.length === 10 || bodyRowsHtml.length === 10 || isLast && (leftRowsHtml.length > 0 || bodyRowsHtml.length > 0))
            {
                if (typeof index === "number") {
                    if (this.$fixColumn.find("tbody>tr").length === index)
                    {
                        this.$fixColumn.find("tbody>tr:eq(" + index - 1 + ")").after(leftRowsHtml.join(""));
                        this.$tableBody.find("tbody>tr:eq(" + index - 1 + ")").after(bodyRowsHtml.join(""));
                    }
                    else {
                        this.$fixColumn.find("tbody>tr:eq(" + index + ")").before(leftRowsHtml.join(""));
                        this.$tableBody.find("tbody>tr:eq(" + index + ")").before(bodyRowsHtml.join(""));
                    }
                } else {
                    this.$fixColumn.append(leftRowsHtml.join(""));
                    this.$tableBody.append(bodyRowsHtml.join(""));
                }
                leftRowsHtml.length = 0;
                bodyRowsHtml.length = 0;
            }
        },
        _generateTreeRowHtml: function (treeRow, treeParentRow, leftRowsHtml, bodyRowsHtml, isAppend)
        {
            var row = this._idDD[treeRow["id"]];

            this._generateRowHtml(row, leftRowsHtml, bodyRowsHtml, treeRow, treeParentRow);

            if (isAppend)
            {
                this._appendRowHtml(leftRowsHtml, bodyRowsHtml);
            }

            if (this._addLevelEnabled(true))
            {
                this._generateChildrensRowHtml(treeRow, leftRowsHtml, bodyRowsHtml, isAppend);
            }
        },
        _generateChildrensRowHtml: function (treeParentRow, leftRowsHtml, bodyRowsHtml, isAppend)
        {
            var childrens = treeParentRow.children, i, len;
            for (i = 0, len = childrens.length; i < len; i++)
            {
                this._generateTreeRowHtml(childrens[i], treeParentRow, leftRowsHtml, bodyRowsHtml, isAppend);
            }
        },
        _generateRowHtml: function (row, leftRowsHtml, bodyRowsHtml, treeRow, treeParentRow)
        {
            var fixedRow = "", bodyRow = "",
                rowID = (this._isTree ? treeRow["id"] : (row && row[this._idField] || "")),
                rowHtml = '<tr id="' + rowID + '">',
                i, len, column;

            for (i = 0, len = this._bodyRowColumn.length; i < len; i++)
            {
                this._bodyRowColumn[i]["Fixed"] ? fixedRow += this._generateTdHtml(rowID, row, this._bodyRowColumn[i], treeRow, treeParentRow)
                    : bodyRow += this._generateTdHtml(rowID, row, this._bodyRowColumn[i], treeRow, treeParentRow);
            }

            if (this._checkbox)
            {
                fixedRow && (fixedRow = '<td><div class="text-nowrap"><input type="checkbox" class="checkbox"/></div></td>' + fixedRow);
                !fixedRow && bodyRow && (bodyRow = '<td><div class="text-nowrap"><input type="checkbox" class="checkbox"/></div></td>' + bodyRow);
            }

            fixedRow && leftRowsHtml.push(rowHtml + fixedRow + "</tr>");
            bodyRow && bodyRowsHtml.push(rowHtml + bodyRow + "</tr>");
        },
        _generateTdHtml: function (rowID, cellData, column, treeRow, treeParentRow)
        {
            var tdHtml,
                colID = column["ColumnID"],
                that = this,
                isShowPrefix = this._isTree && column["MainField"] || false,
                align = {
                    "Center": 'text-align:center;',
                    "center": 'text-align:center;',
                    "Left": "text-align:left",
                    "left": "text-align:left",
                    "Right": "text-align:right",
                    "right": "text-align:right"
                },
                alignValue = typeof column["Align"] === "undefined" ? align["Left"] : align[column["Align"]],
                getControlHtml = function ()
                {
                    var cellType = column["DefaultCellType"],
                        val = cellData[column["ColumnID"]];

                    switch (cellType)
                    {
                        case "CheckBox":
                            return '<span kdtype="checkbox" class="input-checkbox ' + (val ? "input-checkbox-selected" : "") + '"></span>';
                        case "Span":
                        default:
                            return '<span>' + ((utility.isUndefined(val) || utility.isNull(val)) ? "" : val) + '</span>';
                    }

                    return "";
                }, bContinue;

            if (utility.isFunction(column["CellFormat"]))
            {
                bContinue = column["CellFormat"](cellData[colID], colID, cellData, treeRow, treeParentRow, this);

                // 返回字符串将不继续处理
                if (utility.isString(bContinue))
                {
                    return bContinue;
                }
            }

            tdHtml = '<td style="${align}" column="${columnName}" ><div class="text-nowrap">${prefix}${content}</div></td>'.replace(/\$\{([a-zA-Z]+)\}/g, function (match, word)
            {
                switch (word)
                {
                    case "align":
                        return alignValue || "";
                    case "prefix":
                        return isShowPrefix && treeRow ? that._getRowPrefix(treeRow, treeParentRow) : "";
                    case "content":
                        return typeof column["Format"] === "function" ? column["Format"](cellData[column["ColumnID"]], column["ColumnID"], cellData, treeRow, treeParentRow) : getControlHtml();
                    case "columnName":
                        return column["ColumnID"];
                    default:
                        return "";
                }
            });

            return tdHtml;
        },
        _levelIncrease: function (number)
        {
            this._level = (this.level || 0) + number;
        },
        _renderChildrenRow: function (treeRow)
        {
            var leftRowsHtml = [], bodyRowsHtml = [];

            // 遍历两层级的子集
            this._levelIncrease(1);
            this._buildChildrenCollection(treeRow);
            if (this._isTree && this._sortField)
            {
                this._sortChildren(treeRow["id"]);
            }
            this._generateChildrensRowHtml(treeRow, leftRowsHtml, bodyRowsHtml, false);

            this.$fixColumn.find("tr#" + treeRow["id"]).after($(leftRowsHtml.join("")));
            this.$tableBody.find("tr#" + treeRow["id"]).after($(bodyRowsHtml.join("")));
        },
        /**
         * 添加兄弟节点，找到父级，然后添加addChildrenRow
         */
        addSiblingsRow: function (rowID, rowData, bPrev) {
            if (this._isTree) {
                var treeRow = this._treeDD[rowID];
                if (!treeRow) {
                    throw "传入rowID错误";
                }

                var index = this._getChildrenIndex(treeRow["parentID"], rowID);
                if (index === -1)
                {
                    throw "rowid不属于父级";
                }

                !bPrev && (index = index + 1);
                this.addChildrenRow(treeRow["parentID"], rowData, index);
            } else {
                var $trs = this.$tableBody.find("tbody>tr:gt(0)"), 
                    $curRow = this.$tableBody.find("tr#"+rowID);

                if($curRow.length === 0)
                {
                    throw "传入rowID错误";
                }

                var index = $trs.index($curRow);
                if (index === -1)
                {
                    throw "未找到该行元素。";
                }

                // 添加后兄弟节点加1
                !bPrev && (index = index + 1);
                this.addChildrenRow(null, rowData, index);
            }
        },
        /**
         * 后台新增成功之后，新增子行，如果是有分页直接刷新页面
         * 如果是树形无分页表格，加入代码
         * 当前节点之前、之后或者当前节点子集
         */
        addChildrenRow: function (parentID, rowData, index)
        {
            var emptyID, emptyRow, leftRowsHtml = [], bodyRowsHtml = [], parentRow,
                prevSibling, $prevSibling, bottomMostChildren, relationIDs, $newTr;

            if (this._pager)
            {
                // 存在分页直接刷新
                this._loadDataSource();
            }
            else
            {

                if (!rowData)
                {
                    return;
                }

                /**
                 * 有树形和普通表格之分
                 * 普通表格直接加到末尾
                 */
                emptyID = rowData[this._idField];

                if (this._isTree)
                {
                    parentRow = this._treeDD[parentID];
                    if (parentRow)
                    {
                        parentRow.isHasChildren = true;
                    }
                    // 重复返回false
                    emptyRow = this._createEmptyRow(emptyID, parentID, parentRow, rowData, index);

                    if (!emptyRow)
                    {
                        return;
                    }

                    if (parentRow)
                    {
                        if (parentRow.children && parentRow.children.length > 1) {
                            //if (this.$container.find("#" + parentRow.children[0]["id"]).length === 0)
                            //{
                            //    this._renderChildrenRow(parentRow);
                            //}
                            //else
                            //{
                            this._generateTreeRowHtml(emptyRow, parentRow, leftRowsHtml, bodyRowsHtml, false);

                            // 添加在最后子节点情况
                            if (typeof index !== "number" || typeof index === "number" && index === parentRow.children.length - 1) {
                                prevSibling = parentRow.children[parentRow.children.length - 2];
                                $prevSibling = this.$MainFieldTable.find("tr#" + prevSibling["id"]);
                                this._setBrosRowPrefix(prevSibling, $prevSibling);
                                // 设置Bros所有子集的前缀
                                this._setAllChildrenLinkRowPrefix(prevSibling, prevSibling.level);

                                // 找子集节点，没有找到插入表格末端
                                bottomMostChildren = this._getLastBottomMostChildren(prevSibling);
                                this.$fixColumn.find("tr#" + bottomMostChildren["id"]).after($(leftRowsHtml.join("")));
                                this.$tableBody.find("tr#" + bottomMostChildren["id"]).after($(bodyRowsHtml.join("")));
                            } else {
                                // 添加到第一个子节点
                                if (index === 0) {
                                    this.$fixColumn.find("tr#" + parentRow["id"]).after($(leftRowsHtml.join("")));
                                    this.$tableBody.find("tr#" + parentRow["id"]).after($(bodyRowsHtml.join("")));
                                } else {
                                    // 中间子节点
                                    var nextSibling = parentRow.children[index + 1];
                                    this.$fixColumn.find("tr#" + nextSibling["id"]).before($(leftRowsHtml.join("")));
                                    this.$tableBody.find("tr#" + nextSibling["id"]).before($(bodyRowsHtml.join("")));
                                }
                            }
                            //}
                        }
                        else {
                            this._generateTreeRowHtml(emptyRow, parentRow, leftRowsHtml, bodyRowsHtml, false);
                            this.$fixColumn.find("tr#" + parentRow["id"]).after($(leftRowsHtml.join("")));
                            this.$tableBody.find("tr#" + parentRow["id"]).after($(bodyRowsHtml.join("")));
                        }
                    }
                    else
                    {
                        this._generateTreeRowHtml(emptyRow, parentRow, leftRowsHtml, bodyRowsHtml, false);
                        if (typeof index === "number" && index !== this._tree.length - 1) {
                            prevSibling = this._tree[index + 1];

                            this.$fixColumn.find("tr#" + prevSibling["id"]).before($(leftRowsHtml.join("")));
                            this.$tableBody.find("tr#" + prevSibling["id"]).before($(bodyRowsHtml.join("")));
                        }
                        else {
                            if (this._tree.length > 1) {
                                prevSibling = this._tree[this._tree.length - 2];
                                $prevSibling = this.$MainFieldTable.find("tr#" + prevSibling["id"]);
                                this._setBrosRowPrefix(prevSibling, $prevSibling);
                                // 设置Bros所有子集的前缀
                                this._setAllChildrenLinkRowPrefix(prevSibling, prevSibling.level);
                            }
                            this.$fixColumn.append($(leftRowsHtml.join("")));
                            this.$tableBody.append($(bodyRowsHtml.join("")));
                        }
                    }

                    // 更新该行前缀
                    parentRow && this._setRowCollapsePrefix(parentRow);

                }
                else
                {
                    this._generateRowHtml(rowData, leftRowsHtml, bodyRowsHtml);
                    this._appendRowHtml(leftRowsHtml, bodyRowsHtml, true, index);
                }

                // 调整滚动条位置
                this._resetOverflow();
                // 默认第一个输入框获得焦点
                $newTr = this.$container.find("tr#" + emptyID);

                // 调整新增行位置，保证可见范围
                if ($newTr.length > 0 && $newTr.offset().top > this.$win.scrollTop() + this.$win.height()) {
                    this.$win.scrollTop($newTr.offset().top - this.$win.height() + 60);
                }
            }
        },
        _createEmptyRow: function (emptyID, parentID, parentRow, emptyRowData, index)
        {
            var emptyRow = { "id": emptyID, "parentID": parentID, children: [], isEmpty: true }, prevRow;

            if (this._idDD[emptyID])
            {
                return;
            }

            this._idDD[emptyID] = emptyRowData;
            if (!this._childrenDD[parentID])
            {
                this._childrenDD[parentID] = [];
            }

            if (typeof index === "number") {
                this._childrenDD[parentID].splice(index, 0, emptyID);
            } else {
                this._childrenDD[parentID].push(emptyID);
            }

            if (parentRow && parentRow.children)
            {
                // 更新前一个子节点的前缀
                if (parentRow.children.length > 0 && (typeof index !== "number" ||
                    typeof index === "number" && index === parentRow.children.length - 1)) {
                    prevRow = parentRow.children[parentRow.children.length - 1];
                    this._setChildrenPreFix(prevRow, parentRow, false);
                    // 前一个子节点的所有子集
                    this._setAllChildrenPreFix(prevRow);
                }

                if (typeof index === "number") {
                    parentRow.children.splice(index, 0, emptyRow);
                } else {
                    parentRow.children.push(emptyRow);
                }
            }
            else
            {
                // 根节点
                if (this._tree.length > 0 && (typeof index !== "number" ||
                    typeof index === "number" && index === this._tree.length - 1))
                {
                    prevRow = this._tree[this._tree.length - 1];
                    this._setChildrenPreFix(prevRow, null, false);
                    // 前一个子节点的所有子集
                    this._setAllChildrenPreFix(prevRow);
                }

                if (typeof index === "number") {
                    this._tree.splice(index, 0, emptyRow);
                }
                else {
                    this._tree.push(emptyRow);
                }
            }

            this._setChildrenPreFix(emptyRow, parentRow, true);

            this._treeDD[emptyID] = emptyRow;
            this._emptyDD = this._emptyDD || {};
            this._emptyDD[emptyID] = emptyRow;

            return emptyRow;
        },
        _getChildrenIndex: function (parentID, rowid) {

            var children = this._childrenDD[parentID];
            
            if (children && children.length > 0) {
                for (var i = 0, len = children.length; i < len; i++) {
                    if (children[i] === rowid) {
                        return i;
                    }
                }
            }

            return -1;
        },
        /**
         * 后台更新数据成功之后，再执行移动步骤
         */
        moveRow: function (rowID, bUp) {
            var replaceEachOther = function ($tr, bUp) {
                if (bUp && $tr.prev().length > 0) {
                    $tr.prev().before($tr);
                }

                if (!bUp && $tr.next().length > 0) {
                    $tr.next().after($tr);
                }
            };

            if (this._isTree) {
                // 在子集中移动，末节点切换需改变前缀
                var treeRow = this._treeDD[rowID];
                if (!treeRow) {
                    throw "传入rowID不存在";
                }

                var parentID = treeRow["parentID"];
                var parentRow = this._treeDD[parentID];
                var children = this._childrenDD[parentID];
                var index = this._getChildrenIndex(parentID, rowID);
                if (index === -1)
                {
                    throw "不在子集中"
                }

                if (bUp) {
                    if (index === 0) {
                        return;
                    }

                    children.splice(index, 1);
                    children.splice(index - 1, 0, rowID);

                    if (this._treeDD[parentID]) {
                        var cTreeRow = this._treeDD[parentID]["children"];
                        cTreeRow.splice(index, 1);
                        cTreeRow.splice(index - 1, 0, treeRow);

                        var prevTreeRow = cTreeRow[index];
                    } else {
                        this._tree.splice(index, 1);
                        this._tree.splice(index - 1, 0, treeRow);
                        var prevTreeRow = this._treeDD[children[index]];
                    }

                    var $prevTreeRow = this.$MainFieldTable.find("tr#" + prevTreeRow["id"]);
                    var $treeRow = this.$MainFieldTable.find("tr#" + treeRow["id"]);

                    // 行替换
                    var $tr = this.$fixColumn.find("tr#" + treeRow["id"]);
                    if ($tr.length > 0) {
                        $tr = this._getAllChildrenTrs(treeRow["id"], $tr, this.$fixColumn);
                        this.$fixColumn.find("tr#" + prevTreeRow["id"]).before($tr);
                    }
                    $tr = this.$tableBody.find("tr#" + rowID);
                    if ($tr.length > 0)
                    {
                        $tr = this._getAllChildrenTrs(rowID, $tr, this.$tableBody);
                        this.$tableBody.find("tr#" + prevTreeRow["id"]).before($tr);
                    }

                    // 最后的节点改变前缀
                    if (index === children.length - 1)
                    {
                        this._setChildrenPreFix(prevTreeRow, parentRow, true);
                        this._setAllChildrenPreFix(prevTreeRow);
                        this._setLastRowPrefix(prevTreeRow, $prevTreeRow);
                        this._setAllChildrenBlankRowPrefix(prevTreeRow, prevTreeRow.level);

                        // 当前移动节点改变前缀
                        this._setChildrenPreFix(treeRow, parentRow, false);
                        this._setAllChildrenPreFix(treeRow);
                        this._setBrosRowPrefix(treeRow, $treeRow);
                        // 设置Bros所有子集的前缀
                        this._setAllChildrenLinkRowPrefix(treeRow, treeRow.level);
                    }
                } else {
                    if (index === children.length - 1) {
                        return;
                    }

                    children.splice(index, 1);
                    children.splice(index + 1, 0, rowID);

                    if (this._treeDD[parentID]) {
                        var cTreeRow = this._treeDD[parentID]["children"];
                        var nextTreeRow = cTreeRow[index + 1];

                        cTreeRow.splice(index, 1);
                        cTreeRow.splice(index + 1, 0, treeRow);
                    }
                    else {
                        this._tree.splice(index, 1);
                        this._tree.splice(index + 1, 0, treeRow);
                        var nextTreeRow = this._treeDD[children[index]];
                    }

                    
                    var $nextTreeRow = this.$MainFieldTable.find("tr#" + nextTreeRow["id"]);
                    var $treeRow = this.$MainFieldTable.find("tr#" + treeRow["id"]);

                    // 行替换
                    var $tr = this.$fixColumn.find("tr#" + nextTreeRow["id"]);
                    if ($tr.length > 0) {
                        $tr = this._getAllChildrenTrs(nextTreeRow["id"], $tr, this.$fixColumn);
                        this.$fixColumn.find("tr#" + treeRow["id"]).before($tr);
                    }

                    $tr = this.$tableBody.find("tr#" + nextTreeRow["id"]);
                    if ($tr.length > 0) {
                        $tr = this._getAllChildrenTrs(nextTreeRow["id"], $tr, this.$tableBody);
                        this.$tableBody.find("tr#" + treeRow["id"]).before($tr);
                    }

                    // 最后的节点改变前缀
                    if (index === children.length - 2) {
                        this._setChildrenPreFix(nextTreeRow, parentRow, true);
                        this._setAllChildrenPreFix(nextTreeRow);
                        this._setBrosRowPrefix(nextTreeRow, $nextTreeRow);
                        // 设置Bros所有子集的前缀
                        this._setAllChildrenLinkRowPrefix(nextTreeRow, nextTreeRow.level);

                        

                        // 当前移动节点改变前缀
                        this._setChildrenPreFix(treeRow, parentRow, false);
                        this._setAllChildrenPreFix(treeRow);
                        this._setLastRowPrefix(treeRow, $treeRow);
                        this._setAllChildrenBlankRowPrefix(treeRow, treeRow.level);
                    }
                }
            }
            else {
                var $tr = this.$fixColumn.find("tr#" + rowID);
                if ($tr.length > 0) {
                    replaceEachOther($tr, bUp);
                }

                $tr = this.$tableBody.find("tr#" + rowID);
                if ($tr.length > 0) {
                    replaceEachOther($tr, bUp);
                }
            }
        },
        _getAllChildrenTrs:function(rowID, $tr, $table){
            var children = this._childrenDD[rowID];
            if (children && children.length > 0)
            {
                for (var i = 0, len = children.length; i < len; i++)
                {
                    $tr = $tr.add($table.find("tr#" + children[i]));
                    $tr = this._getAllChildrenTrs(children[i], $tr, $table);
                }
            }

            return $tr;
        },
        /**
         * 后台执行成功之后，执行该方法
         */
        deleteRow: function (id)
        {
            var rowData, row, parentID, childrenIDs,
                childrens, children, rowIndex;

            if (this._pager)
            {
                // 存在分页直接刷新
                this._loadDataSource();
            }
            else
            {
                rowData = this._idDD[id];
                if (!rowData)
                {
                    return;
                }

                if (this._isTree)
                {
                    row = this._treeDD[id];
                    parentID = row["parentID"];
                    childrenIDs = this._childrenDD[parentID];

                    // 删除所在父级子集中的值
                    for (var i = 0, len = childrenIDs.length; i < len; i++)
                    {
                        if (childrenIDs[i] === id)
                        {
                            rowIndex = i;
                            childrenIDs.splice(i, 1);
                            break;
                        }
                    }
                    // 清除所有子集和html行
                    this._clearChildrenRow(id);
                    // 清除树级中的位置
                    if (this._treeDD[parentID])
                    {
                        childrens = this._treeDD[parentID].children;
                        this._treeDD[parentID].isHasChildren = childrens.length > 1;
                    }
                    else
                    {
                        childrens = this._tree;
                    }
                    childrens[rowIndex] && childrens.splice(rowIndex, 1);

                    // 清除缓存
                    this._deleteidDD(id);

                    // 更新上一行前缀：当前是末节点时需更新上一行的前缀
                    if (row.isLastChildren)
                    {
                        //有前兄弟节点，更新前兄弟节点，否则更新父级
                        if (rowIndex === 0)
                        {
                            // 删除最后一个子集，更新父级前缀
                            this._treeDD[parentID] && this._clearRowCollapsePrefix(this._treeDD[parentID]);
                        }
                        else
                        {
                            children = childrens[rowIndex - 1];
                            // 前兄弟节点变成最后一个子集
                            this._setChildrenPreFix(children, this._treeDD[parentID], true);
                            this._setAllChildrenPreFix(children)
                            this._setLastRowPrefix(children);
                            this._setAllChildrenBlankRowPrefix(children, children.level);
                        }
                    }
                }
                else
                {
                    this._deleteidDD(id);
                }

                this._resetOverflow();
            }
        },
        _clearChildrenRow : function (id)
        {
            var childrenIDs = this._childrenDD[id];

            if (childrenIDs && childrenIDs.length > 0)
            {
                for (var i = 0, len = childrenIDs.length; i < len; i++)
                {
                    // 清除缓存
                    this._deleteidDD(childrenIDs[i]);
                    this._clearChildrenRow(childrenIDs[i]);
                }

                this._childrenDD[id] = null;
                delete this._childrenDD[id];
            }
        },

        _deleteidDD : function (id)
        {
            this._idDD[id] = null;
            delete this._idDD[id];
            this._emptyDD && this._emptyDD[id] && delete this._emptyDD[id];

            this.$fixColumn.find("tr#" + id).remove();
            this.$tableBody.find("tr#" + id).remove();
        },
        _addLevelEnabled: function (isRender)
        {
            if (!this._isShowLastLevel(isRender))
            {
                this._levelIncrease(1)
                return true;
            }
            return false;
        },
        /**
         * 判断是否到最后渲染层级
         */
        _isShowLastLevel: function (isRender)
        {
            if (this._expandLevel === 0)
            {
                return false;
            }

            return ((this._level || 0) >= (this._expandLevel + (isRender ? 0 : 1)));
        },

        _resetLevel: function ()
        {
            this._level = 0;
        },
        _resetOverflow: function ()
        {
            if (this.$tableBody)
            {
                this.isOverflow = this.$tableBody.width() > this.$tableBody.parent().width();
                this._resetRightBorder();
                this._resetScrollBar();
            }
        },
        _resetRightBorder: function ()
        {
            if (this.isOverflow)
            {
                this.$container.children(".top-header,.table-body").css("border-right", "1px solid #d5dce3");
            }
            else
            {
                this.$container.children(".top-header,.table-body").css("border-right", "none");
            }
        },
        _resetScrollBar: function ()
        {
            if (this.isOverflow)
            {
                this._initScrollBar();
                this.$scrollBarWrap.show();
                this._adjustScrollBarPos();
            }
            else
            {
                this.$scrollBarWrap.hide();
            }
        },
        _initScrollBar: function ()
        {
            var viewWidth = this.$scrollBarWrap.width(),
                bodyTableWidth = this.$tableBody.width(),
                minBarWidth = 30,
                scrollWidth = bodyTableWidth - viewWidth;

            if (scrollWidth > viewWidth - minBarWidth)
            {
                this.scrollUnit = scrollWidth / (viewWidth - minBarWidth);
                this.$scrollBar.width(minBarWidth);
            }
            else
            {
                this.scrollUnit = 1;
                this.$scrollBar.width(viewWidth - scrollWidth);
            }
        },
        _scrollTableBody: function (x)
        {
            var start = this.$scrollBar.data("start"),
                left = this.$scrollBar.data("left"),
                btnWidth = this.$scrollBar.outerWidth(),
                width = this.$scrollBarWrap.width(),
                newposLeft = left + x - start;

            newposLeft = newposLeft <= 0 ? 0 : (newposLeft + btnWidth >= width ? (width - btnWidth) : newposLeft);

            this.$scrollBar.css("left", newposLeft);
            this.$tableBody.css("margin-left", -newposLeft * this.scrollUnit);
            this.$TopHeaderTable.css("margin-left", -newposLeft * this.scrollUnit);
            // 移除下拉选择框
            $("#dropMenuWrap").remove();
        },
        _adjustScrollBarPos: function ()
        {
            var top = this.$container.offset().top,
                scrollTop = $(document).scrollTop(),
                containerHeight = this.$container.outerHeight(),
                viewHeight = this.$win.height(),
                headerHeight = this.$fixedHeaderTable.outerHeight();

            if (top + headerHeight < (scrollTop + viewHeight)
                && (scrollTop + viewHeight) < (top + containerHeight))
            {
                this.$scrollBarWrap.css("margin-top", -(top + containerHeight - (scrollTop + viewHeight - 11)));
            }
            else
            {
                this.$scrollBarWrap.css("margin-top", -13);
            }
        },
        _showSideScrollBtn: function () {
            var $btns;

            this._clearHssTimer();
            // 存在滚动条
            if (this.isOverflow) {
                $btns = this.$JadannTable.children("a");
                if ($btns.is(":hidden")) {
                    $btns.css({ "opacity": 0, "display": "block" })
                        .stop().animate({ "opacity": 0.5 }, 300, "linear");
                }
            }
        },
        _clearHssTimer: function () {
            this.hssTimer && window.clearTimeout(this.hssTimer);
        },
        _delayHideSideScrollBtn: function () {
            var that = this;
            this._clearHssTimer();

            if (this.isOverflow) {
                this.hssTimer = window.setTimeout(function () {
                    that._hideSideScrollBtn();
                }, 1000);
            }
        },
        _hideSideScrollBtn: function () {
            var $btns, that = this;

            $btns = this.$JadannTable.children("a");

            if (!$btns.is(":hidden")) {
                $btns.stop().animate({ "opacity": 0 }, 300, "linear", function () {
                    that.$JadannTable.children("a").hide();
                });
            }
        },
        _triggerAutoScroll: function (bScrollLeft) {
            var that = this;
            if (!this._autoSTimer) {
                this._autoSTimer = window.setTimeout(function () {
                    that._autoScroll(bScrollLeft);
                }, 20);
            }
        },
        _autoScroll: function (bScrollLeft) {
            var scrollDis, bContinue = true;

            // 当前滚动的距离
            scrollDis = this.$topHeader.scrollLeft();
            scrollDis = scrollDis + (bScrollLeft ? -this._scrollSpeed : this._scrollSpeed);

            bContinue = this.scrollLeft(scrollDis);

            this._autoSTimer = null;
            if (bContinue) {
                this._triggerAutoScroll(bScrollLeft);
            }
        },
        scrollLeft: function (scrollDis) {
            var totalWidth, viewWidth, bContinue = true;
            if (scrollDis < 0) {
                scrollDis = 0;
                bContinue = false;
            }
            else {
                totalWidth = this.$TopHeaderTable.width();
                viewWidth = this.$topHeader.width();

                if (scrollDis > totalWidth - viewWidth) {
                    scrollDis = totalWidth - viewWidth;
                    bContinue = false;
                }
            }

            this.$bodyWrap.scrollLeft(scrollDis);
            this.$topHeader.scrollLeft(scrollDis);
            this.$scrollBar.css("left", scrollDis / this.scrollUnit);

            return bContinue;
        },
        cancelAutoScroll: function () {
            if (this._autoSTimer) {
                window.clearTimeout(this._autoSTimer);
                this._autoSTimer = null;
            }
        },
        // 获取选中行ID
        getCheckedRowIDs: function ()
        {
            var ids = [];

            this.$container.find(":checkbox:checked.checkbox").each(function ()
            {
                ids.push($(this).closest("tr").attr("id"));
            });

            return ids;
        },
        // 获取选中列
        getCheckedColumnIDs: function ()
        {
            var ids = [];

            this.$container.find(":checkbox:checked.column-checkbox").each(function ()
            {
                ids.push($(this).closest("th").attr("data-columnid"));
            });

            return ids;
        },
        getColumn: function (columnID)
        {
            if (this._columnsDD[columnID])
            {
                return this._columnsDD[columnID];
            }

            return null;
        },
        _triggerCheckRow: function ($checkbox)
        {
            var rowID, rowData;

            if (typeof this._onCheckRow === "function")
            {
                rowID = $checkbox.closest("tr").attr("id");
                rowData = this._getRowData(rowID);

                this._onCheckRow(rowID, $checkbox.prop("checked"), $checkbox);
            }
        }
    };


    $.fn.dataGrid = function (options)
    {
        if (typeof options === "string")
        {
            var args = arguments,
				method = options;

            Array.prototype.shift.call(args);

            return this.each(function ()
            {
                var dg = $(this).data('dataGrid');
                if (dg && dg[method])
                    dg[method].apply(dg, args);
            });
        }


        return this.each(function ()
        {
            var $this = $(this);

            options = options || {};
            options["$container"] = $this;

            new dataGrid(options);
            //$this.data("dataGrid", new dataGrid(options));
        });
    };

    Jadann.expand("Control", { "DataGrid": dataGrid });
})(jQuery, window, Jadann);
