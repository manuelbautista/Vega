import { ProgressService } from '../../services/progress.service';
import { PhotoService } from '../../services/photo.service';
import { VehicleService } from '../../services/vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any[];
  progress: any[];

  emptyValue: any;

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private toasty: ToastyService, 
              private progressService : ProgressService,
              private photoService: PhotoService,
              private vehicleService: VehicleService) {
                
          route.params.subscribe(p=> {
            this.vehicleId = +p['id'];
            if(isNaN(this.vehicleId) || this.vehicleId <= 0){
                router.navigate(['/vehicles']);
                return;
            }
          });
  }

  ngOnInit() { 
    this.photoService.getPhotos(this.vehicleId)
    .subscribe(photos => this.photos = photos);

  this.vehicleService.getVehicle(this.vehicleId)
    .subscribe(
      v => this.vehicle = v,
      err => {
        if (err.status == 404) {
          this.router.navigate(['/vehicles']);
          return; 
        }
      });
}

delete() {
  if (confirm("Are you sure?")) {
    this.vehicleService.delete(this.vehicle.id)
      .subscribe(x => {
        this.router.navigate(['/vehicles']);
      });
  }
}
uploadPhoto() {
  this.progressService.startTracking()
    .subscribe(progress => {
      this.emptyValue = null;  
      console.log(progress);
      this.progress = progress;
    },
    this.emptyValue, 
() => {this.progress = []});

var nativeElement: HTMLInputElement = this.fileInput.nativeElement;

if(nativeElement.files != null )

  this.photoService.upload(this.vehicleId, nativeElement.files[0])
    .subscribe(photo => {
      this.photos.push(photo);
    },
  err => {
    this.toasty.error({
      title: 'Error',
      msg: err.text(),
      theme: 'bootstrap',
      showClose: true,
      timeout: 5000
  });
  //removing image name
  nativeElement.value = "";
  });
}

}
