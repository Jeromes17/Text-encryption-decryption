# Text-encryption-decryption
This Project is done during my Internship and was built by some reference codes which was given from the company itself. 

Requirements:
- Node JS
- Postman app

Demonstration:
- Open your node js in terminal
- Create new directory for the project and go to that directory
- Install express package using "npm install express dotenv"
- Create server.js file in it
- Create .env file
- node -e "console.log(require('crypto').randomBytes(32).toString('hex'));" --get your 32 character encryption key using this cmd
- Update the .env file with your key
- Run node js app using "node server.js"

  After started node app
- Open Postman app
- Change the get option to post and give the url
- "http://localhost:3000/encrypt" for encryption
- "http://localhost:3000/decrypt" for decryption
- Change the msg format to raw and give your text in JSON format
- Ex for encryption :
 {
    "text": "encryption web app"
}
- Ex for decryption :
{
    "encryptedText": "565f6ec2f0ece0777f1e987e2f1b5bb5:c8b20ed14e38da95a26d425e462e16c7d9efb0e45e941d69b4844b3c96ee891f"
}
- To stop : give "npm stop" in terminal 
