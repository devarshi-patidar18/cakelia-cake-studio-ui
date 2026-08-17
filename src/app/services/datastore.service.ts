import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  constructor(private router:Router) { }

  currentPage:string = "";
  productDetails:any={};
  primaryContactNumber:string ="+919329754288";
  backToScreens:any=[];

  updateScreenNavigation(screenName:string,isBack:boolean){

    if(this.backToScreens.length==0){
      this.router.navigate(["/"]);
    }
    
    if(!isBack){
      this.backToScreens.push(screenName);
    }
    else{
      this.backToScreens.pop();
    }
  }
}
