'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/list', controller.home.list);
    router.post('/add', controller.home.add);
    router.post('/update', controller.home.update);
    router.delete('/del/user', controller.home.deluser);
};
