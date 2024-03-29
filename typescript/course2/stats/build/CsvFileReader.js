"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvFileReader = void 0;
var fs_1 = __importDefault(require("fs"));
var CsvFileReader = /** @class */ (function () {
    function CsvFileReader(filename, rowParser) {
        this.filename = filename;
        this.rowParser = rowParser;
        this.data = null;
    }
    CsvFileReader.prototype.read = function () {
        if (!this.data) {
            this.data = fs_1.default
                .readFileSync(this.filename, {
                encoding: "utf-8",
            })
                .split("\n")
                .map(function (row) { return row.split(","); })
                .map(this.rowParser);
        }
        return this;
    };
    CsvFileReader.prototype.getData = function () {
        return this.data;
    };
    return CsvFileReader;
}());
exports.CsvFileReader = CsvFileReader;
