// creating data class
const  {Sequelize}  = require('sequelize');
const randomstring = require('randomstring');


const DATABASE_NAME = process.env.DATABASENAME;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;

let sequelize = new Sequelize(DATABASE_NAME, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        idle: 10000
    },
    define: {
        timestamps: false // omit the createdAt and updatedAt columns
    }
});
const registerusers = sequelize.import('./models/registerusers');
const prdcategories = sequelize.import('./models/prdcategories');
const items = sequelize.import('./models/items');
const orders = sequelize.import('./models/orders');


class DataAccessLayer {
    constructor() {
    }

    isUniqueEmail(request, response) {
        const email = request.body.Email;
        sequelize.sync({force: false})
        .then(() =>
            registerusers.findByPk(email)
        )
        .then((result) => {
            if(result === null) {
                response.json({
                    statusCode: 401,
                    data: 'User not found'
                });
                response.end();
            }
            else {
                response.json({
                    statusCode: 200,
                    data: 'User found'
                });
                response.end();
            }
        })
        .catch((error) => {
            response.json({
                statusCode: 500,
                data: error
            });
            response.end();
        })
    }
    
    registerUser(request, response)     {
        const user = {
            Email: request.body.Email,
            Password: request.body.Password,
            Name: request.body.Name,
            PhoneNo: parseInt(request.body.PhoneNo),
            Address: request.body.Address
        }
        
        sequelize.sync({force: false})
        .then(() =>   
            registerusers.create(user)
        )
        .then((result) => {
            response.json({
                statusCode: 200,
                data: `User Created Successfully`
            });
            response.end();
        })
        .catch((error) => {
            response.send({
                statusCode: 500,
                data: `Error Occured ${error}`
            });
            response.end();
        });
    }


    loginUser(request, response) {
        let email = request.body.Email;
        let password = request.body.Password;
        sequelize.sync({ force: false })
        .then(() => registerusers.findByPk(email))
        .then((result) => {
            console.log(JSON.stringify(result));
            // 2a. if user not found response the UnAuthorized
            if (result === null) {
                response.json({ statusCode: 401, data: `User Not Found` });
                response.end();
            } else {
                if (result.Password !== password) {
                    response.json({ statusCode: 401, data: `Un-Authenticated response Password Does not match` });
                    response.end();
                } else {
                    response.send({
                        statusCode: 200,
                        authenticated: true
                    });
                    response.end();
                }
            }

        }).catch((error) => {
            response.json({ statusCode: 401, data: `User Not Found ${error}` });
            response.end();
        });
    }

    getCategories(request, response)    {

        sequelize.sync({force: false})
        .then(() =>
            prdcategories.findAll()
        )
        .then((result) => {
            response.json({
                statusCode: 200,
                data: result
            });
            response.end();
        })
        .catch((error) => {
            response.json({
                statusCode: 500,
                data: error
            });
            response.end();
        })
    }

    getItems(request, response)    {
        let cid = request.params.categoryId
        sequelize.sync({force: false})
        .then(() =>
            items.findAll({
                where: {
                    CategoryId: cid
                }
            })
        )
        .then((result) => {
            response.json({
                statusCode: 200,
                data: result
            });
            response.end();
        })
        .catch((error) => {
            response.json({
                statusCode: 500,
                data: error
            });
            response.end();
        })
    }

    placeOrder(request, response)    {
        const orderId = randomstring.generate({length: 10, charset: "numeric"});
        const orderProduct = {
            OrderId: orderId,
            Email: request.body.Email,
            CategoryId: request.body.CategoryId,
            ItemId: request.body.ItemId
        }
        sequelize.sync({force: false})
        .then(() => 
            orders.create(orderProduct)
        )
        .then((result) => {
            response.json({
                statusCode: 200,
                data: `Order Insert Successfully ${JSON.stringify(result.toJSON())}`
            });
            response.end();  
        })
        .catch((error) => {
            response.json({
                statusCode: 500,
                data: error
            });
            response.end();
        })
    }


    getOrders(request, response) {
        let email = request.params.email;
        console.log(email);

        sequelize.query('call getOrdersTable(:email)',{
            replacements: {email: email}
        })
        .then((result) => {
            response.json({
                statusCode: 200,
                data: result
            });
            response.end();
        })
        .catch((error) => {
            response.json({
                statusCode: 500,
                data: error
            });
            response.end();
        });
    }

    placeOrders(request, response)   {
        
        let ordersList = request.body.orders;
        for(var i in ordersList)    {
            const orderId = randomstring.generate({length: 10, charset: "numeric"});
            ordersList[i] = {OrderId: orderId, ...ordersList[i]};
        }
        sequelize.sync({force: false})
        .then(() => 
            orders.bulkCreate(ordersList, {
                returning: true
            })
        )
        .then((result) => {
            response.json({
                statusCode: 200,
                data: `Orders Inserted Successfully ${JSON.stringify(result)}`
            });
            response.end();  
        })
        .catch((error) => {
            console.log(error);
            response.json({
                statusCode: 500,
                data: error
            });
            response.end();
        })
    
    }
}



module.exports = DataAccessLayer;