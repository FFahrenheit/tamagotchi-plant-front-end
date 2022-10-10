import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { KmeansService } from 'src/app/shared/services/kmeans/kmeans.service';
import { PlantService } from 'src/app/shared/services/plant/plant.service';

@Component({
  selector: 'app-cluster-chart',
  templateUrl: './cluster-chart.component.html',
  styleUrls: ['./cluster-chart.component.scss']
})
export class ClusterChartComponent implements OnInit, AfterViewInit {
  @ViewChild('myCanvas') myCanvas: ElementRef;

  clusterChart: Chart;
  clusterData;

  private idMicro : string;

  constructor(
    private route: ActivatedRoute,
    private kmeanSrv: KmeansService,
    private plantSrv: PlantService,
    private router: Router) { }

  ngOnInit(): void {
  }
  
  public goToDetails(){
    this.router.navigate(['pet', 'dashboard'], { queryParams: {id_micro: this.idMicro}});
  }

  swapChart() {
    this.route.queryParams.subscribe(params => {
      this.router.navigate(['/historics'], { queryParams: { planta_id: params['planta_id'], id_micro: params['id_micro'] } });
    });
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      this.idMicro = params['id_micro'];
      this.plantSrv.getHistorics(params['planta_id']).subscribe(recs => {
        let mediciones = recs.mediciones;

        let clusters = this.kmeanSrv.getClusters(mediciones);
        console.log(clusters);

        this.clusterData = clusters.map(cluster => {
          let reg = {};
          reg['x'] = cluster.mean[0] * cluster.mean[1];
          reg['y'] = cluster.mean[2] * cluster.mean[3];
          reg['r'] = cluster.data.length;
          return reg;
        })
        console.log(this.clusterData);

        this.clusterData = {
          datasets: [{
            label: 'Clusters',
            data: this.clusterData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.3)',
              'rgba(100, 20, 255, 0.3)',
              'rgba(150, 200, 255, 0.3)',
              'rgba(0, 99, 55, 0.3)',
              'rgba(180, 150, 155, 0.3)',
            ]
          }]
        };

        this.clusterChart = new Chart(this.myCanvas.nativeElement, {
          type: 'bubble',
          data: this.clusterData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Clustering'
              }
            },
          }
        })

        this.clusterChart.update();
      })
    })




  }

}
