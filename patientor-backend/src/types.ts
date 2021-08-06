export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export type Diagnosis = {
	code: string;
	name: string;
	latin?: string;
};

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

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

interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

interface Discharge {
	date: string;
	criteria: string;
}

interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export type newBaseEntry = Omit<BaseEntry, 'id'>;
export type newHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type newHospitalEntry = Omit<HospitalEntry, 'id'>;
export type newOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

export type NewEntry = newHealthCheckEntry | newHospitalEntry | newOccupationalHealthcareEntry;
