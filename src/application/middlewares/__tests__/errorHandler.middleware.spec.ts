import { Request, Response } from 'express';
import errorHandler from '../errorHandler.middleware';

const Req = jest.fn<Request, []>();
const ResMock = jest.fn<Response, []>();
const res = new ResMock();

const mockJson = jest.fn();

beforeEach(() => {
  res.status = jest.fn().mockReturnValue({ json: mockJson });
});

describe('errorHandler', () => {
  it('given an error without status code should return 500 and message from error', () => {
    errorHandler(new Error('no status code'), new Req(), res, jest.fn());
    expect(res.status).toBeCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ message: 'no status code' });
  });
});
