/**
 * Created by WUQD on 2016/12/6.
 */
(function ($, Jadann) {
    var utility = Jadann.utility,
        post = utility.post,
        get = utility.get,
        typeEnum = {
            "G": "GET",
            "P": "POST",
            "S":"STRINGIFY" // post形式，传递data需要JSON2.stringify处理
        }, getDBFun = function (config) {
            var type = typeEnum[config["type"]] || typeEnum["G"],
                fn = type === typeEnum["G"] ? get : post;

            // 最多两位参数：1. 仅有回调；2.传参和回调
            return function () {
                var arg = Array.prototype.slice.call(arguments), len = arguments.length;
                if (len === 0) {
                    throw config["url"] + "参数为空请调整";
                }

                // 取出最后一个回调函数
                var callback = arg.pop();
                if (!utility.isFunction(callback)) {
                    throw config["url"] + "最后一个参数非回调函数";
                }

                // 处理参数
                var data = null;
                // 考虑已调用接口传多个参数情况
                if (utility.isFunction(config["convertData"])) {
                    data = config["convertData"].apply(this, arg);
                } else {
                    data = arg.length === 0 ? {} : arg[0];
                }

                fn.call(this, config["url"], type === typeEnum["S"] ? JSON2.stringify(data) : data, callback,
                    type === typeEnum["S"] ? true : void 0);
            };
        };

    Jadann.DB = Jadann.DB || {};

    /**
     * 注册后端接口
     * { url: "/landDeveloper/getDThjkProjectDetailIn.do", type: "GET/POST/STRINGIFY" }
     * @param bCover {boolean} 是否覆盖，为true会替换掉已存在的接口方法
     */
    utility.registerDBInterface = function (config, bCover) {
        for (var prop in config) {

            if (!config.hasOwnProperty(prop)) {
                continue;
            }

            // 检验url属性值是否存在
            if (!config[prop] || !config[prop]["url"]) {
                return;
            }

            // 已经存在跳过
            if (Jadann.DB[prop] && !bCover) {
                continue;
            }

            Jadann.DB[prop] = getDBFun(config[prop]);
            Jadann.DB[prop]["_config"] = config[prop];
        }
    };

    // 获取url地址
    Jadann.DB.g = function (prop) {
        if (!Jadann.DB[prop]) {
            return;
        }

        return Jadann.DB[prop]["_config"]["url"];
    }
})(jQuery, Jadann);