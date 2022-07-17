# seecommerce
Open Source E-Commerce Site

# Images From Site
<details>
  <summary>Click to expand!</summary>
  
  ### Main Page
  ![Main Page](https://user-images.githubusercontent.com/58953199/179397673-cea7f00d-09cd-400d-bf6a-defda945255b.jpg)
  
  ### Sort by Categories Page
  ![Categories](https://user-images.githubusercontent.com/58953199/179398251-d83d9ae7-9569-4e4c-a04c-f412a705ff63.jpg)
  
  ### Product Page
  ![Product](https://user-images.githubusercontent.com/58953199/179398270-ed33ae9d-30d0-4196-8f89-3ee3ab0cbf5e.jpg)

  ### Cart Page
  ![Cart](https://user-images.githubusercontent.com/58953199/179397883-b451f2c3-911f-405f-9fe8-6922aec32b80.jpg)
  
  ### Account Page
  ![Account](https://user-images.githubusercontent.com/58953199/179398213-266a13fa-5bd8-4a89-a732-d27427fa4b87.jpg)

  ### Products Add,Remove,Edit Page
  ![Products](https://user-images.githubusercontent.com/58953199/179398229-eb9023f0-8e3e-406d-a70b-d31736fb3431.jpg)

  ### Shop Settings Page
  ![Shop Settings](https://user-images.githubusercontent.com/58953199/179398240-36bde4c2-76b2-4e94-ab0f-40543bcefe02.jpg)


</details>

## Setup

First of all you need download [NodeJS](https://nodejs.org/en/) if you haven't installed!!

### Database Setup

1- Please create an account in [MongoDB Atlas](https://www.mongodb.com/atlas/database).

2- Create an new shared cluster free.

3- Press the connect button from the cluster you created and in the opened window select *Connect Using MongoDB Compass*.

4-   The part after @ in the connection string that appears on the screen is your database ip.

4.1- The part before @ in the connection string that appears on the screen is your username and password.

### config.json Setup (IMPORTANT!) (What to do before starting)

```
{
  "Email":"<shopMailSenderEmail>", //this your mail sender email. example='info@shop.com'
  "EmailPass":"<shopMailSenderPassword>", //this your mail sender password. example='123456789+'
  "MongoPass":"MongoString<user:password>", //this your got data from instruction 4.1. . example='user:password'
  "MongoIp":"<MongoDBIP>" //this your got data from instruction 4. . example='testshop.mongodb.net'
}
```
## Start

1- Open windows PowerShell in the downloaded file

2- Type:

```
1. $ npm i
2. $ npm start
```
### Everything is ready!

Type it into your browser's url: http://localhost:4000

Create an account and give admin from database. admin='Passive' set the admin='Active'.

# Future Plans

1- Add virtual pos entegration. (many virtual pos example stripe,paypal,paytr)

2- Theme color change. 

3- UI UX improvments.

# Feel free for help
