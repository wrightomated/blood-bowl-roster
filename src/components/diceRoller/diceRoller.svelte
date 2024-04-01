<script lang="ts">
    import { World, Vec3, Body, Box, Plane } from 'cannon-es';
    import {
        AmbientLight,
        WebGLRenderer,
        Scene,
        PerspectiveCamera,
        PointLight,
        Mesh,
        PlaneGeometry,
        ShadowMaterial,
        BoxGeometry,
        TextureLoader,
        MeshStandardMaterial,
        DoubleSide,
        Vector3,
        DirectionalLight,
        PointLightHelper,
    } from 'three';
    // import { MapControls } from 'three-stdlib/controls/OrbitControls.js';
    // import { MapControls } from 'three/addons/controls/MapControls.js';

    import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

    import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

    let initialRoll = false;
    let scores = [0, 0, 0, 0, 0, 0];

    function rollTheDice() {
        if (!initialRoll) {
            createDiceScene();
            initialRoll = true;
        }
    }

    function createDiceScene() {
        const container = document.querySelector('body');
        const canvasEl: HTMLCanvasElement =
            document.querySelector('#dice-roller');
        const scoreResult = document.querySelector('#score-result');
        const rollBtn = document.querySelector('#roll-btn');

        let renderer: WebGLRenderer,
            scene,
            camera,
            orbit,
            diceMesh,
            physicsWorld;

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
            renderer = new WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: canvasEl,
            });
            renderer.shadowMap.enabled = true;
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            scene = new Scene();

            camera = new PerspectiveCamera(
                45,
                container.clientWidth / container.clientHeight,
                0.1,
                300
            );
            camera.position.set(0, 0.5, 4).multiplyScalar(7);

            updateSceneSize();

            // const ambientLight = new AmbientLight(0xffffff, 0.5);
            // scene.add(ambientLight);
            const topLight = new PointLight(0xffffff, 1);
            topLight.position.set(10, 15, 0);
            topLight.castShadow = true;
            topLight.shadow.mapSize.width = 2048;
            topLight.shadow.mapSize.height = 2048;
            topLight.shadow.camera.near = 5;
            topLight.shadow.camera.far = 400;
            scene.add(topLight);
            const sphereSize = 1;
            const pointLightHelper = new PointLightHelper(topLight, sphereSize);
            scene.add(pointLightHelper);
            const light = new DirectionalLight(0xffffff, 1);
            light.position.set(1, 1, 1).normalize();
            scene.add(light);

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
            physicsWorld = new World({
                allowSleep: true,
                gravity: new Vec3(0, -50, 0),
            });
            physicsWorld.defaultContactMaterial.restitution = 0.3;
        }

        function createFloor() {
            const floor = new Mesh(
                new PlaneGeometry(1000, 1000),
                new ShadowMaterial({
                    opacity: 0.1,
                })
            );
            floor.receiveShadow = true;
            floor.position.y = -7;
            floor.quaternion.setFromAxisAngle(
                new Vector3(-1, 0, 0),
                Math.PI * 0.5
            );
            scene.add(floor);

            const floorBody = new Body({
                type: Body.STATIC,
                shape: new Plane(),
            });
            floorBody.position.copy(floor.position as any);
            floorBody.quaternion.copy(floor.quaternion as any);
            physicsWorld.addBody(floorBody);
        }

        function createDiceMesh() {
            const geometry = new BoxGeometry(1, 1, 1);
            geometry.clearGroups();
            geometry.addGroup(0, 6, 0);
            geometry.addGroup(6, 6, 1);
            // Push has two
            geometry.addGroup(12, 6, 2);
            geometry.addGroup(18, 6, 2);

            geometry.addGroup(24, 6, 3);
            geometry.addGroup(30, 6, 4);
            geometry.addGroup(0, Infinity, 5);
            const loader = new TextureLoader();
            const downMat = new MeshStandardMaterial({
                map: loader.load('dice/down.png'),
                transparent: true,
            });
            const stumbleMat = new MeshStandardMaterial({
                map: loader.load('dice/stumble.png'),
                transparent: true,
            });
            const pushMat = new MeshStandardMaterial({
                map: loader.load('dice/push.png'),
                transparent: true,
            });
            const skullMat = new MeshStandardMaterial({
                map: loader.load('dice/skull.png'),
                transparent: true,
            });
            const bothMat = new MeshStandardMaterial({
                map: loader.load('dice/both.png'),
                transparent: true,
            });
            const whiteMat = new MeshStandardMaterial({
                color: 0xffffff,
                side: DoubleSide,
            });

            const cube = new Mesh(geometry, [
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

            const body = new Body({
                mass: 1,
                shape: new Box(new Vec3(0.5, 0.5, 0.5)),
                sleepTimeLimit: 0.1,
            });
            physicsWorld.addBody(body);

            return { mesh, body };
        }

        // function createBoxGeometry() {
        //     let boxGeometry = new BoxGeometry(
        //         1,
        //         1,
        //         1,
        //         params.segments,
        //         params.segments,
        //         params.segments
        //     );

        //     const positionAttr = boxGeometry.attributes.position;
        //     const subCubeHalfSize = 0.5 - params.edgeRadius;

        //     for (let i = 0; i < positionAttr.count; i++) {
        //         let position = new Vector3().fromBufferAttribute(
        //             positionAttr,
        //             i
        //         );

        //         const subCube = new Vector3(
        //             Math.sign(position.x),
        //             Math.sign(position.y),
        //             Math.sign(position.z)
        //         ).multiplyScalar(subCubeHalfSize);
        //         const addition = new Vector3().subVectors(position, subCube);

        //         if (
        //             Math.abs(position.x) > subCubeHalfSize &&
        //             Math.abs(position.y) > subCubeHalfSize &&
        //             Math.abs(position.z) > subCubeHalfSize
        //         ) {
        //             addition.normalize().multiplyScalar(params.edgeRadius);
        //             position = subCube.add(addition);
        //         } else if (
        //             Math.abs(position.x) > subCubeHalfSize &&
        //             Math.abs(position.y) > subCubeHalfSize
        //         ) {
        //             addition.z = 0;
        //             addition.normalize().multiplyScalar(params.edgeRadius);
        //             position.x = subCube.x + addition.x;
        //             position.y = subCube.y + addition.y;
        //         } else if (
        //             Math.abs(position.x) > subCubeHalfSize &&
        //             Math.abs(position.z) > subCubeHalfSize
        //         ) {
        //             addition.y = 0;
        //             addition.normalize().multiplyScalar(params.edgeRadius);
        //             position.x = subCube.x + addition.x;
        //             position.z = subCube.z + addition.z;
        //         } else if (
        //             Math.abs(position.y) > subCubeHalfSize &&
        //             Math.abs(position.z) > subCubeHalfSize
        //         ) {
        //             addition.x = 0;
        //             addition.normalize().multiplyScalar(params.edgeRadius);
        //             position.y = subCube.y + addition.y;
        //             position.z = subCube.z + addition.z;
        //         }

        //         //   const notchWave = (v) => {
        //         //     v = (1 / params.notchRadius) * v;
        //         //     v = Math.PI * Math.max(-1, Math.min(1, v));
        //         //     return params.notchDepth * (Math.cos(v) + 1);
        //         //   };
        //         //   const notch = (pos) => notchWave(pos[0]) * notchWave(pos[1]);

        //         //   const offset = 0.23;

        //         //   if (position.y === 0.5) {
        //         //     position.y -= notch([position.x, position.z]);
        //         //   } else if (position.x === 0.5) {
        //         //     position.x -= notch([position.y + offset, position.z + offset]);
        //         //     position.x -= notch([position.y - offset, position.z - offset]);
        //         //   } else if (position.z === 0.5) {
        //         //     position.z -= notch([position.x - offset, position.y + offset]);
        //         //     position.z -= notch([position.x, position.y]);
        //         //     position.z -= notch([position.x + offset, position.y - offset]);
        //         //   } else if (position.z === -0.5) {
        //         //     position.z += notch([position.x + offset, position.y + offset]);
        //         //     position.z += notch([position.x + offset, position.y - offset]);
        //         //     position.z += notch([position.x - offset, position.y + offset]);
        //         //     position.z += notch([position.x - offset, position.y - offset]);
        //         //   } else if (position.x === -0.5) {
        //         //     position.x += notch([position.y + offset, position.z + offset]);
        //         //     position.x += notch([position.y + offset, position.z - offset]);
        //         //     position.x += notch([position.y, position.z]);
        //         //     position.x += notch([position.y - offset, position.z + offset]);
        //         //     position.x += notch([position.y - offset, position.z - offset]);
        //         //   } else if (position.y === -0.5) {
        //         //     position.y += notch([position.x + offset, position.z + offset]);
        //         //     position.y += notch([position.x + offset, position.z]);
        //         //     position.y += notch([position.x + offset, position.z - offset]);
        //         //     position.y += notch([position.x - offset, position.z + offset]);
        //         //     position.y += notch([position.x - offset, position.z]);
        //         //     position.y += notch([position.x - offset, position.z - offset]);
        //         //   }

        //         //   positionAttr.setXYZ(i, position.x, position.y, position.z);
        //     }

        //     boxGeometry.deleteAttribute('normal');
        //     boxGeometry.deleteAttribute('uv');
        //     boxGeometry = BufferGeometryUtils.mergeVertices(boxGeometry);

        //     boxGeometry.computeVertexNormals();

        //     return boxGeometry;
        // }

        function createInnerGeometry() {
            const baseGeometry = new PlaneGeometry(
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

                const euler = new Vec3();
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

        function showRollResults(score: number) {
            scores[score - 1] += 1;
            // scoreResult.innerHTML = score + '';
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

                d.body.position = new Vec3(10, y, 0);
                d.mesh.position.copy(d.body.position);

                d.mesh.rotation.set(
                    2 * Math.PI * Math.random(),
                    0,
                    2 * Math.PI * Math.random()
                );
                d.body.quaternion.copy(d.mesh.quaternion);

                const force = 3 + 5 * Math.random();
                d.body.applyImpulse(
                    new Vec3(-force, force, 0),
                    new Vec3(0, 0, 0.2)
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
    #dice-roller {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 0;
    }
    #roll-btn {
        position: absolute;
        top: 100px;
        left: 100px;
        z-index: 100;
    }
    #score-result {
        position: absolute;
        top: 100px;
        right: 100px;
        z-index: 100;
        font-size: 2rem;
    }
</style>
