/**验证规则 */
export declare class RuleOption {
    /**属性名*/
    prop: string;
    /**显示名*/
    displayName?: string;
    /**是否必填*/
    required?: boolean;
    /**最小值或最小长度*/
    min?: number;
    /**最大值或最大长度*/
    max?: number;
    /**类型,可选值 number | string , 默认string*/
    type?: string;
}
/**配置 */
export declare class Options {
    /**验证规则数组 */
    rules: RuleOption[];
    /**提交方式：get或post */
    method: string;
}
/**创建验证器 */
export declare function valid(options: Options): (req: any, res: any, next: any) => void;
