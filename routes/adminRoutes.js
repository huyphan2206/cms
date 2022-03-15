const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';

    next();
})

router.route('/')
    .get(adminController.index);


router.route('/posts')
    .get(adminController.getPosts);
    


router.route('/posts/create')
    .get(adminController.createPostsGet)
    .post(adminController.submitPosts);


router.route('/posts/edit/:id')
    .get(adminController.editPosts)
    .put(adminController.editPostSubmit);

router.route('/posts/delete/:id')
    .delete(adminController.deletePost)



// Category
router.route('/category')
    .get(adminController.getCategories);
    // .post(adminController.createCategories);

router.route('category/create')
    .post(adminController.createCategories);

router.route('/category/edit/:id')
    .get(adminController.editCategoriesGetRoute)
    .post(adminController.editCategoriesPostRoute);

module.exports = router;


