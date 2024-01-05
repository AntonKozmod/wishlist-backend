module.exports = router => {
    const imageController = require('../controller/image.controller');

    router.get('/image', imageController.getImages);
    router.get('/image/:id', imageController.getOneImage);
    router.post('/image', imageController.createImage);
    router.delete('/image/:id', imageController.deleteImage);

    return router;
};
