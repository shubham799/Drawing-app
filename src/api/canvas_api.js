import { set, ref, onValue, remove, update, push } from "firebase/database";
import { realtimeDb } from "../firebase";

export const addDrawings = (drawingName) => {
    set(push(ref(realtimeDb, `/drawings`)), {
        drawingName
    });
}

export const getDrawings = async () => {
    return new Promise((resolve, reject) => {
        onValue(ref(realtimeDb, `/drawings`), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                const response = Object.keys(data).map((item) => ({ ...data[item], id: item }));
                resolve(response)
            } else {
                reject(null)
            }
        });
    })
}

export const addCoordinates = (drawingId, coordinatesObject) => {
    set(push(ref(realtimeDb, `/coordinatesArray/${drawingId}/coordinates`)), coordinatesObject);
}

export const getCoordinatesData = (drawingId) => {
    return new Promise((resolve, reject) => {
        onValue(ref(realtimeDb, `/coordinatesArray/${drawingId}/coordinates`), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                const response = Object.values(data);
                resolve(response);
            } else {
                resolve(null);
            }
        });
    })
}