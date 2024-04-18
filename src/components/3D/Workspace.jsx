/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as THREE from 'three'

import {Environment, Lightformer, useGLTF} from "@react-three/drei";
import React, {useEffect, useRef} from "react";

export const Workspace = ({
                              onClick = () => {
                              },
                              mouseMove = () => {
                              },
                              workspaceSize,
                          }) => {


    const {nodes, materials} = useGLTF("/lego.glb");
    const instancedMeshRef = useRef();
    // const count = 1000;
    const temp = new THREE.Object3D();
    const instanceSize = 12; // Taille de chaque instance (100x100)
    const instancesPerRow = Math.floor(workspaceSize / instanceSize); // Combien d'instances par ligne
    const count = instancesPerRow * instancesPerRow; // Total des instances pour couvrir l'espace de travail

    useEffect(() => {


        // Assurez-vous d'ajuster la référence pour instancedMesh
        if (instancedMeshRef.current) {
            let id = 0;
            for (let row = 0; row < instancesPerRow; row++) {
                for (let col = 0; col < instancesPerRow; col++) {
                    temp.position.set(
                        col * instanceSize - workspaceSize / 2 + instanceSize / 2,
                        0,
                        row * instanceSize - workspaceSize / 2 + instanceSize / 2
                    );
                    temp.scale.set(12, 12, 12); // Ajustez si la taille de votre instance diffère
                    temp.rotation.set(0, Math.PI / 2, 0);
                    temp.updateMatrix();
                    instancedMeshRef.current.setMatrixAt(id++, temp.matrix);
                }
            }
            instancedMeshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [workspaceSize]);


    return (
        <>
            <axesHelper scale={100}/>
            <group dispose={null}>
                <instancedMesh
                    ref={instancedMeshRef}
                    args={[nodes.Base_ground.geometry, materials.Ground, count]}
                />
            </group>

            {/*<gridHelper position={[0, -0.05, 0]} args={[workspaceSize, instancesPerRow]}/>*/}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                onClick={onClick}
                onPointerMove={(e) => {
                    mouseMove(e);
                }}
            >
                <planeGeometry args={[workspaceSize, workspaceSize]}/>
                <meshBasicMaterial
                    visible={false}
                    color={"white"}
                    scale={[50, 50, 50]}
                    opacity={1}
                    transparent
                />
            </mesh>
            <Environment resolution={256}>
                <group rotation={[-Math.PI / 4, 0, 0]}>
                    <Lightformer
                        form="ring"
                        intensity={1}
                        rotation-x={Math.PI / 2}
                        position={[0, 5, -9]}
                        scale={[2, 100, 1]}
                    />
                    <Lightformer
                        form="ring"
                        intensity={1}
                        rotation-y={Math.PI / 2}
                        position={[-5, 1, -1]}
                        scale={[100, 2, 1]}
                    />
                    <Lightformer
                        form="ring"
                        intensity={0.5}
                        rotation-y={Math.PI / 2}
                        position={[-5, -1, -1]}
                        scale={[10, 2, 1]}
                    />
                    <Lightformer
                        form="rect"
                        intensity={0.5}
                        rotation-y={-Math.PI / 2}
                        position={[10, 1, 0]}
                        scale={[100, 10, 1]}
                    />
                </group>
            </Environment>
        </>
    );
};
