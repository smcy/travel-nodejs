# Travel backend
It is a backend app to save, get and update your trips data. Also, it supplies nearby trips data in a specific location and radius.


## Tech stack
* **typescript** for coding and static type checking
* **tslint** for linting
* **express** for using RESTful Web Service and routing
* **mongodb** for database
* **mongoose** as mongodb driver
* **node-cache** for caching data
* **mocha** for testing framework
* **chai** as test assertion library
* **chai-http** http integration for chai

## Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install.
```bash
npm install
```
or
```bash
yarn install
```


## Usage
For production:
```bash
yarn start:prod
```

For development:
```bash
yarn start:dev
```

For testing:
```bash
yarn test
```
### Sample data
```javascript
const trip = {
    "startPoint": {
        "type": "Point",
        "coordinates": [
            39.913211,
            32.854553
        ]
    },
    "endPoint": {
        "type": "Point",
        "coordinates": [
            39.886880,
            32.854963
        ]
    },
    "distance": 4.3,
    "date": "Tue Sep 10 2019 10:16:09 GMT+0300"
}
```


### Endpoints
Save trip data
- `POST /api/trip`  
send trip data and it returns string id with status code 201 or if it is not successful returns status code 400.  

Update trip data
- `PUT /api/trip/:id`  
send updated trip data with id and it returns true with status code 200 or if it is not successful returns status code 400. 


Get specific trip data
- `GET /api/trip?id=`  
request with id and it returns trip data with status code 200 or if it is not successful returns status code 400 or 404. 

Get all trips data
- `GET /api/trip/all`  
it returns all trips data with status code 200 or if it is not successful returns status code 400 or 404. 


Get all trips data with given location, radius*, (start and end date)*.
- `GET /api/trip/nearby?location=[location]&radius=[radius]&startDate=[startDate]&endDate=[endDate]`  
request with location, radius, start and end date and it returns all trips data with status code 200 or if it is not successful returns status code 400.   
**location**: "lat,long" (required)  
**radius**: floating number in km. Default value 1km (optional)  
**startDate**: Js Date object with toISOString(). Use with endDate (optional)  
**endDate**: Js Date object with toISOString(). Use with startDate (optional)  

## Configuration(Optional)
The configurations can be changed by editing config.json file.

```bash
./config/app.json
```
```json
{
  "api": {
    "path": "/api"
  },
  "database": {
    "path": {
      "production": "mongodb://localhost:27017/",
      "development": "mongodb://localhost:27017/",
      "test": "mongodb://localhost:27017/"
    },
    "name": {
      "production": "prod_travel",
      "development": "dev_travel",
      "test": "test_travel"
    }
  },
  "server": {
    "port": "8080"
  },
  "cache": {
    "ttl": 6000
  }
}
```

## Author
**Saim Çay**
