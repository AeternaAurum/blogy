import { RequestOptions, Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BlogService {

  options;
  hostUrl = this.authService.hostUrl;
  constructor(private authService: AuthService, private http: Http) { }

  createHeaders() {
    this.authService.getToken();

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.token
      })
    });
  }

  newBlog(blog) {
    this.createHeaders();
    return this.http.post(this.hostUrl + '/blog/newBlog', blog, this.options).map(res => res.json());
  }

  getSingleBlog(id) {
    this.createHeaders();
    return this.http.get(this.hostUrl + '/blog/singleBlog/' + id, this.options).map(res => res.json());

  }

  getAllBlogs() {
    this.createHeaders();
    return this.http.get(this.hostUrl + '/blog/allBlogs', this.options).map(res => res.json());
  }

  editBlog(blog) {
    this.createHeaders();
    return this.http.put(this.hostUrl + '/blog/updateBlog/', blog, this.options).map(res => res.json());
  }

  deleteBlog(id) {
    this.createHeaders();
    return this.http.delete(this.hostUrl + '/blog/deleteBlog/' + id, this.options).map(res => res.json());
  }

  likeBlog(id) {
    const blog = { id: id };
    console.log(blog);
    return this.http.put(this.hostUrl + '/blog/like/', blog, this.options).map(res => res.json());
  }

  postComment(id, comment) {
    this.createHeaders();
    const blog = {
      id,
      comment
    };
    return this.http.post(this.hostUrl + '/blog/comment', blog, this.options).map(res => res.json());
  }

  dislikeBlog(id) {
    const blog = { id: id };
    return this.http.put(this.hostUrl + '/blog/dislike/', blog, this.options).map(res => res.json());
  }
}
