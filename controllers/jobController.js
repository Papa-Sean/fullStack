import JobModel from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await JobModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getSingleJob = async (req, res) => {
  const job = await JobModel.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const updatedJob = await JobModel.findOneAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: 'Job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const removedJob = await JobModel.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'Job Deleted', job: removedJob });
};
