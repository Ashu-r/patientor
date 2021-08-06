import patientData from '../../data/patients';
import { Entry, NewEntry, NewPatient, NonSensitivePatientData, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

const getPatient = (): Array<Patient> => {
	return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
		entries,
	}));
};

const getNonSensitivePatient = (id: string): NonSensitivePatientData | undefined => {
	return getNonSensitivePatientData().find((p) => p.id === id);
};

const addPatient = (patient: NewPatient) => {
	const newPatient = {
		id: uuid(),
		...patient,
	};
	patients.push(newPatient);
	return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
	const newEntry = {
		id: uuid(),
		...entry,
	};
	patients.forEach((p) => {
		if (p.id === patientId) {
			p.entries.push(newEntry);
			return p;
		}
		return p;
	});
	return newEntry;
};

export default {
	getPatient,
	getNonSensitivePatientData,
	addPatient,
	getNonSensitivePatient,
	addEntry,
};
