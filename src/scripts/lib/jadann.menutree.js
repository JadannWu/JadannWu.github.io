;(function (win, Jadann)
{
    var utility = win.Jadann.utility,
        scm = win.Jadann.scm,
        ChoiceModel = {
            "None": 0,
            "Single": 1,
            "Multiple": 2,
            "Partial": 3
        },
        CheckState = {
            "UnChecked": 0,
            "Part": 1,
            "Checked": 2
        },
        DefaultSelected = {
            "None": 0,
            "First": 1,
            "FirstTail": 2
        };

    /*
    * 树形菜单
    * 作者：张敏强
    * 日期：2016-01-08
    * @param $container                 {jQuery} 树形菜单容器对象，相关配置属性如下：
    *  '<div class="Jadann-menutree" kd-datasource="" kd-rendercallback="" kd-clickcallback="" 
    *   kd-rootvalue="" kd-cssclass="" kd-sonid="" kd-parentid=""></div>'
    *       @attribute kd-url                 {string} 异步加载数据地址
    *       @attribute kd-cssclass            {string} 指定树形特别样式；
    *       @attribute kd-rendercallback      {string} 加载完成执行事件方法名称
    *       @attribute kd-clickcallback       {string} 点击菜单项事件名称, 
    *       @attribute kd-rootvalue           {string} 根值
    *       @attribute kd-id                  {string} 层级关系ID字段名称，默认为"ID"
    *       @attribute kd-parentid            {string} 层级关系ParentID字段名称，默认为"ParentID"
    *       @attribute kd-name                {string} 节点名称字段默认为"Name"
    *       @attribute kd-expandlevel         {number} 默认展开层级，默认为1， 0为展开全部
    *       @attribute kd-choicemodel         {ChoiceModel} 选择模式，None/Single/Multiple/Partial(类似windows系统功能启用)
    *       @attribute kd-parentclickenable   {string} 父级节点是否可选中，默认为"true",设为"false"，父节点不可点击。
    *       @attribute kd-checkedallsonenable     {string} 父级节点勾选中，选中所有子集， 默认为"true"，设为"false"
    *       @attribute kd-sortfield           {string} 排序字段名称
    *       @attribute kd-orderby             {string} 排序，默认为“asc”，降序为"desc"
    *       @attribute kd-clickedvalue        {string} 选中节点的值
    *       @attribute kd-defaultselected     {string} 默认选中方式，"None(不选中)/First(选中第一个节点,父节点不可选中会选中第一个末节点)/FirstTail(选中第一个末节点)",
    *           未设置kd-clickedvalue值得情况下，再根据kd-defaultselected设置值选中初始状态
    * 
    * 使用说明：
    *    
    * 
    * */
    function menuTree($container)
    {
        if (!$container || $container.length ===0)
        {
            return;
        }

        this.$container = $container;
        this._url = this.$container.attr("kd-url");
        this._rootValue = this.$container.attr("kd-rootvalue");
        if (!this._url || !this._rootValue)
        {
            return;
        }

        this._idField = this.$container.attr("kd-id") || "ID";
        this._parentIDField = this.$container.attr("kd-parentid") || "ParentID";
        this._nameField = this.$container.attr("kd-name") || "Name";
        this._cssClass = this.$container.attr("kd-cssclass") || "";
        this._rendercallback = win[this.$container.attr("kd-rendercallback")] || null;
        this._clickcallback = this.$container.attr("kd-clickcallback") || null;
        this._sortField = this.$container.attr("kd-sortfield");
        // 升序降序
        this._orderValue = (this.$container.attr("kd-orderby") || "asc").toLowerCase() === "asc" ? 1 : -1;
        this._choiceModel = ChoiceModel[this.$container.attr("kd-choicemodel")] || ChoiceModel["None"];
        this._partialChoiceModel = this._choiceModel === 3;
        this._parentClickEnable = (this.$container.attr("kd-parentclickenable") || "true") === "true";
        this._checkedallsonenable = (this.$container.attr("kd-checkedallsonenable") || "true") === "true";
        this._clickedValue = this.$container.attr("kd-clickedvalue");
        this._defaultSelected = DefaultSelected[this.$container.attr("kd-defaultselected")] || DefaultSelected["None"];

        this._dataSource = [];
        this._isInitComplete = false;
        this.$win = $(win);

        this._isDebug = this.$container.attr("kd-debug") || false;
        this._tree = [];
        this._childrenDD = {};
        this._idDD = {};
        this._treeDD = {};
        this._expandLevel = parseInt((this.$container.attr("kd-expandlevel") || 1), 10);

        this._init();
    }

    menuTree.prototype = {
        _init: function ()
        {
            this._loadDataSource(this._rootValue);
            this.$container.addClass("menu-tree" + (this._cssClass ? "" : " " + this._cssClass));
            
            this._bindEvent();
            this.$container.data("menutree", this);
        },
        _initCallback: function (data)
        {
            this._reSet();
            this._dataSource = data;
            this._teaseDataSource();
            this._sort();
            this._buildTreeCollection();
            this._generateHtml();
            this._initComplete();
        },
        _loadDataSource: function (nodeValue, callback)
        {
            var param = {}, that = this;

            nodeValue && (param[this._idField] = nodeValue);

            if (this._isDebug)
            {
                //that._initCallback(data);
            }
            else {
                utility.ajax(this._url, param, function (data, status)
                {

                    if (data)
                    {
                        typeof callback === "function" ? callback(data) : that._initCallback(data);
                    }
                }, "json");
            }
        },
        _bindEvent: function ()
        {
            var that = this;

            // 收缩子集
            this.$container.on("click", ".row-collapse", function ()
            {
                var $this = $(this),
                    $treeRow = $this.closest("li"),
                    fieldID = $treeRow.attr("id"),
                    treeRow = that._treeDD[fieldID],
                    btnType = {
                        lastChildRow: "row-expand row-last-child",
                        lastChildRowCollapse: "row-collapse row-last-child-collapse",
                        brosChildRow: "row-expand row-bros-child",
                        brosChildRowCollapse: "row-collapse row-bros-child-collapse"
                    };

                // 切换样式
                $this.removeClass(treeRow.isLastChildren ? btnType["lastChildRowCollapse"] : btnType["brosChildRowCollapse"])
                    .addClass(treeRow.isLastChildren ? btnType["lastChildRow"] : btnType["brosChildRow"]);

                // 隐藏子集
                that._hideChildrenRow.call(that, $treeRow);

                return false;
            });

            // 显示子集
            this.$container.on("click", ".row-expand", function ()
            {
                var $this = $(this),
                    $row = $this.closest("li"),
                    fieldID = $row.attr("id"),
                    treeRow = that._treeDD[fieldID],
                    callBack = function ()
                    {
                        if (treeRow.children && this.$container.find("#" + treeRow.children[0]["id"]).length === 0)
                        {
                            this._renderChildrenRow(treeRow, $row);
                        }
                        else
                        {
                            this._showChildrenRow($row);
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

            // 行点击事件
            this.$container.on("click", ".menu-row", function (e)
            {
                var $this = $(this), $li = $this.parent(), $target = $(e.target),
                    rowID = $li.attr("id"), rowData = that._getRowData(rowID),
                    treeRow = that._treeDD[rowID];

                if (($target.attr("type") || "").toLowerCase() === "checkbox" || $target.hasClass("partial-checkbox"))
                {
                    return;
                }

                if (that._parentClickEnable || !that._parentClickEnable && !treeRow.isHasChildren)
                {
                    that.$container.find("div.selected").removeClass("selected");
                    $this.addClass("selected");

                    if (that._clickcallback && typeof win[that._clickcallback] ==="function")
                    {
                        //that._clickcallback(rowID, rowData, treeRow.isHasChildren);
                        win[that._clickcallback](rowID, rowData, treeRow.isHasChildren);
                    }
                }

                // 展开或收缩子集
                if (treeRow.isHasChildren)
                {
                    $this.children(".row-collapse,.row-expand").trigger("click");
                }
            });

            // 选中子集
            this.$container.on("click", ":checkbox", function (e)
            {
                var $this = $(this), id;
                
                if (that._checkedallsonenable)
                {
                    id = $this.closest("li").attr("id");
                    // 子集
                    that._checkedAllChildrens(id, $this.prop("checked") ? CheckState["Checked"] : CheckState["UnChecked"]);
                    // 父级
                    that._checkedAllParents(id, $this.prop("checked") ? CheckState["Checked"] : CheckState["UnChecked"]);
                }

                //$this.prop("checked", !$this.prop("checked"));
                //return false;
            });

            // 末节点只有两种状态：选中、未选中；父节点存在三种状态：未选中、部分选中、全选（状态循环）
            this.$container.on("click", ".partial-checkbox", function ()
            {
                var $this = $(this),
                    id = $this.closest("li").attr("id"),
                    checkState;

                if ($this.hasClass("partial-unchecked"))
                {
                    $this.removeClass("partial-unchecked").addClass("partial-checked");

                    checkState = CheckState["Checked"];
                }
                else if ($this.hasClass("partial-checked"))
                {
                    $this.removeClass("partial-checked").addClass("partial-unchecked");

                    checkState = CheckState["UnChecked"];
                }
                else
                {
                    $this.removeClass("partial-part").addClass("partial-checked");
                    checkState = CheckState["Checked"];
                }

                // 子集
                that._checkedAllChildrens(id, checkState);
                // 父级
                that._checkedAllParents(id, checkState);
            });
        },
        /**
         * 功能:梳理数据的层级关系。
         * 1. 指定的kd-sonid字段值为子id，kd-parentid字段值为父id；
         * 2. 构建_idDD数据字典，格式：{rowID:row} rowID为当前行kd-sonid字段值，row为当前的行数据对象
         * 3. 构建_treeDD字典，最终格式{rowID:treeRow},rowID为FullID的末端ID，treeRow对象格式如下：
         *  {
         *      id:"rowID",             
         *      parentID:"parentRowID", 
         *      children:[],            // 包含子集对象，为treeRow集合
         *      isLastChildren:false/true,  // 是否末端数据行；
         *      isHasChildren:false/true, //是否存在子集
         *      level:1,        // 当前层级数
         *      prefix:'<span class="row-prefix row-blank"></span>' //子集的前缀部分
         *  }
         * 4. 构建_childrenDD字典，以备构建行、排序，格式{parentID:[rowID1, rowID2,...]}
         */
        _teaseDataSource: function ()
        {
            var row, rowID, rowParentID;

            if (!this._dataSource || this._dataSource.length === 0)
            {
                return;
            }

            for (var i = 0; i < this._dataSource.length; i++)
            {
                row = this._dataSource[i];
                rowID = row[this._idField];
                rowParentID = row[this._parentIDField];
                this._idDD[rowID] = row;
                this._treeDD[rowID] = { id: rowID, parentID: rowParentID, children: [] };

                if (!this._childrenDD[rowParentID])
                {
                    this._childrenDD[rowParentID] = [];
                }

                this._childrenDD[rowParentID].push(rowID);
            }
        },
        _sort: function ()
        {
            if (this._sortField)
            {
                for (var parentID in this._childrenDD)
                {
                    if (this._childrenDD.hasOwnProperty(parentID))
                    {
                        this._sortChildren(parentID);
                    }
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
                    var row1 = that._getRowData(fieldID1),
                        row2 = that._getRowData(fieldID2),
                        sortValue1, sortValue2;

                    if (typeof that._sortFun === "function")
                    {
                        return that._sortFun(row1, row2);
                    }

                    sortValue1 = row1[that._sortField];
                    sortValue2 = row2[that._sortField];

                    return sortValue1 > sortValue2 ? that._orderValue : (sortValue1 < sortValue2 ? -(that._orderValue) : 0);
                });
            }
        },
        _buildTreeCollection: function ()
        {
            var childrenIDs, i, len;

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
        _generateHtml: function ()
        {
            var i, len, row, rowsHtml = [];

            if (!this._dataSource || this._dataSource.length === 0)
            {
                return;
            }

            this._resetLevel();
            this._levelIncrease(1)
            this._addLevelEnabled(true);

            for (var i = 0, len = this._tree.length; i < len; i++)
            {
                rowsHtml.push(this._generateRowHtml(this._tree[i], null));
            }

            this.$container.append($(this._getRowsWrapHtml(rowsHtml.join(""))));
        },
        _generateRowHtml: function (row, parentRow)
        {
            var that = this,
                rowHtml = '<li id="{$rowID}"><div class="menu-row{$disabled}">{$prefix}{$selectControl}<span class="row-name">{$rowName}</span></div>{$childrenRows}</li>',
                selectControl = ["", '<input type="radio" />', '<input type="checkbox" />', '<span class="partial-checkbox partial-unchecked"></span>'],
                rowData = this._getRowData(row.id);

            return rowHtml.replace(/\{\$(\w+)\}/g, function (value, word)
            {
                switch (word)
                {
                    case "rowID":
                        return row.id;
                    case "rowName":
                        return rowData[that._nameField] || "";
                    case "prefix":
                        return that._getRowPrefix.call(that, row, parentRow);
                    case "childrenRows":
                        return (that._addLevelEnabled.call(that, true) && row.children
                            && row.children.length > 0 ? that._generateChildrensHtml.call(that, row) : "");
                    case "selectControl":
                        return selectControl[that._choiceModel];
                    //case "disabled":
                    //    return !that._parentClickEnable && row.children.length > 0 ? " disabled" : "";
                    default:
                        return "";
                }
            });
        },
        _generateChildrensHtml: function (parentRow, bHide)
        {
            var childrenRows = parentRow.children,
                childrensHtml = [];

            if (childrenRows && childrenRows.length > 0)
            {
                for (var i = 0; i < childrenRows.length; i++)
                {
                    var row = childrenRows[i];

                    childrensHtml.push(this._generateRowHtml(row, parentRow));
                }

                return this._getRowsWrapHtml(childrensHtml.join(""), bHide);
            }

            return "";
        },
        _getRowsWrapHtml: function (rowsHtml, bHide)
        {
            var rowsWrapHtml = '<ul {$hide}>{$rowsHtml}</ul>';

            return rowsWrapHtml.replace(/\{\$rowsHtml\}/, rowsHtml)
                .replace(/\{\$hide\}/g, bHide ? 'class="hide"' : '');
        },
        _renderChildrenRow: function (treeRow, $row)
        {
            var that = this;
            // 遍历两层级的子集
            this._levelIncrease(1);
            this._buildChildrenCollection(treeRow);
            this._sortField && this._sortChildren(treeRow["id"]);

            $row.append($(this._generateChildrensHtml(treeRow, true)))
                .children("ul").slideDown(200, function ()
                {
                    that.$win.trigger("resize");
                });
        },
        _getRowData: function (rowID)
        {
            return this._idDD[rowID];
        },
        _getChildrenIDs: function (id)
        {
            return this._childrenDD[id];
        },
        _getRowDataProperty: function (rowData, prop)
        {
            return typeof rowData === "string" ? this._getRowData(rowData)[prop] :
                (typeof rowData === "object" ? rowData[prop] : undefined);
        },
        _initComplete: function ()
        {
            if (typeof this._rendercallback === "function")
            {
                this._rendercallback();
            }

            // 设置选中值
            if (!utility.isUndefined(this._clickedValue) && this._clickedValue !== "")
            {
                this.setClickedRow(this._clickedValue);
            }
            // 默认选中：第一个节点、第一个末节点
            else if (this._defaultSelected)
            {
                // 父节点不可点击时会选中第一个末节点
                if (this._defaultSelected === DefaultSelected["First"] && this._parentClickEnable)
                {
                    var clickedValue = this.getFirstRowID();

                    this.setClickedRow(clickedValue);
                }
                else
                {
                    var tailIDArray = this._getFirstTailIDArray();

                    if (tailIDArray.length > 0)
                    {
                        var childrenID = tailIDArray.pop();

                        this._collapseLevelsPrefix(tailIDArray);

                        this.$container.find("#" + childrenID)
                            .children(".menu-row").trigger("click");
                    }
                }
            }
        },
        _levelIncrease: function (number)
        {
            this._level = (this.level || 0) + number;
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
        _setChildrenPreFix: function (row, parentRow, isLastChildren)
        {
            var template = '<span class="row-prefix {$prefix}"></span>',
                preType = isLastChildren ? "row-blank" : "row-line";

            row.isLastChildren = isLastChildren;
            row.level = (parentRow && parentRow.level || 0) + 1;

            row.prefix = (parentRow && parentRow.prefix || "") + template.replace(/\{\$prefix\}/g, preType);
        },
        _setRowCollapsePrefix: function (treeRow, $this)
        {
            $this = $this || this.$container.find("#" + treeRow["id"] + ">.menu-row").find(".row-expand,.row-bros,.row-last");
            var prefix = {
                lastChildRow: "row-expand row-last-child row-last",
                lastChildRowCollapse: "row-collapse row-last-child-collapse",
                brosChildRow: "row-expand row-bros-child row-bros",
                brosChildRowCollapse: "row-collapse row-bros-child-collapse"
            }

            $this.removeClass(treeRow.isLastChildren ? prefix["lastChildRow"] : prefix["brosChildRow"])
                            .addClass(treeRow.isLastChildren ? prefix["lastChildRowCollapse"] : prefix["brosChildRowCollapse"])
        },
        _collapseLevelsPrefix: function (parentIDArray)
        {
            var parentTreeRow, $row, $childrenRow;
            // 逐层展开
            for (var i = 0, len = parentIDArray.length; i < len; i++)
            {
                if (this._treeDD.hasOwnProperty(parentIDArray[i]))
                {
                    parentTreeRow = this._treeDD[parentIDArray[i]];
                    $row = this.$container.find("#" + parentIDArray[i]);
                    $childrenRow = this.$container.find("#" + parentTreeRow.children[0]["id"]);

                    if (parentTreeRow.children && $childrenRow.length === 0)
                    {
                        this._renderChildrenRow(parentTreeRow, $row);
                    }
                    else
                    {
                        this._showChildrenRow($row);
                    }

                    this._setRowCollapsePrefix(parentTreeRow);
                }
            }
        },
        _getRowPrefix: function (row, parentRow)
        {
            var prefixHtml = '<span class="row-prefix {$prefix}"></span>',
                preType, prefixClass = {
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

            return ((parentRow && parentRow.prefix || "") + prefixHtml.replace(/\{\$prefix\}/g, prefixClass[preType]));
        },
        _hideChildrenRow: function ($row)
        {
            var that = this;
            $row = typeof $row === "string" ? $($row) : $row;

            $row.children("ul").stop().slideUp(100, function ()
            {
                that.$win.trigger("resize");
            });
        },
        _showChildrenRow: function ($row)
        {
            var that = this;
            $row = typeof $row === "string" ? $($row) : $row;

            $row.children("ul").stop().slideDown(200, function ()
            {
                that.$win.trigger("resize");
            });
        },
        _reSet: function ()
        {
            this._idDD = {};
            this._treeDD = {};
            this._childrenDD = {};
            this._tree = [];
            this.$container.children("ul").remove();
        },
        // 设置子集只有选中、未选中
        _checkedAllChildrens:function(parentID, checkState){
            var childrens = this._getChildrenIDs(parentID);

            if (childrens && childrens.length > 0)
            {
                for (var i = 0, len = childrens.length; i < len; i++)
                {
                    if (this._partialChoiceModel)
                    {
                        this.$container.find("#" + childrens[i]).children("div").children(".partial-checkbox")
                            .removeClass(checkState ? "partial-unchecked partial-part" : "partial-part partial-checked")
                            .addClass(checkState ? "partial-checked" : "partial-unchecked");
                    }
                    else
                    {
                        this.$container.find("#" + childrens[i]).children("div").children(":checkbox").prop("checked", checkState ? true : false);
                    }

                    this._checkedAllChildrens(childrens[i], checkState);
                }
            }
        },
        // 获取所有子集的选中状态:全选、部分选中、未选中
        _getAllChildrensCheckState: function (parentID)
        {
            var childrens = this._getChildrenIDs(parentID),
                $childrenCheck, checkState;

            if (childrens && childrens.length > 0)
            {
                checkState = CheckState["UnChecked"]
                for (var i = 0, len = childrens.length; i < len; i++)
                {
                    $childrenCheck = this.$container.find("#" + childrens[i]).children("div")
                        .children(".partial-checkbox");

                    // 存在部分选中
                    if ($childrenCheck.hasClass("partial-part"))
                    {
                        checkState = CheckState["Part"];
                        break;
                    }

                    // 存在选中和未选中
                    if (checkState === CheckState["Checked"] && $childrenCheck.hasClass("partial-unchecked"))
                    {                        
                        checkState = CheckState["Part"];
                        break;
                    }

                    // 存在未选中和部分选中，则返回部分选中状态
                    if ($childrenCheck.hasClass("partial-checked"))
                    {
                        checkState = CheckState["Checked"];
                    }
                }

                return checkState;
            }
            else
            {
                // 不存在子集默认选中
                return CheckState["Checked"];
            }
        },
        // 父级存在部分选中 
        _checkedAllParents: function (childrenID, checkState)
        {
            var treeRow = this._treeDD[childrenID], parentTreeRow, childrenIDs;

            if (treeRow)
            {
                parentTreeRow = this._treeDD[treeRow["parentID"]];

                // 不存在表明是顶级节点
                if (parentTreeRow)
                {
                    if (this._partialChoiceModel)
                    {
                        var $partialCheckbox, bExists = false;
                        switch (checkState)
                        {
                            case 0:
                                // 父级两种状态：部分选中、未选中
                                childrenIDs = this._getChildrenIDs(parentTreeRow["id"]);

                                for (var i = 0, len = childrenIDs.length; i < len; i++)
                                {
                                    $partialCheckbox = this.$container.find("#" + childrenIDs[i]).children("div").children(".partial-checkbox");

                                    if ($partialCheckbox.hasClass("partial-checked") || $partialCheckbox.hasClass("partial-part"))
                                    {
                                        bExists = true;
                                        break;
                                    }
                                }

                                this.$container.find("#" + parentTreeRow["id"]).children("div")
                                        .children(".partial-checkbox").removeClass("partial-checked " + (bExists ? "partial-unchecked" : "partial-part"))
                                        .addClass(bExists ? "partial-part" : "partial-unchecked");
                                this._checkedAllParents(parentTreeRow["id"], bExists ? 1 : 0);
                                break;
                            case 1:
                                // 父级两种状态：部分选中
                                this.$container.find("#" + parentTreeRow["id"]).children("div")
                                        .children(".partial-checkbox").removeClass("partial-checked partial-unchecked")
                                        .addClass("partial-part");

                                this._checkedAllParents(parentTreeRow["id"], 1);
                            case 2:
                                // 父级两种状态：部分选中、选中
                                childrenIDs = this._getChildrenIDs(parentTreeRow["id"]);

                                for (var i = 0, len = childrenIDs.length; i < len; i++)
                                {
                                    $partialCheckbox = this.$container.find("#" + childrenIDs[i]).children("div").children(".partial-checkbox");

                                    if ($partialCheckbox.hasClass("partial-unchecked") || $partialCheckbox.hasClass("partial-part"))
                                    {
                                        bExists = true;
                                        break;
                                    }
                                }

                                this.$container.find("#" + parentTreeRow["id"]).children("div")
                                    .children(".partial-checkbox").removeClass("partial-unchecked " + (bExists ? "partial-checked" : "partial-part"))
                                    .addClass(bExists ? "partial-part" : "partial-checked");

                                this._checkedAllParents(parentTreeRow["id"], bExists ? 1 : 2);                                
                                break;
                        }
                    }
                    else
                    {
                        if (checkState)
                        {
                            childrenIDs = this._getChildrenIDs(parentTreeRow["id"]);

                            for (var i = 0, len = childrenIDs.length; i < len; i++)
                            {
                                if (!this.$container.find("#" + childrenIDs[i]).children("div").children(":checkbox").prop("checked"))
                                {
                                    return;
                                }
                            }

                            this.$container.find("#" + parentTreeRow["id"]).children("div")
                                .children(":checkbox").prop("checked", true);

                            // 验证父级的父级
                            this._checkedAllParents(parentTreeRow["id"], checkState);
                        }
                        else
                        {
                            this.$container.find("#" + parentTreeRow["id"]).children("div")
                                .children(":checkbox").prop("checked", false);
                        }
                    }
                }
            }
        },
        getSelectedRowIDs: function ()
        {
            var ids = [];
            if (this._partialChoiceModel)
            {
                this.$container.find("span.partial-checked, span.partial-part").each(function ()
                {
                    ids.push($(this).closest("li").attr("id"));
                });
            }
            else
            {
                this.$container.find(":checkbox:checked, :radio:checked").each(function ()
                {
                    ids.push($(this).closest("li").attr("id"));
                });
            }

            return ids;
        },
        setSelectedRow: function (ids, bClear)
        {
            if (utility.isArray(ids))
            {
                if (this._partialChoiceModel)
                {
                    bClear && this.$container.find("span.partial-checked, span.partial-part").removeClass("partial-checked partial-part")
                        .addClass("partial-unchecked");
                
                    for (var i = 0, len = ids.length; i < len; i++)
                    {
                        // 末节点设置选中状态
                        if (!this.isHasChildren(ids[i]))
                        {
                            this.$container.find("#" + ids[i]).children("div").children(".partial-checkbox")
                                .removeClass("partial-unchecked partial-part").addClass("partial-checked");
                        }
                        // 子集不管
                        // this._checkedAllChildrens(ids[i], 2);
                        // 父级
                        this._checkedAllParents(ids[i], 2);
                    }
                }
                else
                {
                    bClear && this.$container.find(":checkbox").prop("checked", false);
                    for (var i = 0, len = ids.length; i < len; i++)
                    {
                        this.$container.find("#" + ids[i]).children("div").children(":checkbox").prop("checked", true);
                    }
                }
            }
        },
        isHasChildren: function (id)
        {
            if (this._childrenDD[id] && this._childrenDD[id].length > 0)
            {
                return true;
            }

            return false;
        },
        // 判断选中项是否存在子集
        isSelectedHasChildren: function ()
        {
            var id = this.$container.find("div.selected").closest("li").attr("id");
           
            return this.isHasChildren(id);
        },
        // 设置选中的节点
        setClickedRow: function (id)
        {
            var parentIDArray = [];

            // 找到顶级的父节点，依次展开子节点
            if (arguments.length === 0 || utility.isUndefined(id) || !this._idDD.hasOwnProperty(id))
            {
                return;
            }

            parentIDArray = this._getParentIDArray(id);
            // 逐层展开
            this._collapseLevelsPrefix(parentIDArray);

            // 触发点击事件
            this.$container.find("#" + id).children(".menu-row").trigger("click");
        },
        // 父级数组，由顶级往低级排列
        _getParentIDArray: function (id)
        {
            var parentIDArray = [], parentID;

            parentID = this._getParentID(id);

            while (!utility.isUndefined(parentID))
            {
                parentIDArray.unshift(parentID);
                parentID = this._getParentID(parentID);
            }

            return parentIDArray;
        },
        _getParentID: function (id)
        {
            var treeRow = this._treeDD[id];

            return treeRow ? treeRow["parentID"] : void 0;
        },
        _getFirstChildrenID: function (id)
        {
            var childrenIDs = this._childrenDD[id];

            return childrenIDs && childrenIDs.length > 0 ? childrenIDs[0] : void 0;
        },
        getFirstRowID: function ()
        {
            var id, 
                treeRow = this._treeDD[this._rootValue];

            if (!treeRow)
            {
                id = this._tree.length === 0 ? void 0 : this._tree[0]["id"];
            }
            else
            {
                id = treeRow["id"];
            }

            return id;
        },
        // 获取一个末节点
        _getFirstTailIDArray: function ()
        {
            var tailIDArray = [], childrenID;

            childrenID = this._getFirstChildrenID(this._rootValue);

            while (!utility.isUndefined(childrenID))
            {
                tailIDArray.push(childrenID);
                childrenID = this._getFirstChildrenID(childrenID);
            }

            return tailIDArray;
        }
    };


    Jadann.expand("Control", { "MenuTree": menuTree });
})(window, Jadann);
