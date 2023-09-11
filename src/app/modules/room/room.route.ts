import express from 'express';
import { roomController } from './room.controller';

const router = express.Router();

router.post('/', roomController.createRoom);
router.get('/', roomController.getRooms);
router.get('/:id', roomController.getRoomById);

export const roomRoutes = router;
