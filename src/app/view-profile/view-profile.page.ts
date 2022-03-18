import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  posts: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
    ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getPosts();
  }

  async getPosts(){
    //show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try {
    this.firestore
    .collection("Appointment")
    .snapshotChanges()
    .subscribe(data => { 
      this.posts = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()["name"],
          email: e.payload.doc.data()["email"],
          Address: e.payload.doc.data()["Address"],
          eventType: e.payload.doc.data()["eventType"],
          date: e.payload.doc.data()["date"],
          time: e.payload.doc.data()["time"],
          message: e.payload.doc.data()["massage"],
        };
      });

      
      
      loader.dismiss();
    });
    
    } catch(e){
    this.showToast(e);

    }
  }

  async deletePost(id: string){
  //show loader
  let loader = this.loadingCtrl.create({
  message: "Please wait..."
  });
  (await loader).present();

  await this.firestore.doc("Appointment/" + id).delete();

  //dismiss loader
  (await loader).dismiss();
  }

  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }
}
