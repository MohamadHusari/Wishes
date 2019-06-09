## Wishes Server-Side
##### First Step:
###### Open directory and do: 
```
npm install 
```
##### Second Step: 
```
import wishes.sql file to your database
```

##### Third Step: 
###### Go to app.js file and change this lines (17-22):
```
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '******',
    database: '******'
});
```
#
### `npm start`

Runs the server .<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

* You can change the port in app.js in line (7) :
```
const PORT = 8080;
```
