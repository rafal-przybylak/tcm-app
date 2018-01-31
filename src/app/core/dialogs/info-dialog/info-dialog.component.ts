import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'tcm-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  public source:string;
  constructor(public dialog: MatDialogRef<InfoDialogComponent>) { }

  ngOnInit() {
  }

}
