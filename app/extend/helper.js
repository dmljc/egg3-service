
module.exports = {
    // 注册接口异常信息的枚举值
    registerEnum(num){
        const types = {
            10010: '账号已经存在，请直接登录',
            10020: '账号未注册',
            10030: '账号注册成功',
        }
        return types[num];
    }
}