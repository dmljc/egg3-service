'use strict';

const { Service } = require('egg');

class HomeService extends Service {
    async list() {
        const { ctx, app } = this;
        try {
            const result = await app.mysql.select('test_table');
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // 新增
    async add(params) {
        const { ctx, app } = this;
        try {
            const result = await app.mysql.insert('test_table', params); // 给 list 表，新增一条数据
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    // 编辑
    async update(params) {
        const { ctx, app } = this;
        const { id, name, gender, phone } = params;
        try {
            const result = await app.mysql.update('test_table', { name, gender, phone }, {
                where: {
                    id,
                }
            }); // 给 list 表，新增一条数据
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // 删除
    async deluser(id) {
        const { ctx, app } = this;
        try {
            let result = await app.mysql.delete('test_table', { id });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
module.exports = HomeService;