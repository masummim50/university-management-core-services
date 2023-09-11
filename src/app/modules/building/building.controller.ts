import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { buildingServices } from './building.service';

const createBuilding = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await buildingServices.createBuilding(payload);

  sendResponse(res, httpStatus.OK, true, 'Building created Successfully', data);
});

const getBuildings = catchAsync(async (req: Request, res: Response) => {
  const data = await buildingServices.getBuildings();

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Buildings retrieved Successfully',
    data
  );
});
const getBuildingById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await buildingServices.getBuildingById(id);

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Building retrieved Successfully',
    data
  );
});

export const buildingController = {
  createBuilding,
  getBuildings,
  getBuildingById,
};
