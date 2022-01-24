import React, { useState } from 'react';
import { Tabs, Tab } from "react-bootstrap";

const TabsComponent = ({ activeTab, onTabChange, drawingList }) => {

    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                activeKey={activeTab}
                onSelect={(k) => onTabChange(k)}
                className="mb-3"
            >
                {
                    drawingList.map(({ id, drawingName }, index) => (
                        <Tab key={index} eventKey={id} title={drawingName} />
                    ))
                }
            </Tabs>
        </div>
    )
}

export default TabsComponent
