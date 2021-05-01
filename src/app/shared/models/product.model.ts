

export class ProductModel {

  constructor(public title: string,
              public description: string,
              public style: string,
              public price: string,
              public material: {materialName: string, materialPhoto: [string]},
              public img: string[]) {
  }
}
