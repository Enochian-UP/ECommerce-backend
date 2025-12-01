import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import {ProductComponent} from './components/product/product.component'
import {CategoryComponent} from './components/category/category.component'
import {NaviComponent} from './components/navi/navi.component'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ProductComponent,CategoryComponent,NaviComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'northwind';
 
}
