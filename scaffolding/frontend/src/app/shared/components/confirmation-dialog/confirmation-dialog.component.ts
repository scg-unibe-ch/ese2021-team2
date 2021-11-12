import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogModel } from 'src/app/models/confirmation-dialog.model';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogModel) {
      this.title = data.title;
      this.message = data.message;
   }

  ngOnInit(): void {
  }

  onConfirm():void {
    this.dialogRef.close(true);
  }

  onDismiss():void {
    this.dialogRef.close(false);
  }

}
