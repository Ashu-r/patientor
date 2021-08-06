export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export type Patient = {
	ssn: string;
	id: string;
	name: string;
	dateOfBirth: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
};

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

interface Discharge {
	date: string;
	criteria: string;
}

export interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type EntryTypes = 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';

