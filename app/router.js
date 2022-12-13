'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, middleware } = app;
    const { secret } = app.config.jwt;

    // 传入加密字符串
    const _jwt = middleware.jwtErr(secret); 

    // 用户注册登陆
    router.post('/user/register', controller.user.register);
    router.post('/user/login', controller.user.login);

    // crud
    router.post('/list', _jwt, controller.home.list);
    router.post('/add', _jwt, controller.home.add);
    router.post('/update', _jwt, controller.home.update);
    router.delete('/del/user', _jwt,controller.home.deluser);
};
