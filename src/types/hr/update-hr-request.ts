interface UpdateHrBase {
    email?: string;
    fullName?: string;
    company?: string;
    maxReservedStudents?: number;
}

interface UpdateHrWithNewPwd {
    newPwd: string;
    pwd: string;
}

interface UpdateHrWithoutNewPwd {
    newPwd?: never;
    pwd?: never;
}

export type UpdateHrRequest = UpdateHrBase & (UpdateHrWithNewPwd | UpdateHrWithoutNewPwd);