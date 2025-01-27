import { motion, useAnimation } from "motion/react";
import React, { useState, useEffect } from "react";

interface ConnectionProps {
    start: NodeProps;
    end: NodeProps;
    id: string;
    isActive: boolean;
    fromLayer: number;
    toLayer: number;
}

interface NodeProps {
    x: number;
    y: number;
    layer: number;
}

interface NeuralNetworkProps {
    layerSizes: number[];
}

const Node: React.FC<NodeProps & { isActive: boolean, isLastLayer: boolean }> = ({ x, y, isActive, isLastLayer }) => {
    const controls = useAnimation();

    useEffect(() => {
        if (isActive || isLastLayer) {
            controls.start({
                opacity: [0.5, 1.0, 0.5],
                scale: [1, 1.2, 1],
                fill: ['var(--nn-inactive)','var(--nn-active)','var(--nn-inactive)'],
            });
        } else {
            controls.start({ opacity: 0.3, scale: 1, fill: 'var(--nn-inactive)' });
        }
    }, [isActive, isLastLayer, controls]);

    return (
        <motion.circle 
            cx={x}
            cy={y}
            r={10}
            initial={{ opacity: 0.3, scale: 1, fill: 'var(--nn-inactive)' }}
            animate={controls}
            transition={{duration: 3, repeat: Infinity, repeatDelay: 2, repeatType: "reverse", ease: "easeInOut"}}
        />
    );
};

const CurvedConnection: React.FC<ConnectionProps & { delay: number }> = ({ start, end, isActive, delay }) => {
    const controls = useAnimation();

    useEffect(() => {
        if (isActive) {
            controls.start({
                opacity: [0.1, 0.8, 0.1],
                stroke: ['var(--nn-inactive)','var(--nn-active)','var(--nn-inactive)'],
            });
        } else {
            controls.start({ opacity: 0.1, stroke: 'var(--nn-inactive)' });
        }
    }, [isActive, controls]);

    // Calculate control point for the curve
    const midX = (start.x + end.x) / 2;
    const controlX = midX + (end.x - start.x) / 4; // Adjust this value to change the curve
    const controlY = (start.y + end.y) / 2;

    // Create the path for a quadratic Bézier curve
    const d = `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;

    return (
        <motion.path
            d={d}
            fill="none"
            strokeWidth={2.0}
            initial={{ opacity: 0.1, stroke: 'var(--nn-inactive)' }}
            animate={controls}
            transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay
            }}
        />
    );
};




const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ layerSizes }) => {
    const [connections, setConnections] = useState<ConnectionProps[]>([]);
    const [nodes, setNodes] = useState<NodeProps[]>([]);
    const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set());

    useEffect(() => {
        // Generate nodes and connections
        const newNodes: NodeProps[] = [];
        const newConnections: ConnectionProps[] = [];
        const totalLayers = layerSizes.length;
        const maxNodesInLayer = Math.max(...layerSizes);
        const verticalSpacingFactor = 0.5;

        layerSizes.forEach((layerSize, layerIndex) => {
            const layerHeight = (layerSize - 1) * (1000 / maxNodesInLayer) * verticalSpacingFactor;
            const startY = (1000 - layerHeight) / 2;

            for (let nodeIndex = 0; nodeIndex < layerSize; nodeIndex++) {
                const x = ((layerIndex + 1) * 1000) / (totalLayers + 1);
                const y = startY + (nodeIndex * (1000 / maxNodesInLayer) * verticalSpacingFactor);
                newNodes.push({ x, y, layer: layerIndex });

                if (layerIndex > 0) {
                    const prevLayerNodes = newNodes.filter(n => n.layer === layerIndex - 1);

                    prevLayerNodes.forEach((startNode, prevNodeIndex) => {
                        newConnections.push({
                            id: `conn-${layerIndex}-${nodeIndex}-${prevNodeIndex}`,
                            start: startNode,
                            end: { x, y, layer: layerIndex },
                            isActive: false,
                            fromLayer: layerIndex - 1,
                            toLayer: layerIndex
                        });
                    });
                }
            }
        });

        setNodes(newNodes);
        setConnections(newConnections);
    }, [layerSizes]);
    

    useEffect(() => {
        const updateActiveConnections = () => {
            const newActiveConnections = new Set<string>();
            const layerConnections: { [key: string]: ConnectionProps[] } = {};
    
            connections.forEach((conn) => {
                const key = `${conn.fromLayer}-${conn.toLayer}`;
                if (!layerConnections[key]) layerConnections[key] = [];
                layerConnections[key].push(conn);
            });
    
            const activateLayerConnections = (layerIndex: number) => {
                if (layerIndex >= Object.keys(layerConnections).length) {
                    // All layers have been activated
                    setActiveConnections(newActiveConnections);
                    return;
                }
    
                const key = Object.keys(layerConnections)[layerIndex];
                const layerConns = layerConnections[key];
                const randomConn = layerConns[Math.floor(Math.random() * layerConns.length)];
                newActiveConnections.add(randomConn.id);
    
                // Activate additional random connections if needed
                const totalDesiredActive = Math.floor(connections.length * 0.2);
                while (newActiveConnections.size < totalDesiredActive * ((layerIndex + 1) / Object.keys(layerConnections).length)) {
                    const randomConn = connections[Math.floor(Math.random() * connections.length)];
                    newActiveConnections.add(randomConn.id);
                }
    
                // Update active connections for the current layer
                setActiveConnections(new Set(newActiveConnections));
    
                // Schedule activation of the next layer
                setTimeout(() => activateLayerConnections(layerIndex + 1), 45); // 500ms delay between layers
            };
    
            // Start the activation process
            activateLayerConnections(0);
        };
    
        updateActiveConnections();
        const interval = setInterval(updateActiveConnections, 15000); // Increased interval to allow for layer delays
        return () => clearInterval(interval);
    }, [connections, layerSizes.length]);

    return (
        <svg width="auto" height="100%" viewBox="0 0 1000 1000">
            {connections.map((conn) => {
                const layerDelay = conn.fromLayer * 0.45;
                return (
                    <CurvedConnection 
                        key={conn.id} 
                        {...conn} 
                        isActive={activeConnections.has(conn.id)}
                        delay={layerDelay} 
                    />
                )
            })}
            {nodes.map((node) => (
                <Node 
                    key={`node-${node.x}-${node.y}`} 
                    {...node} 
                    isActive={Array.from(activeConnections).some(
                        id => connections.find(c => c.id === id)?.start === node || 
                            connections.find(c => c.id === id)?.end === node
                    )} 
                    isLastLayer={node.layer === layerSizes.length - 1}
                />
            ))}
        </svg>
    );
};

export default NeuralNetwork;
