import {Component, Input, OnInit} from '@angular/core';
import {PostCommentModel} from "../../../../../models/post-comment.model";

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {

    @Input()
    postComment: PostCommentModel = new PostCommentModel(0,0,'',0);

  constructor() { }

  ngOnInit(): void {
  }



}
