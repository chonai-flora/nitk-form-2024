import { courseIds } from "../constants";

export type SubmissionStatus = 'succeeded' | 'failed';

export type CourseType = {
    [key in typeof courseIds[number]]: {
        title: string;
        target: string;
        icon: string;
    }
};

export type InputValues = {
    courseId: string;
    schedule: string;
    grade: string;
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
};