// Import dependiencies
import { Router } from 'express';

// Controllers
import { event as eventController } from './Controllers';

const router = Router();

// Events
router.get('/events', eventController.getall);
router.get('/event', eventController.get);
router.post('/event/new', eventController.create);
router.put('/event', eventController.update);
router.delete('/event', eventController.remove);

// Tickets

// Users

module.exports = router;