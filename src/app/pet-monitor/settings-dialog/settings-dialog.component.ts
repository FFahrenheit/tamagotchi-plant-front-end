import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  public settingsForm: FormGroup


  constructor() { }

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      min_temp: new FormControl(''),
      max_temp: new FormControl(''),
      min_lum: new FormControl(''),
      max_lum: new FormControl(''),
      min_hum: new FormControl(''),
      max_hum: new FormControl(''),
      min_humt: new FormControl(''),
      max_humt: new FormControl(''),
      name: new FormControl('')
    });

  }

}
