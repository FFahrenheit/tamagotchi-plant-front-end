import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private plantaServ:PlantService, private route:ActivatedRoute) { }

  ngOnInit(): void {
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

    this.route.queryParams.subscribe(params =>{
      this.plantaServ.getHistorics(params['planta_id']).subscribe(data =>{

        this.initializeData(data.mediciones);
      })
    })
    
  }

  private initializeData(recs:any) {

    let labels = recs.map( (o:any) => o.recTime);
    let tempRecs = recs.map((o:any) => {
      if(o.temperatura && o.temperatura > -100){

        return o.temperatura
      }
      return null;
    })
    let lumiRecs = recs.map((o:any) => {
      if(o.luminosidad){

        return o.luminosidad
      }
      return null;
    })
    let humtRecs = recs.map((o:any) => {
      if(o.humedad_tierra){

        return o.humedad_tierra
      }
      return null;
    })
    let humaRecs = recs.map((o:any) => {
      if(o.humedad_ambiente && o.temperatura > -100){

        return o.humedad_ambiente
      }
      return null;
    })
    
    this.tempData = {
      labels: labels,
      datasets: [
        {
          label: 'Temperatura',
          data: tempRecs,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]
    }

    this.lumiData = {
      labels: labels,
      datasets: [
        {
          label: 'Luminosidad',
          data: lumiRecs,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      ]
    }

    this.humtData = {
      labels: labels,
      datasets: [
        {
          label: 'Humedad en la tierra',
          data: humtRecs,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      ]
    }

    this.humaData = {
      labels: labels,
      datasets: [
        {
          label: 'Humedad en el aire',
          data: humaRecs,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
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
