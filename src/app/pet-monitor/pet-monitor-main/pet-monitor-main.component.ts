import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantService } from 'src/app/shared/services/plant/plant.service';
import { PlantStatusService } from 'src/app/shared/services/sockets/plant-status.service';
import Chart from 'chart.js/auto';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { KmeansService } from 'src/app/shared/services/kmeans/kmeans.service';
import { SafeUrl } from '@angular/platform-browser';
import { CameraViewerService } from 'src/app/shared/services/sockets/camera-viewer.service';
import { ToastrService } from 'ngx-toastr';


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
  estado = "Feliz";

  spinnerDiameter = window.innerHeight / 7;

  plantData: any = {};
  wsData: any = {};

  public showCamera : boolean = false;
  public cameraSrc : SafeUrl;
  public status : string;
  public faceList : string[] = [];
  public mode = 'stream';

  public faceName : string;

  private serverUrl = '192.168.100.200';

  constructor(private plantSrv: PlantService,
    private plantaWs: PlantStatusService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private kmeanServicie: KmeansService,
    private cameraService: CameraViewerService,
    private toastr: ToastrService
    ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.plantaWs.emit("id", params['id_micro']);
      this.plantSrv.getPlantById(params['id_micro']).subscribe(data => {
        this.plantData = data;

        this.plantSrv.getHistorics(data._id).subscribe(recs=>{
          let mediciones = recs.mediciones;

          let signMean = this.kmeanServicie.getSignificantMean(mediciones);
          console.log(signMean);

          if(signMean[0] < this.plantData.min_temp){
            signMean[0] = -1;
          }else{
            signMean[0] = signMean[0] > this.plantData.max_temp ? 1 : 0;
          }

          if(signMean[1] < this.plantData.min_lum){
            signMean[1] = -1;
          }else {
            signMean[1] = signMean[1] > this.plantData.max_lum ? 1 : 0;
          }

          if(signMean[2] < this.plantData.min_hum){
            signMean[2] = -1;
          }else {
            signMean[2] = signMean[2] > this.plantData.max_hum ? 1 : 0;
          }

          if(signMean[3] < this.plantData.min_humt){
            signMean[3] = -1;
          }else {
            signMean[3] = signMean[3] > this.plantData.max_humt ? 1 : 0;
          }

          let cont = 0;
          signMean.forEach(obj => {
            if(obj != 0){
              cont++;
            }
          })

          console.log(signMean);
          console.log(cont);
        })

        this.temperatura = (data.last_rec.temperatura - this.plantData.min_temp) * 100 / (this.plantData.max_temp - this.plantData.min_temp);
        this.luminosidad = (data.last_rec.luminosidad - this.plantData.min_lum) * 100 / (this.plantData.max_lum - this.plantData.min_lum);
        this.humedad_tierra = (data.last_rec.humedad_tierra - this.plantData.min_humt) * 100 / (this.plantData.max_humt - this.plantData.min_humt);
        this.humedad_ambiente = (data.last_rec.humedad_ambiente - this.plantData.min_hum) * 100 / (this.plantData.max_hum - this.plantData.min_hum);

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
          let datetime: string = currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

          this.addData(datetime, rec);

          if (rec.temperatura > this.plantData.max_temp) {
            this.estado = "Caliente";
          } else if (rec.temperatura < this.plantData.min_temp) {
            this.estado = "Congelado";
          } else if (rec.luminosidad > this.plantData.max_lum) {
            this.estado = "Encandilado";
          } else if (rec.luminosidad < this.plantData.min_lum) {
            this.estado = "Vampiro";
          } else if (rec.humedad_ambiente < this.plantData.min_hum || rec.humedad_tierra < this.plantData.min_humt) {
            this.estado = "Seco";
          } else if (rec.humedad_ambiente > this.plantData.max_hum) {
            this.estado = "Sofocado";
          } else if (rec.humedad_tierra > this.plantData.max_humt) {
            this.estado = "Ahogado";
          } else {
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

  onHistoricsClick() {
    this.router.navigate(['/historics'], { queryParams: { planta_id: this.plantData._id, id_micro: this.plantData.id_micro } });

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.spinnerDiameter = window.innerHeight / 7;
  }

  onSettingClick() {
    this.route.queryParams.subscribe(params => {
      this.dialog.open(SettingsDialogComponent, { data: { plantData:this.plantData } }).afterClosed().subscribe(result => {
        if(result){
          console.log(result);
          this.plantSrv.putConfigs(result.data, this.plantData.id_micro).subscribe(data=>{
            this.plantSrv.getPlantById( this.plantData.id_micro).subscribe(data =>{this.plantData = data})
          })
        }
      })

    })
  }

  public cameraClick(){
    this.showCamera = !this.showCamera;
    if(this.showCamera && !this.cameraSrc){
      this.toastr.info('Conectando a servicio de cámara, espere por favor', 'Conectando...')
      this.cameraService.connect(this.serverUrl).then(resp => {
        this.toastr.clear();
        if(!resp){
          this.toastr.error('No se pudo conectar al servicio de cámara', 'Error');
          return;
        }
        this.toastr.success('Conectado con éxito', 'Viendo streaming');

        this.cameraService.streamVideo().subscribe(frame => {
          this.cameraSrc = frame;
        });

        this.cameraService.getStatusUpdates().subscribe(update => {
          this.status = update;
        });

        this.cameraService.getFaces().subscribe(face => {
          this.faceList.push(face);
        });

        this.cameraService.getPersonDetected().subscribe(person => {
          this.toastr.clear();
          this.toastr.success('¡' + person + ' detectado!', 'Hola ' + person);
        });

        this.cameraService.getPersonDetected().subscribe(()=> {
          console.warn('XD');
        });

      }, error=>{
        this.toastr.clear();
        this.toastr.error(error, 'Error');
      });
    }
  }

  public setMode(mode : string){
    this.mode = mode;
    if(mode == 'stream'){
      this.cameraService.setStream();
      return;
    }

    if(mode == 'recognize'){
      this.cameraService.setRecognitionMode();
      return;
    }

    if(mode == 'add'){
      return;
    }
  }

  public addFace(){
    this.cameraService.setRecognitionFor(this.faceName);
    this.faceName = '';
  }

  public deleteFace(face : string, index : number){
    this.cameraService.deletePerson(face);
    this.faceList.splice(index, 1);
  }
}
