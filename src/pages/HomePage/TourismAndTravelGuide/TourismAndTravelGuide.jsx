import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OurPackagesTab from "./OurPackagesTab";
import MeetOurTourGuidesTab from "./MeetOurTourGuidesTab";
import Title from "../../../components/Title";
import Section from "../../../components/Section";

const TourismAndTravelGuide = () => {
  return (
    <>
      <Title
        title={"Our Tours & Guides"}
        subtitle={
          "Explore our curated tour packages and trusted guides to make every journey memorable"
        }
      />
      <Section>
        <Tabs>
          <TabList>
            <Tab>
              <p className="text-sm md:text-xl font-bold">Our Packages</p>
            </Tab>
            <Tab>
              <p className="text-sm md:text-xl font-bold">Meet Our Tour Guides</p>
            </Tab>
          </TabList>{" "}
          {/* Our Packages Tab */}
          <TabPanel className="mt-10">
            <OurPackagesTab />
          </TabPanel>
          {/* Meet Our Tour Guides Tab */}
          <TabPanel>
            <MeetOurTourGuidesTab className="mt-10" />
          </TabPanel>
        </Tabs>
      </Section>
    </>
  );
};

export default TourismAndTravelGuide;
