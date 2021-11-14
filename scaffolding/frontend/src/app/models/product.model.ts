import { StringMapWithRename } from "@angular/compiler/src/compiler_facade_interface";

export class Product {

    constructor(
        public productId: number,
        public title: string,
        public description: string,
        public category: string,
        public productImage: string | undefined,
        public price: number
    ){}
}