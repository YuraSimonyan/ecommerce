export class GetProductsAction {
    static readonly type = '[product] Get Data';
}

export class GetProductsActionById {
    static readonly type = '[product] Get Data id';

    constructor(public id: string) {
    }
}
