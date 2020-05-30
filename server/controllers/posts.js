const Post = require('../models/post');

exports.searchPosts = (req, res, next) => {
    const currentPage = +req.query.page;
    const pageSize = +req.query.pagesize;
    const postQuery = Post.find();
    let fetchedPosts;
    if (currentPage && pageSize) {
        postQuery
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize);
    }

    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return Post.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                posts: fetchedPosts, 
                maxPosts: count
            });
        });
}

exports.getPostById = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    })
}

exports.createPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const post = new Post({
        title: req.body.title,
        imagePath: url + "/images/" + req.file.filename, 
        content: req.body.content, 
        creator: req.userData.userId
    });
    post.save()
        .then(createdPost => {
            res.status(201).json(createdPost);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to create post!" })
        });
}

exports.updatePost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
        _id: req.body._id,
        title: req.body.title,
        imagePath: imagePath, 
        content: req.body.content, 
        creator: req.userData.userId
    });
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json("Post updated successfully!");
            } else {
                res.status(401).json({ message: "User is not authorized!" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to update post!" })
        });
}

exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        .then(result => {
            if (result.n > 0) {
                res.status(200).json("Post deleted successfully");
            } else {
                res.status(401).json({ message: "User is not authorized!" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to delete post!" })
        });
}

