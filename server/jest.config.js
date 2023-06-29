/** @type {import('ts-jest').JestConfigWithTsJest} */
const {config} = require("dotenv");
const path = require("path");
require('dotenv').config();
config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
