import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  templateUrl: 'change-ayah-count.component.html',
  styleUrls: ['change-ayah-count.component.scss'],
})
export class ChangeAyahCountComponent implements OnInit {
  @Input()
  currentNum;
  
  nums = [...Array(5).keys()];
  constructor(private popover: PopoverController) {}

  ngOnInit() {}
  selectCount(num) {
    this.popover.dismiss(num + 1);
  }
}
