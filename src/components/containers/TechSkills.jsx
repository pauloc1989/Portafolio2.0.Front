import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { childrenAnimation } from "../../lib/motion";
import { ProgressCircle } from "../elements";
import { getAverageByCategory } from '../../lib/utils';
import { getCategories } from '../../fetchers';
import { useQuery } from 'react-query';

const TechSkills = ({ skills }) => {
  const { data } = useQuery("categories", getCategories)

  const [ categories, setCategories ] = useState([]);
  const [ avgSkills, setAvgSkills ] = useState({
    devops: { id: 1, name: 'DevOps', value: 0 },
    backend: { id: 2, name: 'Desarrollo Back-end', value: 0 },
    frontend: { id: 3, name: 'Desarrollo Front-end', value: 0 },
    mobile: { id: 4, name: 'Desarrollo Móvil', value: 0 }
  });

  useEffect(() => {
    if (data) setCategories(data);
  }, [ data ]);

  useEffect(() => {
    if (skills.length > 0) {
      const result = {
        devops: getResultAVG('devops'),
        backend: getResultAVG('backend'),
        frontend: getResultAVG('frontend'),
        mobile: getResultAVG('mobile')
      };

      setAvgSkills(result);
    }
  }, [ skills ]);

  const getResultAVG = id => {
    const arrayMatch = categories.find(x => String(x.categorie).toLowerCase() === id).subCategories;

    return {
      ...avgSkills[id],
      value: getAverageByCategory(skills, arrayMatch)
    }
  };

  if (skills.length === 0) return null;

  return (
    <div className="grid grid-cols-4 gap-7">
      {Object.keys(avgSkills).map((item, index) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 * index }}
            variants={childrenAnimation}
            className="col-span-4 sm:col-span-2 lg:col-span-1"
            key={avgSkills[item].id}
          >
            <ProgressCircle skill={{ title: avgSkills[item].name, percentage: +avgSkills[item].value }} />
          </motion.div>
      ))}
    </div>
  );
};

export default TechSkills;
