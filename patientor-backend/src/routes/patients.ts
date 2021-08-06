import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/:id', (req, res) => {
	res.send(patientService.getNonSensitivePatient(req.params.id));
});

router.post('/:id/entries', (req, res) => {
	try {
		const newEntries = toNewEntry(req.body);
		const addNewEntry = patientService.addEntry(req.params.id, newEntries);
		res.json(addNewEntry);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get('/', (_req, res) => {
	res.send(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
	const newPatient = toNewPatient(req.body);
	const addedPatient = patientService.addPatient(newPatient);
	res.json(addedPatient);
});

export default router;
