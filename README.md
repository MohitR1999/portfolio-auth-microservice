# Authentication microservice
This microservice is solely responsible for all the authentication needs of the application. Authentication is required only when a user is doing any operation on the blogs other than read.

To get the service up and running, follow these steps:
- Install `docker` and `docker compose` on your machine by following the instructions mentioned on the official website of [Docker](https://docs.docker.com/engine/install/) 
- Make sure you have `git` installed. You can get it from the official website of [Git](https://git-scm.com/downloads)
- Clone this repository using `git clone` as `git clone git@github.com:MohitR1999/portfolio-auth-microservice.git`
- No dependencies are needed to be installed, everything is containerized and would be run using `docker compose`
- Set the environment variables as follows:
```
JWT_SECRET= <Your preferred JWT secret, keep it same for blog service as well>
PORT=<set it to 5000>
MONGO_INITDB_ROOT_USERNAME=<root username for mongoDB>
MONGO_INITDB_ROOT_PASSWORD=<root password for mongoDB>
MONGO_INITDB_DATABASE=portfolio
ME_CONFIG_MONGODB_ADMINUSERNAME=<admin username for mongoDB>
ME_CONFIG_MONGODB_ADMINPASSWORD=<admin password for mongoDB>
MONGODB_URL=mongodb://<username>:<password>@<mongoDB service name which is present in the docker compose file>:27017/portfolio
ME_CONFIG_BASICAUTH=true
```
- For bringing the services up, without getting your terminal occupied, run `docker compose up -d`
- For bringing the services up, attaching your terminal to the logs, run `docker compose up`
- In case you're running the service with the terminal detached, run `docker compose down` to stop the services.
- If you're developing and need hot reload, run `docker compose up --watch`. This will start the services in watch mode, and any change in code will result in a rebuilt of the image and container would be restarted
- To run the unit tests, run `npm run test`. This will execute all the tests inside the `tests` directory. Before running the tests, ensure that the services are stopped, because the tests mock everything and don't depend on the containerized database service
# API Endpoints
Following API endpoints are working as of now:
#### Registering a new user

<details>
 <summary><code>POST</code> <code><b>/api/auth/register</b></code> <code>(Registers a new user with the provided details)</code></summary>

##### Parameters

> None

##### Body

> ```
> {
>   "username" : string, required
>   "password" : string, required
>   "email" : string, required
>   "first_name" : string
>   "last_name" : string
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                                       |
> |---------------|-----------------------------------|--------------------------------------------------------------------------------|
> | `201`         | `application/json`                | `{ "message": "User registered successfully", "userId": <generated_userId> }`  |
> | `400`         | `application/json`                | `{"error": <error_message>}`                                                   |
> | `500`         | `application/json`                | `{"error": <error_message>}`                                                   |

##### Example cURL

> ```bash
>  curl --location 'http://localhost:5000/api/auth/register' --header 'Content-Type: application/json' --data-raw '{ "username" : "testtt", "password" : "123456", "email" : "abc8@xyzopozc.org", "first_name" : "John3", "last_name" : "Doe3" }'
> ```

##### Example response

>```json
>{
>    "message": "User registered successfully",
>    "userId": "67791a6e83d8196b4ff88af0"
>}
>```

</details>

#### Logging in with credentials

<details>
 <summary><code>POST</code> <code><b>/api/auth/login</b></code> <code>(Log-in with the valid credentials and get the JWT token)</code></summary>

##### Parameters

> None

##### Body

> ```
> {
>   "username" : string, required
>   "password" : string, required
> }
> ```

##### Responses

> | http code     | content-type                      | response                      |
> |---------------|-----------------------------------|-------------------------------|
> | `200`         | `application/json`                | `{ "token": <JWT_Token> }`     |
> | `401`         | `application/json`                | `{"error": <error_message> }`  |
> | `500`         | `application/json`                | `{"error": <error_message> }`  |

##### Example cURL

> ```bash
>  curl --location 'http://localhost:5000/api/auth/login' --header 'Content-Type: application/json' --data '{"username":"testtt","password":"123456"}'
> ```

##### Example response

>```json
>{
>    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.************************ImlhdCI6MTczNTk4OTk2NX0.tXPj-*********",
>}
>```

</details>

#### Verification of a request

<details>
 <summary><code>GET</code> <code><b>/api/auth/verify</b></code> <code>(Verify a given request on the basis of the JWT token provided in the headers)</code></summary>

##### Parameters

> None

##### Body

> None

##### Headers

> | Header                  | Content                     |
> |-------------------------|-----------------------------|
> | `Authorization`         | `Bearer <JWT_Token>`        |

##### Responses

> | http code     | content-type                      | response                                      |
> |---------------|-----------------------------------|-----------------------------------------------|
> | `200`         | `application/json`                | `{ "valid": true }`                           |
> | `401`         | `application/json`                | `{ "valid": false, error: <error_message> }`  |
> | `500`         | `application/json`                | `{ "valid": false, error: <error_message> }`  |

##### Example cURL

> ```bash
>  curl --location 'http://localhost:5000/api/auth/verify' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6************************I6MTczNTczMTM5OX0.*******************************'
> ```

##### Example response

>```json
>{
>    "valid": true,
>}
>```

</details>