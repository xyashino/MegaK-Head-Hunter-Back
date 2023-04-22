interface UpdateHrBase {
  fullName?: string;
  company?: string;
  maxReservedStudents?: number;
}

interface UpdateHrWithNewPwd {
  newPwd: string;
  pwd: string;
}

interface UpdateHrWithEmail {
  email: string;
  pwd: string;
}

export type UpdateHrRequestBody = UpdateHrBase &
  (UpdateHrWithNewPwd | UpdateHrWithEmail);
