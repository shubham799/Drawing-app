import React, { useState, useEffect, useMemo } from 'react';
import CreateNewDrawing from './CreateNewDrawing';
import TabsComponent from './TabsComponent';
import Canvas from './Canvas';
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../firebase";

function Drawing() {
    const [drawingArray, setDrawingArray] = useState([]);
    const [coordinatesArray, setCoordinatesArray] = useState([]);
    const [finalCoordinatesArray, setFinalCoordinatesArray] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [activeTabRef, setActiveTabRef] = useState('');

    const realtimeDbRef = useMemo(() => {
        return realtimeDb;
    }, []);

    useEffect(async () => {
        onValue(ref(realtimeDbRef, `/drawings`), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                const response = Object.keys(data).map((item) => ({ ...data[item], id: item }));
                if (response && response.length > 0) {
                    const { id: firstTabId } = response[0];
                    setDrawingArray(response);
                    !activeTab && setActiveTab(firstTabId);
                }
            }
        });
    }, [])


    const getCoordinatesList = async () => {
        setCoordinatesArray([]);
        setFinalCoordinatesArray([]);
        onValue(ref(realtimeDbRef, `/coordinatesArray/${activeTab}/coordinates`), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                const { ref: { parent: { key: activeTabref } } } = snapshot;
                const response = Object.values(data);
                setActiveTabRef(activeTabref);
                setCoordinatesArray(response);
            }
        });
    }

    useEffect(() => {
        if (activeTabRef && (activeTab === activeTabRef)) {
            setFinalCoordinatesArray(coordinatesArray);
        }
    }, [activeTabRef, coordinatesArray])

    useEffect(() => {
        if (activeTab) {
            getCoordinatesList();
        }
    }, [activeTab])


    const onTabChange = (id) => {
        setActiveTab(id);
    }

    return (
        <div>
            <CreateNewDrawing />
            <TabsComponent activeTab={activeTab} onTabChange={onTabChange} drawingList={drawingArray} />
            {activeTab && <Canvas drawCanvas={finalCoordinatesArray} drawingId={activeTab} />}
        </div>
    )
}

export default Drawing
