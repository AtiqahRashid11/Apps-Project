import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from 'src/app/models/Appointment.mode';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  post = {} as Post;
  id: any;
  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController
    ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
   }

  ngOnInit() {
    this.getPostById(this.id);
  }

  async getPostById(id: string){
  //show loader
  let loader = this.loadingCtrl.create({
  message: "Please wait..."
  });
  (await loader).present();

  this.firestore.doc("Appointment/" + id)
  .valueChanges()
  .subscribe(data => {
    this.post.name = data["name"];
    this.post.email = data["email"];
    this.post.Address = data["Address"];
    this.post.eventType = data["eventType"];
    this.post.date = data["Date"];
    this.post.time = data["Time"];
    this.post.message= data["message"];
  });


 



  //dismiss loader
  (await loader).dismiss();
  }

  async updatePost(post: Post){
    if(this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
      message: "Please wait..."
      });
      (await loader).present();
  
      try{
       
        await this.firestore.doc("Appointment/" + this.id).update(post);
      } catch(e){
        this.showToast(e);
      }
      //dismiss loader
      (await loader).dismiss();
  
      //redirect to view post page
      this.navCtrl.navigateRoot("view-profile");
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
      this.showToast("Enter choosen Date");
      return false;
    }

    if(!this.post.time){
      this.showToast("Enter choosen time");
      return false;
    }

    if(!this.post.message){
      this.showToast("Enter massage");
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
  }
}

