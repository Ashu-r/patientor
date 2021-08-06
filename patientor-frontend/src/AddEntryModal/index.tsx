import React from "react";
import { Message, Modal, Segment } from "semantic-ui-react";
import { EntryTypes } from "../types";
import {
  AddHealthEntryForm,
  HealthCheckEntryFormValues,
} from "./AddHealthEntryForm";
import {
  AddHospitalEntryForm,
  HospitalFormValues,
} from "./AddHospitalEntryForm";
import {
  AddOccupationalEntryForm,
  OccupationalFormValues,
} from "./AddOccupationalEntryForm";

export type EntryFormValues =
  | HospitalFormValues
  | OccupationalFormValues
  | HealthCheckEntryFormValues;

interface Props {
  entryType: EntryTypes;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({
  entryType,
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => {
  switch (entryType) {
    case "Hospital":
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add a new {entryType} Entry</Modal.Header>
          <Modal.Content>
            {error && (
              <Segment inverted color="red">{`Error: ${error}`}</Segment>
            )}
            <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
          </Modal.Content>
        </Modal>
      );
    case "OccupationalHealthcare":
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add a new {entryType} Entry</Modal.Header>
          <Modal.Content>
            {error && (
              <Segment inverted color="red">{`Error: ${error}`}</Segment>
            )}
            <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
          </Modal.Content>
        </Modal>
      );
    case "HealthCheck":
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add a new {entryType} Entry</Modal.Header>
          <Modal.Content>
            {error && (
              <Segment inverted color="red">{`Error: ${error}`}</Segment>
            )}
            <AddHealthEntryForm onSubmit={onSubmit} onCancel={onClose} />
          </Modal.Content>
        </Modal>
      );
    default:
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add a new {entryType} Entry</Modal.Header>
          <Modal.Content>
            {error && (
              <Segment inverted color="red">{`Error: ${error}`}</Segment>
            )}
            <Message warning>
              <Message.Header>
                Please check if you have selected entry type!
              </Message.Header>
            </Message>
          </Modal.Content>
        </Modal>
      );
  }
};

export default AddEntryModal;
