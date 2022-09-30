import { Injectable } from '@angular/core';
import kmeans from 'dimas-kmeans';


@Injectable({
  providedIn: 'root'
})
export class KmeansService {

  constructor() { }

  getClusters(mediciones){
    mediciones.forEach(obj =>{
      delete obj['recTime'];
    })

    console.log(mediciones);

    mediciones = mediciones.filter(element => {
      if (Object.keys(element).length !== 0) {
        return true;
      }
      return false;
    })

    mediciones = mediciones.map(element =>{
      return [Number(element.temperatura), Number(element.luminosidad), Number(element.humedad_ambiente), Number(element.humedad_tierra)];
    })
    console.log(mediciones);

    let clusters = kmeans.getClusters(mediciones);
    return clusters
  }

  getSignificantMean(mediciones){
    let clusters = this.getClusters(mediciones);

    let biggerCluster = {data:[], mean:[]};

    clusters.forEach(element => {
        if(element.data.length > biggerCluster.data.length){
          biggerCluster = element;
        }
    });
    let significatnMean = biggerCluster.mean;

    return significatnMean;
  }

}
