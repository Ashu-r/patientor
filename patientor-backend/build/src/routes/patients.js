"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/:id', (req, res) => {
    res.send(patientService_1.default.getNonSensitivePatient(req.params.id));
});
router.post('/:id/entries', (req, res) => {
    try {
        const newEntries = utils_1.toNewEntry(req.body);
        const addNewEntry = patientService_1.default.addEntry(req.params.id, newEntries);
        res.json(addNewEntry);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientData());
});
router.post('/', (req, res) => {
    const newPatient = utils_1.toNewPatient(req.body);
    const addedPatient = patientService_1.default.addPatient(newPatient);
    res.json(addedPatient);
});
exports.default = router;
