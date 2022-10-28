import { In, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../models/Product";

export class ProductRepository {
    protected repository: Repository<Product>;

    constructor() {
        this.repository = AppDataSource.getRepository(Product);
    }

    public async insert(product: Product) {
        return await this.repository.save(product);
    }

    public async update() {}

    public async findById(productId: number) {
        const response = await this.repository.findOneBy({id: productId});
        return productId;
    }

    public async findByIdIn(productsId: number[]) {
        const response = await this.repository.find({ where: { id: In([...productsId]) } });
        return response;
    }

    public async findAll() {}
}