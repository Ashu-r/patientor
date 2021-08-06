import React from "react";
import { Card, Icon, SemanticCOLORS } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Entry } from "../types";

function assertNever(value: never): never {
  throw new Error(`Unhandled member: ${JSON.stringify(value)}`);
}

const DiagnosisCodes = ({
  diagnosesList,
}: {
  diagnosesList: string[] | undefined;
}) => {
  const [{ diagnoses }] = useStateValue();
  if (!diagnosesList) {
    return null;
  }
  return (
    <div>
      <ul>
        {diagnosesList.map((code) => (
          <li key={code}>
            {code} :{" "}
            {diagnoses[code] ? (
              diagnoses[code].name
            ) : (
              <em>Information not available</em>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const EntryView = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      const healthIcon: { [key: string]: SemanticCOLORS } = {
        "0": "green",
        "1": "blue",
        "2": "yellow",
        "3": "red",
      };
      return (
        <div>
          <Card.Content as="h3" header={entry.date} />
          <div>
            <em>{entry.description}</em>
          </div>
          <div>Specialist: {entry.specialist}</div>
          <DiagnosisCodes diagnosesList={entry.diagnosisCodes} />
          <div>
            <Icon
              name="heartbeat"
              color={healthIcon[entry.healthCheckRating]}
            />
          </div>
        </div>
      );
    case "Hospital":
      return (
        <div>
          <Card.Content as="h3" header={entry.date} />
          <div>
            <em>{entry.description}</em>
          </div>
          <div>Specialist: {entry.specialist}</div>
          <div>
            Discharge: {entry.discharge.date}{" "}
            <em>{entry.discharge.criteria}</em>
          </div>
          <DiagnosisCodes diagnosesList={entry.diagnosisCodes} />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <Card.Content as="h3" header={entry.date} />
          <div>
            <em>{entry.description}</em>
          </div>
          <div>Specialist: {entry.specialist}</div>
          <div>Employer name: {entry.employerName}</div>
          <div>
            Sick Leave:{" "}
            {entry.sickLeave
              ? `From ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`
              : null}
          </div>
          <DiagnosisCodes diagnosesList={entry.diagnosisCodes} />
        </div>
      );
    default:
      console.log(entry);
      return assertNever(entry);
  }
};

export default EntryView;
