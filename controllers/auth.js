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

    const fname = req.body.firstname;
    const lname = req.body.lastname;
    const username = req.body.username;
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
        function validateUsername(username) {
            // Check for at least one uppercase letter
            if (!/[A-Z]/.test(username)) {
              return false;
              console.log("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            }
            // Check for at least one lowercase letter
            if (!/[a-z]/.test(username)) {
              return false;
              console.log("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            }
            // All checks passed
            return true;
          }
          if (!validateUsername(username)) {
            return res.render('register',{
                message: 'username must contain more than 8 letters'
            });
        }
        console.log(password);
        console.log(passwordconfirm);
        function validatePassword(password) {
            // Check for at least one uppercase letter
            if (!/[A-Z]/.test(password)) {
              return false;
              console.log("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            }
            // Check for at least one lowercase letter
            if (!/[a-z]/.test(password)) {
              return false;
              console.log("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            }
            // Check for at least one special character
            if (!/[^A-Za-z0-9]/.test(password)) {
              return false;
              console.log("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            }
            // All checks passed
            return true;
          }
          if (!validatePassword(password)) {
            return res.render('register',{
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long'
            });
        }        
        if(password!=passwordconfirm){
            return res.render('register',{
                message: 'Passwords do not match  '
            });
        }
        console.log(password);
       db.query('insert into users set ?',{
        id:fname,
        firstname: fname,
        lastname:lname,
        username:username,
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