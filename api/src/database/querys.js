export const queries ={
    getAllClientes : "select * from cabecera",
    createCliente : "insert into cabecera (Identificacion, NombresApellidos, Sexo, Correo, Telefonos, Total, Iva) OUTPUT INSERTED.Secuencia values (@Identificacion, @NombresApellidos, @Sexo, @Correo, @Telefonos, @Total, @Iva)",
    getClienteById : "select c.*, d.* from cabecera c inner join detalle d on c.Secuencia = d.SecuenciaCabecera where c.Secuencia = @Secuencia",
    deleteClienteById : "delete from cabecera where Identificacion = @Identificacion",
    deleteClienteBySecuencia : "delete from cabecera where Secuencia = @Secuencia",
    updateCliente : "update cabecera set NombresApellidos = @NombresApellidos, Sexo = @Sexo, Correo = @Correo, Telefonos = @Telefonos, Total = @Total, Iva = @Iva where Secuencia = @Secuencia",
    createDetalle: "INSERT INTO Detalle (SecuenciaCabecera, CodigoArticulo, DescripcionArticulo, Cantidad, Precio, Subtotal) VALUES (@SecuenciaCabecera, @CodigoArticulo, @DescripcionArticulo, @Cantidad, @Precio, @Subtotal)"
    
}