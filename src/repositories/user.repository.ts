import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";

export class UserRepository {
    protected repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    

    public async insert(user: User) {
        await this.repository.save(user);
    }

    public async update() {}

    public async findById(userId: number) {
        const response = await this.repository.findOneBy({id: userId});
        return response;
    }

    public async findAll() {}

    public async findByUsername(user: string) : Promise <User | null> {
         return await this.repository.findOneBy({username: user});
    }
}