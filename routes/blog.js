const User = require('../models/user');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');

const config = require('../config/database');

module.exports = router => {
	router.post('/newBlog', (req, res) => {
		if (!req.body.title) {
			res.json({
				success: false,
				message: 'Blog title is required'
			});
		} else {
			if (!req.body.body) {
				res.json({
					success: false,
					message: 'Blog body is required'
				});
			} else {
				if (!req.body.createdBy) {
					res.json({
						success: false,
						message: 'Blog creator is required'
					});
				} else {
					const blog = new Blog({
						title: req.body.title,
						body: req.body.body,
						createdBy: req.body.createdBy
					});
					blog.save((err) => {
						if (err) {
							res.json({
								success: false,
								message: err
							});
						} else {
							res.json({
								success: true,
								message: 'Blog saved'
							});
						}
					})
				}
			}
		}
	});

	router.get('/allBlogs', (req, res) => {
		Blog.find({}, (err, blogs) => {
			if (err) {
				res.json({
					success: false,
					message: err
				});
			} else {
				if (!blogs) {
					res.json({
						success: false,
						message: 'No blogs found'
					});
				} else {
					res.json({
						success: true,
						blogs: blogs
					});
				}
			}
		}).sort({
			'_id': -1
		});
	});

	router.get('/singleBlog/:id', (req, res) => {
		if (!req.params.id) {
			res.json({
				success: false,
				message: 'No blog ID was provided'
			});
		} else {


			Blog.findOne({
				_id: req.params.id
			}, (err, blog) => {
				if (err) {
					res.json({
						success: false,
						message: 'Not a valid blog'
					});
				} else {
					if (!blog) {
						res.json({
							success: false,
							message: 'Blog not found'
						});
					} else {
						User.findOne({
							_id: req.decoded.userId
						}, (err, user) => {
							if (err) {
								res.json({
									success: false,
									message: err
								});
							} else {
								if (!user) {
									res.json({
										success: false,
										message: 'Unable to auth'
									});
								} else {
									if (user.username !== blog.createdBy) {
										res.json({
											success: false,
											message: 'You are not authorized'
										});
									} else {
										res.json({
											success: true,
											blog: blog
										});

									}
								}
							}
						})


					}
				}
			});
		}
	});

	router.put('/updateBlog', (req, res) => {
		if (!req.body._id) {
			res.json({
				success: false,
				message: 'No ID provided'
			});
		} else {
			Blog.findOne({
				_id: req.body._id
			}, (err, blog) => {
				if (err) {
					res.json({
						success: false,
						message: 'Not valid ID'
					});
				} else {
					if (!blog) {
						res.json({
							success: false,
							message: 'ID not found'
						});
					} else {
						User.findOne({
							_id: req.decoded.userId
						}, (err, user) => {
							if (err) {
								res.json({
									success: false,
									message: err
								});
							} else {
								if (!user) {
									res.json({
										success: false,
										message: 'Unable to auth'
									});
								} else {
									if (user.username !== blog.createdBy) {
										res.json({
											success: false,
											message: 'You are not authorized'
										});
									} else {
										blog.title = req.body.title;
										blog.body = req.body.body;
										blog.save(err => {
											if (err) {
												res.json({
													success: false,
													message: err
												});
											} else {
												res.json({
													success: true,
													message: 'Blog updated '
												});
											}
										})
									}
								}
							}
						})
					}
				}
			})
		}
	})

	router.delete('/deleteBlog/:id', (req, res) => {
		if (!req.params.id) {
			res.json({success:false, message:'No ID provied'});
		} else {
			Blog.findOne({ _id: req.params.id }, (err, blog) => {
				if (err) {
					res.json({ success: false, message: 'Invalid id'});
				} else {
					if (!blog) {
						res.json({ success: false, message: 'Blog was not found'});
					} else {
						User.findOne({ _id: req.decoded.userId }, (err, user) => {
							if (err) {
								res.json({ success: false, message: err}); 
							} else {
								if (!user) {
									res.json({ success: false, message: 'Unable to find user'});
								} else {
									if (user.username !== blog.createdBy) {
										res.json({ success: false, message: 'You arenot authorized to delete this'});
									} else {
										blog.remove(err => {
											if (err) {
												res.json({ success: false, message: err});
											} else {
												res.json({ success: true, message: 'Blog deleted'});
											}
										});
									}
								}
							}
						});
					}
				}
			});
		}
	});

	router.put('/like', (req, res) => {
		if (!req.body.id) {
			res.json({ success: false, message: 'No id'});
		} else {
			Blog.findOne({ _id: req.body.id}, (err, blog) => {
				if (err) {
					res.json({ success: false, message: 'Invalid blog id'});
				} else {
					if (!blog) {
						res.json({ success: false, message: 'That blog was not found'});
					} else {
						User.findOne({ _id: req.decoded.userId }, (err, user) => {
							if (err) {
								res.json({ success: false, message: 'Something went wrong.'});
							} else {
								if (!user) {
									res.json({ success: false, message: 'Could not auth'});
								} else {
									if (user.username ===blog.createdBy) {
										res.json({ success: false, message: 'Cannot like your own post'})
									} else {
										if (blog.likedBy.includes(user.username)) {
											res.json({ success: false, message: 'You already liked'});
										} else {
											if (blog.dislikedBy.includes(user.username)) {
												blog.dislikes--;
												const index = blog.dislikedBy.indexOf(user.username);
												blog.dislikedBy.splice(index, 1);
												blog.likes++;
												blog.likedBy.push(user.username);
												blog.save(err => {
													if (err) {
														res.json({ success: false, message: 'Something went wrong'});
													} else {
														res.json({ success: true, message: 'Something went wrong'});
													}
												});
											} else {
												blog.likes++;
												blog.likedBy.push(user.username);
												blog.save(err => {
													if (err) {
														res.json({ success: false, message: 'Something went wrong'});
													} else {
														res.json({ success: true, message: 'Something went wrong'});
													}
												});
											}
										}
									}
								}
							}
						});
					}
				}
			});
		}
	});

	router.put('/dislike', (req, res) => {
		if (!req.body.id) {
			res.json({ success: false, message: 'No id'});
		} else {
			Blog.findOne({ _id: req.body.id}, (err, blog) => {
				if (err) {
					res.json({ success: false, message: 'Invalid blog id'});
				} else {
					if (!blog) {
						res.json({ success: false, message: 'That blog was not found'});
					} else {
						User.findOne({ _id: req.decoded.userId }, (err, user) => {
							if (err) {
								res.json({ success: false, message: 'Something went wrong.'});
							} else {
								if (!user) {
									res.json({ success: false, message: 'Could not auth'});
								} else {
									if (user.username ===blog.createdBy) {
										res.json({ success: false, message: 'Cannot dislike your own post'})
									} else {
										if (blog.dislikedBy.includes(user.username)) {
											res.json({ success: false, message: 'You already disliked'});
										} else {
											if (blog.likedBy.includes(user.username)) {
												blog.likes--;
												const index = blog.likedBy.indexOf(user.username);
												blog.likedBy.splice(index, 1);
												blog.dislikes++;
												blog.dislikedBy.push(user.username);
												blog.save(err => {
													if (err) {
														res.json({ success: false, message: 'Something went wrong'});
													} else {
														res.json({ success: true, message: 'Liked'});
													}
												});
											} else {
												blog.dislikes++;
												blog.dislikedBy.push(user.username);
												blog.save(err => {
													if (err) {
														res.json({ success: false, message: 'Something went wrong'});
													} else {
														res.json({ success: true, message: 'Disliked'});
													}
												});
											}
										}
									}
								}
							}
						});
					}
				}
			});
		}
	});

	router.post('/comment', (req, res) => {
		if (!req.body.comment) {
			res.json({ success: false, message: 'No comment '});
		} else {
			if (!req.body.id) {
				res.json({ success: false, message: 'No id'});
			} else {
				Blog.findOne({ _id: req.body.id }, (err, blog) => {
					if (err) {
						res.json({ success: false, message: 'Invalid blog id'});
					} else {
						if (!blog) {
							res.json({ success: false, message: 'Blog not found'});
						} else {
							User.findOne({ _id: req.decoded.userId}, (err, user) => {
								if (err) {
									res.json({ usccess: false, message: 'Something went wrong'});
								} else {
									if (!user) {
										res.json({ success: false, message: 'User not found' });
									} else {
										blog.comments.push({
											comment: req.body.comment,
											author: user.username
										});
										blog.save(err => {
											if (err) {
												res.json({ success: false, message:'Something went wrong'})
											} else {
												res.json({ success: true, message: 'Comment saved'});
											}
										});
									}
								}
							});
						}
					}
				});
			}
		}
	});

	return router;
};