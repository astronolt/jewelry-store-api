import {logger as Mlogger} from './logger'
export const logger = Mlogger;

import { bodyParser as MbodyParser } from './body-parser';
export const bodyParser = MbodyParser

import { cors as Mcors } from './cors';
export const cors = Mcors

import { verifyAuthToken as MverifyAuthToken, signAuthToken as MsignAuthToken } from './auth';
export const verifyAuthToken = MverifyAuthToken
export const signAuthToken = MsignAuthToken