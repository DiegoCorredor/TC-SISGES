import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'devDB',
    password: 'KvwyspVaxv5PP5',
    database: 'tc_db_hotel',
}

export const stadistics1 = async (req, res) => {
    try{
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT COUNT(*) AS cant, bb.booking FROM booking AS b INNER JOIN bookings AS bb ON b.type_booking = bb.idbooking GROUP BY b.type_booking, bb.booking;');
        const data = rows.map((row) => ({
            label: row.booking,
            value: row.cant,
          }));
        connection.close();
          res.json({data});
    }catch(error){
        console.log(error);
        return res.sendStatus(500).json({error: error.message});
    }
};

export const stadistics2 = async (req, res) => {
    try{
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT COUNT(*) AS cant, b.service FROM services AS b INNER JOIN booking AS bb ON bb.type_service = b.idservice GROUP BY b.service, bb.type_service;');
        const data = rows.map((row) => ({
            label: row.service,
            value: row.cant,
          }));
          connection.close();
          res.json({data});
    }catch(error){
        console.log(error);
        return res.sendStatus(500).json({error: error.message});
    }
};

export const stadistics3 = async (req, res) => {
    try{
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT SUM(CASE WHEN b.state_booking = 6 THEN 1 ELSE 0 END) AS reservas_activas, SUM(CASE WHEN b.state_booking = 7 THEN 1 ELSE 0 END) AS reservas_inactivas, SUM(CASE WHEN b.state_booking = 5 THEN 1 ELSE 0 END) as reservas_pendientes FROM booking b WHERE b.date_start >= DATE_SUB(NOW(), INTERVAL 1 MONTH);');
        const data = rows.map((row) => ({
            activas: row.reservas_activas,
            inactivas: row.reservas_inactivas,
            pendientes: row.reservas_pendientes,
          }));
          connection.close();
          res.json({data});
    }catch(error){
        console.log(error);
        return res.sendStatus(500).json({error: error.message});
    }
};

export const saveCode = async (req, res) => {
    try{
        const connection = await mysql.createConnection(dbConfig);
        const {code,dni} = req.body;
        await connection.execute(`INSERT INTO codes (code, user) VALUES ('${code}', '${dni}');`);
        connection.close();
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        return res.sendStatus(500).json({error: error.message});
    }
};

export const getCode = async (req, res) => {
    try{
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`SELECT * FROM codes;`);
        connection.close();
        res.json({data: rows});
    }catch(error){
        console.log(error);
        return res.sendStatus(500).json({error: error.message});
    }
};