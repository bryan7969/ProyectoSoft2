/**
 * EventoController
 *
 * @description :: Server-side logic for managing Eventoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  crearEvento: function (request,result){
    var parametros = request.allParams();
    sails.log.info("Parametros",parametros);

    var nuevoEvento = {
      nombreEvento:parametros.nombreEvento,
      fechaEvento:parametros.fechaEvento,
      horaInicio:parametros.horaInicio,
      horaFin:parametros.horaFin,
      detalleEvento:parametros.detalleEvento,
      precio:parametros.precio,
      nombreLugar:parametros.nombreLugar,
      direccion:parametros.direccion,
      latitud:parametros.latitud,
      longitud:parametros.longitud,
      imagenEvento:parametros.imagenEvento,
      fkIdCategoria:parametros.fkIdCategoria,
      fkIdOrganizador:parametros.fkIdOrganizador,
      fkIdTipoEvento:parametros.fkIdTipoEvento

    };

    Evento.create(nuevoEvento).exec(function(error, eventoCreado){
      if(error){
        return result.serverError(error);
      }
      else{
        return result.redirect("/Vista/inicioEventos");
      }
    });

  },

  detalleEvento: function (request, result) {
    var parametros = request.allParams();
    if (parametros.id) {
      Evento.findOne({
        id: parametros.id
      })
        .exec(function (err, eventoEncontrado) {
          if (err)
            return result.serverError(err);
          if (eventoEncontrado) {
            //Si encontro
            return result.view('detalleEvento', {
              evento: eventoEncontrado
            });
          }
          else {
            //No encontro
            return result.redirect('/inicio');
          }
        });
    }
    else {
      return result.redirect('/inicio');
    }
  }





};

