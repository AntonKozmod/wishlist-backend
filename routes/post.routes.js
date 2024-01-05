module.exports = router => {
    const postController = require('../controller/post.controller');

    router.get('/post', postController.getPosts);
    router.get('/post/:id', postController.getOnePost);
    router.get('/post/:user_id', postController.getUserPosts);
    router.post('/post', postController.createPost);
    router.put('/post', postController.updatePost);
    router.delete('/post/:id', postController.deletePost);

    return router;
};
