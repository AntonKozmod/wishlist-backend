module.exports = router => {
    const postController = require('../controller/post.controller');

    router.get('/post', postController.getUserPosts);
    router.get('/post/:id', postController.getOnePost);
    router.post('/post', postController.createPost);
    router.put('/post', postController.updatePost);
    router.delete('/post/:id', postController.deletePost);

    return router;
};
