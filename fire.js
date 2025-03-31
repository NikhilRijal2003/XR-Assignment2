// Simple Attractive VR Room Scene

window.addEventListener('DOMContentLoaded', async function(){
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // Background
    scene.clearColor = new BABYLON.Color3(0.9, 0.95, 1); // very light blue

    // Camera
    const camera = new BABYLON.ArcRotateCamera("camera",
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(70),
        18, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.9;

    // Floor (Light Gray)
    const floor = BABYLON.MeshBuilder.CreateGround("floor", { width: 16, height: 16 }, scene);
    const floorMat = new BABYLON.StandardMaterial("floorMat", scene);
    floorMat.diffuseColor = new BABYLON.Color3(0.85, 0.85, 0.85);
    floor.material = floorMat;

    // Back Wall
    const backWall = BABYLON.MeshBuilder.CreatePlane("backWall", { width: 16, height: 6 }, scene);
    backWall.position.z = -8;
    backWall.position.y = 3;
    const wallMat = new BABYLON.StandardMaterial("wallMat", scene);
    wallMat.diffuseColor = new BABYLON.Color3(0.95, 0.95, 0.95); // soft white
    backWall.material = wallMat;

    // Left Wall
    const leftWall = BABYLON.MeshBuilder.CreatePlane("leftWall", { width: 16, height: 6 }, scene);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -8;
    leftWall.position.y = 3;
    leftWall.material = wallMat;

    // Right Wall
    const rightWall = BABYLON.MeshBuilder.CreatePlane("rightWall", { width: 16, height: 6 }, scene);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = 8;
    rightWall.position.y = 3;
    rightWall.material = wallMat;

    // Desk
    const desk = BABYLON.MeshBuilder.CreateBox("desk", { width: 2.5, height: 1, depth: 1 }, scene);
    desk.position.y = 0.5;
    desk.position.z = -3;
    const deskMat = new BABYLON.StandardMaterial("deskMat", scene);
    deskMat.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.9); // soft blue
    desk.material = deskMat;

    // Computer
    const computer = BABYLON.MeshBuilder.CreateBox("computer", { width: 0.8, height: 0.5, depth: 0.1 }, scene);
    computer.position.y = 1.25;
    computer.position.z = -3;
    const computerMat = new BABYLON.StandardMaterial("computerMat", scene);
    computerMat.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1); // dark gray
    computer.material = computerMat;

    // Chair
    const chair = BABYLON.MeshBuilder.CreateCylinder("chair", { diameter: 0.8, height: 0.5 }, scene);
    chair.position.y = 0.25;
    chair.position.z = -1.5;
    const chairMat = new BABYLON.StandardMaterial("chairMat", scene);
    chairMat.diffuseColor = new BABYLON.Color3(0.6, 0.4, 0.3); // light brown
    chair.material = chairMat;
    // Start a WebXR session (immersive-ar, specifically)
    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: "immersive-ar",
            // STEP 1: Set the referenceSpaceType to "unbounded" - since the headset is in passthrough mode with AR, let the vistor go anywhere they like within their physical space
            referenceSpaceType: "local-floor" //  viewer, local, local-floor, bounded-floor, or unbounded (https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace and https://gist.github.com/lempa/64b3a89a19cbec980ade709be35d7cbc#file-webxr-reference-space-types-csv)

        },
        // Enable optional features - either all of them with true (boolean), or as an array
        optionalFeatures: true
    });

    // Mentor Sphere
    const mentor = BABYLON.MeshBuilder.CreateSphere("mentor", { diameter: 0.5 }, scene);
    mentor.position.set(3, 0.5, -2);
    const mentorMat = new BABYLON.StandardMaterial("mentorMat", scene);
    mentorMat.diffuseColor = new BABYLON.Color3(0.9, 0.4, 0.4);
    mentor.material = mentorMat;

    // Render
    engine.runRenderLoop(() => scene.render());
    window.addEventListener('resize', () => engine.resize());
});
