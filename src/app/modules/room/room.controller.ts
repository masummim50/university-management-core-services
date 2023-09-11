import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { roomServices } from './room.service';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const data = await roomServices.createRoom(req.body);
  sendResponse(res, httpStatus.OK, true, 'Room created Successfully', data);
});

const getRooms = catchAsync(async (req: Request, res: Response) => {
  const data = await roomServices.getRooms();
  sendResponse(res, httpStatus.OK, true, 'Rooms retrieved Successfully', data);
});

const getRoomById = catchAsync(async (req: Request, res: Response) => {
  const data = await roomServices.getRoomById(req.params.id);
  sendResponse(res, httpStatus.OK, true, 'Room retrieved Successfully', data);
});

export const roomController = {
  createRoom,
  getRooms,
  getRoomById,
};
