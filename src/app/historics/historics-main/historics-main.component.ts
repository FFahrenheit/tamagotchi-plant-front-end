import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { PlantService } from 'src/app/shared/services/plant/plant.service';

@Component({
  selector: 'app-historics-main',
  templateUrl: './historics-main.component.html',
  styleUrls: ['./historics-main.component.scss']
})
export class HistoricsMainComponent implements OnInit, AfterViewInit {
  @ViewChild('temperaturaChart') temperaturaChart: ElementRef;
  @ViewChild('luminosidadChart') luminosidadChart: ElementRef;
  @ViewChild('aireChart') aireChart: ElementRef;
  @ViewChild('tierraChart') tierraChart: ElementRef;

  private canvasTemp: any;
  private canvasLumi: any;
  private canvasHumT: any;
  private canvasHumA: any;

  private tempChart: Chart;
  private lumiChart: Chart;
  private humtChart: Chart;
  private humaChart: Chart;

  recordData: any;

  tempData: any;
  lumiData: any;
  humtData: any;
  humaData: any;

  private idMicro : string;

  constructor(private plantaServ: PlantService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  public swapChart() {
    this.route.queryParams.subscribe(params => {
      this.router.navigate(['/historics/clustering'], { queryParams: { planta_id: params['planta_id'], id_micro:params['id_micro'] } })
    });
  }

  public goToDetails(){
    this.router.navigate(['pet', 'dashboard'], { queryParams: {id_micro: this.idMicro}});
  }

  ngAfterViewInit() {

    this.canvasTemp = this.temperaturaChart.nativeElement;
    this.canvasLumi = this.luminosidadChart.nativeElement;
    this.canvasHumA = this.aireChart.nativeElement;
    this.canvasHumT = this.tierraChart.nativeElement;

    this.tempChart = new Chart(this.canvasTemp, {
      type: 'bar',
      data: this.tempData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Temperatura'
          }
        },
      }
    });
    this.lumiChart = new Chart(this.canvasLumi, {
      type: 'bar',
      data: this.lumiData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Luminosidad'
          }
        },
      }
    });
    this.humtChart = new Chart(this.canvasHumT, {
      type: 'bar',
      data: this.humtData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Humedad en tierra'
          }
        },
      }
    });
    this.humaChart = new Chart(this.canvasHumA, {
      type: 'bar',
      data: this.humaData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Humedad en aire'
          }
        },
      }
    });

    this.route.queryParams.subscribe(params => {
      this.idMicro = params['id_micro'];
      this.plantaServ.getHistorics(params['planta_id']).subscribe(historicData => {
        this.plantaServ.getPlantById(params['id_micro']).subscribe(plantData => {
          this.initializeData(historicData.mediciones, plantData);
        })
      })
    })

  }

  private initializeData(recs: any, plantData) {



    let labels = recs.map((o: any) => {
      let date = new Date(o.recTime);
      return date.toDateString();
    });
    let tempRecs = recs.map((o: any) => {
      if (o.temperatura && o.temperatura > -100) {

        return o.temperatura
      }
      return null;
    })
    let lumiRecs = recs.map((o: any) => {
      if (o.luminosidad) {

        return o.luminosidad
      }
      return null;
    })
    let humtRecs = recs.map((o: any) => {
      if (o.humedad_tierra) {

        return o.humedad_tierra
      }
      return null;
    })
    let humaRecs = recs.map((o: any) => {
      if (o.humedad_ambiente && o.temperatura > -100) {

        return o.humedad_ambiente
      }
      return null;
    })

    let tempColors = [];
    for (let i = 0; i < tempRecs.length; i++) {
      if (tempRecs[i] > plantData.max_temp || tempRecs[i] < plantData.min_temp) {
        tempColors[i] = 'red'
      } else {
        tempColors[i] = 'green'
      }
    }

    let lumiColors = [];
    for (let i = 0; i < lumiRecs.length; i++) {
      if (lumiRecs[i] > plantData.max_lum || lumiRecs[i] < plantData.min_lumi) {
        lumiColors[i] = 'red'
      } else {
        lumiColors[i] = 'green'
      }
    }

    let humaColors = [];
    for (let i = 0; i < humaRecs.length; i++) {
      if (humaRecs[i] > plantData.max_hum || humaRecs[i] < plantData.min_hum) {
        humaColors[i] = 'red'
      } else {
        humaColors[i] = 'green'
      }
    }

    let humtColors = [];
    for (let i = 0; i < humtRecs.length; i++) {
      if (humtRecs[i] > plantData.max_humt || humtRecs[i] < plantData.min_humt) {
        humtColors[i] = 'red'
      } else {
        humtColors[i] = 'green'
      }
    }

    this.tempData = {
      labels: labels,
      datasets: [
        {
          label: 'Temperatura',
          data: tempRecs,
          borderColor: tempColors,
          backgroundColor: tempColors,
        }
      ]
    }

    this.lumiData = {
      labels: labels,
      datasets: [
        {
          label: 'Luminosidad',
          data: lumiRecs,
          borderColor: lumiColors,
          backgroundColor: lumiColors,
        }
      ]
    }

    this.humtData = {
      labels: labels,
      datasets: [
        {
          label: 'Humedad en la tierra',
          data: humtRecs,
          borderColor: humtColors,
          backgroundColor: humtColors,
        }
      ]
    }

    this.humaData = {
      labels: labels,
      datasets: [
        {
          label: 'Humedad en el aire',
          data: humaRecs,
          borderColor: humaColors,
          backgroundColor: humaColors,
        }
      ]
    }

    this.tempChart.data = this.tempData;
    this.tempChart.update();

    this.lumiChart.data = this.lumiData;
    this.lumiChart.update();
    this.humtChart.data = this.humtData;
    this.humtChart.update();
    this.humaChart.data = this.humaData;
    this.humaChart.update();
  }

}
