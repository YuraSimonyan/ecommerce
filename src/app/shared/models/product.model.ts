export class ProductModel {

    constructor(
        public title: string,
        public description: string,
        public style: string,
        public price: number,
        public isPromoted: boolean,
        public promotedPrice: number | string,
        public date: string,
        public materialName: string,
        public img: any[],
        public id?: string
    ) {
    }
}
