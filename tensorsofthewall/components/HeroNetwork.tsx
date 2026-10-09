"use client";
import React, { useEffect, useState } from "react";
import NeuralNetwork from "@/components/nn";

const getRandomLayerSizes = () => {
    const numLayers = Math.floor(Math.random() * 4) + 4;
    return Array.from({ length: numLayers }, () => Math.floor(Math.random() * 10) + 3);
};

// Random sizes are picked once on mount (never during SSR, to avoid a hydration mismatch)
const HeroNetwork = () => {
    const [layerSizes, setLayerSizes] = useState<number[]>([]);

    useEffect(() => {
        setLayerSizes(getRandomLayerSizes());
    }, []);

    return <NeuralNetwork layerSizes={layerSizes} />;
};

export default HeroNetwork;
