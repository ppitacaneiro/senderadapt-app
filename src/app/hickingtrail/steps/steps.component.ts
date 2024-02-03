import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonCard } from '@ionic/angular';
import { Animation } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HickingtrailRegister } from 'src/app/interfaces/hickingtrail-register';
import { Subscription, interval } from 'rxjs';
import { Step } from 'src/app/interfaces/step';
import { HickingtrailService } from 'src/app/services/hickingtrail.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;

  steps: Step[] = [];
  startDate?:Date;
  endDate?:Date;
  timeInMinutes?:number;
  uuid?: string;
  private animation!: Animation;
  isPlaying = false;
  hickingtrail!: HickingtrailRegister;
  watchPosition!: Subscription;

  constructor(
    private animationCtrl: AnimationController,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private hickingtrailService: HickingtrailService
  ) {}

  setCurrentPosition(coordinates: Position) {
    this.storageService.get('hickingtrails').then((hickintrails:HickingtrailRegister[]) => {
      this.hickingtrail = hickintrails.find((h: HickingtrailRegister) => h.uuid === this.uuid)!;
      this.hickingtrail.origin_lat = coordinates.coords.latitude;
      this.hickingtrail.origin_lng = coordinates.coords.longitude;
      this.storageService.set('hickingtrails', hickintrails);
    });
  }

  async getOriginPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.setCurrentPosition(coordinates);
  }

  ngOnInit() {
    this.uuid = this.route.snapshot.paramMap.get('uuid')!;
    this.getOriginPosition();
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(-100px)', 'translateX(100px)')
  }

  play() {
    this.startDate = new Date();
    this.animation.play();
    this.isPlaying = true;
    this.getSteps();
  }

  stop() {
    this.endDate = new Date();
    this.timeInMinutes = (this.endDate.getTime() - this.startDate!.getTime()) / 60000;
    this.animation.stop();
    this.watchPosition.unsubscribe();
    this.save();
  }

  async save() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.storageService.get('hickingtrails').then((hickintrails:HickingtrailRegister[]) => {
      this.hickingtrail = hickintrails.find((h: HickingtrailRegister) => h.uuid === this.uuid)!;
      this.hickingtrail.time_minutes = this.timeInMinutes!;
      this.hickingtrail.destination_lat = coordinates.coords.latitude;
      this.hickingtrail.destination_lng = coordinates.coords.longitude;
      this.hickingtrail.steps = this.steps;
      this.hickingtrail.distance_kms = 0;
      this.storageService.set('hickingtrails', hickintrails).then(() => {
        // TODO: check internet connection
        this.sendToServer(this.hickingtrail);
      });
    });
  }

  sendToServer(hickingtrail: HickingtrailRegister) {
    this.hickingtrailService.saveHickingTrail(hickingtrail).subscribe({
      next: () => {
        this.toastService.presentToast('Ruta guardada correctamente');
        this.router.navigate(['/hickingtrail/search']);
      },
      error: (error) => {
        console.log('error guardando ruta', error);
      }
    });
  }

  getSteps() {
    // TODO: change to watchPosition when testing on a real device
    this.watchPosition = interval(5000).subscribe(() => {
      Geolocation.getCurrentPosition().then((coordinates) => {
        console.log('coordinates', coordinates);
        this.steps.push({
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
        } as Step);
      });
    });  

  }
}
