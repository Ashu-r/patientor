"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = exports.toNewEntry = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
const types_1 = require("../types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseString = (str, field) => {
    if (!str || !isString(str)) {
        throw new Error("Incorrect or missing field: " + field);
    }
    return str;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing Gender: " + gender);
    }
    return gender;
};
const parseDiagnosis = (diagnosisCodes) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return diagnosisCodes.every((diagnosisCode) => isString(diagnosisCode));
};
const isNewBaseEntry = (entry) => {
    if (entry.diagnosisCodes) {
        if (!parseDiagnosis(entry.diagnosisCodes)) {
            throw new Error(`Wrong Diagnosis Code ${entry.diagnosis}`);
        }
    }
    if (!entry ||
        !isString(entry.description) ||
        !isDate(entry.date) ||
        !isString(entry.specialist)) {
        throw new Error("Incorrect description, date or specialist");
    }
    return entry;
};
const isOccupationalHealthcareEntry = (entry) => {
    if (entry.employerName) {
        if (entry.sickLeave.startDate && entry.sickLeave.endDate) {
            console.log(entry.sickLeave);
            if (Object.keys(entry.sickLeave).includes("startDate") &&
                Object.keys(entry.sickLeave).includes("endDate")) {
                if (!isDate(entry.sickLeave.startDate) ||
                    !isDate(entry.sickLeave.endDate)) {
                    throw new Error("Incorrect Date for Sick Leave");
                }
                else
                    return true;
            }
        }
        return true;
    }
    return false;
};
const isHospitalEntry = (entry) => {
    if (entry.discharge &&
        Object.keys(entry.discharge).includes("date") &&
        Object.keys(entry.discharge).includes("criteria")) {
        if (!isString(entry.discharge.criteria) || !isDate(entry.discharge.date)) {
            throw new Error("Incorrect discharge information");
        }
        else {
            return true;
        }
    }
    return false;
};
const isHealthCheckEntry = (entry) => {
    if (entry.healthCheckRating === undefined &&
        !isString(entry.healthCheckRating)) {
        return false;
    }
    return entry;
};
const toNewEntry = (props) => {
    if (!isNewBaseEntry(props)) {
        throw new Error(`Not base entry ${props}`);
    }
    if (isHospitalEntry(props)) {
        return Object.assign(Object.assign({}, props), { type: "Hospital" });
    }
    else if (isOccupationalHealthcareEntry(props)) {
        return Object.assign(Object.assign({}, props), { type: "OccupationalHealthcare" });
    }
    else if (isHealthCheckEntry(props)) {
        return Object.assign(Object.assign({}, props), { type: "HealthCheck" });
    }
    else {
        throw new Error("Entry not in proper format");
    }
};
exports.toNewEntry = toNewEntry;
const toNewPatient = ({ ssn, name, dateOfBirth, gender, occupation, entries, }) => {
    const newPatient = {
        ssn: parseString(ssn, "ssn"),
        name: parseString(name, "name"),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseString(occupation, "occupation"),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entries,
    };
    return newPatient;
};
exports.toNewPatient = toNewPatient;
