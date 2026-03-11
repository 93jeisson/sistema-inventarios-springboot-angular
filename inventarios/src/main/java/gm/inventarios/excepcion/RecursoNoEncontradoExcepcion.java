package gm.inventarios.excepcion;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class RecursoNoEncontradoExcepcion extends RuntimeException{
    public RecursoNoEncontradoExcepcion(String mensaje){
        super(mensaje);
    }
}
