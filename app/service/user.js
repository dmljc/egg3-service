'use strict';
const Service = require('egg').Service;
class UserService extends Service {
    // 通过用户名获取用户信息
    async getUserByName(username) {
        const { ctx, app } = this;
        try {
            const result = await app.mysql.get('user', { username });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // 注册
    async register(params) {
        const { ctx, app } = this;
        const { username } = params;
        try {
            // 校验账号是否注册
            const userInfo = await ctx.service.user.getUserByName(username);
            if (userInfo) {
                return {
                    code: 400,
                    success: false,
                    errMsg: '账号已经存在，请直接登录',
                }
            }

            // 未注册，注册成功
            const { affectedRows } = await app.mysql.insert('user', params);
            if (affectedRows === 1) {
                return {
                    code: 200,
                    success: true,
                };
            } else {
                return {
                    code: 400,
                    success: false,
                    errMsg: '注册失败',
                };
            }

        } catch (error) {
            console.log(error);
            return null;
        }
    }
    // 登录
    async login(params) {
        const { ctx, app } = this;
        const { username, password } = params;
        try {
            // 校验账号是否注册
            const userInfo = await ctx.service.user.getUserByName(username);
            if (!userInfo) {
                return {
                    code: 400,
                    success: false,
                    errMsg: '账号未注册，请先注册账号',
                }
            }

            if (userInfo && password !== userInfo.password) {
                return {
                    code: 400,
                    success: false,
                    errMsg: '密码错误!!!!!',
                };
            }

            // 生成 token 即 authorization
            const authorization = app.jwt.sign({
                username: userInfo.username,
                password: userInfo.password,
                expiration: Math.floor(Date.now() / 1000) + (60 * 60 * 24)  // 有效期24h
            }, app.config.jwt.secret);

            // 生成 authorization 加盐
            // app.jwt.sign 方法接受两个参数，第一个为对象，对象内是需要加密的内容；
            // secret 加密字符串，将在后续用于结合用户信息生成一串 authorization
            // secret 是放在服务端代码中，普通用户是无法通过浏览器发现的，所以千万不能将其泄漏，
            // 否则有可能会被不怀好意的人加以利用。

            return {
                code: 200,
                success: true,
                data: {
                    authorization,
                }
            }

        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = UserService;
