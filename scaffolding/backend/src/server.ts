import { Moderator } from './models/moderator.model';
import { SubjectController } from './controllers/subject.controller';
import express, { Application , Request, Response } from 'express';
import morgan from 'morgan';
import { UserController } from './controllers/user.controller';
import { SecuredController } from './controllers/secured.controller';
import { Sequelize } from 'sequelize';
import { User } from './models/user.model';
import { Admin } from './models/admin.model';
import { Order } from './models/order.model';

import cors from 'cors';
import { AdminController } from './controllers/admin.controller';
import { Post } from './models/post.model';
import { PostController } from './controllers/post.controller';
import { PostImage } from './models/postImage.model';
import { Like } from './models/like.model';
import { Subject } from './models/subject.model';
import { Board } from './models/board.model';
import { PostComment } from './models/postComment.model';
import { BoardController } from './controllers/board.controller';
import { Product } from './models/product.model';
import { ProductImage } from './models/productImage.model';
import { ProductController } from './controllers/product.controller';
import { CommentController} from './controllers/postComment.controller';
import { Bookmark } from './models/bookmark.model';
import { OrderController } from './controllers/order.controller';
import { Subscription } from './models/subscription.model';

import {env} from 'process';
import {ProductOrder} from './models/ProductOrder.model';



export class Server {
    private server: Application;
    private sequelize: Sequelize;
    private port = process.env.PORT || 3000;

    constructor() {
        this.server = this.configureServer();
        this.sequelize = this.configureSequelize();

        User.initialize(this.sequelize);
        Post.initialize(this.sequelize);
        PostImage.initialize(this.sequelize);
        Like.initialize(this.sequelize);
        Subject.initialize(this.sequelize);
        Board.initialize(this.sequelize);
        Product.initialize(this.sequelize);
        ProductImage.initialize(this.sequelize);
        Bookmark.initialize(this.sequelize);
        PostComment.initialize(this.sequelize);
        Admin.initialize(this.sequelize);
        Moderator.initialize(this.sequelize);
        Subscription.initialize(this.sequelize);
        Order.initialize(this.sequelize);
        ProductOrder.initialize(this.sequelize);
        PostImage.createAssociations();
        ProductImage.createAssociations();
        Bookmark.createAssociations();
        Admin.createAssociations();
        Moderator.createAssociations();
        Post.createAssociations();
        ProductOrder.createAssociations();

        this.sequelize.sync().then(() => {                           // create connection to the database
            this.server.listen(this.port, () => {                                   // start server on specified port
                console.log(`server listening at http://localhost:${this.port}`);   // indicate that the server has started
            });
        });
    }

    private configureServer(): Application {
        // options for cors middleware
        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: `http://localhost:${this.port}`,
            preflightContinue: false,
        };

        return express()
            .use(cors())
            .use(express.json())                    // parses an incoming json to an object
            .use(morgan('tiny'))                    // logs incoming requests
            .use('/user', UserController)
            .use('/secured', SecuredController)
            .use('/admin', AdminController)
            .use('/subject', SubjectController)
            .use('/post', PostController)
            .use('/board', BoardController)
            .use('/product', ProductController)
            .use('/comment', CommentController)
            .use('/order', OrderController)
            .options('*', cors(options))
            .use(express.static('./src/public'))
            // this is the message you get if you open http://localhost:3000/ when the server is running
            .get('/', (req, res) => res.send('<h1>Welcome to the ESE-2021 Backend Scaffolding <span style="font-size:50px">&#127881;</span></h1>'));
    }

    private configureSequelize(): Sequelize {
        return new Sequelize({
            dialect: 'sqlite',
            storage: 'db.sqlite',
            logging: false // can be set to true for debugging
        });
    }
}

const server = new Server(); // starts the server
