var server = require("./serveur");
var router = require("./routeur");
var requestHandlers = require("./requestHandlers");
var handle = {};
//ici on a tout les chemain vers les differents dossiers et images
handle["/"] = requestHandlers.start;
handle["/menu"] = requestHandlers.menu;
handle["/img1"] = requestHandlers.img_martin;
handle["/img2"] = requestHandlers.img_labbe;
handle["/img3"] = requestHandlers.img_engoulevent;
handle["/style"] = requestHandlers.style;
handle["/background"] = requestHandlers.background;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/favicon"] = requestHandlers.favicon;
handle["/startupload"] = requestHandlers.startupload;
handle["/gestionprojet"] = requestHandlers.gestion; 


server.start(router.route, handle);