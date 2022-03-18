
import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.mode';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {


  post = {} as Post;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore

  ) { }

  ngOnInit() {}
  async createPost(post: Post){
    if(this.formValidation()) {
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();

    try{
      await this.firestore.collection("contact").add(post);
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

    if(!this.post.Appointment){
      this.showToast("Enter enquiry");
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