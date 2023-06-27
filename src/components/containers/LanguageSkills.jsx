import { motion } from "framer-motion";
import { childrenAnimation } from "../../lib/motion";
import { ProgressBar } from "../elements";

const LanguageSkills = ({ skills }) => {
  if (skills.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-7">
        {skills?.map((skill, index) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 * index }}
            variants={childrenAnimation}
            className="col-span-2 md:col-span-1"
            key={(index + 1)}
          >
            <ProgressBar skill={{ title: skill.tech, percentage: +skill.value }} />
          </motion.div>
        ))}
    </div>
  );
};

export default LanguageSkills;
