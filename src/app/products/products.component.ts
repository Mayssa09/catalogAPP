import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  currentPage : number=0;
  pageSize :number=5;
  totalPages :number=0;

  currentAction : string = "all";

searchFormGroup! : FormGroup 

  constructor(private productService : ProductService, private fb : FormBuilder) { }

  ngOnInit(): void {
   this.searchFormGroup = this.fb.group(
   { keyword : this.fb.control(null)}
   )

   this.handleGetPageProducts()
  }

  handleSearchProduct(){
    this.currentAction="search";
    this.currentPage=0;
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProduct(keyword,this.currentPage,this.pageSize).subscribe(value =>
    { this.products = value.products ; this.totalPages = value.totalPages} )

  }


  delete(p: Product) {
    let conf = confirm("Are you sure?");
    if (conf==false) return;
  this.productService.deleteProduct(p.id).subscribe(value => {
    this.products = value
    this.handleGetAllProducts();
  })
  
  }
handleGetAllProducts(){
  this.productService.getAllProducts().subscribe(value => {this.products = value})
}
handleGetPageProducts(){
  this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe(value=> {this.products=value.products; this.totalPages=value.totalPages})
}
gotoPage(i:number){
  this.currentPage=i;
  if (this.currentAction==='all')
this.handleGetPageProducts(); else this.handleSearchProduct();
}
handleSetPromo(p : Product){
  let promo = p.promotion
  this.productService.handleSetPromo(p.id).subscribe(()=> 
  p.promotion=!promo)
 
}
}
