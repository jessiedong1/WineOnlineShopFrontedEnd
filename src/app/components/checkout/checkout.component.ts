import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/common/address';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkedout = false;
  address: Address;
  registerForm:FormGroup;
  cartItems: CartItem[];
  total:number=0.00;
  isSubmit = false;
  errorMessage='Hi';
  paymentFailed = false;
  paymentNotAccepted=false;
  countries:string[]= ['United States', 'Algeria', 'Afghanistan', 'Ghana','Albania','Bahrain','Colombia','Dominican Republic']

  constructor(private fb :FormBuilder, private cartService: CartService, private route: Router, private http: HttpClient, private zone: NgZone) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      line1:['', Validators.required],
      line2:[''],
      state:['', Validators.required],
      zip:['', Validators.required],
      country:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phone:['', Validators.required],
      cardnumber:['', Validators.required],
      month:['', Validators.required],
      year:['', Validators.required],
      cvc: ['', Validators.required]
    });
    this.cartItems= this.cartService.getCartItems();
    this.getTotal();
    console.log("total"+this.total);



  }

  chargeCreditCard() {
    (<any>window).Stripe.card.createToken({
      number: this.registerForm.get('cardnumber').value,
      exp_month: this.registerForm.get('month').value,
      exp_year: this.registerForm.get('year').value,
      cvc: this.registerForm.get('cvc').value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        console.log(token);
        this.chargeCard(token);
        this.paymentFailed=false;
      } else {
        this.paymentFailed=true;
        console.log(response.error.message);
        this.errorMessage=response.error.message;
        console.log(this.errorMessage)
        this.zone.run((()=>{this.route.navigateByUrl('/check-out').then(r=>console.log(r))}));
        // this.paymentFailed=true;        
      }
    });
  }
  chargeCard(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post('http://localhost:8080/wineshop/customer/payment/charge', {"token":token, "amount": `${this.total}`}, httpOptions)
      .subscribe( response =>{ 
        this.cartService.checkOutCart(this.address);
        // console.log(response);
        this.paymentNotAccepted=false;
    
      },
      error => {
        this.paymentNotAccepted=true;
        this.errorMessage=error.error;
        console.log(error.error);
      }
    );

  }

  onSubmit(){
    this.isSubmit=true;
    this.address = new Address(this.registerForm.get('firstName').value, 
    this.registerForm.get('lastName').value,
    this.registerForm.get('line1').value,
    this.registerForm.get('line2').value,
    this.registerForm.get('state').value,
    this.registerForm.get('zip').value,
    this.countries[parseInt(this.registerForm.get('country').value)-2],
    this.registerForm.get('email').value,
    this.registerForm.get('phone').value);
    this.chargeCreditCard();
    // this.cartService.checkOutCart(this.address);
  }


  getTotal(){
    for( const item of this.cartItems){
      this.total+= item.quantity*item.product.price;
    }
    
  }
}
