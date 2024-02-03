import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonCard } from '@ionic/angular';
import { Animation } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Hickingtrail } from 'src/app/interfaces/hickingtrail';
import { HickingtrailRegister } from 'src/app/interfaces/hickingtrail-register';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;

  uuid?: string;
  private animation!: Animation;
  isPlaying = false;
  hickingtrail!: HickingtrailRegister;

  constructor(
    private animationCtrl: AnimationController,
    private storageService: StorageService,
    private route: ActivatedRoute,
  ) {}

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.storageService.get('hickingtrail').then((response) => {
      const actualHickingtrail = [response] as HickingtrailRegister[];
      this.hickingtrail = actualHickingtrail.find((h: HickingtrailRegister) => h.uuid === this.uuid)!;
      this.hickingtrail.origin_lat = coordinates.coords.latitude;
      this.hickingtrail.origin_lng = coordinates.coords.longitude;
    });
    this.storageService.set('hickingtrail', this.hickingtrail);
  }

  ngOnInit() {
    this.uuid = this.route.snapshot.paramMap.get('uuid')!;
    this.getCurrentPosition();
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
    this.animation.play();
    this.isPlaying = true;
  }

  stop() {
    this.animation.stop();
  }

}
