import {Hr} from "@hr/entities/hr.entity";
import {Student} from "@students/entities/student.entity";

const mapHr = (hr: Hr) => ({
    id: hr.id,
    fullName: hr.fullName,
});

const mapStudent = (student: Student) => ({
    id: student.id,
    fullName: `${student.firstname} ${student.lastname}`,
    githubUsername: student.githubUsername,
});

export const userRealizationMapper = (user: { hr: Hr | null; student: Student | null }) => {
    if (user.hr) return mapHr(user.hr);
    if (user.student) return mapStudent(user.student);
    return null;
};
