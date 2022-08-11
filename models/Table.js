import BaseModel from '@/models/BaseModel';

class Table extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.id = data.id;
    }

    get payload() {
        return {
            keterangan: this.desc
        }
    }
}
export default Table;