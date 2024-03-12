import { useState, useEffect } from "react";
import { onSnapshot } from "@firebase/firestore";

import { useFirebase } from "../hooks/firebase";
import { formatCapacity } from "../utils/format";
import { courseById, schedules } from "../constants";

const Dashboard = (): JSX.Element => {
    const titles = Object.values(courseById).map((course) => course.title);
    const defaultObj = schedules.reduce((accumulator, schedule) => ({
        ...accumulator, [schedule]: 0
    }), {});
    const [capacities, setCapacities] = useState<{ [key: string]: { [key: string]: number } }>(
        titles.reduce((accumulator, title) => ({
            ...accumulator, [title]: { ...defaultObj }
        }), {})
    );
    const { getRef } = useFirebase();

    useEffect(() => {
        const unsubscribes = Object.entries(courseById).map(([courseId, course]) =>
            onSnapshot(getRef("capacities", courseId), (snapshot: any) =>
                setCapacities(prevCapacities => ({
                    ...prevCapacities,
                    [course.title]: snapshot.data()
                }))
            )
        );

        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
    }, [getRef]);

    return (
        <div className="px-3">
            <h1 className="pb-3 text-3xl text-center">現在の予約状況</h1>

            <table className="w-full h-[80dvh] border-separate border-spacing-x-2">
                <thead>
                    <tr className="border-t-2 border-b-2 border-gray-400">
                        <th className="border-r-2 border-b border-gray-500"></th>
                        {titles.map((title, index) => (
                            <th
                                className={
                                    "p-2 w-[15.5%] border border-gray-400 rounded-lg rounded-b-none " +
                                    (index % 2 === 0 ? "bg-green-200" : "bg-red-200")
                                }
                                key={title}
                            >
                                <span className="text-xl text-gray-600">{title}</span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => (
                        <tr key={schedule}>
                            <th className="p-2 text-gray-700 border-b border-r-2 border-gray-500">
                                {schedule}
                            </th>
                            {titles.map((title) => (
                                <td
                                    className={
                                        "p-2  text-center border border-t-0 border-gray-400 " +
                                        (capacities[title][schedule] <= 0 ? "bg-gray-300" : "text-xl")
                                    }
                                    key={`${schedule}-${title}`}
                                >
                                    <span>{formatCapacity(capacities[title][schedule])}</span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <footer className="fixed w-full bottom-3">
                <img
                    src="https://kumamoto-nct.ac.jp/wp/wp-content/themes/KumamotoNCT-201006/images/logo_home.png"
                    alt="logo_home"
                    className="h-12 mr-8 ml-auto"
                />
            </footer>
        </div>
    );
}

export default Dashboard;