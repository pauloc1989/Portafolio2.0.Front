import { useState, useEffect } from 'react';
import JobTimeline from "./JobTimeline";
import firebase from '../../database/firebase/config';
import { formatDateByNanoAndSeconds, orderByDate } from "../../lib/utils";

const ITEMS_BY_COL = 4;

const ResumeSection = () => {
    const [ jobs, setJobs ] = useState([]);

    useEffect(() => {
        firebase.db.collection('WorkExperiences').onSnapshot(query => {
            const list = query.docs.map(doc => {
                const {
                    active,
                    company,
                    currentJob,
                    description,
                    end,
                    start,
                    text
                } = doc.data();

                const displayYear= formatDateByNanoAndSeconds(start, end);

                return {
                    id: doc.id,
                    company,
                    currentJob,
                    description,
                    end,
                    start,
                    text,
                    active,
                    displayYear: `${displayYear.startDate.getFullYear()} - ${currentJob ? 'Presente' : displayYear.endDate.getFullYear()}`
                };
            }).filter(x => !!x.active);

            setJobs(orderByDate(list));
        });
    }, []);

    return (
        <div className="grid grid-cols-2 gap-14 lg:gap-7">
            <div className="col-span-2 lg:col-span-1">
                <JobTimeline jobs={jobs.slice(0, ITEMS_BY_COL)} />
            </div>
            <div className="col-span-2 lg:col-span-1">
                <JobTimeline jobs={jobs.slice(ITEMS_BY_COL, jobs.length)} showSubtitle={false} />
            </div>
        </div>
    );
};

export default ResumeSection;
