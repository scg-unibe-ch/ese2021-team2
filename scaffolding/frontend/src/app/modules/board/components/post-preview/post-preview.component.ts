import { Component, OnInit, Input } from '@angular/core';
import {Post} from 'src/app/models/post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {
  @Input() post: Post = new Post(0, "", "", 0, "", 0, 0, "","", "");
  likes: any  = [];

  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.post(environment.endpointURL + "board/1/post/getLikesByPostId", {
      postId: this.post.postId
  }).subscribe((res) => {


      this.likes = res;
      this.post.likes = this.likes.length;
  }, (err: any) => {
      console.log(err);
  });
  }

}
