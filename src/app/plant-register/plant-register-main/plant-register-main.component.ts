import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PlantService } from 'src/app/shared/services/plant/plant.service';

@Component({
  selector: 'app-plant-register-main',
  templateUrl: './plant-register-main.component.html',
  styleUrls: ['./plant-register-main.component.scss']
})
export class PlantRegisterMainComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private plantServ:PlantService, private tostServ:ToastrService) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      id_micro: new FormControl(),
      name: new FormControl()
    });
  }

  onSaveClick(){
    let toInsert = this.registerForm.value;
    toInsert['max_temp'] = 40;
    toInsert['min_temp'] = 20;
    toInsert['max_hum'] = 90;
    toInsert['min_hum'] = 10;
    toInsert['max_humt'] = 90;
    toInsert['min_humt'] = 10;
    toInsert['max_lum'] = 300;
    toInsert['min_hum'] = 0;
    toInsert['icon'] = 'forest';
    toInsert['last_rec'] = [];
    this.plantServ.postNewPlant(this.registerForm.value).subscribe(
      data =>{
        console.log(data);
        if(data.insertedId != undefined){
          this.tostServ.success("Planta registrada con exito!");
        }
      }
    )
  }

}
