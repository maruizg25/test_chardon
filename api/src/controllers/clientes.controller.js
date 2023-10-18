import { sql, connectDB, queries } from '../database';

const getClientes = async (req, res) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query(queries.getAllClientes);
        console.log(result);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error);

    }
}

const register = async (req, res) => {
    const { Identificacion, NombresApellidos, Sexo, Correo, Telefonos, Total, Iva, Detalles } = req.body;
    try {
        const pool = await connectDB();
        // Inciar la transaccion
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        try {
            const result = await pool.request()
                .input('Identificacion', sql.NVarChar, Identificacion)
                .input('NombresApellidos', sql.NVarChar, NombresApellidos)
                .input('Sexo', sql.NVarChar, Sexo)
                .input('Correo', sql.NVarChar, Correo)
                .input('Telefonos', sql.NVarChar, Telefonos)
                .input('Total', sql.Decimal, Total)
                .input('Iva', sql.Decimal, Iva)
                .query(queries.createCliente);

            const SecuenciaCabecera = result.recordset[0].Secuencia;
            

            for (const detalle of Detalles) {
                await pool.request()
                    .input('SecuenciaCabecera', sql.Int, SecuenciaCabecera)
                    .input('CodigoArticulo', sql.NVarChar, detalle.CodigoArticulo)
                    .input('DescripcionArticulo', sql.NVarChar, detalle.DescripcionArticulo)
                    .input('Cantidad', sql.Int, detalle.Cantidad)
                    .input('Precio', sql.Decimal, detalle.Precio)
                    .input('Subtotal', sql.Decimal, detalle.Subtotal)
                    .query(queries.createDetalle);
            }

            await transaction.commit();
            res.json(200);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        res.status(500);
        res.send(error);
        console.error(error);
    }
}

const createCliente = async (req, res) => {
    const { Identificacion, NombresApellidos, Sexo, Correo, Telefonos } = req.body;
    let { Total, Iva } = req.body;
    console.log(req.body);
    if (Identificacion == null || NombresApellidos == null || Sexo == null || Correo == null || Telefonos == null) {
        return res.status(400).json({ msg: 'Bad Request. Please fill all fields' });
    }
    if (Total == null) {
        Total = 0;
    }
    if (Iva == null) {
        Iva = 0;
    }
    try {
        const pool = await connectDB();
        await pool.request()
            .input('Identificacion', sql.NVarChar, Identificacion)
            .input('NombresApellidos', sql.NVarChar, NombresApellidos)
            .input('Sexo', sql.NVarChar, Sexo)
            .input('Correo', sql.NVarChar, Correo)
            .input('Telefonos', sql.NVarChar, Telefonos)
            .input('Total', sql.Decimal, Total)
            .input('Iva', sql.Decimal, Iva)
            .query(queries.createCliente);
        res.json({ Identificacion, NombresApellidos, Sexo, Correo, Telefonos, Total, Iva });
    } catch (error) {
        res.status(500);
        res.send(error);
    }

}

// Obtener cliente por identificacion
const getClienteById = async (req, res) => {
    const { secuencia } = req.params;
    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('Secuencia', sql.NVarChar, secuencia)
            .query(queries.getClienteById);
        console.log(result);
        const registro = {
            Secuencia: result.recordset[0].Secuencia,
            Identificacion: result.recordset[0].Identificacion,
            NombresApellidos: result.recordset[0].NombresApellidos,
            Sexo: result.recordset[0].Sexo,
            Correo: result.recordset[0].Correo,
            Telefonos: result.recordset[0].Telefonos,
            Total: result.recordset[0].Total,
            Iva: result.recordset[0].Iva,
            Detalles: result.recordset.map(detalle => {
                return {
                    SecuenciaDetalle: detalle.SecuenciaDetalle,
                    CodigoArticulo: detalle.CodigoArticulo,
                    DescripcionArticulo: detalle.DescripcionArticulo,
                    Cantidad: detalle.Cantidad,
                    Precio: detalle.Precio,
                    Subtotal: detalle.Subtotal
                }
            })
        }
        res.json(registro);
    } catch (error) {
        res.status(500);
        res.send(error);

    }
}

