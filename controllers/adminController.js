const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category
const {isEmpty} = require('../config/customFunctions');


module.exports = {

    index: (req, res) => {
        res.render('admin/index');
    },


    getPosts: (req, res) => {
        Post.find()
            .populate('category')
            .lean()
            .then(posts => {
                res.render('admin/posts/index', { posts: posts });
            });
    },

    submitPosts: (req, res) => {

        const commentsAllowed = req.body.allowComments ? true : false;

        //Check for any input file
        let filename ='';
        if((req.files) == null){
            req.flash('error-message', 'Post created successfully');
            return false;
        }
        else{
            let file = req.files.uploadedFile;
                filename = file.name;
                let uploadDir ='./public/uploads/';
    
                file.mv(uploadDir+filename,(err) =>{
                    if(err)
                        throw err;
                });
        }

        // if(!isEmpty(req.files)){
        //     let file = req.files.uploadedFile;
        //     filename = file.name;
        //     let uploadDir ='./public/uploads/';

        //     file.mv(uploadDir+filename,(err) =>{
        //         if(err)
        //             throw err;
        //     });
        // }

        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            allowComments: commentsAllowed,
            category: req.body.category,
            file: `/uploads/${filename}`
        });

        newPost.save().then(post => {
            console.log(post);
            req.flash('success-message', 'Post created successfully');
            res.redirect('/admin/posts');
        });


    },

    createPostsGet: (req, res) => {
        Category.find().lean().then(cats => {
            res.render('admin/posts/create', { categories: cats });
        })

    },

    editPosts: (req, res) => {
        const id = req.params.id;

        Post.findById(id)
            .lean()
            .then(post => {

                Category.find().lean().then(cats => {
                    res.render('admin/posts/edit', { post: post, categories: cats });
                });
            });
    },

    editPostSubmit: (req, res) => {
        const commentsAllowed = req.body.allowComments ? true : false;
        const id = req.params.id;

        Post.findById(id)
            .then(post => {

                post.title = req.body.title;
                post.status = req.body.status;
                post.allowComments = req.body.allowComments;
                post.description = req.body.description;
                post.category = req.body.category;

                post.save().then(updatePost => {
                    req.flash('success-message', `The Post ${updatePost.title} has been updated.`);
                    res.redirect('/admin/posts');
                });

            });
    },

    deletePost: (req, res) => {

        Post.findByIdAndDelete(req.params.id)
            .then(deletedPost => {
                req.flash('success-message', `The post ${deletedPost.title} has been deleted`)
                res.redirect('/admin/posts');
            });

    },


    //category methods
    getCategories: (req, res) => {
        Category.find().lean().then(cats => {
            res.render('admin/category/index', { categories: cats });
        });
    },
    createCategories: (req, res) => {
        var categoryName = req.body.name;

        if (categoryName) {
            const newCategory = new Category({
                title: categoryName
            });
            newCategory.save().then(category => {
                res.status(200).json(category);
            });
        }
    },

    editCategoriesGetRoute: async (req, res) => {
        const catId = req.params.id;

        const cats = await Category.find().lean();

        Category.findById(catId).lean().then(cat => {

            res.render('admin/category/edit', { category: cat, categories: cats });

        });
    },

    editCategoriesPostRoute: (req, res) => {
        const catId = req.params.id;
        const newTitle = req.body.name;

        if(newTitle){
            Category.findById(catId).then(category =>{

                category.title = newTitle;

                category.save().then(updated =>{
                    res.status(200).json({url:'/admin/category'});
                })

            });
        }
    }

};