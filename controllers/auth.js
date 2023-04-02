const mysql=require("mysql");
const jwt=require("jsonwebtoken");

const db=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'nodejs-login',
});


exports.register =(req,res) => {
    console.log(req.body);

    const name = req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const passwordconfirm=req.body.passwordconfirm;
    console.log("hii");
    console.log(passwordconfirm);

    // same upper 4 lines using destructring is const { name, email, password, passwordconfirm } = req.body;

    db.query('Select email from users where email = ?', [email], (error,results)=>{
        console.log(results.length);
        if(error) {
            console.log(error);
        }
        if(results.length > 0)  {
            return res.render('register',{
                message: 'That email is already in use '
            })
        } 
        console.log(password);
        console.log(passwordconfirm);
        if(password!=passwordconfirm){
            return res.render('register',{
                message: 'Passwords do not match  '
            });
        }
        console.log(password);
       db.query('insert into users set ?',{
        id:name,
        name: name,
        email:email,
        password:password
       },
       (error,results)=>{
   if(error){
    console.log(error);
   }else{
    console.log(results); 
    return res.render('register',{
        message: 'User registered'
    });
   }
       })
    });
    // res.send("Form is submitted");
}