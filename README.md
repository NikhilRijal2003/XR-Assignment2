# Fire Extinguishing XR Scene - Babylon.js + WebXR

## Project Description

This project is a simple XR-enabled scene built using Babylon.js that simulates a small room containing:
- A fully enclosed space (floor, ceiling, and 4 walls)
- A table with a burning fire simulated using a particle system
- A realistic fire extinguisher with nozzle and hose
- A particle-based spray coming out of the extinguisher
- XR controller support to interact with the extinguisher
- Fire extinguishing mechanic: Users can extinguish the fire by aiming and triggering the extinguisher using an XR controller

This scene was created as part of an XR learning project and demonstrates interaction between particles, mesh models, and WebXR input.

---

## Features
- Babylon.js scene setup (floor, ceiling, walls)
- Fire simulation using particle systems
- Realistic extinguisher model (body, nozzle, hose)
- Spray particle system when pressing XR controller trigger
- Fire gets extinguished when sprayed correctly
- Supports WebXR: tested in AR mode with trigger-based interaction

---


## Challenges Faced So Far
- Integrating the XR input system was a bit challenging, especially in detecting button states and applying them to particle systems.
- Another challenge was getting the particle systems (fire and spray) to look convincing while keeping the performance stable.
- Positioning the extinguisher components (nozzle, hose) to look more realistic took some tweaking.

---

## What Remains To Be Done
- Smooth transition when the fire is extinguished (fade out instead of instantly stopping)
- Adding a spray sound and fire extinguishing sound
- Optional smoke particles after extinguishing the fire
- Making the spray more visible in AR mode (since small particles sometimes are hard to see)
---

## Notes
- Requires a WebXR-compatible browser (Chrome, Edge, Oculus Browser)
- Works best in AR-capable devices with controllers

---

## Credits
- Babylon.js (https://www.babylonjs.com/)
- Open-source flame and spray textures from Babylon.js Playground
