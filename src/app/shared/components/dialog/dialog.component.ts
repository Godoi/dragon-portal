import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Info {
  title: string;
  message: string;
}

@Component({
  selector: 'app-dialog',
  styleUrls: ['./dialog.component.scss'],
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Info) {}

  ngOnInit() {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
