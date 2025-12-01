import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';

@Component({
  selector: 'app-product-add',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {

  productAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private productService:ProductService,private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm=this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }

  add(){
    if(this.productAddForm.valid){
      let productModel=Object.assign({},this.productAddForm.value)
      this.productService.add(productModel).subscribe(response=>{
        
        this.toastrService.success(response.message,"Ürün Eklendi!")
      },responseError=>{
       if(responseError.error.Errors.length>0 ) {
        console.log(responseError.error.Errors)
        for (let i = 0; i > responseError.error.Errors.length; i++) {
           this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
        }     
       }
      })
    }
    else {
      this.toastrService.error("Formunuz Hatalı!")
    }
  }
}
