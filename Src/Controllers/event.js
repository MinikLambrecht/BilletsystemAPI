import logger from '../Config/Winston';

const db = require('../Config/Database').default;

export function create(req, res)
{
    const query = `
    INSERT INTO Events (event,
                        description,
                        location,
                        start,
                        end,
                        available_seats,
                        reserved_seats,
                        total_seats)
    VALUES ('${req.body.event}', 
            '${req.body.description}', 
            '${req.body.location}', 
            '${req.body.start}', 
            '${req.body.end}', 
            ${req.body.available_seats}, 
            ${req.body.reserved_seats}, 
            ${req.body.total_seats})`;

    db.query(query, (err, data) =>
    {
        if (!err && data.insertId != null)
        {
            res.json({
                Error: false,
                Message: `Event '${req.body.event}' successfully created with id. ${data.insertId}!`,
            });
            logger.info(
                `Creating event '${req.body.event}' - ${req.body.event} has been issued id nr. ${data.insertId}`,
            );
        }
        else
        {
            res.json({
                Error: true,
                Message: 'An error occured while creating a event!',
            });
            logger.error(err);
        }
    });
}

export function getall(req, res)
{
    const query = 'SELECT * FROM Events';

    db.query(query, (err, rows) =>
    {
        if (!err && rows.length > 0)
        {
            res.json(rows);
            logger.info('Accessing all rows');
        }
        else
        {
            res.json({
                Error: true,
                Message: 'An error occured while fetching events!',
            });
            logger.error(err);
        }
    });
}

export function get(req, res)
{
    const query = `SELECT * FROM Events WHERE id=${req.body.id}`;

    db.query(query, (err, rows) =>
    {
        if (!err && rows.length > 0)
        {
            res.json(rows);
            logger.info(`Accessing row ${req.body.id}`);
        }
        else
        {
            res.json({
                Error: true,
                Message: `No event has been found with id. ${req.body.id}!`,
            });
            logger.error(err);
        }
    });
}

export function remove(req, res)
{
    const query = `DELETE FROM Events WHERE id=${req.body.id}`;

    db.query(query, (err, data) =>
    {
        if (!err && data.affectedRows > 0)
        {
            res.json({
                Error: false,
                Message: 'Event has been deleted!',
            });
            logger.info(`Deleting row ${req.body.id}`);
        }
        else
        {
            res.json({
                Error: true,
                Message: 'An error occured while deleing a event!',
            });
            logger.error(err);
        }
    });
}

export function update(req, res)
{
    const query = `
    UPDATE Events 
    SET
        event = '${req.body.event}',
        description = '${req.body.description}',
        location = '${req.body.location}',
        start = '${req.body.start}',
        end = '${req.body.end}',
        available_seats = ${req.body.available_seats},
        reserved_seats = ${req.body.reserved_seats},
        total_seats = ${req.body.total_seats}
    WHERE
        id = ${req.body.id}`;

    db.query(query, (err, data) =>
    {
        if (!err && data.affectedRows > 0)
        {
            res.json({
                Error: false,
                Message: 'Event has been updated!',
            });
            logger.info(`Updating row ${req.body.id} [${data.info}]`);
        }
        else
        {
            res.json({
                Error: true,
                Message: `An error occured while updating event nr. ${req.body.id}!`,
            });
            if (err == null)
            {
                logger.error(`There is no event with id. ${req.body.id}!`);
            }
            else
            {
                logger.error(err);
            }
        }
    });
}