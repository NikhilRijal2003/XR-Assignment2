// Get the canvas
const canvas = document.getElementById("renderCanvas");

// Create engine
const engine = new BABYLON.Engine(canvas, true);

// Create scene
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.7, 0.7, 0.7);

// Camera
const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 8, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Lights
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

// Ground
const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10}, scene);
ground.material = new BABYLON.StandardMaterial("groundMat", scene);
ground.material.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);

// Room (Walls)
const wall1 = BABYLON.MeshBuilder.CreateBox("wall1", {width:10, height:3, depth:0.1}, scene);
wall1.position.z = -5;
wall1.position.y = 1.5;

// Fire (Animated Sphere)
const fire = BABYLON.MeshBuilder.CreateSphere("fire", {diameter:0.8}, scene);
fire.position = new BABYLON.Vector3(0, 0.5, -3);
const fireMat = new BABYLON.StandardMaterial("fireMat", scene);
fireMat.emissiveColor = new BABYLON.Color3(1, 0.5, 0);
fire.material = fireMat;

// Animate Fire
scene.registerBeforeRender(() => {
    fire.scaling.y = 1 + 0.2 * Math.sin(Date.now() * 0.005);
});

// Extinguisher (Simple Red Cylinder)
const extinguisher = BABYLON.MeshBuilder.CreateCylinder("extinguisher", {height:1, diameter:0.3}, scene);
extinguisher.position = new BABYLON.Vector3(2, 0.5, -3);
const extinguisherMat = new BABYLON.StandardMaterial("extMat", scene);
extinguisherMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
extinguisher.material = extinguisherMat;

// GUI for Instructions
const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
const instruction = new BABYLON.GUI.TextBlock();
instruction.text = "FIRE DETECTED! Click the extinguisher to put it out.";
instruction.color = "white";
instruction.fontSize = 24;
instruction.top = "-40px";
advancedTexture.addControl(instruction);

// Interaction
extinguisher.actionManager = new BABYLON.ActionManager(scene);
extinguisher.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        fire.setEnabled(false);
        instruction.text = "Good job! Fire extinguished.";
        instruction.color = "green";
    })
);

// Run render loop
engine.runRenderLoop(() => {
    scene.render();
});

// Resize on window resize
window.addEventListener("resize", () => {
    engine.resize();
});
