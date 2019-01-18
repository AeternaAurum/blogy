import { BlogService } from './../../services/blog.service';
import { AuthService } from './../../services/auth.service';
import { AuthGuard } from './../../guards/auth.guard';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  loading;
  form;
  username;
  blogPosts;
  commentForm;

  newPost = false;
  isHandling = false;
  newComment = [];
  enabledComments = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private blogService: BlogService, public snackBar: MatSnackBar) { }

  createNewForm() {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    });
  }

  createCommentForm() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(300)
      ])]
    });
  }

  enableNewBlogForm() {
    this.form.get('title').enable();
    this.form.get('body').enable();
  }

  disableNewBlogForm() {
    this.form.get('title').enable();
    this.form.get('body').enable();
  }

  newBlog() {
    this.newPost = true;
  }

  draftComment(id) {
    this.commentForm.reset();
    this.newComment = [];
    this.newComment.push(id);
  }

  likeBlog(id) {
    console.log(id);
    this.blogService.likeBlog(id).subscribe(data => {
      this.getAllBlogs();
    });
  }

  dislikeBlog(id) {
    this.blogService.dislikeBlog(id).subscribe(data => {
      this.getAllBlogs();
    });
  }

  postComment(id) {
    this.disableCommentForm();
    this.isHandling = true;
    const comment = this.commentForm.get('comment').value;
    this.blogService.postComment(id, comment).subscribe(data => {
      this.getAllBlogs();
      const index = this.newComment.indexOf(id);
      this.newComment.splice(index, 1);
      this.enableCommentForm();
      this.commentForm.reset();
      this.isHandling = false;

      if (this.enabledComments.indexOf(id) < 0) {
        this.expand(id);
      }
    });
  }

  expand(id) {
    this.enabledComments.push(id);
  }

  collapse(id) {
    const index = this.enabledComments.indexOf(id);
    this.enabledComments.splice(index, 1);

  }

  reload() {
    this.loading = true;
    this.getAllBlogs();
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  }

  onBlogSubmit() {
    console.log('Form submitted');
    this.isHandling = true;
    this.disableNewBlogForm();

    const blog = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy: this.username
    };

    this.blogService.newBlog(blog).subscribe(data => {
      if (!data.success) {
  
        this.snackBar.open(data.message, '', {duration: 3000});
        
        this.isHandling = false;
        this.enableNewBlogForm();
      } else {
        this.snackBar.open(data.message, '', {duration: 3000});
        this.getAllBlogs();
        setTimeout(() => {
          this.newPost = false;
          this.isHandling = false;
          
          this.form.reset();
          this.enableNewBlogForm();
        }, 2000);
      }
    });
  }

  goBack() {
    window.location.reload();
  }

  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogPosts = data.blogs;
    });
  }

  enableCommentForm() {
    this.commentForm.get('comment').enable();
  }

  disableCommentForm() {
    this.commentForm.get('comment').disable();
  }

  cancelComment(id) {
    const index = this.newComment.indexOf(id);
    this.newComment.splice(index, 1);
    this.commentForm.reset();
    this.enableCommentForm();
    this.isHandling = false;
  }


  ngOnInit() {
    this.createNewForm();
    this.createCommentForm();
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    });
    this.getAllBlogs();
  }

}
