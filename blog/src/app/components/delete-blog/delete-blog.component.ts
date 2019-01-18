import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.css']
  })
export class DeleteBlogComponent implements OnInit {
  isBlogFound = false;
  isHandling = false;
  blog;
  url;
  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  deleteBlog() {
    this.isHandling = true;
    this.blogService.deleteBlog(this.url.id).subscribe(data => {
      if (!data.success) {
        this.snackBar.open(data.message, '', {duration: 3000})
      } else {
        this.snackBar.open(data.message, '', {duration: 3000})
        setTimeout(() => {
          this.router.navigate(['/blog']);
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.url = this.activatedRoute.snapshot.params;
    this.blogService.getSingleBlog(this.url.id).subscribe(data => {
      if (!data.success) {
        this.snackBar.open(data.message, '', {duration: 3000})
      } else {
        this.blog = {
          title: data.blog.title,
          body: data.blog.body,
          createdBy: data.blog.createdBy,
          createdAt: data.blog.createdAt
        };
        this.isBlogFound = true;
      }
    });
  }
}
