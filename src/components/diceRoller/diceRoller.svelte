<script>
    import * as CANNON from 'cannon-es';
    import * as THREE from 'three';
    import { afterUpdate } from 'svelte';
    import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
    import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

    let initialRoll = false;
    // afterUpdate(() => {
    //     createDiceScene();
    // });
    function rollTheDice() {
        if (!initialRoll) {
            createDiceScene();
            initialRoll = true;
        }
    }

    function createDiceScene() {
        const container = document.querySelector('body');
        const canvasEl = document.querySelector('#dice-roller');
        const scoreResult = document.querySelector('#score-result');
        const rollBtn = document.querySelector('#roll-btn');

        let renderer, scene, camera, orbit, diceMesh, physicsWorld;

        const params = {
            numberOfDice: 1000,
            segments: 40,
            edgeRadius: 0.07,
            notchRadius: 0.12,
            notchDepth: 0.1,
        };

        const diceArray = [];

        initPhysics();
        initScene();

        window.addEventListener('resize', updateSceneSize);
        container.addEventListener('dblclick', throwDice);
        rollBtn.addEventListener('click', throwDice);

        function initScene() {
            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: canvasEl,
            });
            renderer.shadowMap.enabled = true;
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(
                45,
                container.clientWidth / container.clientHeight,
                0.1,
                300
            );
            camera.position.set(0, 0.5, 4).multiplyScalar(7);

            updateSceneSize();

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            const topLight = new THREE.PointLight(0xffffff, 0.5);
            topLight.position.set(10, 15, 0);
            topLight.castShadow = true;
            topLight.shadow.mapSize.width = 2048;
            topLight.shadow.mapSize.height = 2048;
            topLight.shadow.camera.near = 5;
            topLight.shadow.camera.far = 400;
            scene.add(topLight);

            orbit = new MapControls(camera, canvasEl);
            orbit.enableDamping = true;

            createFloor();
            diceMesh = createDiceMesh();
            for (let i = 0; i < params.numberOfDice; i++) {
                diceArray.push(createDice());
                addDiceEvents(diceArray[i]);
            }

            throwDice();

            render();
        }

        function initPhysics() {
            physicsWorld = new CANNON.World({
                allowSleep: true,
                gravity: new CANNON.Vec3(0, -50, 0),
            });
            physicsWorld.defaultContactMaterial.restitution = 0.3;
        }

        function createFloor() {
            const floor = new THREE.Mesh(
                new THREE.PlaneGeometry(1000, 1000),
                new THREE.ShadowMaterial({
                    opacity: 0.1,
                })
            );
            floor.receiveShadow = true;
            floor.position.y = -7;
            floor.quaternion.setFromAxisAngle(
                new THREE.Vector3(-1, 0, 0),
                Math.PI * 0.5
            );
            scene.add(floor);

            const floorBody = new CANNON.Body({
                type: CANNON.Body.STATIC,
                shape: new CANNON.Plane(),
            });
            floorBody.position.copy(floor.position);
            floorBody.quaternion.copy(floor.quaternion);
            physicsWorld.addBody(floorBody);
        }

        function createDiceMesh() {
            const loader = new THREE.CubeTextureLoader();
            loader.setPath('dice/');

            const textureCube = loader.load([
                'down.png',
                'down.png',
                'down.png',
                'down.png',
                'down.png',
                'down.png',
            ]);

            const boxMaterialOuter = new THREE.MeshStandardMaterial({
                color: 0xeeeeee,
                envMap: textureCube,
                // side: THREE.BackSide,
            });
            //   const boxMaterialOuter = new THREE.MeshStandardMaterial({
            //     color: 0xeeeeee,
            //   });
            const boxMaterialInner = new THREE.MeshStandardMaterial({
                color: 0x000000,
                roughness: 0,
                metalness: 1,
                side: THREE.DoubleSide,
            });

            const diceMesh = new THREE.Group();
            //   const innerMesh = new THREE.Mesh(createInnerGeometry(), boxMaterialInner);
            const outerMesh = new THREE.Mesh(
                createBoxGeometry(),
                boxMaterialOuter
            );
            outerMesh.castShadow = true;
            diceMesh.add(outerMesh);

            const geometry = new THREE.BoxGeometry(1, 1, 1);
            geometry.clearGroups();
            geometry.addGroup(0, 6, 0);
            geometry.addGroup(6, 6, 1);
            geometry.addGroup(12, 6, 2);
            geometry.addGroup(18, 6, 2);
            geometry.addGroup(24, 6, 3);
            geometry.addGroup(30, 6, 4);
            geometry.addGroup(0, Infinity, 5);
            const loader2 = new THREE.TextureLoader();
            const downMat = new THREE.MeshStandardMaterial({
                map: loader2.load('dice/down.png'),
                transparent: true,
                // side: THREE.DoubleSide,
                // metalness: 1,
                // roughness: 0,
                // side: THREE.DoubleSide,
            });
            const stumbleMat = new THREE.MeshStandardMaterial({
                map: loader2.load('dice/stumble.png'),
                transparent: true,
            });
            const pushMat = new THREE.MeshStandardMaterial({
                map: loader2.load('dice/push.png'),
                transparent: true,
            });
            const skullMat = new THREE.MeshStandardMaterial({
                map: loader2.load('dice/skull.png'),
                transparent: true,
            });
            const bothMat = new THREE.MeshStandardMaterial({
                map: loader2.load('dice/both.png'),
                transparent: true,
            });
            const whiteMat = new THREE.MeshStandardMaterial({
                color: 0xeeeeee,
                side: THREE.DoubleSide,
            });

            //   const material = new THREE.MeshStandardMaterial({
            //     color: 0xeeeeee,
            //     // envMap: textureCube,
            //     // roughness: 1,
            //     map: material2,
            //   });

            const cube = new THREE.Mesh(geometry, [
                downMat,
                stumbleMat,
                pushMat,
                skullMat,
                bothMat,
                whiteMat,
            ]);
            cube.castShadow = true;
            return cube;
        }

        function createDice() {
            const mesh = diceMesh.clone();
            scene.add(mesh);

            const body = new CANNON.Body({
                mass: 1,
                shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
                sleepTimeLimit: 0.1,
            });
            physicsWorld.addBody(body);

            return { mesh, body };
        }

        function createBoxGeometry() {
            let boxGeometry = new THREE.BoxGeometry(
                1,
                1,
                1,
                params.segments,
                params.segments,
                params.segments
            );

            const positionAttr = boxGeometry.attributes.position;
            const subCubeHalfSize = 0.5 - params.edgeRadius;

            for (let i = 0; i < positionAttr.count; i++) {
                let position = new THREE.Vector3().fromBufferAttribute(
                    positionAttr,
                    i
                );

                const subCube = new THREE.Vector3(
                    Math.sign(position.x),
                    Math.sign(position.y),
                    Math.sign(position.z)
                ).multiplyScalar(subCubeHalfSize);
                const addition = new THREE.Vector3().subVectors(
                    position,
                    subCube
                );

                if (
                    Math.abs(position.x) > subCubeHalfSize &&
                    Math.abs(position.y) > subCubeHalfSize &&
                    Math.abs(position.z) > subCubeHalfSize
                ) {
                    addition.normalize().multiplyScalar(params.edgeRadius);
                    position = subCube.add(addition);
                } else if (
                    Math.abs(position.x) > subCubeHalfSize &&
                    Math.abs(position.y) > subCubeHalfSize
                ) {
                    addition.z = 0;
                    addition.normalize().multiplyScalar(params.edgeRadius);
                    position.x = subCube.x + addition.x;
                    position.y = subCube.y + addition.y;
                } else if (
                    Math.abs(position.x) > subCubeHalfSize &&
                    Math.abs(position.z) > subCubeHalfSize
                ) {
                    addition.y = 0;
                    addition.normalize().multiplyScalar(params.edgeRadius);
                    position.x = subCube.x + addition.x;
                    position.z = subCube.z + addition.z;
                } else if (
                    Math.abs(position.y) > subCubeHalfSize &&
                    Math.abs(position.z) > subCubeHalfSize
                ) {
                    addition.x = 0;
                    addition.normalize().multiplyScalar(params.edgeRadius);
                    position.y = subCube.y + addition.y;
                    position.z = subCube.z + addition.z;
                }

                //   const notchWave = (v) => {
                //     v = (1 / params.notchRadius) * v;
                //     v = Math.PI * Math.max(-1, Math.min(1, v));
                //     return params.notchDepth * (Math.cos(v) + 1);
                //   };
                //   const notch = (pos) => notchWave(pos[0]) * notchWave(pos[1]);

                //   const offset = 0.23;

                //   if (position.y === 0.5) {
                //     position.y -= notch([position.x, position.z]);
                //   } else if (position.x === 0.5) {
                //     position.x -= notch([position.y + offset, position.z + offset]);
                //     position.x -= notch([position.y - offset, position.z - offset]);
                //   } else if (position.z === 0.5) {
                //     position.z -= notch([position.x - offset, position.y + offset]);
                //     position.z -= notch([position.x, position.y]);
                //     position.z -= notch([position.x + offset, position.y - offset]);
                //   } else if (position.z === -0.5) {
                //     position.z += notch([position.x + offset, position.y + offset]);
                //     position.z += notch([position.x + offset, position.y - offset]);
                //     position.z += notch([position.x - offset, position.y + offset]);
                //     position.z += notch([position.x - offset, position.y - offset]);
                //   } else if (position.x === -0.5) {
                //     position.x += notch([position.y + offset, position.z + offset]);
                //     position.x += notch([position.y + offset, position.z - offset]);
                //     position.x += notch([position.y, position.z]);
                //     position.x += notch([position.y - offset, position.z + offset]);
                //     position.x += notch([position.y - offset, position.z - offset]);
                //   } else if (position.y === -0.5) {
                //     position.y += notch([position.x + offset, position.z + offset]);
                //     position.y += notch([position.x + offset, position.z]);
                //     position.y += notch([position.x + offset, position.z - offset]);
                //     position.y += notch([position.x - offset, position.z + offset]);
                //     position.y += notch([position.x - offset, position.z]);
                //     position.y += notch([position.x - offset, position.z - offset]);
                //   }

                //   positionAttr.setXYZ(i, position.x, position.y, position.z);
            }

            boxGeometry.deleteAttribute('normal');
            boxGeometry.deleteAttribute('uv');
            boxGeometry = BufferGeometryUtils.mergeVertices(boxGeometry);

            boxGeometry.computeVertexNormals();

            return boxGeometry;
        }

        function createInnerGeometry() {
            const baseGeometry = new THREE.PlaneGeometry(
                1 - 2 * params.edgeRadius,
                1 - 2 * params.edgeRadius
            );
            const offset = 0.48;
            return BufferGeometryUtils.mergeBufferGeometries(
                [
                    baseGeometry.clone().translate(0, 0, offset),
                    baseGeometry.clone().translate(0, 0, -offset),
                    baseGeometry
                        .clone()
                        .rotateX(0.5 * Math.PI)
                        .translate(0, -offset, 0),
                    baseGeometry
                        .clone()
                        .rotateX(0.5 * Math.PI)
                        .translate(0, offset, 0),
                    baseGeometry
                        .clone()
                        .rotateY(0.5 * Math.PI)
                        .translate(-offset, 0, 0),
                    baseGeometry
                        .clone()
                        .rotateY(0.5 * Math.PI)
                        .translate(offset, 0, 0),
                ],
                false
            );
        }

        function addDiceEvents(dice) {
            dice.body.addEventListener('sleep', (e) => {
                dice.body.allowSleep = false;

                const euler = new CANNON.Vec3();
                e.target.quaternion.toEuler(euler);

                const eps = 0.1;
                let isZero = (angle) => Math.abs(angle) < eps;
                let isHalfPi = (angle) => Math.abs(angle - 0.5 * Math.PI) < eps;
                let isMinusHalfPi = (angle) =>
                    Math.abs(0.5 * Math.PI + angle) < eps;
                let isPiOrMinusPi = (angle) =>
                    Math.abs(Math.PI - angle) < eps ||
                    Math.abs(Math.PI + angle) < eps;

                if (isZero(euler.z)) {
                    if (isZero(euler.x)) {
                        showRollResults(1);
                    } else if (isHalfPi(euler.x)) {
                        showRollResults(4);
                    } else if (isMinusHalfPi(euler.x)) {
                        showRollResults(3);
                    } else if (isPiOrMinusPi(euler.x)) {
                        showRollResults(6);
                    } else {
                        // landed on edge => wait to fall on side and fire the event again
                        dice.body.allowSleep = true;
                    }
                } else if (isHalfPi(euler.z)) {
                    showRollResults(2);
                } else if (isMinusHalfPi(euler.z)) {
                    showRollResults(5);
                } else {
                    // landed on edge => wait to fall on side and fire the event again
                    dice.body.allowSleep = true;
                }
            });
        }

        function showRollResults(score) {
            // if (scoreResult.innerHTML === '') {
            //     scoreResult.innerHTML += score;
            // } else {
            //     scoreResult.innerHTML += '+' + score;
            // }
        }

        function render() {
            physicsWorld.fixedStep();

            for (const dice of diceArray) {
                dice.mesh.position.copy(dice.body.position);
                dice.mesh.quaternion.copy(dice.body.quaternion);
            }

            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        function updateSceneSize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        function throwDice() {
            scoreResult.innerHTML = '';

            diceArray.forEach((d, dIdx) => {
                d.body.velocity.setZero();
                d.body.angularVelocity.setZero();

                const y = dIdx * 1.5 + (dIdx > 1 ? 100 : 0);

                d.body.position = new CANNON.Vec3(10, y, 0);
                d.mesh.position.copy(d.body.position);

                d.mesh.rotation.set(
                    2 * Math.PI * Math.random(),
                    0,
                    2 * Math.PI * Math.random()
                );
                d.body.quaternion.copy(d.mesh.quaternion);

                const force = 3 + 5 * Math.random();
                d.body.applyImpulse(
                    new CANNON.Vec3(-force, force, 0),
                    new CANNON.Vec3(0, 0, 0.2)
                );

                d.body.allowSleep = true;
            });
        }
    }
</script>

<button id="roll-btn" on:click={rollTheDice}>Roll</button>
<canvas id="dice-roller" />
<div id="score-result" />

<style lang="scss">
    @use '../../styles/mixins/roundedButton';
    #dice-roller {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 0;
    }
    #roll-btn {
        @include roundedButton.rounded-button;
        position: absolute;
        top: 100px;
        left: 100px;
        z-index: 100;
    }
</style>
