import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDragon } from '../../models/dragon.model';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {
  @Input() hidden: boolean;
  @Input() data: IDragon[] = [];
  @Output() deleteDragon = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  modalDialog(item) {
    this.deleteDragon.emit(item);
  }
}
