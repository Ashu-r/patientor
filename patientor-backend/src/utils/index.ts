/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Gender,
  NewPatient,
  NewEntry,
  newBaseEntry,
  newHospitalEntry,
  newOccupationalHealthcareEntry,
  newHealthCheckEntry,
  Diagnosis,
} from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseString = (str: unknown, field: string): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing field: " + field);
  }
  return str;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing Gender: " + gender);
  }
  return gender;
};

const parseDiagnosis = (
  diagnosisCodes: any
): diagnosisCodes is Array<Diagnosis["code"]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return diagnosisCodes.every((diagnosisCode: any) => isString(diagnosisCode));
};

type PatientFields = {
  ssn: unknown;
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entries: any;
};

const isNewBaseEntry = (entry: any): entry is newBaseEntry => {
  if (entry.diagnosisCodes) {
    if (!parseDiagnosis(entry.diagnosisCodes)) {
      throw new Error(`Wrong Diagnosis Code ${entry.diagnosis}`);
    }
  }

  if (
    !entry ||
    !isString(entry.description) ||
    !isDate(entry.date) ||
    !isString(entry.specialist)
  ) {
    throw new Error("Incorrect description, date or specialist");
  }

  return entry;
};

const isOccupationalHealthcareEntry = (
  entry: any
): entry is newOccupationalHealthcareEntry => {
  if (entry.employerName) {
    if (entry.sickLeave.startDate && entry.sickLeave.endDate) {
      console.log(entry.sickLeave);
      if (
        Object.keys(entry.sickLeave).includes("startDate") &&
        Object.keys(entry.sickLeave).includes("endDate")
      ) {
        if (
          !isDate(entry.sickLeave.startDate) ||
          !isDate(entry.sickLeave.endDate)
        ) {
          throw new Error("Incorrect Date for Sick Leave");
        } else return true;
      }
    }
    return true;
  }
  return false;
};

const isHospitalEntry = (entry: any): entry is newHospitalEntry => {
  if (
    entry.discharge &&
    Object.keys(entry.discharge).includes("date") &&
    Object.keys(entry.discharge).includes("criteria")
  ) {
    if (!isString(entry.discharge.criteria) || !isDate(entry.discharge.date)) {
      throw new Error("Incorrect discharge information");
    } else {
      return true;
    }
  }
  return false;
};

const isHealthCheckEntry = (entry: any): entry is newHealthCheckEntry => {
  if (
    entry.healthCheckRating === undefined &&
    !isString(entry.healthCheckRating)
  ) {
    return false;
  }
  return entry;
};

export const toNewEntry = (props: any): NewEntry => {
  if (!isNewBaseEntry(props)) {
    throw new Error(`Not base entry ${props}`);
  }
  if (isHospitalEntry(props)) {
    return { ...props, type: "Hospital" };
  } else if (isOccupationalHealthcareEntry(props)) {
    return { ...props, type: "OccupationalHealthcare" };
  } else if (isHealthCheckEntry(props)) {
    return { ...props, type: "HealthCheck" };
  } else {
    throw new Error("Entry not in proper format");
  }
};

export const toNewPatient = ({
  ssn,
  name,
  dateOfBirth,
  gender,
  occupation,
  entries,
}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
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
