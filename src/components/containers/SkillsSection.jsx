import { useState, useEffect } from 'react';
import LanguageSkills from "./LanguageSkills";
import TechSkills from "./TechSkills";
import firebase from '../../database/firebase/config';
import { orderByProperty } from "../../lib/utils";

const SkillsSection = () => {
    const [ skills, setSkills ] = useState([]);

    useEffect(() => {
        firebase.db.collection('Skills').onSnapshot(query => {
            const list = query.docs.map(doc => {
               const {
                   active,
                   category,
                   tech,
                   value,
                   urlImage
               } = doc.data();

               return {
                   id: doc.id,
                   category,
                   active,
                   tech,
                   value,
                   urlImage
               };
            }).filter(x => !!x.active);

            setSkills(orderByProperty(list, 'tech'));
        });
    }, []);

    return (
        <div className="skills-wrapper">
            <TechSkills skills={skills} />

            <div className="py-7" />

            <LanguageSkills skills={skills} />
        </div>
    );
};

export default SkillsSection;