// Eliminar cliente por identificacion
const deleteClienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('Identificacion', sql.NVarChar, id)
            .query(queries.deleteClienteById);
        console.log(result);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error);

    }
}

//Eliminar cliente por secuencia
const deleteClienteBySecuencia = async (req, res) => {
    const { Secuencia } = req.params;
    console.log(Secuencia);
    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('Secuencia', sql.NVarChar, Secuencia)
            .query(queries.deleteClienteBySecuencia);
        console.log(result);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);

    }
}


// Actualizar cliente por identificacion
const updateCliente = async (req, res) => {
    const { Secuencia, Identificacion, NombresApellidos, Sexo, Correo, Telefonos, Total, Iva, Detalles } = req.body;
    // console.log(req.body);
    if (Identificacion == null || NombresApellidos == null || Sexo == null || Correo == null || Telefonos == null || Total === null || Iva === null) {
        return res.status(400).json({ msg: 'Bad Request. Please fill all fields' });
    }
    try {
        const pool = await connectDB();
        // Inciar la transaccion
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        try {
            await pool.request()
                .input('Secuencia', sql.Int, Secuencia)
                .input('Identificacion', sql.NVarChar, Identificacion)
                .input('NombresApellidos', sql.NVarChar, NombresApellidos)
                .input('Sexo', sql.NVarChar, Sexo)
                .input('Correo', sql.NVarChar, Correo)
                .input('Telefonos', sql.NVarChar, Telefonos)
                .input('Total', sql.Decimal, Total)
                .input('Iva', sql.Decimal, Iva)
                .query(queries.updateCliente);

            await pool.request()
                .input('SecuenciaCabecera', sql.Int, Secuencia)
                .query('delete from detalle where SecuenciaCabecera = @SecuenciaCabecera');

            for (const detalle of Detalles) {
                await pool.request()
                    .input('SecuenciaCabecera', sql.Int, Secuencia)
                    .input('CodigoArticulo', sql.NVarChar, detalle.CodigoArticulo)
                    .input('DescripcionArticulo', sql.NVarChar, detalle.DescripcionArticulo)
                    .input('Cantidad', sql.Int, detalle.Cantidad)
                    .input('Precio', sql.Decimal, detalle.Precio)
                    .input('Subtotal', sql.Decimal, detalle.Subtotal)
                    .query(queries.createDetalle);
            }

            await transaction.commit();
            res.json(200);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        res.status(500);
        res.send(error);
    }

}

// crear detalle
const createDetalle = async (req, res) => {
    const { SecuenciaCabecera, CodigoArticulo, DescripcionArticulo, Cantidad, Precio, Subtotal } = req.body;
    console.log(req.body);
    if (SecuenciaCabecera == null || CodigoArticulo == null || DescripcionArticulo == null || Cantidad == null || Precio == null || Subtotal == null) {
        return res.status(400).json({ msg: 'Bad Request. Please fill all fields' });
    }
    try {
        const pool = await connectDB();
        await pool.request()
            .input('SecuenciaCabecera', sql.Int, SecuenciaCabecera)
            .input('CodigoArticulo', sql.NVarChar, CodigoArticulo)
            .input('DescripcionArticulo', sql.NVarChar, DescripcionArticulo)
            .input('Cantidad', sql.Int, Cantidad)
            .input('Precio', sql.Decimal, Precio)
            .input('Subtotal', sql.Decimal, Subtotal)
            .query(queries.createDetalle);
        res.json({ SecuenciaCabecera, CodigoArticulo, DescripcionArticulo, Cantidad, Precio, Subtotal });
    } catch (error) {
        res.status(500);
        res.send(error);
    }

}



module.exports = {
    getClientes,
    createCliente,
    getClienteById,
    deleteClienteById,
    updateCliente,
    createDetalle,
    register,
    deleteClienteBySecuencia

}


