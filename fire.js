window.addEventListener('DOMContentLoaded', async function(){
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // Background Color
    scene.clearColor = new BABYLON.Color3(0.9, 0.95, 1);

    // Camera
    const camera = new BABYLON.ArcRotateCamera("camera",
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(70),
        20, new BABYLON.Vector3(0,2,0), scene);
    camera.attachControl(canvas, true);

    // Lighting
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1.0;


// Floor with Texture
const floor = BABYLON.MeshBuilder.CreateGround("floor", { width: 20, height: 20 }, scene);
const floorMat = new BABYLON.StandardMaterial("floorMat", scene);
floorMat.diffuseTexture = new BABYLON.Texture("Assets/Floor.jpg", scene); 
floorMat.diffuseTexture.uScale = 4;
floorMat.diffuseTexture.vScale = 4;
floor.material = floorMat;

    // Ceiling
    const ceiling = BABYLON.MeshBuilder.CreateGround("ceiling", { width: 20, height: 20 }, scene);
    ceiling.rotation.x = Math.PI;
    ceiling.position.y = 6;
    const ceilingMat = new BABYLON.StandardMaterial("ceilingMat", scene);
    ceilingMat.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);
    ceiling.material = ceilingMat;

    // Walls
    const wallMat = new BABYLON.StandardMaterial("wallMat", scene);
    wallMat.diffuseColor = new BABYLON.Color3(0.95, 0.95, 0.95);

    const wallPositions = [
        {x:0, y:3, z:-10, ry:0},
        {x:0, y:3, z:10, ry:0},
        {x:-10, y:3, z:0, ry:Math.PI/2},
        {x:10, y:3, z:0, ry:Math.PI/2}
    ];

    wallPositions.forEach(pos => {
        const wall = BABYLON.MeshBuilder.CreatePlane("wall", {width:20, height:6}, scene);
        wall.position.set(pos.x, pos.y, pos.z);
        wall.rotation.y = pos.ry;
        wall.material = wallMat;
    });

    // Table
    const table = BABYLON.MeshBuilder.CreateBox("table", { width:3, height:0.3, depth:2 }, scene);
    table.position.set(0, 0.15, -3);
    const tableMat = new BABYLON.StandardMaterial("tableMat", scene);
    tableMat.diffuseColor = new BABYLON.Color3(0.6, 0.4, 0.2);
    table.material = tableMat;

    // Fire Extinguisher (Simple Cylinder)
    const extinguisher = BABYLON.MeshBuilder.CreateCylinder("extinguisher", {height:1, diameter:0.3}, scene);
    extinguisher.position.set(2, 0.5, -2);
    const extinguisherMat = new BABYLON.StandardMaterial("extinguisherMat", scene);
    extinguisherMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
    extinguisher.material = extinguisherMat;

    // Label (Mentor sphere placeholder)
    const mentor = BABYLON.MeshBuilder.CreateSphere("mentor", { diameter: 0.4 }, scene);
    mentor.position.set(3, 0.5, -5);
    const mentorMat = new BABYLON.StandardMaterial("mentorMat", scene);
    mentorMat.diffuseColor = new BABYLON.Color3(0.9, 0.4, 0.4);
    mentor.material = mentorMat;

    // ---------- XR Setup ----------
    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: { sessionMode: "immersive-ar", referenceSpaceType: "local-floor" },
        optionalFeatures: true
    });

    // Render loop
    engine.runRenderLoop(() => scene.render());
    window.addEventListener('resize', () => engine.resize());
});
