import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ListResponseModel } from '../models/listResponseModel';
import { Category } from '../models/category';
import { RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    apiUrl="https://localhost:44376/api/categories/getall";
  constructor(private httpClient:HttpClient) { }

   getCategories():Observable<ListResponseModel<Category>>{
        return this.httpClient
        .get<ListResponseModel<Category>>(this.apiUrl);
      
      }
}
