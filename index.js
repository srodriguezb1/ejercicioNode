let fs = require("fs");
let axios = require("axios");
let express= require("express");
let app = express();

function ax(callback){
    axios.get('https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/abb6016942f7db2797846988b039005c6ea62c2f/categories.json',{ responseType: 'json' }).then((response)=>{
        callback(response.data);
    });
};
let t ="";
app.get("/",(req,res)=>{
    ax((datos)=>{
        try {
             t = sacarCategorias(datos);
             hola((data)=>{
                console.log(data.toString());
                res.send(data.toString());
            });
        }
        catch(e)
        {
            console.log(e);
        }
    });
    
});
function hola(callback){
    fs.writeFile("index.html", t , err =>{
        if(err){
            console.log("No funciona :v");
        }
    console.log("Archivo creado correctamente");
    fs.readFile("index.html", (err,data)=>{
            if(err){
                console.log("No funciona :c");
            }
            callback(data);
        });
    });
};

function sacarCategorias(dats)
{
    console.log(dats);
    
    var ini = "<!DOCTYPE html> <html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>"+ "\n"+
    "<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>"+"\n"+
    +" <title>Sebastian Page</title>"+"\n"+
    "<script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script>"+"\n"+
    "<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js' integrity='sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1' crossorigin='anonymous'></script>"+"\n"+
    "<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM' crossorigin='anonymous'></script>"+ "\n"+
    "</head> <body>";
    var resp = "<div class='accordion' id='accordionExample'>";
    for(let i of dats)
    {
        var str = 
        "<div class='card'>"+"\n"+
            "<div class='card-header' id='heading" +i.name+"'>" + "\n"+
                "<h2 class='mb-0'>"+ "\n"+
                "<button class='btn btn-link' type='button' data-toggle='collapse' data-target='#collapse"+i.name+"' aria-expanded='true' aria-controls='collapse"+i.name+"'>" + "\n" +
                     i.name+"\n"+
                "</button>" + "\n"+
                "</h2>"+ "\n"+
            "</div>";


        for(let j of i.products)
        {
            var str2 ="<div id='collapse"+i.name+"' class='collapse show' aria-labelledby='heading"+i.name+"' data-parent='#accordionExample'>"+"\n"+
            "<div class='card-body'>"+"\n"+
                "<div class='card' style='width: 18rem;'>"+ "\n"+
                "<img src="+j.image+" class='card-img-top' alt='...'>"+"\n"+
                "<div class='card-body'>"+ "\n" +
                  "<h5 class='card-title'>"+j.name+"</h5>"+ "\n"+
                  "<h6 class='card-subtitle mb-2 text-muted'>"+j.price+"</h6>"+ "\n"+
                  "<p class='card-text'>"+j.description+"</p>" + "\n"+
                  "<a href='#' class='btn btn-primary'>Añadir al carrito</a>"+ "\n"+
                "</div>" + "\n" +
              "</div>"+ "\n"+
            "</div>"+"\n"+
          "</div>";
          str += str2;
        }
        str+="</div>";
        resp += str;
    }
    ini += resp;
    ini +="</body></html>";
    return ini;
};




app.listen(8080);