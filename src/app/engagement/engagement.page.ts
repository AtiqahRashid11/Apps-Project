import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from '../models/Appointment.mode';

// <ion-segment-button value="OTHER" (click)="openDateTime()">
//   <ion-datetime #dateTime [(ngModel)]="selectedDate"></ion-datetime>
// </ion-segment-button>


@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.page.html',
  styleUrls: ['./engagement.page.scss'],

  
})
export class EngagementPage implements OnInit {
today;

post = {} as Post;

// private yearValue: string="2020,2023"
// private minDate: string=""
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore

  ) {
    this.today = new Date().getDate();
   }

  ngOnInit() {}
  async createPost(post: Post){
    if(this.formValidation()) {
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();

    try{
      await this.firestore.collection("Appointment").add(post);
    } catch(e){
      this.showToast(e);
    }
    //dismiss loader
    (await loader).dismiss();

    //redirect to home page
    this.navCtrl.navigateRoot("home");
    }
  }
  
  formValidation(){
    if(!this.post.name){
      this.showToast("Enter name");
      return false;

    }

    if(!this.post.email){
      this.showToast("Enter email");
      return false;
    }

    if(!this.post.Address){
      this.showToast("Enter Address");
      return false;
    
    }

    if(!this.post.eventType){
      this.showToast("Enter Event Type");
      return false;
    
    }


    if(!this.post.date){
      this.showToast("Enter your choosen Date");
      return false;
    
    }

    if(!this.post.time){
      this.showToast("Enter your choosen Time");
      return false;
    
    }

    if(!this.post.message){
      this.showToast("Enter message");
      return false;
    }

    return true;
  }

  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present());

}}
