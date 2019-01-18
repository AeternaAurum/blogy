import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '../../../../node_modules/@angular/common';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
  })
export class EditBlogComponent implements OnInit {
  url;
  blog = {
    title: String,
    body: String
  };
  isHandling = false;
  isLoading = true;
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  updateBlogSubmit() {
    this.isHandling = true;
    this.blogService.editBlog(this.blog).subscribe(data => {
      if (!data.success) {
        this.snackBar.open(data.message, '', {duration: 3000})
        this.isHandling = false;
      } else {
        this.snackBar.open(data.message, '', {duration: 3000})
        setTimeout(() => {
          this.router.navigate(['/blog']);
        }, 2000);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.url = this.activatedRoute.snapshot.params;
    this.blogService.getSingleBlog(this.url.id).subscribe(data => {
      if (!data.success) {
        this.snackBar.open('Blog not found', '', {duration: 3000})
      } else {

        this.blog = data.blog;
        this.isLoading = false;
      }
    });
  }
}
