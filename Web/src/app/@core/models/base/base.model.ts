export interface Base {
  id: string;
  createdBy: string;
  createdOn: Date;
  lastModifiedBy: string;
  lastModifiedOn: Date;
  deletedBy: string;
  deletedOn: Date;
}

export interface UploadRequest {
  request: any[];
}
