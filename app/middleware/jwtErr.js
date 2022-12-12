module.exports = (secret) => {
    return async function jwtErr(ctx, next) {
        const authorization = ctx.request.header['x-authorization'];
        let decode; // 把authorization 解码生成原账号和密码
        if (authorization) {
            try {
                decode = ctx.app.jwt.verify(authorization, secret);
                // decode = {
                //     username: '17602143402',
                //     password: '11',
                //     expiration: 1670939593,
                //     iat: 1670853193
                // }
                await next();
            } catch (error) {
                ctx.body = {
                    code: 401,
                    success: false,
                    errMsg: 'authorization 已过期，请重新登录111111111111'
                }
                return;
            }
        } else {
            ctx.body = {
                code: 401,
                success: false,
                errMsg: 'authorization不存在',
            }
            return;
        }
    }
};