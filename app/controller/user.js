'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 注册
    async register() {
        const { ctx } = this;
        const params = ctx.request.body;
        try {
            const resp = await ctx.service.user.register(params);
            ctx.body = resp;
        } catch (error) {
            ctx.body = {
                code: 500,
                success: false,
                errMsg: '服务异常'
            }
        }

    }
    // 登录
    async login() {
        const { ctx } = this;
        const params = ctx.request.body;
        try {
            const resp = await ctx.service.user.login(params);
            ctx.body = resp;
        } catch (error) {
            ctx.body = {
                code: 500,
                success: false,
                errMsg: '服务异常',
            }
        }
    }
}

module.exports = UserController;
