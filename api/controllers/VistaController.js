/**
 * Created by Bryan on 20/02/2018.
 */
module.exports = {
  registrarUsuarios: function(req,res){
    return res.view('RegistroUsuarios')
  },


  registrarEvento: function(req,res){
    return res.view('RegistroEventos')
  },



  inicioEventos: function(request,result){

    var parametros = request.allParams();

    /*Evento.find().exec(
      function(err, eventosEncontrados){
        if (err){
          return result.serverError(err);
        }else{
          return result.view('inicioEventos',{eventos:eventosEncontrados})
        }

      }*/

    if (!parametros.busqueda) {
      parametros.busqueda = '';
    }

    Evento
      .find()
      .where({
        or: [
          {
            nombreEvento: {
              contains: parametros.busqueda
            }
          },
        ]
      })
      .exec(function (err, eventos) {
        if (err)
          return result.negotiate(err);
        var cookies = request.cookies;
        console.log(cookies.arregloEventos);
        if (cookies.arregloEventos) {
          var arregloEventos = cookies.arregloEventos.ids;
          console.log(arregloEventos);
          return result.view('inicioEventos', {
            eventos: eventos,
            arregloEventos: arregloEventos
          });
        }
        else {
          return result.view('inicioEventos', {
            eventos: eventos
          });
        }
      });
  },

  buscarPorCategoria:function(req,res){

    var parametros = req.allParams();

    /*Evento.find().exec(
     function(err, eventosEncontrados){
     if (err){
     return res.serverError(err);
     }else{
     return res.view('inicioEventos',{eventos:eventosEncontrados})
     }

     }*/

    if (parametros.id) {
      Evento.find({
        fkIdCategoria: parametros.fkIdCategoria
      })
        .exec(function (err, eventosEncontrado) {
          if (err)
            return res.serverError(err);
          if (eventosEncontrado) {
            //Si encontro
            return res.view('inicio', {
              eventosCategoria: eventosEncontrado
            });
          }
          else {
            //No encontro
            return res.redirect('/inicio');
          }
        });
    }
    else {
      return res.redirect('/inicio');
    }
  }
}
