import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OurPackagesTab from './OurPackagesTab';
import MeetOurTourGuidesTab from './MeetOurTourGuidesTab';

const TourismAndTravelGuide = () => {
 
  return (
    <div className="my-12 max-w-7xl mx-auto p-5 md:p-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Tourism and Travel Guide
      </h2>

      <Tabs>
        <TabList className="flex justify-center gap-6 mb-8">
          <Tab>Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        {/* Our Packages Tab */}
        <TabPanel>
        <OurPackagesTab />
        </TabPanel>

        {/* Meet Our Tour Guides Tab */}
        <TabPanel>
         <MeetOurTourGuidesTab />
        </TabPanel>
      </Tabs>
    </div>
    
  );
};

export default TourismAndTravelGuide;