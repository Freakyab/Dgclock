import React from 'react';
import './style.css';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faSchool } from '@fortawesome/free-solid-svg-icons';

const workIcon = {
    icon: <FontAwesomeIcon icon={faBriefcase} />,
    iconStyle: { background: 'rgb(33, 150, 243)', color: '#fff' }
};
const schoolIcon = {
    icon: <FontAwesomeIcon icon={faSchool} />,
    iconStyle: { background: 'rgb(233, 30, 99)', color: '#fff' }
};

function App() {
    const timeline = [
        { icon: workIcon, date: 'Present', title: 'About me', desc: 'Hello, my name is Aryan Vijay Bhisikar and I am currently a second-year student at St Vincent Pallotti College of Engineering & Technology. I am pursuing a degree in engineering and will be completing my studies in 2025.',color: "red" },
        { icon: workIcon, date: '2010 - 2011', title: 'Art Director', subtitle: 'San Francisco, CA', desc: 'Creative Direction, User Experience, Visual Design, SEO, Online Marketing',color : "blue" },
        { icon: workIcon, date: '2008 - 2010', title: 'Web Designer', subtitle: 'Los Angeles, CA', desc: 'User Experience, Visual Design' },
        { icon: workIcon, date: '2006 - 2008', title: 'Web Designer', subtitle: 'San Francisco, CA', desc: 'User Experience, Visual Design' },
        { icon: schoolIcon, date: 'April 2013', title: 'Content Marketing for Web, Mobile and Social Media', subtitle: 'Online Course', desc: 'Strategy, Social Media' },
        { icon: schoolIcon, date: 'November 2012', title: 'Agile Development Scrum Master', subtitle: 'Certification', desc: 'Creative Direction, User Experience, Visual Design' },
        { icon: schoolIcon, date: '2002 - 2006', title: 'Bachelor of Science in Interactive Digital Media Visual Imaging', subtitle: 'Bachelor Degree', desc: 'Creative Direction, Visual Design' },
        // { icon: starIcon }
    ];

    return (
        <>

            <VerticalTimeline
                animate={false}
                layout="1-column"
                lineColor='#ddd'
            >
                {timeline.map((t, i) => {
                    // const contentStyle = { background: 'rgb(33, 150, 243)', color: '#fff', width: '50%' };
                    // const contentStyle = { background: `${t.color}`, color: '#fff', width: '50%' };
                    const contentStyle = { backgroundImage: `url(${require('./img/wave.png')})`, color: 'black', width: '50%' };
                    const arrowStyle = { borderRight: '7px solid  rgb(33, 150, 243)' };

                    return <VerticalTimelineElement
                        key={i}
                        className="vertical-timeline-element--work"
                        contentStyle={contentStyle}
                        contentArrowStyle={arrowStyle}
                        date={t.date}
                        {...t.icon}
                    >
                        {t.title ? <React.Fragment>
                            <h3 className="vertical-timeline-element-title">{t.title}</h3>
                            {t.subtitle && <h4 className="vertical-timeline-element-subtitle">{t.subtitle}</h4>}
                            {t.desc && <p>{t.desc}</p>}
                        </React.Fragment> : undefined}
                    </VerticalTimelineElement>
                })}
            </VerticalTimeline>
        </>
    );
}

export default App;