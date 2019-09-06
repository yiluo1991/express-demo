/**验证规则 */
var RuleOption = (function () {
    function RuleOption() {
    }
    return RuleOption;
})();
exports.RuleOption = RuleOption;
/**配置 */
var Options = (function () {
    function Options() {
    }
    return Options;
})();
exports.Options = Options;
/**创建验证器 */
function valid(options) {
    var rules = options.rules;
    var method = options.method;
    return function (req, res, next) {
        var hasError;
        function err(message) {
            res.send({
                success: false,
                message: message
            });
            res.end();
            hasError = true;
        }
        for (var index in rules) {
            rules[index].type = rules[index].type || "string";
            var v = method === "get" ? req.query[rules[index].prop] : req.body[rules[index].prop];
            if (v !== undefined) {
                if (rules[index].required && !v) {
                    err((rules[index].displayName || rules[index].prop) + "必填");
                    break;
                }
                else {
                    if (rules[index].type == "string") {
                        if (typeof (rules[index].min) === "number" && v.length < rules[index].min) {
                            err((rules[index].displayName || rules[index].prop) + "最少" + rules[index].min + "个字符");
                            break;
                        }
                        if (typeof (rules[index].max) === "number" && v.length > rules[index].max) {
                            err((rules[index].displayName || rules[index].prop) + "最多" + rules[index].max + "个字符");
                            break;
                        }
                    }
                    else {
                        v = v || "0";
                        v = parseFloat(v);
                        if (isNaN(v)) {
                            err((rules[index].displayName || rules[index].prop) + "不是数字");
                        }
                        else {
                            if (typeof (rules[index].min) === "number" && v < rules[index].min) {
                                err((rules[index].displayName || rules[index].prop) + "小于最小值" + rules[index].min);
                                break;
                            }
                            if (typeof (rules[index].max) === "number" && v > rules[index].max) {
                                err((rules[index].displayName || rules[index].prop) + "超过最大值" + rules[index].max);
                                break;
                            }
                        }
                        if (method == "get") {
                            req.query[rules[index].prop] = v;
                        }
                        else {
                            req.body[rules[index].prop] = v;
                        }
                    }
                }
            }
            else {
                if (rules[index].required) {
                    err((rules[index].displayName || rules[index].prop) + "必填");
                    break;
                }
            }
        }
        if (!hasError)
            next();
    };
}
exports.valid = valid;
;
