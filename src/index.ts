import "reflect-metadata";
import express, { ErrorRequestHandler, NextFunction } from "express";
import { Application, Request, Response } from "express";
import { UserRepository } from "./repositories/user.repository";
import basicAuth from "express-basic-auth";
import { AppDataSource } from "./data-source"
import { ProductRepository } from "./repositories/product.repository";
import { Product } from "./models/Product";
import { v4 as uuidv4 } from "uuid";
import { OrderRepository } from "./repositories/order.repository";
import { Order } from "./models/Order";
import { OrderProduct} from "./models/OrderProduct";
import { Resolver } from "dns";
import "express-async-errors";

AppDataSource.initialize().then(async () => {

  const app: Application = express();
  const port = 3000;
  const ioc = {
    userRepository: new UserRepository(),
    productRepository: new ProductRepository(),
    orderRepository: new OrderRepository(),
  }

  // Body parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(basicAuth({
    authorizeAsync: true,
    authorizer: (username: string, password: string, authorize) => {
      ioc.userRepository.findByUsername(username).then(user => {
        authorize(null, !!user && user.password === password)
      })
    }
  }))

  

  app.get("/call1", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: "Messaggio1!",
    });

  });

  app.get("/call2", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: "Messaggio2!",
    });
  })

  // INSERT ORDERS

// body = {
//    // key is the productId, value is the quantity
//    [key: number]: number
// }

// body = {
//    // key is the productId, value is the quantity
//    [key: number]: number
// }

app.post("/orders", async (req: Request, res: Response) => {
  const body = req.body
  const productIds = Object.keys(body).map(e => +e)
  const products = await ioc.productRepository.findByIdIn(productIds)
  if(!products.length){
    throw new Error('New order must contains almost one product') 
  }

  const user = await ioc.userRepository.findByUsername((req as any).auth.user)
  const order = {
    guid: uuidv4(),
    creation_date: new Date(),
    user: user,
    orderProducts: []
  } as Order

  for(const product of products){
    const op = {
      order: order,
      product: product,
      quantity: body[product.id]
    } as OrderProduct
    order.orderProducts.push(op)
  }

  const newOrder = ioc.orderRepository.insert(order)

  res.status(201).send(newOrder)
})

  // app.get("/orders", async (req: Request, res: Response): Promise<Response> => {
  //   return res.status(200).send({
  //     message: "Crea un prodotto!",
  //   });
  // })

  app.get("/products", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: "Inserisci prodotto!",
    });
  })

  app.get("/orders/:userId", async (req: Request, res: Response): Promise<Response> => { 
     if(!req.params.userId || typeof req.params.userId != 'number'){
          throw new Error ("user id is not defined")
     }
     const user = await ioc.userRepository.findById(parseInt(req.params.userId))
    if (!user || user === null) throw Error("user-not-found");
    const orders = await ioc.orderRepository.findByUser(user);
    return res.status(200).send({
      message: "Prodotti utente trovati",
      data: { orders: orders }
    })

  })

  //INSERT PRODUCTS

  app.post("/products", async (req: Request, res: Response) => {


    if (!req.body.name) {
      res.status(400).send({ message: 'Serve un nome' })
    }

    const product = {
      name: req.body.name,
      description: req.body.description,
      guid: uuidv4(),
      price: req.body.price
    } as Product;

    const newProduct = ioc.productRepository.insert(product)

    res.status(201).send(newProduct)
  })

  app.get("/users/:userId", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: req.params.userId,
    });
  })

  app.use(((err, req, res, next) => {
    res.status(500).send(err)
  })as ErrorRequestHandler);

  try {
    app.listen(port, (): void => {
      console.log(`Connected successfully on port ${port}`);
    });
  } catch (error: any) {
    console.error(`Error occured: ${error.message}`);
  }

}).catch(error => console.log(error))



