import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantService } from 'src/app/shared/services/plant/plant.service';
import { PlantStatusService } from 'src/app/shared/services/sockets/plant-status.service';
import Chart from 'chart.js/auto';
import { animate, state, style, transition, trigger } from '@angular/animations';

export const fade = [
  trigger('fade', [
    state('in', style({ 'opacity': '1' })),
    state('out', style({ 'opacity': '0' })),
    transition('* <=> *', [
      animate(1000)
    ])
  ])
];

@Component({
  selector: 'app-pet-monitor-main',
  templateUrl: './pet-monitor-main.component.html',
  styleUrls: ['./pet-monitor-main.component.scss']
})
export class PetMonitorMainComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasChart') canvasChart: ElementRef;

  private canvas: any;
  private myChart: Chart;

  private data: any;

  temperatura = 0;
  luminosidad = 0;
  humedad_tierra = 0;
  humedad_ambiente = 0;
  estado="Feliz";

  spinnerDiameter = window.innerHeight / 7;

  plantData: any = {};
  wsData: any = {};

  constructor(private plantSrv: PlantService, private plantaWs: PlantStatusService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.plantaWs.emit("id", params['id_micro']);
      this.plantSrv.getPlantById(params['id_micro']).subscribe(data => {
        console.log(data)
        this.plantData = data;
        this.plantaWs.listen("plantUpdate").subscribe(data => {

          this.wsData = data;
          console.log()
          let rec = this.wsData.payload.last_rec;

          console.log(rec)

          if (this.plantData) {
            this.temperatura = (rec.temperatura - this.plantData.min_temp) * 100 / (this.plantData.max_temp - this.plantData.min_temp);
            this.luminosidad = (rec.luminosidad - this.plantData.min_lum) * 100 / (this.plantData.max_lum - this.plantData.min_lum);
            this.humedad_tierra = (rec.humedad_tierra - this.plantData.min_humt) * 100 / (this.plantData.max_humt - this.plantData.min_humt);
            this.humedad_ambiente = (rec.humedad_ambiente - this.plantData.min_hum) * 100 / (this.plantData.max_hum - this.plantData.min_hum);
          }

          let currentdate = new Date();
          let datetime:string = currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

          this.addData(datetime, rec);

          if(rec.temperatura > this.plantData.max_temp){
            this.estado = "Caliente";
          }else if(rec.temperatura < this.plantData.min_temp){
            this.estado = "Congelado";
          }else if(rec.luminosidad > this.plantData.max_lum){
            this.estado = "Encandilado";
          }else if(rec.luminosidad < this.plantData.min_lum){
            this.estado = "Vampiro";
          }else if(rec.humedad_ambiente < this.plantData.min_hum || rec.humedad_tierra < this.plantData.min_humt){
            this.estado = "Seco";
          }else if(rec.humedad_ambiente > this.plantData.max_hum){
            this.estado = "Sofocado";
          }else if(rec.humedad_tierra > this.plantData.max_humt){
            this.estado = "Ahogado";
          }else{
            this.estado = "Feliz";
          }
        })
      })
    })
  }

  ngAfterViewInit() {
    this.canvas = this.canvasChart.nativeElement;

    this.myChart = new Chart(this.canvas, {
      type: 'line',
      data: this.data,
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          title: {
            display: true,
            text: 'Mediciones en tiempo real'
          }
        },
      }
    });

    this.initializeData();
  }

  private initializeData() {
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Temperatura',
          data: [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: 'Luminosidad',
          data: [],
          borderColor: 'rgb(255, 205, 86)',
          backgroundColor: 'rgba(255, 205, 86, 0.5)'
        },
        {
          label: 'Humedad tierra',
          data: [],
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
          
        },
        {
          label: 'Humedad aire',
          data: [],
          borderColor: 'rgb(180,180,180)',
          backgroundColor: 'rgba(180,180,180, 0.7)',
          borderDash: [10, 5],
          pointRadius: 2,
        }
      ]
    }

    console.log(this.data);
    this.myChart.data = this.data;
    this.myChart.update();
  }

  addData(label: string, data: any) {
    this.myChart.data.labels?.push(label);
    this.myChart.data.datasets[0].data.push(data.temperatura);
    this.myChart.data.datasets[1].data.push(data.luminosidad);
    this.myChart.data.datasets[2].data.push(data.humedad_tierra);
    this.myChart.data.datasets[3].data.push(data.humedad_ambiente);
    this.myChart.update();
    console.log(this.myChart)
  }

  removeData() {
    this.myChart.data.labels?.pop();
    this.myChart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    this.myChart.update();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.spinnerDiameter = window.innerHeight / 7;
  }

}
