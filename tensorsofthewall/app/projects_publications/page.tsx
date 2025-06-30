"use client";
import { Tabs } from 'antd';
import data from '@/public/data/resume_json.json';
import ResearchCarousel from './paperCarousel';
import ProjectCarousel from './projectCarousel';


const pageStartText = 'Here lies some evidence of my ‘productive’ rabbit holes.';

const pageSubText = "Click on the title in each card to view the\n full details (link opens in new tab).";

const TabCarousel = () => {
    const TabItems = [
        {
            key: '1',
            label: <span className='text-medium sm:text-large md:text-xl lg:text-2xl'>Publications</span>,
            children: (
                <div className='pt-10'>
                <ResearchCarousel papers={data.publications} />
                </div>
            )
        },
        {
            key: '2',
            label: <span className='text-medium sm:text-large md:text-xl lg:text-2xl'>Projects</span>,
            children: (
                <div className='pt-10'>
                <ProjectCarousel projects={data.projects} />
                </div>
            )
        }
    ]

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '75px'}} className="font-['arial']">
            <strong className='w-[400px] sm:w-[400px] md:w-[450px] lg:w-[500px] text-medium sm:text-large md:text-xl lg:text-2xl'>{pageStartText}<div className="blur-sm hover:blur-none transition-all duration-300" 
                style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <h1 style={{ fontSize: '18px', whiteSpace: 'pre-line'}}>{pageSubText}</h1>
            </div></strong>
            <Tabs
                defaultActiveKey="1"
                centered
                animated
                className="text-white-600 justify-center text-center"
                tabBarGutter={48}
                tabBarStyle={{ paddingTop: '5px', marginBottom: '-10px', display: 'flex', justifyContent: 'center' }}
                size="small"
                items={TabItems}
            />
        </div>
    )
}

export default TabCarousel;