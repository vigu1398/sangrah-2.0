export class AddNew {
    constructor(
        public ref_type: string,
        public ref_value: string,
        public ref_id?: number
    ) { }
}

export class AddItem {
    constructor(
        public ref_type: string,
        public ref_value: string,
        public children: any
    ) { }
}

export class Remove {
    constructor(
        public ref_type: string,
        public ref_value: string,
        public del: boolean,
        public _id: number,
        public children: []
    ) { }
}

export class RemoveChild {
    constructor(
        public ref_type: string,
        public ref_value: string,
        public _id: number,
        public children: any
    ) { }
}

export class Assign {
    constructor(
        public ref_id: number,
        public ref_type: string,
        public ref_value: string,
        public _id: number,
        public children: any
    ) { }
}

export class NewItem {
    constructor(
        public name: string,
        public description: string,
        public ref_type: string,
        public ref_parent: number,
        public ref_child: number,
        public children: Assign[]
    ) { }
}

export class Item {
    constructor(
        public _id: number,
        public name: string,
        public description: string,
        public ref_type: string,
        public ref_parent: number,
        public ref_child: number,
        public createdBy: number,
        public modifiedBy: number,
        public children: Assign[]
    ) { }

}
