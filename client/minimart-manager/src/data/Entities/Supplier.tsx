export interface Supplier {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    status?: string;
}

export class SupplierEntity implements Supplier {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    status?: string;

    constructor(data: Partial<Supplier> = {}) {
        this.id = data.id ?? '';
        this.name = data.name ?? '';
        this.email = data.email ?? '';
        this.phone = data.phone ?? '';
        this.address = data.address ?? '';
        this.description = data.description ?? '';
        this.status = data.status ?? '';
    }
}