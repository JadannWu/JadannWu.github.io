; (function (Jadann)
{
    var parseDate = Jadann.utility.parseDate,
        format = Jadann.utility.fomartDateString,
        getNow = Jadann.utility.getNow;
    /*
      * 月份选择控件
      * 功能实现要求：
      * 1. 可限制选择日期范围；
      * 2. 可输入年份
      * 3. 暂时支持选择月份
      * 
      * data-notallow="['']"
      */
    function datePicker()
    {
    }

    datePicker.bindEvent = function ()
    {
        var $doc = $(document);

        // 隐藏下列选择框
        $doc.on("click", function ()
        {
            datePicker.hideDatePickerPanel();
        });

        $doc.on("click", ".Jadann-datepicker", function ()
        {
            if (datePicker.activeInstance === this)
            {
                return;
            }

            datePicker.hideDatePickerPanel();
            datePicker.activeInstance = this;

            datePicker.showDatePickerPanel();

            return false;
        });

        // 上一年
        $doc.on("click", ".date-picker-prev", function ()
        {
            var $this = $(this),
                $yearInput = $this.parent().find("input");

            $yearInput.val(parseInt($yearInput.val(), 10) - 1);
            datePicker.renderTable();

            return false;
        });

        // 下一年
        $doc.on("click", ".date-picker-next", function ()
        {
            var $this = $(this),
                $yearInput = $this.parent().find("input");

            $yearInput.val(parseInt($yearInput.val(), 10) + 1);
            datePicker.renderTable();
            return false;
        });

        // 输入值改变
        $doc.on("change", ".date-picker-title input", function ()
        {
            var $this = $(this),
                oldDate = parseDate($(datePicker.activeInstance).attr("data-value")),
                year = parseInt($this.val(), 10);

            if (isNaN(year) || year.toString().length !== 4)
            {
                $this.val(oldDate && oldDate.getFullYear() || getNow().getFullYear());
            }

            datePicker.renderTable();

            return false;
        });

        // 输入值
        $doc.on("keyup", ".date-picker-title input", function ()
        {
            var $this = $(this),
                year = parseInt($this.val(), 10);

            if (isNaN(year) || year.toString().length !== 4)
            {
                return;
            }

            if (isNaN(year) || year.toString().length !== 4)
            {
                $this.val($(datePicker.activeInstance).attr("data-value"));
            }

            datePicker.renderTable();

            return false;
        });

        $doc.on("click", ".date-picker-title, .date-picker-title .date-picker-unittext", function ()
        {
            return false;
        });

        $doc.on("click", ".date-picker-title input", function ()
        {
            $(this).select();
            return false;
        });

        // 选中日期事情
        $doc.on("click", ".date-picker-body td", function ()
        {
            var $this = $(this), year, $datePicker, view, val;

            if ($this.hasClass("date-picker-disabled"))
            {
                return false;
            }
            
            year = $this.closest("div.date-picker-tool").find("input").val();
            $datePicker = $(datePicker.activeInstance);
            view = $datePicker.attr("data-view");

            datePicker.hideDatePickerPanel();
            switch (view)
            {
                case "Quarter":
                    val = year + "年" + $this.text();

                    if (val !== $datePicker.val()) {
                        $datePicker.val(val);
                        $datePicker.attr("data-value", datePicker.getMonthByQuarter(val));

                        $datePicker.trigger("valueChange");
                    }
                    break;
                case "MidYear":
                    var txt = year + "年" + $this.text();
                    val = datePicker.getValueByMidYear(txt);

                    if (val !== $datePicker.attr("data-value")) {
                        $datePicker.val(txt);
                        $datePicker.attr("data-value", val);

                        $datePicker.trigger("valueChange");
                    }

                    break;
                default:
                    val = year + "年" + $this.text() + "月";
                    if ($datePicker.attr("data-value") !== val) {
                        $datePicker.val(val);
                        $datePicker.attr("data-value", val);

                        $datePicker.trigger("valueChange");
                    }
            }

            // 选择事件
            if (typeof $datePicker.data("selectDate") === "function")
            {
                $datePicker.data("selectDate")(val);
            }

            return false;
        });

        $doc.on("mouseover", ".date-picker-body td", function ()
        {
            $(this).addClass("date-picker-hover");
        }).on("mouseout", ".date-picker-body td", function ()
        {
            $(this).removeClass("date-picker-hover");
        });
    }

    // 弹出显示选择日期层
    // 为季度选择时输入框的值需转换
    datePicker.showDatePickerPanel = function ()
    {
        var $datePicker = $(datePicker.activeInstance),
            pos = $datePicker.offset();
            var value = parseDate($datePicker.attr("data-value")),
            view = $datePicker.attr("data-view"),
            now = getNow(),
            minDate = parseDate($datePicker.attr("data-minvalue")),
            maxDate = parseDate($datePicker.attr("data-maxvalue")),
            year = value && value.getFullYear() || now.getFullYear(),
            panel = ['<div id="datePickerPanel" class="date-picker-tool">',
                    '<div class="date-picker-header">',
                        '<a href="javascript:void(0)" title="上一年" class="date-picker-prev"><span><</span></a>',
                        '<a href="javascript:void(0)" title="下一年" class="date-picker-next"><span>></span></a>',
                        '<div class="date-picker-title">',
                            '<input type="text" value="', 6, '"/><span class="date-picker-unittext">年</span>',
                        '</div>',
                     '</div>',
                     10,
                  '</div>'],
            beforeRender = $datePicker.data("beforeRender"),
            onRender = $datePicker.data("onRender");

        //$datePicker.val(datePicker.getDatePickerValueText($datePicker, value));
        panel[6] = year;
        //panel[10] = view === "Quarter" ? datePicker.getQuarterTable(value, now, year, minDate, maxDate)
        //    : datePicker.getMonthTable(value, now, year, minDate, maxDate);

        // 渲染之前的事件
        if (typeof beforeRender === "function") {
            beforeRender(year);
        }

        panel[10] = getTable(view, value, now, year, minDate, maxDate);

        var $body = $("body");
        $datePickerPanel = $(panel.join(""));

        $body.append($datePickerPanel);
        var left;

        if (pos.left + $datePickerPanel.outerWidth() > $body.outerWidth()) {
            left = $body.outerWidth() - $datePickerPanel.outerWidth()-5;
        }
        else {
            left = pos.left;
        }

        // 渲染之后的事件
        if (typeof onRender === "function") {
            onRender(year);
        }

        $datePickerPanel.css({ top: pos.top + $datePicker.outerHeight() + 2, left: left })
            .stop().show();
    };

    datePicker.getDatePickerValueText = function ($datePicker, value)
    {
        if (!value)
        {
            return "";
        }

        var getValueText = function (value)
        {
            var valText = value.getFullYear() + "年";

            valText += datePicker.getQuarterTextByMonth(value.getMonth());

            return valText;
        };

        return $datePicker.attr("data-view") === "Quarter" ? getValueText(value) : $datePicker.attr("data-value");
    };

    datePicker.getQuarterTextByMonth = function (month)
    {
        var text = "";
        switch (month)
        {
            case 0:
            case 1:
            case 2:
                text = "第1季度";
                break;
            case 3:
            case 4:
            case 5:
                text = "第2季度";
                break;
            case 6:
            case 7:
            case 8:
                text = "第3季度";
                break;
            case 9:
            case 10:
            case 11:
                text = "第4季度";
                break;
        }

        return text;
    };

    datePicker.getValueByMidYear = function (val) {
        if (val.indexOf("上半年") !== -1) {
            val = val.replace("上半年", "1月");
        } else {
            val = val.replace("下半年", "7月");
        }
        return val;
    };

    datePicker.getMonthByQuarter = function (quarter)
    {
        return quarter.replace(/第([1-4])季度/g, function (match, word)
        {
            switch (word)
            {
                case "1":
                    return "1月";
                case "2":
                    return "4月";
                case "3":
                    return "7月";
                case "4":
                    return "10月";
            }
        });
    }

    datePicker.getMonthTrHtml = function (date, now, year, minDate, maxDate)
    {
        var tr = ['<tr>', 1, '</tr>'], i,
            trHtml, trHtmlArray = [],
            cloneArray = trHtmlArray.slice,
            $datePicker = $(datePicker.activeInstance),
            notAllow = $datePicker.attr("data-notallow"),
            getTdHtml = function (curMonth, minDate, maxDate)
            {
                var td = ['<td class="', 1, '"><a href="javascript:void(0)">', 3, '</a></td>'],
                    curDate = new Date(year, curMonth);

                td[1] = "";
                if (minDate && curDate <= minDate)
                {
                    td[1] = "date-picker-disabled";
                }

                if (maxDate && maxDate <= curDate)
                {
                    td[1] = "date-picker-disabled";
                }

                // 存在的禁选
                if (notAllow && !td[1] && notAllow.indexOf(format(curDate, "yyyy-MM")) !== -1) {
                    td[1] = "date-picker-disabled";
                }
                    // 选中日期
                if (date && date.getFullYear() === year && date.getMonth() === curMonth)
                {
                    td[1] += " date-picker-selected";
                }
                // 当前月份
                if (now.getFullYear() === year && now.getMonth() === curMonth)
                {
                    td[1] += " date-picker-curmonth";
                }

                td[3] = (curMonth + 1) + "";

                return td.join("");
            };

        for (i = 0; i < 12; i++)
        {
            if (i % 4 === 0)
            {
                trHtml = cloneArray.call(tr);
                trHtml[1] = "";
            }

            trHtml[1] += getTdHtml(i, minDate, maxDate);

            if (i % 4 === 3)
            {
                trHtmlArray.push(trHtml.join(""));
            }
        }

        return trHtmlArray.join("");
    }

    datePicker.renderTable = function ()
    {
        var $datePickerPanel = $("#datePickerPanel"),
            $datePicker = $(datePicker.activeInstance);

            var view = $datePicker.attr("data-view"),
            minDate = parseDate($datePicker.attr("data-minvalue")),
            maxDate = parseDate($datePicker.attr("data-maxvalue")),
            value = parseDate($datePicker.attr("data-value")),
            now = getNow();
            $yearInput = $datePickerPanel.find("input"),
            year = parseInt($yearInput.val(), 10),
            $table = $datePickerPanel.find("table.date-picker-body"),
            beforeRender = $datePicker.data("beforeRender"),
            onRender = $datePicker.data("onRender");

        $yearInput.val(year);
        $table.find("tr").remove();
        
        // 渲染之前的事件
        if (typeof beforeRender === "function")
        {
            beforeRender(year);
        }

        $table.append(getTableTr(view, value, now, year, minDate, maxDate));

        // 渲染之后的事件
        if (typeof onRender === "function") {
            onRender(year);
        }
    }

    datePicker.getQuarterTrHtml = function (date, now, year, minDate, maxDate)
    {
        var tr = ['<tr>', 1, '</tr>'], i,
           trHtml, trHtmlArray = [],
           cloneArray = trHtmlArray.slice,
           quarter1 = { s: new Date(year, 0), e: new Date(year, 2) },
           quarter2 = { s: new Date(year, 3), e: new Date(year, 5) },
           quarter3 = { s: new Date(year, 6), e: new Date(year, 8) },
           quarter4 = {s :new Date(year, 9), e:new Date(year, 11) },
           getQuerterRange = function (curMonth)
           {
               var range = {};
               switch (curMonth)
               {
                   case 0:
                   case 1:
                   case 2:
                       range = quarter1;
                       break;
                   case 3:
                   case 4:
                   case 5:
                       range = quarter2;
                       break;
                   case 6:
                   case 7:
                   case 8:
                       range = quarter3;
                       break;
                   case 9:
                   case 10:
                   case 11:
                       range = quarter4;
                       break;
               }

               return range;
           },
           getTdHtml = function (index, minDate, maxDate)
           {
               var td = ['<td class="', 1, ('" data-value="' + index + '"><a href="javascript:void(0)">'), 3, '</a></td>'],
                    curDate = new Date(year, index * 3), range = getQuerterRange(index * 3);
                

               td[1] = "";
               if (minDate && range.e < minDate)
               {
                   td[1] = "date-picker-disabled";
               }

               if (maxDate && maxDate < range.s)
               {
                   td[1] = "date-picker-disabled";
               }
               // 选中季度
               if (date && range.s <= date && date <= range.e)
               {
                   td[1] += " date-picker-selected";
               }
               // 当前季度
               if ( range.s <= now  && now <= range.e)
               {
                   td[1] += " date-picker-curmonth";
               }

               td[3] = datePicker.getQuarterTextByMonth(index * 3);

               return td.join("");
           };
            
        for (i = 0; i < 4; i++)
        {

            trHtml = cloneArray.call(tr);
            trHtml[1] = "";
            trHtml[1] += getTdHtml(i, minDate, maxDate);

            trHtmlArray.push(trHtml.join(""));
        }

        return trHtmlArray.join("");
    }

    // 1表示上半年；2表示下半年
    datePicker.getMidYearTrHtml = function (date, now, year, minDate, maxDate) {
        var tr = ['<tr>', "", '</tr>'], i,
           getMidYearRange = function (curMonth) {
               var range = {};
               switch (curMonth) {
                   case 1:
                       range = { s: new Date(year, 0), e: new Date(year, 5) };
                       break;
                   case 2:
                       range = { s: new Date(year, 6), e: new Date(year, 11) };
                       break;
               }

               return range;
           },
           getMidYearText = function (index) {
               var txt = "";
               switch (index) {
                   case 1:
                       return "上半年";
                   case 2:
                       return "下半年";
               }
           },
           getTdHtml = function (index, minDate, maxDate) {
               var td = ['<td class="', 1,('" data-value="' + index + '"><a href="javascript:void(0)">'),
                   3, '</a></td>'],
                   range = getMidYearRange(index);


               td[1] = "";
               if (minDate && range.e < minDate) {
                   td[1] = "date-picker-disabled";
               }

               if (maxDate && maxDate < range.s) {
                   td[1] = "date-picker-disabled";
               }
               // 选中季度
               if (date && range.s <= date && date <= range.e) {
                   td[1] += " date-picker-selected";
               }
               // 当前季度
               if (range.s <= now && now <= range.e) {
                   td[1] += " date-picker-curmonth";
               }

               td[3] = getMidYearText(index);

               return td.join("");
           };

        for (i = 1; i < 3; i++) {
            tr[1] += getTdHtml(i, minDate, maxDate);
        }

        return tr.join("");
    };

    // 移除显示选择日期层
    datePicker.hideDatePickerPanel = function ()
    {
        $("#datePickerPanel").remove();
        datePicker.activeInstance = null;
    };

    datePicker.bindEvent();
 
    function getTable(view, date, now, year, minDate, maxDate) {
        var table = ['<table class="date-picker-body">', 1, '</table>'];

        table[1] = getTableTr.apply(datePicker, arguments);

        return table.join("");
    }

    function getTableTr(view, date, now, year, minDate, maxDate) {
        var args = Array.prototype.slice.call(arguments),
            view = args.shift(); 

        switch (view) {
            case "Quarter":
                return datePicker.getQuarterTrHtml.apply(datePicker, args);
            case "MidYear":
                return datePicker.getMidYearTrHtml.apply(datePicker, args);
            default:
                return datePicker.getMonthTrHtml.apply(datePicker, args);
                break;
        }
    }
})(Jadann);