import { Component } from '@angular/core';
import { CartSummaryComponent } from "../cart-summary/cart-summary.component";

@Component({
  selector: 'app-navi',
  imports: [CartSummaryComponent],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent {

}
