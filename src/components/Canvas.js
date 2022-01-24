import React, { useEffect, useRef, useState } from "react";
import { containsObject, getSessionValues } from "../utility";
import PropTypes from 'prop-types';
import { addCoordinates } from "../api/canvas_api";

function Canvas({ drawCanvas, drawingId }) {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [coordinates, setCoordinates] = useState({});
    const { color: userDrawingColor } = getSessionValues();

    useEffect(() => {
        prepareCanvas();
    }, [])

    useEffect(() => {
        drawExistingCanvas();
    }, [drawCanvas])

    const prepareCanvas = () => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d")
        context.lineCap = "round";
        context.lineWidth = 5;
        contextRef.current = context;
        context.scale(2, 2);
    };

    const drawExistingCanvas = () => {
        clearCanvas();
        drawCanvas && drawCanvas.map((data) => {
            const { moveCursor: { offsetX, offsetY }, drawline, color } = data;
            contextRef.current.strokeStyle = color;
            contextRef.current.beginPath();
            contextRef.current.moveTo(offsetX, offsetY);
            drawline && drawline.map((lineData) => {
                const { offsetX: x, offsetY: y } = lineData;
                contextRef.current.lineTo(x, y);
                contextRef.current.stroke();
            })
            contextRef.current.closePath();
            contextRef.current.strokeStyle = userDrawingColor;
        })
    }

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);

        let object = { moveCursor: { offsetX, offsetY }, drawline: [], color: userDrawingColor }
        setCoordinates(object);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
        addCoordinates(drawingId, coordinates)
    };


    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();

        let copyObject = { ...coordinates }
        if (!containsObject({ offsetX, offsetY }, copyObject.drawline)) {
            copyObject.drawline.push({ offsetX, offsetY });
            setCoordinates(copyObject);
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
    }

    return (
        <div>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </div>
    );
}


Canvas.propTypes = {
    drawCanvas: PropTypes.array,
};

Canvas.defaultProps = {
    drawCanvas: [],
};

export default Canvas;
