import { AppDataSource } from "../data-source";
import { Order } from "../models/Order";
import { User } from "../models/User";

export class OrderRepository {
    protected repository: any;

    constructor() {
        this.repository = AppDataSource.getRepository(Order);
    }

     public async insert(order: Order) {
        return await this.repository.save(order);
    }

    public async update() {}

    public async findById(orderId: string) {
        const response = await this.repository.findOneBy({id: orderId});
        return orderId;
    }

    public async findByUser(user: User) {
      const response = await this.repository.find({user: user});
      return response;
    }

    public async findAll() {}
}