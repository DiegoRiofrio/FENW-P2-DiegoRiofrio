import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabdata',
  templateUrl: './tabdata.component.html',
  styleUrls: ['./tabdata.component.css']
})
export class TabdataComponent implements OnInit {
  @Input() dataModel;
  @HostBinding('class.text_center') @Input() isTextCenter: boolean;

  constructor() { }

  ngOnInit() {
  }

}
