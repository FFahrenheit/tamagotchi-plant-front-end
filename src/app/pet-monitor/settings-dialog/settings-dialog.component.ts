import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  public settingsForm: FormGroup
  iconSelection;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<SettingsDialogComponent>) { 
  
  }

  ngOnInit(): void {
    let plantData = this.data.plantData;
    this.iconSelection = plantData.icon;
    console.log(this.iconSelection);
    this.settingsForm = new FormGroup({
      min_temp: new FormControl(plantData.min_temp),
      max_temp: new FormControl(plantData.max_temp),
      min_lum: new FormControl(plantData.min_lum),
      max_lum: new FormControl(plantData.max_lum),
      min_hum: new FormControl(plantData.min_hum),
      max_hum: new FormControl(plantData.max_hum),
      min_humt: new FormControl(plantData.min_humt),
      max_humt: new FormControl(plantData.max_humt),
      name: new FormControl(plantData.name)
    });

  }

  onIconSelect(icon){
    this.iconSelection = icon;
  }

  onSaveClick(){
    let returnData = this.settingsForm.value;
    returnData['icon'] = this.iconSelection;
    this.dialogRef.close({data:returnData})
  }

}
