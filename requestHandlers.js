//definition des variables qu'on va utiliser
var querystring = require("querystring");
var fs = require("fs");
var swig = require("swig");
formidable = require("formidable");

//fonction qui ouvre la boite de dialogue avec l'utilisateur qui par la suite saisi son prenom
//il y a une verification d'erreur qui renvoi vers error 404 si page inexistante
function start (response, postData) {
  console.log("Le gestionnaire 'menu' est appelé.");
  fs.readFile('form.html','utf-8',(error)=>{
      if(error) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(error + "\n");
        response.end();
      } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(swig.renderFile('form.html', { 
          name : querystring.parse(postData).text //Transmet seulement la donnée contenu dans postData
      }));
        response.end();
      }
    })
}
//fonction qui va reseptionner le prenom du visiteur puis l'affiche en plus de la page menu avec les oiseaux
function menu (response, postData) {
  console.log("Le gestionnaire 'menu' est appelé.");
  fs.readFile('index.html','utf-8',(error)=>{
      if(error) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(error + "\n");
        response.end();
      } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(swig.renderFile('index.html', { 
          name : querystring.parse(postData).text //Transmet seulement la donnée contenu dans postData
      }));
        response.end();
      }
    })
}

//fonction qui permet d'avoir du css dans les pages  html
function style (response) {
  console.log("Le gestionnaire 'style' est appelé.");
  fs.readFile("style.css", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "text/css"});
      response.write(file, "binary");
      response.end();
    }
  });
}

//fonction qui permet d'avoir un background image dans les pages  html
function background (response) {
  console.log("Le gestionnaire 'background' est appelé.");
  fs.readFile("./img/background.jpg", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/jpg"});
      response.write(file, "binary");
      response.end();
    }
  });
}

//fonction qui permet d'avoir le favicon/logo du site
function favicon (response) {
  console.log("Le gestionnaire 'favicon' est appelé.");
  fs.readFile("./img/logo.ico", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/ico"});
      response.write(file, "binary");
      response.end();
    }
  });
}

//fonction qui permet de voir l'image du oiseau 1
function img_martin (response) {
  console.log("Le gestionnaire 'img_martin' est appelé.");
  fs.readFile("./img/martin.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

//fonction qui permet de voir l'image du oiseau 2
function img_labbe (response) {
  console.log("Le gestionnaire 'img_labbe' est appelé.");
  fs.readFile("./img/labbe.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

//fonction qui permet de voir l'image du oiseau 3
function img_engoulevent (response) {
  console.log("Le gestionnaire 'img_engoulevent' est appelé.");
  fs.readFile("./img/engoulevent.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

//fonction qui permet de voir la page de gestion du projet
function gestion(response) {
  console.log("Le gestionnaire 'gestion du projet' est appelé.");
  fs.readFile('gestion.html','utf-8',(error,data)=>{
    if(error) throw error;
    response.write(data);
    response.end();
  })
}

/************************************* BONUS **********************************************************/

//fonction qui nous permet d'acceder a la page upload.html pour que le visiteur charge une image de son choix
function startupload (response, postData) {
  console.log("Le gestionnaire 'start upload' est appelé.");
  var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" '+
  'content="text/html; charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" enctype="multipart/form-data" '+
  'method="post">'+
  '<input type="file" name="upload" multiple="multiple">'+
  '<input type="submit" value="Transférer le fichier" />'+
  '</form>'+
  '</body>'+
  '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}


//fonction qui permet de uploder une image par le visiteur et que par la suite cela s'affiche automatiquement,sauf que la fonction affiche l'image dans la console de VSCode je suis a la recherche de la solution
function upload(response, request) {
  console.log("Le gestionnaire 'upload' est appelé.");

  var form = new formidable.IncomingForm();
  console.log("Récupération des éléments reçus");
  form.parse(request, function(error, fields, files) {

    /* En cas d'erreur sous Windows :
       tentative d'écrasement d'un fichier existant */
    fs.rename(files.upload.filepath, "image/test.jpg", function(err) {
      if (err) {
        fs.unlink("image/test.jpg");
        fs.rename(files.upload.filepath, "image/test.jpg");
      }
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Image reçue :<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

//fonction qui permet de voir l'image du oiseau upload par le visiteur
function show(response) {
  console.log("Le gestionnaire 'show' est appelé.");
  fs.readFile("image/testUpload.jpg", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/jpg"});
      response.write(file, "binary");
      response.end();
    }
  });
}


exports.start = start;
exports.menu = menu;
exports.img_martin = img_martin;
exports.img_labbe = img_labbe;
exports.img_engoulevent = img_engoulevent;
exports.style = style;
exports.background  = background ;
exports.favicon = favicon;;
exports.show = show;
exports.upload = upload;
exports.startupload = startupload;
exports.gestion = gestion;