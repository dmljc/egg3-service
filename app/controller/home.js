'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
    async list() {
        const { ctx } = this;
        const result = await ctx.service.home.list();

        console.log('result-------', result)

        ctx.body = {
            success: true,
            data: result
        };
    }

    async add() {
        const { ctx } = this;
        const params = ctx.request.body;
        try {
            const result = await ctx.service.home.add(params);
            ctx.body = {
                success: true,
                data: [],
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '添加失败',
                data: []
            }
        }
    }
    async update() {
        const { ctx } = this;
        const params = ctx.request.body;
        try {
            const result = await ctx.service.home.update(params);
            ctx.body = {
                code: 200,
                success: true,
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                success: false,
                msg: '添加失败',
            }
        }
    }

    // 删除
    async deluser() {
        const { ctx } = this;
        const { id } = ctx.request.body;
        try {
            const result = await ctx.service.home.deluser(id);
            ctx.body = {
                code: 200,
                success: true,
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                success: false,
                msg: '删除失败',
            }
        }
    }
}

module.exports = HomeController;
