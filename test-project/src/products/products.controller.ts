import { Controller, Get, Post, Patch, Delete, Body, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {

	constructor(private readonly productsService: ProductsService){}

	// content header generaeted automatically.
	@Post()
	addProduct(
		@Body('title') prodTitle: string,
		@Body('description') prodDesc: string,	
	    @Body('price') prodPrice: number	
	): any {
		const id = this.productsService.insertProduct(
			prodTitle, prodDesc, prodPrice
		);
		return {id:id};
	}

	@Get()
	getAllProducts(){
		return this.productsService.getProducts();
	}

	@Get(":id")
	getProduct(@Param('id') id: string) {
		return this.productsService.getProduct(id);
	}
	
	@Delete(":id")
	deleteProduct(@Param('id') id: string) {
		return this.productsService.deleteProduct(id);
	}
	
	@Patch(":id")
	updateProduct(
		@Param('id') id: string,
		@Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number		
	) {
		return this.productsService.updateProduct(id, title, description, price);
	}
}


