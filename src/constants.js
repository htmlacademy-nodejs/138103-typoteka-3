'use strict';

const DEFAULT_COUNT = 1;
const DEFAULT_COMMAND = `--generate`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  success: 0,
  error: 1
};

const FILE_NAME = `mocks.json`;
const MAX_PUBLICATIONS = 1000;
const MAX_ID_LENGTH = 6;
const API_PREFIX = `/api`;

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_PUBLICATIONS,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  HttpCode,
  MAX_ID_LENGTH,
  API_PREFIX
};
