var CustomError = require('./custom-error'); // https://gist.github.com/justmoon/15511f92e5216fa2624b
const { check, validationResult } = require('express-validator/check');

module.exports = function(app, fs)
{
    var projectjsonDir = __dirname + "/../data/project.json";
    
    app.get('/',function(req,res){
       var sess = req.session;

       res.render('index', {
           title: "MY HOMEPAGE",
           length: 5,
           name: sess.name,
           username: sess.username
       })
   });

    // sample
    app.get('/skills', function (req, res){
        res.json(['node', 'Vue', 'javascript', 'tooling', 'wow']);
    });

    app.get('/list', function (req, res) {

        fs.readFile( projectjsonDir, 'utf8', function (err, data) {
         res.end( data );
     });
    });

    app.get('/create', function (req, res) {

        fs.readFile( projectjsonDir, 'utf8', function (err, data) {

            res.render('create', {
                projects: JSON.parse(data)
            });
        });

    });

  
    app.post('/store', [
          
          check('name').isLength({min:1}),
          
          check('description').isLength({min:1})
        ], (req, res) => {
            console.log(req.body)
          const errors = validationResult(req);
          //console.log(errors.array());
          if (!errors.isEmpty()) {
            let errs = errors.array();
            let ret = {};
           errs.forEach(function(err){
            console.log(err)
                ret[err.param] = err.msg;
           });
             console.log(ret);
            //return res.status(422).json({ errors: ret });
            return res.status(422).json({ errors: ret });
          }
        
        
       
        // LOAD DATA & CHECK DUPLICATION   
        fs.readFile(projectjsonDir, 'utf8',  function(err, data){

            var projects = JSON.parse(data);
            console.log(projects);
           
            // ADD TO DATA
            var name = req.body["name"];
            var description = req.body["description"];
            projects.push({'name': name, 'description': description});
            console.log("=============");
            console.log(projects);

            // SAVE DATA
            fs.writeFile(projectjsonDir, 
               JSON.stringify(projects, null, '\t'), "utf8", function(err, data){
                result = {'message': 'Project Created!'};
                res.json(result);
            })
        })
    });

    



    

    
}
