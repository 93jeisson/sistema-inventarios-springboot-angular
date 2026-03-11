package gm.inventarios.controlador;

import gm.inventarios.excepcion.RecursoNoEncontradoExcepcion;
import gm.inventarios.modelo.Producto;
import gm.inventarios.servicio.ProductoServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("inventario-app")//http:localhost:8080/inventario-app
@CrossOrigin(value = "http://localhost:4200")//puerto por default de angular
public class ProductoControlador {
    private static final Logger logger = LoggerFactory.getLogger(ProductoControlador.class);

    //ES PARA INYECTAR UNA CAPA DE SERVICIOS AL CONTROLADOR
    @Autowired
    private ProductoServicio productoServicio;

    //configuramos este metodo para poder resibir peticiones - peticiones de tipo get
    @GetMapping("/productos")// http://localhost:8080/inventario-app/productos
    public List<Producto> obtenerProductos() {
        List<Producto> productos = this.productoServicio.listarProductos();
        logger.info("productos obtenidos");
        productos.forEach(producto -> logger.info(producto.toString()));
        return productos;
    }

    @PostMapping("/productos")
    public Producto agregarProducto(@RequestBody Producto producto) {
        logger.info("producto a agregar" + producto);
        return this.productoServicio.guardarProducto(producto);
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(
            @PathVariable int id


    ) {
        Producto producto = this.productoServicio.buscarProductoPorId(id);
        if (producto != null) {
            return ResponseEntity.ok(producto);
        } else {
            throw new RecursoNoEncontradoExcepcion("no se encontro el id:" + id);
        }
    }
        @PutMapping("/productos/{id}")
        public ResponseEntity<Producto> actualizarProducto (
        @PathVariable int id,
        @RequestBody Producto procutoRecibido

        ){
            Producto producto = this.productoServicio.buscarProductoPorId(id);
            producto.setDescripcion((procutoRecibido.getDescripcion()));
            producto.setPrecio((procutoRecibido.getPrecio()));
            producto.setExistencia(procutoRecibido.getExistencia());
            this.productoServicio.guardarProducto(producto);
            return ResponseEntity.ok(producto);

        }
        @DeleteMapping("/productos/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarProducto(@PathVariable int id ) {
            Producto producto = this.productoServicio.buscarProductoPorId(id);
            if (producto == null) {
                throw new RecursoNoEncontradoExcepcion("No se encotro el id:"+ id);
            }
            this.productoServicio.eliminarProductoPorId(producto.getIdProducto());
            Map<String, Boolean> respuesta = new HashMap<>();
            respuesta.put("eliminado", Boolean.TRUE);
            return ResponseEntity.ok(respuesta);

            }
}


