window.addEventListener('DOMContentLoaded', async function() {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // ---------- Scene Background ----------
    scene.clearColor = new BABYLON.Color3(0.9, 0.95, 1);

    // ---------- Camera ----------
    const camera = new BABYLON.ArcRotateCamera("camera",
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(70),
        20, new BABYLON.Vector3(0, 2, 0), scene);
    camera.attachControl(canvas, true);

    // ---------- Lighting ----------
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1.0;

    // ---------- Floor ----------
    const floor = BABYLON.MeshBuilder.CreateGround("floor", { width: 20, height: 20 }, scene);
    const floorMat = new BABYLON.StandardMaterial("floorMat", scene);
    floorMat.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7);
    floor.material = floorMat;

    // ---------- Ceiling ----------
    const ceiling = BABYLON.MeshBuilder.CreateGround("ceiling", { width: 20, height: 20 }, scene);
    ceiling.rotation.x = Math.PI;
    ceiling.position.y = 6;
    const ceilingMat = new BABYLON.StandardMaterial("ceilingMat", scene);
    ceilingMat.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);
    ceiling.material = ceilingMat;

    // ---------- Walls (Fully Enclosed) ----------
    const wallMat = new BABYLON.StandardMaterial("wallMat", scene);
    wallMat.diffuseColor = new BABYLON.Color3(0.95, 0.95, 0.95);

    const wallPositions = [
        { x: 0, y: 3, z: -10, ry: 0 },
        { x: 0, y: 3, z: 10, ry: 0 },
        { x: -10, y: 3, z: 0, ry: Math.PI / 2 },
        { x: 10, y: 3, z: 0, ry: Math.PI / 2 }
    ];

    wallPositions.forEach(pos => {
        const wall = BABYLON.MeshBuilder.CreatePlane("wall", { width: 20, height: 6 }, scene);
        wall.position.set(pos.x, pos.y, pos.z);
        wall.rotation.y = pos.ry;
        wall.material = wallMat;
    });

    // ---------- Table ----------
    const table = BABYLON.MeshBuilder.CreateBox("table", { width: 3, height: 0.3, depth: 2 }, scene);
    table.position.set(0, 0.15, -3);
    const tableMat = new BABYLON.StandardMaterial("tableMat", scene);
    tableMat.diffuseColor = new BABYLON.Color3(0.6, 0.4, 0.2);
    table.material = tableMat;

    // ---------- Fire (with Particle Burning Effect) ----------
    const fireBase = BABYLON.MeshBuilder.CreateBox("fireBase", { size: 0.1 }, scene);
    fireBase.position.set(0, 0.3, -3); // On top of table

    const fireSystem = new BABYLON.ParticleSystem("fire", 2000, scene);
    fireSystem.particleTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/flame.png", scene);
    fireSystem.emitter = fireBase;
    fireSystem.minEmitBox = new BABYLON.Vector3(-0.2, 0, -0.2);
    fireSystem.maxEmitBox = new BABYLON.Vector3(0.2, 0, 0.2);
    fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1);
    fireSystem.color2 = new BABYLON.Color4(1, 0.2, 0, 1);
    fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0);
    fireSystem.minSize = 0.1;
    fireSystem.maxSize = 0.5;
    fireSystem.minLifeTime = 0.2;
    fireSystem.maxLifeTime = 0.7;
    fireSystem.emitRate = 500;
    fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    fireSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    fireSystem.direction1 = new BABYLON.Vector3(0, 1, 0);
    fireSystem.direction2 = new BABYLON.Vector3(0, 1, 0);
    fireSystem.minAngularSpeed = 0;
    fireSystem.maxAngularSpeed = Math.PI;
    fireSystem.minEmitPower = 1;
    fireSystem.maxEmitPower = 3;
    fireSystem.updateSpeed = 0.007;
    fireSystem.start();

    // ---------- Fire Extinguisher (Realistic Model) ----------
    // Body
    const extinguisherBody = BABYLON.MeshBuilder.CreateCylinder("extinguisherBody", { height: 1, diameter: 0.3 }, scene);
    extinguisherBody.position.set(2, 0.5, -2);
    const extinguisherMat = new BABYLON.StandardMaterial("extinguisherMat", scene);
    extinguisherMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
    extinguisherBody.material = extinguisherMat;

    // Nozzle
    const nozzle = BABYLON.MeshBuilder.CreateBox("nozzle", { height: 0.1, width: 0.05, depth: 0.2 }, scene);
    nozzle.position.set(2, 1, -1.9);
    const nozzleMat = new BABYLON.StandardMaterial("nozzleMat", scene);
    nozzleMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    nozzle.material = nozzleMat;

    // Hose
    const hose = BABYLON.MeshBuilder.CreateTube("hose", {
        path: [new BABYLON.Vector3(2, 1, -2), new BABYLON.Vector3(2, 0.6, -2.1)],
        radius: 0.02,
        tessellation: 8
    }, scene);
    hose.material = nozzleMat;

    // ---------- Extinguisher Interaction (Extinguish Fire) ----------
    extinguisherBody.actionManager = new BABYLON.ActionManager(scene);
    extinguisherBody.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function() {
            fireSystem.stop();
            alert("Fire extinguished!");
        })
    );

    // ---------- Mentor (Label Placeholder) ----------
    const mentor = BABYLON.MeshBuilder.CreateSphere("mentor", { diameter: 0.4 }, scene);
    mentor.position.set(3, 0.5, -5);
    const mentorMat = new BABYLON.StandardMaterial("mentorMat", scene);
    mentorMat.diffuseColor = new BABYLON.Color3(0.9, 0.4, 0.4);
    mentor.material = mentorMat;

    // ---------- XR Setup ----------
    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: { sessionMode: "immersive-ar", referenceSpaceType: "local-floor" },
        optionalFeatures: true
    });

    // ---------- Render Loop ----------
    engine.runRenderLoop(() => scene.render());
    window.addEventListener('resize', () => engine.resize());
});
