import { useCallback } from "react";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    Timestamp,
    arrayUnion,
    DocumentData,
    DocumentReference,
} from "@firebase/firestore";

import { firebaseDB } from "../services/firebase";
import { InputValues, SubmissionStatus } from "../@types";

export const useFirebase = () => {
    const getRef = useCallback((path: string, ...pathSegments: string[]): DocumentReference<DocumentData, DocumentData> => {
        return doc(firebaseDB, path, ...pathSegments);
    }, []);

    const getCapacities = useCallback(async (courseId: string): Promise<DocumentData> => {
        const ref = getRef("capacities", courseId);
        const snapshot = await getDoc(ref);

        return snapshot;
    }, [getRef]);
  
    const decreaseCapacity = async (courseId: string, schedule: string): Promise<SubmissionStatus> => {
        const capacities = await getCapacities(courseId).then((data) => data.data());
        if (capacities == null || capacities[schedule] <= 0) {
            return "failed";
        }
    
        try {
            const ref = getRef("capacities", courseId);
            await setDoc(ref, {
                ...capacities,
                [schedule]: capacities[schedule] - 1
            });
  
            return "succeeded";
        } catch (error) {
            console.error(error);
            return "failed";
        }
    }
  
    const submitForm = async (values: InputValues): Promise<SubmissionStatus> => {
        const { courseId, schedule, grade, name, email } = values;

        const status = await decreaseCapacity(courseId, schedule);
        if (status === "failed") {
            return "failed";
        }

        const ref = getRef("applicants", courseId);
        try {
            await updateDoc(ref, {
                [schedule]: arrayUnion({
                    name: `${name.lastName} ${name.firstName}`,
                    grade: grade,
                    email: email,
                    submitted_at: Timestamp.fromDate(new Date())
                })
            });
  
            return "succeeded";
        } catch (error) {
            console.error(error);
            return "failed";
        }
    }

    return {
        getRef,
        getCapacities,
        submitForm,
    };
}