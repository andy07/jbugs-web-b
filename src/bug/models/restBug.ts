export interface RestBug {
  id: number;
  title: string;
  description: string;
  version: string;
  targetDate: Date;
  status: string;
  fixedVersion: string;
  severity: string;
  createdBy: string;
  assignedTo: string;
}

export interface Attachment {
  id: number;
  file: string;
}
