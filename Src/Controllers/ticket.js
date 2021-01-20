import logger from '../Config/Winston';
import pool from '../Config/Database';
import { TicketModel } from '../Models';

function checkValidity(req, res)
{
    const ticket = new TicketModel({
        id: req.params.id
    });
    
    const query = `CALL billetsystem.Get_Ticket(${ticket.id})`;

    pool.query(query, (err, rows) =>
    {
        if (!err && rows[0].length > 0)
        {
            res.json(rows[0][0]);
            logger.info(`Accessing row ${ticket.id}`);
        }
        else
        {
            res.json({
                Message: `No ticket has been found with id. ${ticket.id}!`,
            });
            logger.error(`${err.code} ${err.errno} (${err.sqlState}): ${err.stack}`);
        }
    });
}

function useTicket(req, res)
{
    const ticket = new TicketModel({
        id: req.params.id
    });
    
    const query = `CALL billetsystem.Update_Ticket(${ticket.id})`;

    pool.query(query, (err, rows) =>
    {
        if (!err && rows[0].length > 0)
        {
            res.json(rows[0][0]);
            logger.info(`Updating row ${ticket.id}`);
            res.json({
                Message: `Ticket ${ticket.id} has been redeemed!`,
            });
        }
        else
        {
            res.json({
                Message: `No ticket has been found with id. ${ticket.id}!`,
            });
            logger.error(`${err.code} ${err.errno} (${err.sqlState}): ${err.stack}`);
        }
    });
}

export default {
    checkValidity,
    useTicket
};