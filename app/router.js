'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    // 首页
    const { router, controller } = app;
    router.get('/list', controller.home.list);
    router.post('/add', controller.home.add);
    router.post('/update', controller.home.update);
    router.delete('/del/user', controller.home.deluser);
    
    // 用户注册登陆
    router.post('/user/register', controller.user.register);
    router.post('/user/login', controller.user.login);
};
