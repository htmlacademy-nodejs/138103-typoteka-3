const DEFAULT_COUNT = 1;
const DEFAULT_COMMAND = `--generate`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
    success: 0,
    error: 1
};
const FILE_NAME = `mocks.json`;
const MAX_PUBLICATIONS = 1000;

module.exports = {
    DEFAULT_COUNT,
    FILE_NAME,
    MAX_PUBLICATIONS,
    DEFAULT_COMMAND,
    USER_ARGV_INDEX,
    ExitCode
};