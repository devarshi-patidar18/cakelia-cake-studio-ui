import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Cake {

  id:number;

  title:string;

  category:string;

  image:string;

}

@Component({
  selector:'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./gallery.component.html',
  styleUrls:['./gallery.component.css']
})
export class GalleryComponent{

categories=[
'All',
'Birthday',
'Anniversary',
'Wedding',
'Theme',
'Kids',
'Cupcakes'
];

selectedCategory='All';

selectedImage='';

cakes:Cake[]=[

{
id:1,
title:'Pink Birthday Cake',
category:'Birthday',
image:'assets/extra_chocolate_with_3_flowers.jpeg'
},

{
id:2,
title:'Chocolate Cake',
category:'Birthday',
image:'assets/car.jpeg'
},

{
id:3,
title:'Anniversary Cake',
category:'Anniversary',
image:'assets/blue.jpeg'
},

{
id:4,
title:'Wedding Cake',
category:'Wedding',
image:'assets/green.jpeg'
},

{
id:5,
title:'Princess Cake',
category:'Kids',
image:'assets/kids1.jpg'
},

{
id:6,
title:'Butterfly Cake',
category:'Theme',
image:'assets/theme1.jpg'
},

{
id:7,
title:'Cupcakes',
category:'Cupcakes',
image:'assets/cupcake1.jpg'
},

{
id:8,
title:'Floral Cake',
category:'Theme',
image:'assets/theme2.jpg'
}

];

filter(category:string){

this.selectedCategory=category;

}

get filteredCakes(){

if(this.selectedCategory==='All'){

return this.cakes;

}

return this.cakes.filter(x=>x.category===this.selectedCategory);

}

open(image:string){

this.selectedImage=image;

}

close(){

this.selectedImage='';

}

}