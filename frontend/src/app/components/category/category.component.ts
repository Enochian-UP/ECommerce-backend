import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent  implements OnInit{

categories:Category[]=[];
currentCategory:Category;
  constructor(private categoryService:CategoryService) {}

ngOnInit():void {

this.getCategories();
}

getCategories(){
      this.categoryService.getCategories().subscribe(response=>{
        this.categories = response.data
       
      })
    }

    setCurrentCategory(category:Category){
     this.currentCategory=category;
    }

    getCurrentCategoryClass(category:Category){
      if(category==this.currentCategory){
        return "list-group-item active"
      }
        else {
          return "list-group-item"
        }
    }

    getAllCategoryClass (){
      if (!this.currentCategory) {
        return "list-group-item active"
      } else {
        return "list-group-item"
      }
    }
     

    
}
