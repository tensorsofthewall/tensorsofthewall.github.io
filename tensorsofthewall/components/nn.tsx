"use client";
import React, { useEffect, useMemo, useState } from "react";

interface NodeData {
    id: string;
    x: number;
    y: number;
    layer: number;
}

interface ConnectionData {
    id: string;
    startNodeId: string;
    endNodeId: string;
    d: string;
    fromLayer: number;
    toLayer: number;
}

interface NeuralNetworkProps {
    layerSizes: number[];
}

interface ActiveState {
    connectionIds: Set<string>;
    nodeIds: Set<string>;
}

const EMPTY_ACTIVE: ActiveState = { connectionIds: new Set(), nodeIds: new Set() };
const ACTIVITY_INTERVAL_MS = 15000;
const LAYER_DELAY_S = 0.45;

// Deterministic geometry derived purely from the layer sizes
const generateNetwork = (layerSizes: number[]) => {
    const nodes: NodeData[] = [];
    const connections: ConnectionData[] = [];
    const nodesByLayer: NodeData[][] = [];
    const totalLayers = layerSizes.length;
    const maxNodesInLayer = Math.max(...layerSizes);
    const verticalSpacingFactor = 0.5;

    layerSizes.forEach((layerSize, layerIndex) => {
        const layerHeight = (layerSize - 1) * (1000 / maxNodesInLayer) * verticalSpacingFactor;
        const startY = (1000 - layerHeight) / 2;
        const x = ((layerIndex + 1) * 1000) / (totalLayers + 1);
        const layerNodes: NodeData[] = [];

        for (let nodeIndex = 0; nodeIndex < layerSize; nodeIndex++) {
            const y = startY + nodeIndex * (1000 / maxNodesInLayer) * verticalSpacingFactor;
            const node: NodeData = { id: `node-${layerIndex}-${nodeIndex}`, x, y, layer: layerIndex };
            layerNodes.push(node);
            nodes.push(node);

            if (layerIndex > 0) {
                nodesByLayer[layerIndex - 1].forEach((startNode, prevNodeIndex) => {
                    const controlX = (startNode.x + x) / 2 + (x - startNode.x) / 4;
                    const controlY = (startNode.y + y) / 2;
                    connections.push({
                        id: `conn-${layerIndex}-${nodeIndex}-${prevNodeIndex}`,
                        startNodeId: startNode.id,
                        endNodeId: node.id,
                        d: `M ${startNode.x} ${startNode.y} Q ${controlX} ${controlY} ${x} ${y}`,
                        fromLayer: layerIndex - 1,
                        toLayer: layerIndex,
                    });
                });
            }
        }
        nodesByLayer.push(layerNodes);
    });

    return { nodes, connections };
};

// Picks the next set of active connections (and the nodes they touch) in one pass
const pickActive = (connections: ConnectionData[], layerPairs: number): ActiveState => {
    const byLayer: ConnectionData[][] = Array.from({ length: layerPairs }, () => []);
    connections.forEach((c) => byLayer[c.fromLayer].push(c));

    const connectionIds = new Set<string>();
    const totalDesired = Math.floor(connections.length * 0.2);

    for (let layer = 0; layer < layerPairs; layer++) {
        const layerConns = byLayer[layer];
        connectionIds.add(layerConns[Math.floor(Math.random() * layerConns.length)].id);
        const target = totalDesired * ((layer + 1) / layerPairs);
        while (connectionIds.size < target) {
            connectionIds.add(connections[Math.floor(Math.random() * connections.length)].id);
        }
    }

    const byId = new Map(connections.map((c) => [c.id, c]));
    const nodeIds = new Set<string>();
    connectionIds.forEach((id) => {
        const c = byId.get(id)!;
        nodeIds.add(c.startNodeId);
        nodeIds.add(c.endNodeId);
    });
    return { connectionIds, nodeIds };
};

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ layerSizes }) => {
    const { nodes, connections } = useMemo(
        () => (layerSizes.length > 1 ? generateNetwork(layerSizes) : { nodes: [], connections: [] }),
        [layerSizes]
    );
    const [active, setActive] = useState<ActiveState>(EMPTY_ACTIVE);

    useEffect(() => {
        if (connections.length === 0) return;
        const layerPairs = layerSizes.length - 1;
        const update = () => setActive(pickActive(connections, layerPairs));
        update();
        const interval = setInterval(update, ACTIVITY_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [connections, layerSizes.length]);

    const lastLayer = layerSizes.length - 1;

    return (
        <div className="h-full aspect-square">
            <svg className="block h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
                {connections.map((conn) => {
                    const isActive = active.connectionIds.has(conn.id);
                    return (
                        <path
                            key={conn.id}
                            d={conn.d}
                            className={isActive ? "nn-connection nn-connection-active" : "nn-connection"}
                            style={isActive ? { animationDelay: `${conn.fromLayer * LAYER_DELAY_S}s` } : undefined}
                        />
                    );
                })}
                {nodes.map((node) => {
                    const isOutput = node.layer === lastLayer;
                    const isActive = active.nodeIds.has(node.id);
                    const className = isOutput
                        ? "nn-node nn-node-output"
                        : isActive
                          ? "nn-node nn-node-active"
                          : "nn-node";
                    return (
                        <circle
                            key={node.id}
                            cx={node.x}
                            cy={node.y}
                            r={10}
                            className={className}
                            style={isActive && !isOutput ? { animationDelay: `${node.layer * LAYER_DELAY_S}s` } : undefined}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default React.memo(NeuralNetwork);
