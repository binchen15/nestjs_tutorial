import {Injectable, NotFoundException} from "@nestjs/common";

import {Product} from "./products.model"

@Injectable()
export class ProductsService {

	private products: Product[] = []

	insertProduct(title: string, desc:string, price:number) {
		const prodId = Math.random().toString();
		const prod = new Product(
			prodId,
			title,
			desc,
			price
		)
		this.products.push(prod);
		return prodId;
	}

	getProducts() {
		return [...this.products]; // return a copy, not reference
	}

	getProduct(id) {
		const product = this.products.find(prod => prod.id == id) 
		if (!product) {
			throw new NotFoundException("wrong id.");
		}
		return {...product};
	}

	deleteProduct(id) {
		const [_, index] = this.findProduct(id);
		this.products.splice(index, 1);	
	}

	private findProduct(id) : [Product, number] {
		const productIndex = this.products.findIndex(prod => prod.id == id)
		const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException("wrong id.");
        }
		return [product, productIndex]
	}

	updateProduct(productId: string, title: string, description: string, price:number) {
		const [product, index] = this.findProduct(productId)
		this.products[index] = {...product, title, description, price}
	
	}

}
