export class ProductModel {

  constructor(public title: string,
              public description: string,
              public style: string,
              public price: number | string,
              public isPromoted: boolean,
              public promotedPrice: number | string,
              public date: string,
              public material: { materialName: any, materialPhoto: [any] },
              public img: any[],
              public id?: string
  ) {
  }
}
