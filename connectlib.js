var http=require('http');
var express=require('express');
var app=express();
app.use(express.static(__dirname + '//public'));
var mysql=require('mysql');
var con= mysql.createConnection(
{
hostname:"localhost",
user:"root",
password:"",
database:"db1"
});
con.connect(function(error)
	{
	if(error) throw error;
	console.log("Connected");
	});

var bodyParser= require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:true});
var server=app.listen(3000,function(){
var host=server.address().address;
var port=server.address().port;
console.log("Running at %s:%s Port", host, port);
});

app.get('/',function(request, response){
response.sendFile(__dirname + '/login2.html');
});

app.post('/login', urlencodedParser ,function(req,res){
var name= req.body.name;
var pass= req.body.pwd;
var type= req.body.visitor;
var sql="select * from lib";
con.query(sql, function (error,result){
if(error)
throw error;
var flag=0;
for(var i=0;i<result.length;i++)
{
	if(result[i].username == name && result[i].password == pass)
	{
	flag++;
	}
}
if(flag!=0)
{
res.sendFile(__dirname + '/home.html');
}
else
{
res.redirect('/');
}
});
});

app.get('/search_book', function(req,res){
res.sendFile(__dirname + '//search_book.html');
});

app.post('/search_book', urlencodedParser, function(req,res){
var bookname=req.body.bookname;
var booktype= req.body.booktype;
var flag=0;
var sql2="select * from book";
con.query(sql2, function (error,result){
if(error)
throw error;
for(var i=0;i<result.length;i++)
{
	if(result[i].bookname == bookname && result[i].booktype == booktype) 
	{
	flag++;
	}

}
if(flag!=0)
{
res.send("<script> alert('Book is available in the library') </script>");
res.redirect('/search_book');
}
else
{
//res.send("<script> alert('Book is not available in the library') </script>");
res.redirect('/search_book');
}
});
});


app.get('/add_new',function(req,res){
res.sendFile(__dirname + '//add.html');
});

app.post('/home', urlencodedParser ,function(req , res){

var uname= req.body.username;
var pwd = req.body.pass;
var type= req.body.user;

var sql1="insert into lib values('"+uname+"','"+pwd+"','"+type+"')";
con.query(sql1, function (error,result){
if(error)
throw error;
console.log("Inserted");
});
res.sendFile(__dirname + '//home.html');
});

app.get('/return_book', function(req, res)
{
res.sendFile(__dirname + '//return_book.html');
});

app.post('/return_book', urlencodedParser, function(req,res){
var bookname=req.body.bname;
var bID= req.body.bID;
var sql2="select * from book";
con.query(sql2, function (error,result){
if(error)
throw error;
for(var i=0;i<result.length;i++)
{
	if(result[i].bname == bname && result[i].ID == bID) 
	{
	res.send("<script> alert('Book has successfully been returned to the Library') </script>");
	}
	else	
	{
	res.send("<script>alert('Invalid Book Name / Book ID')</script>");	
	}
}
res.redirect('/return_book');	
});
});

app.get('/Issue_book', function(req, res)
{
res.sendFile(__dirname + '//Issue_book.html');
});

app.post('/Issue_book', urlencodedParser, function(req,res){
var bookname=req.body.bname;
var bID= req.body.bID;
var sql2="select * from book";
con.query(sql2, function (error,result){
if(error)
throw error;
for(var i=0;i<result.length;i++)
{
	if(result[i].bookname == bookname && result[i].ID == bID) 
	{
	res.send("<script> alert('Book has successfully been issued to the visitor') </script>");
	}
	else	
	{
	res.send("<script>alert('Book is currently not available in the library')</script>");	
	}
}
res.redirect('/Issue_book');	
});
});

app.get('/', function(req, res)
{
res.sendFile(__dirname + '//login2.html');
});

app.get('/login' , function(req,res)
{
res.sendFile(__dirname + '//home.html');
});