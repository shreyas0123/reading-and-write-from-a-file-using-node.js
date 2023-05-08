const http = require('http'); //http module required for creating server
const fs = require('fs');
//fs stands for File System and it's a built-in Node.js module
//fs module is being used to read from and write to a file named message.txt

const server = http.createServer((req,res)=>{  //createServer method will create http server, takes call back function consist of arguments such as req,res
    const method = req.method; //method we wre creating here is POST, it will connect from front end to back end
    const url = req.url;
    if(url ==='/'){  //client make an request to server consists of /(from route url like http://--)
        
        fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) =>{  //data we are reading from message.txt file,
            //fs.readFile: it is an asynchronous task, it executes after some delay
            //character was encoding eg:A : 01000001 ascii value
            if(err){
                console.log(err);
            }
            console.log('data from file' + data);
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write('<body>' + data + '</body>');
            //creating form has method post, which takes input as a text,adding Send button 
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write('</html>');
            return res.end(); //stops executing next line, return the controller to fs.-- statement
        })

    }
    else if(url ==='/message'  && method === 'POST'){
        //suppose if i want to send 1gb of data from front end to back end, sysytem will got hanged
        //what we wiil do here means will will send data as a junk
        //means 1mb we will send data as a junk to backend

        req.on("data", (chunk) =>{
            body.push(chunk); //array format
            
        });

    return req.on("end", () =>{  //once we reach 999mb then we are pushing all the data together to backend
        const parseBody = Buffer.concat(body).toString(); //Buffer means if you have seen in earlier if we are opening videos we can see that video was buffering (round white colour symbol keeps running)
        //video does not get fully of its data
        console.log('parsebody>>>>>', parseBody); //output: message=my+name+is+shivan
        //i need to split the data by '=' symbol
        //[1] means i need output only this my+name+is+shivan
        const message = parseBody.split("=")[1];//['message','my name is yash']
        fs.writeFile("message.txt",message, (err) =>{ 
            //fs.writeFile: it is an asynchronous task, it executes after some delay
            if(err){
                console.log(err);
            }
            console.log('indise fs.writefile');
            res.statusCode = 302;
            res.setHeader("location", "/"); //once user send request and data saved in file
            //iam redirecting user to "/" because he wants send gain, and again the request 
            return res.end();
        });
    });

    }
    else{
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write('<body><h1>Hello from node.js</h1></body>');
        res.write('</html>');
        res.end();
    }
});

server.listen(3000);
