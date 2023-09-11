import express from 'express';
import { buildingController } from './building.controller';

const router = express.Router();

router.post('/', buildingController.createBuilding);
router.get('/', buildingController.getBuildings);
router.get('/:id', buildingController.getBuildingById);

export const buildingRoutes = router;
