"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getPatient = () => {
    return patients;
};
const getNonSensitivePatientData = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const getNonSensitivePatient = (id) => {
    return getNonSensitivePatientData().find((p) => p.id === id);
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: uuid_1.v1() }, patient);
    patients.push(newPatient);
    return newPatient;
};
const addEntry = (patientId, entry) => {
    const newEntry = Object.assign({ id: uuid_1.v1() }, entry);
    patients.forEach((p) => {
        if (p.id === patientId) {
            p.entries.push(newEntry);
            return p;
        }
        return p;
    });
    return newEntry;
};
exports.default = {
    getPatient,
    getNonSensitivePatientData,
    addPatient,
    getNonSensitivePatient,
    addEntry,
};
