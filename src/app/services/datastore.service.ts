import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  constructor() { }

  currentPage:string = "";
  productDetails:any={};
}
