import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  

  @Input()
  post: Post = new Post(0,"","",0,"",0,0,"",[], "");

  imageURL: string = "";
  voted=false;

  constructor() {}



  ngOnInit(): void {
    this.imageURL = environment.endpointURL + "post/" + this.post.postId + "/image";
  }

  upvote(){
    this.post.likes++;
    this.voted=true;
  }

  downvote(){
    this.post.likes--;
    this.voted=true;
  }

}
