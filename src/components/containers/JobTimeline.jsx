import { motion } from "framer-motion";
import { RiBriefcaseLine } from "react-icons/ri";
import { childrenAnimation } from "../../lib/motion";
import { TimelineItem } from "../elements";

const JobTimeline = ({ jobs, showSubtitle= true }) => {
    if (jobs.length === 0) return null;

    return (
        <div className="job-experience">
            {showSubtitle && (
                <h4>
                    <RiBriefcaseLine className="mr-2 inline-block text-primary" />
                    Experiencias laborales
                </h4>
            )}

            {jobs?.map((job, index) => (
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 * index }}
                    variants={childrenAnimation}
                    className="timeline-wrap"
                    key={(index + 1)}
                >
                    <TimelineItem
                        timeline={{
                            title: job.text,
                            text: job.description,
                            meta: job.company,
                            year: job.displayYear
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default JobTimeline;
