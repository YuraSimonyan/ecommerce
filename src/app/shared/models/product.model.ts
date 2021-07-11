export class ProductModel {

  constructor(public title: any,
              public description: any,
              public style: any,
              public price: any,
              public isPromoted: any,
              public promotedPrice: any,
              public date: any,
              public material: { materialName: any, materialPhoto: [any] },
              public img: any[],
              public id?: any
  ) {
  }
}
