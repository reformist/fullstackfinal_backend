# NOTES
README FILE
The purpose of this app is to serve as a user login and payment service for my project, Beetcode, which is a google chrome extension that helps with SWE interview preparation: https://chromewebstore.google.com/detail/beetcode/efiojecmnbhdecicbfnejfnegennfhlf

I used firebase authentication for users to be able to create an account with gmail or with any other email. If the user is already registered, I throw an error. The password length also must be longer than 6 characters. To complete that task, I watched a YouTube tutorial but I added onto it by verifying that the user wasn't already in the firebase database.

Then, I tried to implement a PayPal functionality, but I ran out of time (you can see my code comments for proof). I did a mock financial services program where a user can type in the cost of the subscription ($4.99) and that’s sent to the backend. If the user pays the correct amount, I send back success. If not, I report failure. All user submitted info is sent to MongoDB so I can keep up with sales transactions.

The primary code files I wrote are main.js in my backend and TextInput in src/components/home/ . the rest of the code I used online tutorials and google firebase documentation to help me deploy.

My post to /home is my main route, but I used / and Get to test my initial routing using postman. I struggled a lot with MongoDB setup because I didn't realize I needed to define client locally as I tried to define it globally and it wouldn't authenticate properly. I used a dotenv file to save valuable API keys too.



