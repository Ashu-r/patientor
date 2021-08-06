import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  Icon,
  Message,
  Button,
  Dropdown,
  DropdownProps,
} from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import { EntryFormValues } from "../AddEntryModal";
import EntryView from "../components/EntryView";
import { useStateValue, addNewEntry } from "../state";
import { Entry, EntryTypes, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [entry, setEntry] = useState<string>("");

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const { id } = useParams<{ id: string }>();
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addNewEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

  const entryOptions = [
    {
      key: "OccupationalHealthcare",
      value: "OccupationalHealthcare",
      text: "OccupationalHealthcare",
    },
    { key: "HealthCheck", value: "HealthCheck", text: "HealthCheck" },
    { key: "Hospital", value: "Hospital", text: "Hospital" },
  ];

  const handleChange = (
    event: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    data.value ? setEntry(String(data.value)) : setEntry("");
  };

  const currentPatient = Object.values(patients).find(
    (p: Patient) => p.id === id
  );
  const genderIcon: { [key: string]: SemanticICONS } = {
    male: "mars",
    female: "venus",
    other: "neuter",
  };
  if (!currentPatient) {
    return (
      <div>
        <Message negative>
          <Message.Header>Error! Please check the id again</Message.Header>
          <p>That patient probably does not exist</p>
        </Message>
      </div>
    );
  }

  return (
    <div>
      <h3>
        {currentPatient.name} <Icon name={genderIcon[currentPatient.gender]} />
      </h3>
      <div>
        ssn: {currentPatient.ssn}
        <br />
        occupation: {currentPatient.occupation}
        <br />
        Date of Birth: {currentPatient.dateOfBirth}
      </div>
      <h3>Entries</h3>
      <Card.Group>
        {currentPatient.entries ? (
          currentPatient.entries.map((entry) => (
            <Card fluid key={entry.id}>
              <EntryView entry={entry} />
              <br />
            </Card>
            // eslint-disable-next-line no-mixed-spaces-and-tabs
          ))
        ) : (
          <div>
            <em>No entries</em>
          </div>
        )}
      </Card.Group>
      <Dropdown
        onChange={handleChange}
        placeholder="Select Entry Type"
        value={entry}
        options={entryOptions}
      />
      <div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          entryType={entry as EntryTypes}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Patient</Button>
      </div>
    </div>
  );
};

export default PatientPage;
