import "./style.css";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.querySelector("#scene");
const heroStage = document.querySelector(".hero");
const discoverButton = document.querySelector("#discoverButton");
const speechStage = document.querySelector("#speechStage");
const speechLabel = document.querySelector("#speechLabel");
const embedStage = document.querySelector("#embedStage");
const embedContent = document.querySelector("#embedContent");
const resultActions = document.querySelector("#resultActions");
const restartButton = document.querySelector("#restartButton");
const closeButton = document.querySelector("#closeButton");
const editorToggle = document.querySelector("#editorToggle");
const editorSceneTarget = document.querySelector("#editorSceneTarget");
const editorCtaText = document.querySelector("#editorCtaText");
const editorVisualMode = document.querySelector("#editorVisualMode");
const editorSpeechText1 = document.querySelector("#editorSpeechText1");
const editorSpeechText2 = document.querySelector("#editorSpeechText2");
const editorSpeechText3 = document.querySelector("#editorSpeechText3");
const editorSpeechText4 = document.querySelector("#editorSpeechText4");
const editorSpeechSize = document.querySelector("#editorSpeechSize");
const editorSpeechWidth = document.querySelector("#editorSpeechWidth");
const editorEmbedWidth = document.querySelector("#editorEmbedWidth");
const editorDiscoveryMs = document.querySelector("#editorDiscoveryMs");
const editorSpeechFadeMs = document.querySelector("#editorSpeechFadeMs");
const editorEmbedMs = document.querySelector("#editorEmbedMs");
const editorEmbedX = document.querySelector("#editorEmbedX");
const editorEmbedY = document.querySelector("#editorEmbedY");
const editorEmbedScale = document.querySelector("#editorEmbedScale");
const editorDiscoverY = document.querySelector("#editorDiscoverY");
const editorResultY = document.querySelector("#editorResultY");
const editorSpeechX = document.querySelector("#editorSpeechX");
const editorSpeechY = document.querySelector("#editorSpeechY");
const editorAvatarX = document.querySelector("#editorAvatarX");
const editorLogoY = document.querySelector("#editorLogoY");
const editorLogoZ = document.querySelector("#editorLogoZ");
const editorLogoScale = document.querySelector("#editorLogoScale");
const editorBgColor = document.querySelector("#editorBgColor");
const editorGradientPreset = document.querySelector("#editorGradientPreset");
const editorSideShadowOpacity = document.querySelector("#editorSideShadowOpacity");
const editorSideShadowDirection = document.querySelector("#editorSideShadowDirection");
const editorFloorShadowOpacity = document.querySelector("#editorFloorShadowOpacity");
const editorShadowDepth = document.querySelector("#editorShadowDepth");
const editorShadowLightX = document.querySelector("#editorShadowLightX");
const editorShadowLightZ = document.querySelector("#editorShadowLightZ");
const editorShadowLightY = document.querySelector("#editorShadowLightY");
const editorAvatarY = document.querySelector("#editorAvatarY");
const editorAvatarScale = document.querySelector("#editorAvatarScale");
const editorCloudY = document.querySelector("#editorCloudY");
const editorCloudX = document.querySelector("#editorCloudX");
const editorCloudZ = document.querySelector("#editorCloudZ");
const editorCloudScale = document.querySelector("#editorCloudScale");
const editorAvatarZ = document.querySelector("#editorAvatarZ");
const editorBookDepth = document.querySelector("#editorBookDepth");
const editorBookDensity = document.querySelector("#editorBookDensity");
const editorBookScale = document.querySelector("#editorBookScale");
const editorPerformanceMode = document.querySelector("#editorPerformanceMode");
const editorPerformancePixelRatio = document.querySelector("#editorPerformancePixelRatio");
const editorPerformanceFpsDefault = document.querySelector("#editorPerformanceFpsDefault");
const editorPerformanceFpsGame = document.querySelector("#editorPerformanceFpsGame");
const editorPerformanceShadowQuality = document.querySelector("#editorPerformanceShadowQuality");
const editorPerformanceAnimateGame = document.querySelector("#editorPerformanceAnimateGame");
const editorTopGlowOpacity = document.querySelector("#editorTopGlowOpacity");
const editorVignetteOpacity = document.querySelector("#editorVignetteOpacity");
const editorFocusHaloOpacity = document.querySelector("#editorFocusHaloOpacity");
const editorHemisphereIntensity = document.querySelector("#editorHemisphereIntensity");
const editorAmbientIntensity = document.querySelector("#editorAmbientIntensity");
const editorFillIntensity = document.querySelector("#editorFillIntensity");
const editorRimIntensity = document.querySelector("#editorRimIntensity");
const editorPreviewButton = document.querySelector("#editorPreviewButton");
const editorResetButton = document.querySelector("#editorResetButton");
const editorResetVisualsButton = document.querySelector("#editorResetVisualsButton");
const editorTotemDepthPresetButton = document.querySelector("#editorTotemDepthPresetButton");
const STORAGE_KEY = "musa-ologramma-config";
const editorRangeInputs = [];
let runtimeExternalToken = "zLjsEAL6nbf7exMhkzeq1ocSKJj1";
const PERFORMANCE_PROFILES = {
  high: {
    pixelRatio: 1.25,
    maxFpsDefault: 60,
    maxFpsDuringGame: 24,
    shadowQuality: 3,
    animateBackgroundDuringGame: true,
  },
  medium: {
    pixelRatio: 1,
    maxFpsDefault: 45,
    maxFpsDuringGame: 18,
    shadowQuality: 2,
    animateBackgroundDuringGame: false,
  },
  low: {
    pixelRatio: 0.85,
    maxFpsDefault: 30,
    maxFpsDuringGame: 12,
    shadowQuality: 1,
    animateBackgroundDuringGame: false,
  },
};
const SHADOW_QUALITY_MAP = [0, 512, 1024, 2048];
const DEFAULT_PERFORMANCE_SETTINGS = {
  mode: "medium",
  pixelRatio: PERFORMANCE_PROFILES.medium.pixelRatio,
  maxFpsDefault: PERFORMANCE_PROFILES.medium.maxFpsDefault,
  maxFpsDuringGame: PERFORMANCE_PROFILES.medium.maxFpsDuringGame,
  shadowQuality: PERFORMANCE_PROFILES.medium.shadowQuality,
  animateBackgroundDuringGame: PERFORMANCE_PROFILES.medium.animateBackgroundDuringGame,
};
const DEFAULT_SPEECH_SEQUENCE = [
  {
    text: `Parto sempre da una domanda.
Poi un'altra. E un'altra ancora.`,
  },
  {
    text: `E quando rispondi,
non stai scegliendo un libro.`,
  },
  {
    text: `Mi stai dando gli elementi
per conoscerti meglio.`,
  },
  {
    text: `In questo modo
posso consigliarti davvero
il libro giusto per te
in questo momento`,
  },
];
const DEFAULT_SPEECH_TEXT = DEFAULT_SPEECH_SEQUENCE.map((item) => item.text).join("\n\n");

const EXPERIENCE_CONFIG = {
  animationSources: {
    idle: {
      path: "/models/looking.glb",
      clipIndex: 1,
      fallbackDurationMs: 6000,
    },
    speaking: {
      path: "/models/speaking.glb",
      clipIndex: 0,
      fallbackDurationMs: 13000,
    },
    ponder: {
      path: "/models/ponder.glb",
      clipIndex: 0,
      fallbackDurationMs: 5000,
    },
    finale: {
      path: "/models/final.glb",
      clipIndex: 0,
      fallbackDurationMs: 4500,
    },
  },
  timings: {
    speechFadeMs: 2200,
    embedHoldMs: 1500,
    ponderMinMs: 1200,
    finalRevealDelayMs: 400,
    finalResultTimeoutMs: 10000,
  },
  externalExperience: {
    enabled: true,
    url: "https://www.mavreality.it/frigorifero/",
    tokenParam: "token",
    allowOrigin: "https://www.mavreality.it",
  },
  content: {
    ctaText: "Scopri che libro sei oggi",
    speechText: DEFAULT_SPEECH_TEXT,
    speechSequence: DEFAULT_SPEECH_SEQUENCE.map((item) => ({ ...item })),
    embedHtml: `
      <article class="embed-card">
        <div>
          <p class="embed-card__eyebrow">MUSA GAME</p>
          <h3 class="embed-card__title">Trova il libro che ti assomiglia oggi</h3>
        </div>
        <p class="embed-card__body">
          Qui inseriremo il codice HTML del gioco MUSA: verticale, responsive e centrato sul personaggio.
          La struttura e gia pronta per ospitare quiz, card, pulsanti e stati server.
        </p>
        <div class="embed-card__footer">
          <span>Gioco MUSA</span>
          <span>Responsive verticale</span>
        </div>
      </article>
    `,
  },
  styles: {
    speechFontSize: 30,
    speechMaxWidth: 340,
    embedWidth: 320,
  },
  visuals: {
    visualMode: "normal",
    backgroundColor: "#ffffff",
    gradientPreset: "clean-white",
    sideShadowOpacity: 0.14,
    sideShadowShift: 0,
    floorShadowOpacity: 0.3,
    contactShadowX: 0.3,
    shadowLightX: 4.5,
    shadowLightY: 5.7,
    shadowLightZ: 4.8,
    backgroundLayerY: 0.8,
    backgroundLayerZ: -1.15,
    bookDepth: 0,
    bookDensity: 1,
    bookScale: 1,
    logoY: -0.28,
    logoZ: 1.48,
    logoScale: 1.45,
    topGlowOpacity: 0,
    vignetteOpacity: 0.12,
    focusHaloOpacity: 0.08,
    hemisphereIntensity: 0.85,
    ambientIntensity: 0.32,
    fillIntensity: 0.52,
    rimIntensity: 0.38,
  },
  performance: {
    ...DEFAULT_PERFORMANCE_SETTINGS,
  },
  sceneLayouts: {
    idle: {
      embedX: 50,
      embedScale: 50,
      discoverButtonY: 70,
      resultActionsY: 56,
      speechX: 68,
      speechY: 45,
      avatarX: 0,
      avatarY: 1.12,
      avatarZ: 0.1,
      avatarScale: 0.7,
      embedY: 50,
      cloudMaskX: 0,
      cloudMaskY: -0.62,
      cloudMaskZ: 1.45,
      cloudMaskScale: 1,
    },
    speaking: {
      embedX: 50,
      embedScale: 50,
      discoverButtonY: 70,
      resultActionsY: 56,
      speechX: 68,
      speechY: 45,
      avatarX: 0,
      avatarY: 1.12,
      avatarZ: 0.1,
      avatarScale: 0.7,
      embedY: 50,
      cloudMaskX: 0,
      cloudMaskY: -0.62,
      cloudMaskZ: 1.45,
      cloudMaskScale: 1,
    },
    game: {
      embedX: 50,
      embedScale: 55,
      discoverButtonY: 70,
      resultActionsY: 56,
      speechX: 68,
      speechY: 45,
      avatarX: 0,
      avatarY: 1.12,
      avatarZ: 0.1,
      avatarScale: 0.7,
      embedY: 4,
      cloudMaskX: 0,
      cloudMaskY: -0.62,
      cloudMaskZ: 1.45,
      cloudMaskScale: 1,
    },
    ponder: {
      embedX: 50,
      embedScale: 50,
      discoverButtonY: 70,
      resultActionsY: 56,
      speechX: 68,
      speechY: 45,
      avatarX: 0,
      avatarY: 1.12,
      avatarZ: 0.1,
      avatarScale: 0.7,
      embedY: 50,
      cloudMaskX: 0,
      cloudMaskY: -0.62,
      cloudMaskZ: 1.45,
      cloudMaskScale: 1,
    },
    finale: {
      embedX: 50,
      embedScale: 50,
      discoverButtonY: 70,
      resultActionsY: 56,
      speechX: 68,
      speechY: 45,
      avatarX: 0,
      avatarY: 1.12,
      avatarZ: 0.1,
      avatarScale: 0.7,
      embedY: 50,
      cloudMaskX: 0,
      cloudMaskY: -0.62,
      cloudMaskZ: 1.45,
      cloudMaskScale: 1,
    },
  },
};

const VISUAL_DEFAULTS = JSON.parse(JSON.stringify(EXPERIENCE_CONFIG.visuals));
const SCENE_LAYOUT_DEFAULTS = JSON.parse(JSON.stringify(EXPERIENCE_CONFIG.sceneLayouts));
const CLOUD_MASK_DEFAULT_Y = -0.62;
const CLOUD_MASK_DEFAULT_Z = 1.05;

const scene = new THREE.Scene();
scene.background = null;
scene.fog = null;

const camera = new THREE.PerspectiveCamera(
  35,
  9 / 16,
  0.1,
  100
);
camera.position.set(0, 1.45, 4.8);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
});

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x000000, 0);

function getPerformanceSettings() {
  const performance = EXPERIENCE_CONFIG.performance || DEFAULT_PERFORMANCE_SETTINGS;
  if (performance.mode && performance.mode !== "custom" && PERFORMANCE_PROFILES[performance.mode]) {
    return {
      mode: performance.mode,
      ...PERFORMANCE_PROFILES[performance.mode],
    };
  }
  return performance;
}

function resizeStage() {
  const stageWidth = heroStage?.clientWidth || window.innerWidth;
  const stageHeight = heroStage?.clientHeight || window.innerHeight;

  camera.aspect = stageWidth / stageHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(stageWidth, stageHeight, false);
  renderer.setPixelRatio(getPerformanceSettings().pixelRatio);
}

resizeStage();

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xe9dfd2, 0.85);
scene.add(hemisphereLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.32);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.55);
keyLight.position.set(4.5, 5.7, 4.8);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(
  SHADOW_QUALITY_MAP[getPerformanceSettings().shadowQuality] || 1024,
  SHADOW_QUALITY_MAP[getPerformanceSettings().shadowQuality] || 1024
);
keyLight.shadow.camera.near = 0.5;
keyLight.shadow.camera.far = 18;
keyLight.shadow.camera.left = -3.5;
keyLight.shadow.camera.right = 3.5;
keyLight.shadow.camera.top = 3.5;
keyLight.shadow.camera.bottom = -3.5;
keyLight.shadow.bias = -0.00015;
keyLight.shadow.normalBias = 0.02;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xeee5d8, 0.52);
fillLight.position.set(4.6, 1.9, 2.4);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xd8e0ff, 0.38);
rimLight.position.set(2.2, 2.7, -4.8);
scene.add(rimLight);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(5.5, 64),
  new THREE.ShadowMaterial({ color: 0x7c725f, opacity: 0.22 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.2;
floor.receiveShadow = true;
scene.add(floor);

const pedestal = new THREE.Mesh(
  new THREE.CylinderGeometry(1.18, 1.34, 0.2, 64),
  new THREE.MeshStandardMaterial({
    color: 0xf3efe7,
    roughness: 0.92,
    metalness: 0.02,
  })
);
pedestal.position.set(0, -1.1, 0);
pedestal.receiveShadow = true;
pedestal.castShadow = true;
scene.add(pedestal);

const contactShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(2.8, 2.8),
  new THREE.MeshBasicMaterial({
    map: createContactShadowTexture(),
    transparent: true,
    depthWrite: false,
    opacity: 0.38,
  })
);
contactShadow.rotation.x = -Math.PI / 2;
contactShadow.position.set(0.3, -0.99, 0.48);
scene.add(contactShadow);

const avatarGroup = new THREE.Group();
scene.add(avatarGroup);

const musaLogoGroup = new THREE.Group();
scene.add(musaLogoGroup);

const maskCloudGroup = new THREE.Group();
scene.add(maskCloudGroup);

const propsOrbit = new THREE.Group();
propsOrbit.position.set(0, 0.8, -1.15);
scene.add(propsOrbit);

const loader = new GLTFLoader();
const avatarAssetCache = new Map();

let mixer = null;
let activeAction = null;
let activeAvatarModel = null;
let currentMode = "idle";
let sequenceTimers = [];
const avatarCloudWrappers = [];
const bookWrappers = [];
const airplaneWrappers = [];
let musaLogoWrapper = null;
let musaLogoBaseScale = 1;
let activeAvatarBaseScale = 1;
let editorSceneKey = "idle";
let ponderStartedAt = 0;
let explanationAudioEndedHandler = null;
let animationElapsedTime = 0;
let lastAnimationTimestamp = 0;
let animationMetadata = {
  idle: { durationMs: 6000, name: null },
  speaking: { durationMs: 13000, name: null },
  ponder: { durationMs: 5000, name: null },
  finale: { durationMs: 4500, name: null },
};
let thinkingBackdropActive = false;
const THINKING_BACKDROP_COLORS = [
  new THREE.Color("#15614f"),
  new THREE.Color("#d4b64d"),
  new THREE.Color("#ef8c3a"),
  new THREE.Color("#5c86d8"),
  new THREE.Color("#7864c8"),
];
const explanationAudio = new Audio("/audio.mp3");
explanationAudio.preload = "auto";
explanationAudio.load();
const speechSegmentAudios = ["/1.mp3", "/2.mp3", "/3.mp3", "/4.mp3"].map((path) => {
  const audio = new Audio(path);
  audio.preload = "auto";
  audio.load();
  return audio;
});

function logExperience(eventName, details = {}) {
  console.log(`[MUSA] ${eventName}`, {
    mode: currentMode,
    editorScene: editorSceneKey,
    ...details,
  });
}

function logGameConsoleBanner(label = "GAME ACTIVE") {
  console.log(
    `%c MUSA %c ${label} `,
    "background:#ef5a24;color:#fff;padding:6px 10px;border-radius:999px 0 0 999px;font-weight:800;",
    "background:#1f6f5f;color:#fff;padding:6px 10px;border-radius:0 999px 999px 0;font-weight:700;"
  );
}

loadDecorModel("/models/cartoon_cloud.glb", {
  parent: maskCloudGroup,
  position: [0, -0.74, 0.92],
  rotation: [0.04, 0.08, 0],
  scale: 0.84,
  floatOffset: 0.03,
  floatSpeed: 0.52,
  orbitSpeed: 0.04,
  shadow: true,
  zFloatRotation: false,
  tint: 0xf8fbff,
});

loadDecorModel("/models/cartoon_cloud.glb", {
  parent: maskCloudGroup,
  position: [-0.46, -0.82, 1.02],
  rotation: [0.02, -0.16, -0.04],
  scale: 0.66,
  floatOffset: 0.024,
  floatSpeed: 0.66,
  orbitSpeed: -0.05,
  shadow: true,
  zFloatRotation: false,
  tint: 0xf7fbff,
});

loadDecorModel("/models/cartoon_cloud.glb", {
  parent: maskCloudGroup,
  position: [0.52, -0.86, 0.9],
  rotation: [0.03, 0.18, 0.02],
  scale: 0.58,
  floatOffset: 0.022,
  floatSpeed: 0.6,
  orbitSpeed: 0.03,
  shadow: true,
  zFloatRotation: false,
  tint: 0xfcfdff,
});

loadDecorModel("/models/book.glb", {
  parent: maskCloudGroup,
  position: [-0.58, -0.72, 1.14],
  rotation: [0.28, 0.42, -0.16],
  scale: 0.88,
  floatOffset: 0.045,
  floatSpeed: 0.44,
  orbitSpeed: 0.2,
  shadow: true,
  tint: 0xf1a24e,
});

loadDecorModel("/models/book.glb", {
  parent: maskCloudGroup,
  position: [0.08, -0.78, 1.18],
  rotation: [0.22, -0.24, 0.12],
  scale: 0.8,
  floatOffset: 0.04,
  floatSpeed: 0.48,
  orbitSpeed: -0.16,
  shadow: true,
  tint: 0x7dc7ff,
});

loadDecorModel("/models/books.glb", {
  parent: maskCloudGroup,
  position: [0.62, -0.76, 1.08],
  rotation: [0.16, -0.32, 0.08],
  scale: 0.72,
  floatOffset: 0.035,
  floatSpeed: 0.4,
  orbitSpeed: 0.12,
  shadow: true,
  tint: 0xd9a7ff,
});

loadDecorModel("/models/book.glb", {
  parent: propsOrbit,
  position: [-2.15, 0.34, -1.72],
  rotation: [0.2, 0.92, -0.18],
  scale: 0.78,
  floatOffset: 0.12,
  floatSpeed: 0.82,
  orbitSpeed: 0.18,
  shadow: true,
  tint: 0xf06f43,
});

loadDecorModel("/models/book.glb", {
  parent: propsOrbit,
  position: [2.08, 0.12, -1.92],
  rotation: [-0.16, -0.7, 0.18],
  scale: 0.7,
  floatOffset: 0.1,
  floatSpeed: 0.74,
  orbitSpeed: -0.16,
  shadow: true,
  tint: 0x37b7d9,
});

loadDecorModel("/models/books.glb", {
  parent: propsOrbit,
  position: [1.2, -0.1, -2.34],
  rotation: [0.1, -0.28, 0.16],
  scale: 0.86,
  floatOffset: 0.1,
  floatSpeed: 0.62,
  orbitSpeed: 0.14,
  shadow: true,
  tint: 0xb45cff,
});

loadDecorModel("/models/book.glb", {
  parent: propsOrbit,
  position: [-0.88, 0.52, -2.42],
  rotation: [0.18, 0.44, -0.12],
  scale: 0.62,
  floatOffset: 0.08,
  floatSpeed: 0.58,
  orbitSpeed: 0.12,
  shadow: true,
  tint: 0xffb347,
});

loadDecorModel("/models/book.glb", {
  parent: propsOrbit,
  position: [0.42, 0.62, -2.72],
  rotation: [-0.08, -0.24, 0.1],
  scale: 0.56,
  floatOffset: 0.07,
  floatSpeed: 0.54,
  orbitSpeed: -0.08,
  shadow: true,
  tint: 0x84c6ff,
});

loadDecorModel("/models/books.glb", {
  parent: propsOrbit,
  position: [-1.55, -0.04, -2.78],
  rotation: [0.1, 0.3, -0.08],
  scale: 0.64,
  floatOffset: 0.07,
  floatSpeed: 0.57,
  orbitSpeed: 0.09,
  shadow: true,
  tint: 0xe6a6ff,
});

loadDecorModel("/models/cartoon_cloud.glb", {
  parent: propsOrbit,
  position: [-1.15, 2.28, -1.9],
  rotation: [0.02, -0.25, 0.04],
  scale: 0.22,
  floatOffset: 0.08,
  floatSpeed: 0.5,
  orbitSpeed: 0.12,
  shadow: true,
  zFloatRotation: false,
  tint: 0xf8fbff,
});

loadDecorModel("/models/cartoon_cloud.glb", {
  parent: propsOrbit,
  position: [0.08, 2.42, -2.15],
  rotation: [-0.03, 0.35, -0.05],
  scale: 0.24,
  floatOffset: 0.06,
  floatSpeed: 0.62,
  orbitSpeed: -0.1,
  shadow: true,
  zFloatRotation: false,
  tint: 0xf2f7ff,
});

loadDecorModel("/models/cartoon_cloud.glb", {
  parent: propsOrbit,
  position: [1.24, 2.22, -1.8],
  rotation: [0.04, -0.1, 0.03],
  scale: 0.21,
  floatOffset: 0.07,
  floatSpeed: 0.56,
  orbitSpeed: 0.09,
  shadow: true,
  zFloatRotation: false,
  tint: 0xffffff,
});

loadDecorModel("/models/cartoon_cloud.glb", {
  parent: propsOrbit,
  position: [-0.38, 2.14, -1.98],
  rotation: [0.03, 0.16, -0.02],
  scale: 0.2,
  floatOffset: 0.06,
  floatSpeed: 0.58,
  orbitSpeed: -0.08,
  shadow: true,
  zFloatRotation: false,
  tint: 0xf7fbff,
});

loadDecorModel("/models/cartoon_cloud.glb", {
  parent: propsOrbit,
  position: [0.54, 2.26, -2.02],
  rotation: [-0.02, -0.18, 0.03],
  scale: 0.22,
  floatOffset: 0.07,
  floatSpeed: 0.54,
  orbitSpeed: 0.1,
  shadow: true,
  zFloatRotation: false,
  tint: 0xfcfdff,
});

loadDecorModel("/models/book.glb", {
  parent: propsOrbit,
  position: [-0.72, 2.08, -2.08],
  rotation: [0.18, 0.36, -0.08],
  scale: 0.5,
  floatOffset: 0.06,
  floatSpeed: 0.52,
  orbitSpeed: 0.1,
  shadow: true,
  tint: 0xf0a14b,
});

loadDecorModel("/models/book.glb", {
  parent: propsOrbit,
  position: [0.88, 2.18, -2.2],
  rotation: [-0.12, -0.28, 0.06],
  scale: 0.48,
  floatOffset: 0.05,
  floatSpeed: 0.48,
  orbitSpeed: -0.08,
  shadow: true,
  tint: 0x79c2ff,
});

loadDecorModel("/models/airplane.glb", {
  parent: propsOrbit,
  position: [-2.35, 1.78, -1.18],
  rotation: [0.08, 0.42, -0.06],
  scale: 0.56,
  floatOffset: 0.06,
  floatSpeed: 0.34,
  orbitSpeed: 0.08,
  shadow: true,
  tint: 0xf5f9ff,
});

loadDecorModel("/models/airplane.glb", {
  parent: propsOrbit,
  position: [2.45, 1.34, -0.52],
  rotation: [-0.06, -0.34, 0.08],
  scale: 0.72,
  floatOffset: 0.05,
  floatSpeed: 0.28,
  orbitSpeed: -0.06,
  shadow: true,
  tint: 0xffffff,
});

loadMusaLogoModel();

initializeEditorRangeValues();
applyExperienceConfig();
bindEditor();
hydrateExperienceConfig();
initializeExperience();
animate();

window.addEventListener("resize", () => {
  resizeStage();
});

function getTargetFps() {
  const performance = getPerformanceSettings();
  return currentMode === "game"
    ? performance.maxFpsDuringGame
    : performance.maxFpsDefault;
}

function animate(timestamp = 0) {
  requestAnimationFrame(animate);

  if (!lastAnimationTimestamp) {
    lastAnimationTimestamp = timestamp;
  }

  const minFrameTime = 1000 / getTargetFps();
  const frameDeltaMs = timestamp - lastAnimationTimestamp;

  if (frameDeltaMs < minFrameTime) {
    return;
  }

  const delta = frameDeltaMs / 1000;
  lastAnimationTimestamp = timestamp;
  animationElapsedTime += delta;

  if (mixer) {
    mixer.update(delta);
  }

  const renderedLayout = getRenderedSceneLayout();
  const lowPowerGameMode =
    currentMode === "game" && !getPerformanceSettings().animateBackgroundDuringGame;
  avatarGroup.rotation.y = Math.sin(animationElapsedTime * 0.35) * 0.08;
  avatarGroup.position.x = renderedLayout.avatarX;
  avatarGroup.position.y =
    renderedLayout.avatarY + Math.sin(animationElapsedTime * 0.8) * 0.015;
  avatarGroup.position.z = renderedLayout.avatarZ;

  if (!lowPowerGameMode) {
    propsOrbit.rotation.y = Math.sin(animationElapsedTime * 0.18) * 0.18;
  }

  for (const child of avatarGroup.children) {
    child.userData.tick?.(animationElapsedTime);
  }

  for (const child of maskCloudGroup.children) {
    child.userData.tick?.(animationElapsedTime);
  }

  if (!lowPowerGameMode) {
    for (const child of propsOrbit.children) {
      child.userData.tick?.(animationElapsedTime);
    }
  }

  if (!lowPowerGameMode) {
    updateBookStorm(animationElapsedTime);
    updateAirplanes(animationElapsedTime);
  }

  updateThinkingBackdrop(animationElapsedTime);
  updateMusaLogo(animationElapsedTime);

  renderer.render(scene, camera);
}

function createContactShadowTexture() {
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;

  const context = shadowCanvas.getContext("2d");
  const gradient = context.createRadialGradient(128, 128, 20, 128, 128, 128);

  gradient.addColorStop(0, "rgba(60, 52, 40, 0.35)");
  gradient.addColorStop(0.45, "rgba(60, 52, 40, 0.16)");
  gradient.addColorStop(1, "rgba(60, 52, 40, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(shadowCanvas);
  texture.needsUpdate = true;

  return texture;
}

function loadDecorModel(
  path,
  {
    parent,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    floatOffset = 0.2,
    floatSpeed = 1,
    orbitSpeed = 0.25,
    shadow = true,
    tint = null,
    tintShift = null,
    zFloatRotation = true,
  }
) {
  loader.load(
    path,
    (gltf) => {
      const wrapper = new THREE.Group();
      const asset = gltf.scene;

      asset.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = shadow;
          child.receiveShadow = false;
          if (child.material) {
            child.material = child.material.clone();
            if (tint && child.material.color) {
              child.material.color.setHex(tint);
            }
          }
        }
      });

      const baseRotX = zFloatRotation ? rotation[0] : 0;
      const baseRotY = rotation[1];
      const baseRotZ = zFloatRotation ? rotation[2] : 0;

      asset.scale.setScalar(scale);
      asset.rotation.set(baseRotX, baseRotY, baseRotZ);
      wrapper.position.set(position[0], position[1], position[2]);
      wrapper.add(asset);

      const baseY = position[1];
      const tintColors = tintShift?.colors?.map((value) => new THREE.Color(value)) || null;

      wrapper.userData.tick = (elapsedTime) => {
        wrapper.position.y = baseY + Math.sin(elapsedTime * floatSpeed) * floatOffset;
        asset.rotation.y = baseRotY + elapsedTime * orbitSpeed;
        asset.rotation.z =
          baseRotZ
          + (
            zFloatRotation
              ? Math.sin(elapsedTime * (floatSpeed * 0.7)) * (orbitSpeed === 0 ? 0.02 : 0.08)
              : 0
          );

        if (tintColors?.length && tintShift?.speed) {
          const cycle = (Math.sin(elapsedTime * tintShift.speed) + 1) * 0.5;
          const secondaryCycle = (Math.sin(elapsedTime * tintShift.speed + 1.4) + 1) * 0.5;
          const firstBlend = tintColors[0].clone().lerp(tintColors[1], cycle);
          const finalBlend = firstBlend.lerp(tintColors[2], secondaryCycle * 0.35);

          asset.traverse((child) => {
            if (child.isMesh && child.material?.color) {
              child.material.color.copy(finalBlend);
            }
          });
        }
      };

      parent.add(wrapper);

      if (parent === maskCloudGroup) {
        avatarCloudWrappers.push({
          wrapper,
          basePosition: [...position],
          baseScale: scale,
        });

        wrapper.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.depthTest = true;
          }
        });

        applyVisualConfig();
      }

      if (/book/i.test(path)) {
        bookWrappers.push({
          wrapper,
          basePosition: [...position],
          baseRotation: [...rotation],
          baseScale: scale,
        });
        applyVisualConfig();
      }

      if (/airplane/i.test(path)) {
        airplaneWrappers.push({
          wrapper,
          basePosition: [...position],
          baseRotation: [...rotation],
          baseScale: scale,
          lane: airplaneWrappers.length,
        });
      }
    },
    undefined,
    (error) => {
      console.error(`Errore caricamento oggetto ${path}:`, error);
    }
  );
}

function loadMusaLogoModel() {
  loader.load(
    "/models/musalogo.glb",
    (gltf) => {
      const wrapper = new THREE.Group();
      const asset = gltf.scene;

      asset.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = false;
          if (child.material) {
            child.material = child.material.clone();
            if ("roughness" in child.material) {
              child.material.roughness = Math.min(0.82, child.material.roughness ?? 0.82);
            }
            if ("metalness" in child.material) {
              child.material.metalness = Math.max(0.02, child.material.metalness ?? 0.02);
            }
            if ("emissive" in child.material && child.material.color) {
              child.material.emissive.copy(child.material.color).multiplyScalar(0.18);
              child.material.emissiveIntensity = 0.45;
            }
          }
        }
      });

      const box = new THREE.Box3().setFromObject(asset);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);

      asset.position.sub(center);
      musaLogoBaseScale = Math.max(0.001, 1.65 / Math.max(size.x, size.y, size.z));
      asset.scale.setScalar(musaLogoBaseScale);
      wrapper.add(asset);
      musaLogoGroup.add(wrapper);
      musaLogoWrapper = wrapper;
      applyVisualConfig();
    },
    undefined,
    (error) => {
      console.error("Errore caricamento logo MUSA:", error);
    }
  );
}

function queueTimeout(callback, delay) {
  const timeoutId = window.setTimeout(callback, delay);
  sequenceTimers.push(timeoutId);
}

function clearSequenceTimers() {
  sequenceTimers.forEach((timeoutId) => window.clearTimeout(timeoutId));
  sequenceTimers = [];
}

function playExplanationAudio() {
  explanationAudio.currentTime = 0;
  explanationAudio.play().catch((error) => {
    console.warn("Impossibile avviare l'audio della spiegazione:", error);
  });
}

function clearExplanationAudioEndedHandler() {
  if (explanationAudioEndedHandler) {
    explanationAudio.removeEventListener("ended", explanationAudioEndedHandler);
    explanationAudioEndedHandler = null;
  }
}

function stopExplanationAudio({ reset = false } = {}) {
  clearExplanationAudioEndedHandler();
  explanationAudio.pause();
  if (reset) {
    explanationAudio.currentTime = 0;
  }
}

function getExplanationDurationMs() {
  return Number.isFinite(explanationAudio.duration) && explanationAudio.duration > 0
    ? Math.round(explanationAudio.duration * 1000)
    : 0;
}

function getAudioDurationMs(audio) {
  return Number.isFinite(audio?.duration) && audio.duration > 0
    ? Math.round(audio.duration * 1000)
    : 0;
}

function getSpeechSegmentDurationsMs() {
  const fallbackSequence = DEFAULT_SPEECH_SEQUENCE;
  const fallbackDuration = Math.max(1000, Math.round(getExplanationDurationMs() / fallbackSequence.length) || 3000);

  return fallbackSequence.map((_item, index) => {
    const durationMs = getAudioDurationMs(speechSegmentAudios[index]);
    return durationMs > 0 ? durationMs : fallbackDuration;
  });
}

function normalizeSpeechSequence(sequence = EXPERIENCE_CONFIG.content.speechSequence) {
  const fallback = DEFAULT_SPEECH_SEQUENCE.map((item) => ({ ...item }));
  const normalized = (Array.isArray(sequence) ? sequence : fallback)
    .slice(0, 4)
    .map((item, index) => ({
      text: String(item?.text || fallback[index]?.text || "").trim(),
    }));

  while (normalized.length < 4) {
    const fallbackItem = fallback[normalized.length];
    normalized.push({ ...fallbackItem });
  }

  return normalized;
}

function buildSpeechTimeline(totalDurationMs) {
  const sequence = normalizeSpeechSequence();
  const segmentDurations = getSpeechSegmentDurationsMs();
  const timeline = [];
  let cursorMs = 0;

  sequence.forEach((entry, index) => {
    const durationMs = Math.max(100, segmentDurations[index] || 1000);
    const startMs = cursorMs;
    const unclampedEndMs = startMs + durationMs;
    const endMs = index === sequence.length - 1
      ? Math.max(startMs + 100, totalDurationMs)
      : Math.min(unclampedEndMs, totalDurationMs);
    const fadeStartMs = Math.max(
      startMs + 200,
      endMs - Math.min(EXPERIENCE_CONFIG.timings.speechFadeMs, Math.max(200, endMs - startMs))
    );

    timeline.push({
      ...entry,
      startMs,
      durationMs: Math.max(100, endMs - startMs),
      endMs,
      fadeStartMs,
    });

    cursorMs = unclampedEndMs;
  });

  return timeline;
}

function getSceneLayout(sceneKey = currentMode) {
  const normalizedSceneKey = sceneKey === "final" ? "finale" : sceneKey;
  return EXPERIENCE_CONFIG.sceneLayouts[normalizedSceneKey] || EXPERIENCE_CONFIG.sceneLayouts.idle;
}

function getRenderedSceneKey() {
  if (document.body.classList.contains("editor-open")) {
    return editorSceneKey;
  }

  return currentMode;
}

function getRenderedSceneLayout() {
  return getSceneLayout(getRenderedSceneKey());
}

function getCloudRuntimeLayout() {
  if (document.body.classList.contains("editor-open")) {
    return getSceneLayout(editorSceneKey);
  }

  return getSceneLayout("idle");
}

function applySceneLayoutStyles(sceneKey = getRenderedSceneKey()) {
  const activeLayout = getSceneLayout(sceneKey);
  document.documentElement.style.setProperty("--embed-left", String(activeLayout.embedX));
  document.documentElement.style.setProperty("--embed-top", String(activeLayout.embedY));
  document.documentElement.style.setProperty("--embed-scale", String(activeLayout.embedScale || 50));
  document.documentElement.style.setProperty("--discover-button-top", `${activeLayout.discoverButtonY || 70}%`);
  document.documentElement.style.setProperty("--result-actions-top", `${activeLayout.resultActionsY || 40}%`);
  document.documentElement.style.setProperty("--speech-left", `${activeLayout.speechX || 68}%`);
  document.documentElement.style.setProperty("--speech-top", `${activeLayout.speechY || 45}%`);
}

function applyResultActionsLayout(sceneKey = getRenderedSceneKey()) {
  const activeLayout = getSceneLayout(sceneKey);
  document.documentElement.style.setProperty(
    "--result-actions-top",
    `${activeLayout.resultActionsY || 40}%`
  );
}

function syncEditorSceneLayoutControls(sceneKey = editorSceneKey) {
  const editorLayout = getSceneLayout(sceneKey);
  editorEmbedX.value = editorLayout.embedX;
  editorEmbedY.value = editorLayout.embedY;
  editorEmbedScale.value = editorLayout.embedScale;
  editorDiscoverY.value = editorLayout.discoverButtonY;
  editorResultY.value = editorLayout.resultActionsY;
  editorSpeechX.value = editorLayout.speechX;
  editorSpeechY.value = editorLayout.speechY;
  editorAvatarX.value = editorLayout.avatarX;
  editorAvatarY.value = editorLayout.avatarY;
  editorAvatarZ.value = editorLayout.avatarZ;
  editorAvatarScale.value = editorLayout.avatarScale;
  editorCloudX.value = editorLayout.cloudMaskX;
  editorCloudY.value = editorLayout.cloudMaskY;
  editorCloudZ.value = editorLayout.cloudMaskZ;
  editorCloudScale.value = editorLayout.cloudMaskScale;
  refreshEditorRangeValues();
}

function applyPerformanceProfile(mode) {
  const profile = PERFORMANCE_PROFILES[mode];
  if (!profile) {
    return;
  }

  EXPERIENCE_CONFIG.performance = {
    mode,
    ...profile,
  };
}

function applyTotemDepthPreset() {
  EXPERIENCE_CONFIG.visuals = {
    ...EXPERIENCE_CONFIG.visuals,
    visualMode: "normal",
    gradientPreset: "clean-white",
    topGlowOpacity: 0,
    vignetteOpacity: 0,
    focusHaloOpacity: 0,
    sideShadowOpacity: 0.08,
    floorShadowOpacity: 0.18,
    contactShadowX: 0.08,
    shadowLightX: 5.8,
    shadowLightY: 5.1,
    shadowLightZ: 4.1,
    hemisphereIntensity: 0.42,
    ambientIntensity: 0.2,
    fillIntensity: 0.34,
    rimIntensity: 0.86,
    backgroundLayerY: 1.1,
    backgroundLayerZ: -1.65,
    bookDepth: -0.28,
    bookDensity: 1.08,
    bookScale: 0.94,
    logoY: -0.18,
    logoZ: 1.68,
    logoScale: 1.62,
  };

  Object.values(EXPERIENCE_CONFIG.sceneLayouts).forEach((layout) => {
    layout.avatarX = 0;
    layout.avatarY = 1.08;
    layout.avatarZ = -0.08;
    layout.avatarScale = 0.68;
    layout.cloudMaskX = 0;
    layout.cloudMaskY = -0.56;
    layout.cloudMaskZ = 1.34;
    layout.cloudMaskScale = 1.04;
  });

  applyExperienceConfig();
  persistExperienceConfig();
}

function applyPerformanceConfig() {
  const performance = getPerformanceSettings();
  const pixelRatio = Math.max(0.6, Math.min(1.5, performance.pixelRatio || 1));
  const shadowQualityIndex = Math.max(0, Math.min(3, Math.round(performance.shadowQuality ?? 2)));
  const shadowMapSize = SHADOW_QUALITY_MAP[shadowQualityIndex];

  renderer.setPixelRatio(pixelRatio);
  renderer.shadowMap.enabled = shadowMapSize > 0;
  keyLight.castShadow = shadowMapSize > 0;
  keyLight.shadow.mapSize.set(shadowMapSize || 1, shadowMapSize || 1);
  keyLight.shadow.needsUpdate = true;

  if (editorPerformanceMode) {
    editorPerformanceMode.value = performance.mode || "medium";
    editorPerformancePixelRatio.value = pixelRatio;
    editorPerformanceFpsDefault.value = performance.maxFpsDefault;
    editorPerformanceFpsGame.value = performance.maxFpsDuringGame;
    editorPerformanceShadowQuality.value = shadowQualityIndex;
    editorPerformanceAnimateGame.checked = Boolean(performance.animateBackgroundDuringGame);

    const customMode = performance.mode === "custom";
    [
      editorPerformancePixelRatio,
      editorPerformanceFpsDefault,
      editorPerformanceFpsGame,
      editorPerformanceShadowQuality,
      editorPerformanceAnimateGame,
    ].forEach((control) => {
      if (control) {
        control.disabled = !customMode;
      }
    });
  }

  refreshEditorRangeValues();
}

function initializeEditorRangeValues() {
  const rangeInputs = document.querySelectorAll('.editor-panel input[type="range"]');

  rangeInputs.forEach((input) => {
    const field = input.closest(".editor-field");

    if (!field) {
      return;
    }

    const labelSpan = field.querySelector("span");

    if (!labelSpan) {
      return;
    }

    let labelRow = field.querySelector(".editor-field__label");
    if (!labelRow) {
      labelRow = document.createElement("div");
      labelRow.className = "editor-field__label";
      field.insertBefore(labelRow, labelSpan);
      labelRow.appendChild(labelSpan);
    }

    let valueBadge = field.querySelector(".editor-range-value");
    if (!valueBadge) {
      valueBadge = document.createElement("span");
      valueBadge.className = "editor-range-value";
      labelRow.appendChild(valueBadge);
    }

    input.dataset.valueTarget = `${input.id}Value`;
    valueBadge.id = input.dataset.valueTarget;
    editorRangeInputs.push(input);
    input.addEventListener("input", refreshEditorRangeValues);
    input.addEventListener("change", refreshEditorRangeValues);
  });
}

function formatSliderValue(input) {
  const step = Number(input.step || 1);
  const decimals = step >= 1 ? 0 : step >= 0.1 ? 1 : 2;
  return Number(input.value).toFixed(decimals);
}

function refreshEditorRangeValues() {
  editorRangeInputs.forEach((input) => {
    const targetId = input.dataset.valueTarget;
    const valueBadge = targetId ? document.getElementById(targetId) : null;

    if (!valueBadge) {
      return;
    }

    valueBadge.textContent = formatSliderValue(input);
  });
}

function waitForAudioMetadata(audio, timeoutMs = 4000) {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      audio.removeEventListener("loadedmetadata", finish);
      audio.removeEventListener("canplaythrough", finish);
      resolve();
    };

    audio.addEventListener("loadedmetadata", finish, { once: true });
    audio.addEventListener("canplaythrough", finish, { once: true });
    window.setTimeout(finish, timeoutMs);
  });
}

function hydrateExperienceConfig() {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return;
    }

    const savedConfig = JSON.parse(rawValue);

    if (savedConfig.content) {
      EXPERIENCE_CONFIG.content = {
        ...EXPERIENCE_CONFIG.content,
        ...savedConfig.content,
      };
      EXPERIENCE_CONFIG.content.speechSequence = normalizeSpeechSequence(
        savedConfig.content.speechSequence || EXPERIENCE_CONFIG.content.speechSequence
      );
    }

    if (savedConfig.styles) {
      EXPERIENCE_CONFIG.styles = {
        ...EXPERIENCE_CONFIG.styles,
        ...savedConfig.styles,
      };
    }

    if (savedConfig.timings) {
      EXPERIENCE_CONFIG.timings = {
        ...EXPERIENCE_CONFIG.timings,
        ...savedConfig.timings,
      };
    }

    if (savedConfig.externalExperience) {
      EXPERIENCE_CONFIG.externalExperience = {
        ...EXPERIENCE_CONFIG.externalExperience,
        ...savedConfig.externalExperience,
      };
    }

    if (savedConfig.visuals) {
      EXPERIENCE_CONFIG.visuals = {
        ...EXPERIENCE_CONFIG.visuals,
        ...savedConfig.visuals,
      };
    }

    if (savedConfig.performance) {
      EXPERIENCE_CONFIG.performance = {
        ...EXPERIENCE_CONFIG.performance,
        ...savedConfig.performance,
      };
    }

    if (savedConfig.sceneLayouts) {
      for (const key of Object.keys(EXPERIENCE_CONFIG.sceneLayouts)) {
        EXPERIENCE_CONFIG.sceneLayouts[key] = {
          ...EXPERIENCE_CONFIG.sceneLayouts[key],
          ...(savedConfig.sceneLayouts[key] || {}),
        };
      }
    }
  } catch (error) {
    console.error("Errore lettura configurazione salvata:", error);
  }
}

function persistExperienceConfig() {
  try {
    const configToStore = {
      content: EXPERIENCE_CONFIG.content,
      styles: EXPERIENCE_CONFIG.styles,
      timings: EXPERIENCE_CONFIG.timings,
      externalExperience: EXPERIENCE_CONFIG.externalExperience,
      visuals: EXPERIENCE_CONFIG.visuals,
      performance: EXPERIENCE_CONFIG.performance,
      sceneLayouts: EXPERIENCE_CONFIG.sceneLayouts,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(configToStore));
  } catch (error) {
    console.error("Errore salvataggio configurazione:", error);
  }
}

async function initializeExperience() {
  await resetExperience();
  applyExperienceConfig();
  preloadExperienceAssets()
    .then(() => {
      applyExperienceConfig();
    })
    .catch((error) => {
      console.error("Errore preload esperienza:", error);
    });
}

async function preloadExperienceAssets() {
  const avatarPreloads = Object.values(EXPERIENCE_CONFIG.animationSources).map((source) =>
    loadAvatarAsset(source.path)
  );
  const audioPreloads = [
    waitForAudioMetadata(explanationAudio),
    ...speechSegmentAudios.map((audio) => waitForAudioMetadata(audio)),
  ];

  await Promise.allSettled([...avatarPreloads, ...audioPreloads]);
  await refreshAnimationMetadata();
  logExperience("preloadComplete", {
    explanationDurationMs: getExplanationDurationMs(),
    segmentDurationsMs: getSpeechSegmentDurationsMs(),
  });
}

function loadAvatarAsset(path) {
  if (!avatarAssetCache.has(path)) {
    avatarAssetCache.set(
      path,
      new Promise((resolve, reject) => {
        loader.load(path, resolve, undefined, reject);
      })
    );
  }

  return avatarAssetCache.get(path);
}

async function refreshAnimationMetadata() {
  const slots = Object.keys(EXPERIENCE_CONFIG.animationSources);

  for (const slot of slots) {
    const source = EXPERIENCE_CONFIG.animationSources[slot];
    const asset = await loadAvatarAsset(source.path);
    const clip = asset.animations[source.clipIndex] || asset.animations[0];

    animationMetadata[slot] = {
      durationMs: clip?.duration ? Math.round(clip.duration * 1000) : source.fallbackDurationMs,
      name: clip?.name || null,
    };
  }
}

async function setAvatarPhase(
  slot,
  { loop = false } = {}
) {
  const source = EXPERIENCE_CONFIG.animationSources[slot];

  if (!source) {
    return;
  }

  try {
    const gltf = await loadAvatarAsset(source.path);
    const nextModel = gltf.scene;

    normalizeAvatarModel(nextModel);

    if (activeAvatarModel) {
      avatarGroup.remove(activeAvatarModel);
    }

    activeAction?.stop();
    mixer?.stopAllAction();
    mixer = null;
    activeAction = null;

    activeAvatarModel = nextModel;
    activeAvatarBaseScale = nextModel.scale.x;
    avatarGroup.add(activeAvatarModel);
    applyAvatarVisualOverrides(activeAvatarModel);

    if (gltf.animations?.length) {
      mixer = new THREE.AnimationMixer(activeAvatarModel);
      const clip = gltf.animations[source.clipIndex] || gltf.animations[0];

      if (clip) {
        const action = mixer.clipAction(clip);
        action.reset();
        action.enabled = true;
        action.clampWhenFinished = !loop;
        action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
        action.play();
        activeAction = action;
      }
    }
  } catch (error) {
    console.error(`Errore caricamento fase avatar ${slot}:`, error);
  }
}

function normalizeAvatarModel(targetModel) {
  const box = new THREE.Box3().setFromObject(targetModel);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  targetModel.position.x -= center.x;
  targetModel.position.y -= center.y;
  targetModel.position.z -= center.z;

  const maxSize = Math.max(size.x, size.y, size.z);
  const scale = (2.25 / maxSize) * 0.7;
  targetModel.scale.setScalar(scale);

  targetModel.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = false;
    }
  });
}

function getAnimationDurationMs(slot) {
  return (
    animationMetadata[slot]?.durationMs
    || EXPERIENCE_CONFIG.animationSources[slot]?.fallbackDurationMs
    || 1000
  );
}

async function startExperience() {
  logExperience("startExperience");
  clearSequenceTimers();
  stopExplanationAudio({ reset: true });
  currentMode = "speaking";
  applySceneLayoutStyles();
  discoverButton.classList.add("is-hidden");
  hideResultActions();
  hideSpeech();
  hideEmbed();

  const speakingDuration = getAnimationDurationMs("speaking");
  const segmentedSpeechDuration = getSpeechSegmentDurationsMs()
    .reduce((total, value) => total + value, 0);
  const explanationDuration = Math.max(
    speakingDuration,
    getExplanationDurationMs(),
    segmentedSpeechDuration
  );
  const speechTimeline = buildSpeechTimeline(explanationDuration);
  const lastSpeechEntry = speechTimeline[speechTimeline.length - 1];
  let speakingPhaseCompleted = false;
  const speechTransitionMs = Math.min(
    450,
    Math.max(180, Math.round(EXPERIENCE_CONFIG.timings.speechFadeMs * 0.2))
  );

  const finishSpeakingPhase = async () => {
    if (speakingPhaseCompleted || currentMode !== "speaking") {
      return;
    }

    speakingPhaseCompleted = true;
    clearExplanationAudioEndedHandler();
    currentMode = "game";
    logExperience("enterGamePhase");
    applySceneLayoutStyles();
    hideSpeech();
    showEmbed({ forceReload: true, resultMode: false });
    await setAvatarPhase("idle", { loop: true });
  };

  await setAvatarPhase("speaking", { loop: false });
  playExplanationAudio();
  speechLabel.textContent = "";

  speechTimeline.forEach((entry) => {
    const nextEntry = speechTimeline[speechTimeline.indexOf(entry) + 1];

    queueTimeout(() => {
      speechStage.classList.remove("is-fading");
      speechLabel.textContent = entry.text;
      showSpeech();
    }, entry.startMs);

    if (nextEntry) {
      queueTimeout(() => {
        if (speechLabel.textContent === entry.text) {
          speechStage.classList.add("is-fading");
        }
      }, Math.max(entry.startMs, nextEntry.startMs - speechTransitionMs));
    }
  });

  explanationAudioEndedHandler = () => {
    if (speechLabel.textContent === lastSpeechEntry?.text) {
      speechStage.classList.add("is-fading");
      queueTimeout(() => {
        if (speechLabel.textContent === lastSpeechEntry?.text) {
          hideSpeech();
        }
      }, speechTransitionMs);
    }
    queueTimeout(() => {
      finishSpeakingPhase();
    }, EXPERIENCE_CONFIG.timings.embedHoldMs);
  };
  explanationAudio.addEventListener("ended", explanationAudioEndedHandler, { once: true });

  queueTimeout(() => {
    if (speechLabel.textContent === lastSpeechEntry?.text) {
      hideSpeech();
    }
    finishSpeakingPhase();
  }, explanationDuration + EXPERIENCE_CONFIG.timings.embedHoldMs + 250);
}

async function triggerPonderPhase() {
  if (currentMode !== "game" && currentMode !== "speaking") {
    logExperience("ponderIgnored", { reason: "invalid-mode" });
    return;
  }

  clearSequenceTimers();
  stopExplanationAudio({ reset: true });
  currentMode = "ponder";
  ponderStartedAt = performance.now();
  logExperience("enterPonderPhase");
  applySceneLayoutStyles();
  hideEmbed();
  hideResultActions();
  speechLabel.textContent = "Sto pensando!";
  speechStage.classList.add("thinking-mode");
  showSpeech();
  await setAvatarPhase("ponder", { loop: true });

  const ponderMinDuration = Math.max(
    EXPERIENCE_CONFIG.timings.ponderMinMs,
    getAnimationDurationMs("ponder")
  );

  queueTimeout(() => {
    logExperience("ponderTimeoutFallback", {
      timeoutMs: Math.max(ponderMinDuration, EXPERIENCE_CONFIG.timings.finalResultTimeoutMs),
    });
    logGameConsoleBanner("FALLBACK final-result mancante");
    queueTimeout(() => {
      triggerFinalPhase();
    }, 900);
  }, Math.max(ponderMinDuration, EXPERIENCE_CONFIG.timings.finalResultTimeoutMs));
}

async function triggerFinalPhase() {
  logExperience("triggerFinalPhase");
  if (currentMode !== "game" && currentMode !== "speaking" && currentMode !== "ponder") {
    logExperience("finalIgnored", { reason: "invalid-mode" });
    return;
  }

  clearSequenceTimers();
  stopExplanationAudio({ reset: true });
  currentMode = "final";
  logExperience("enterFinalPhase");
  applySceneLayoutStyles();
  hideSpeech();
  hideEmbed();
  hideResultActions();
  await setAvatarPhase("finale", { loop: false });

  const finalDuration = Math.max(
    EXPERIENCE_CONFIG.timings.finalRevealDelayMs,
    getAnimationDurationMs("finale")
  );
  const resultRevealLeadMs = 3000;
  const revealResultAt = Math.max(
    EXPERIENCE_CONFIG.timings.finalRevealDelayMs,
    finalDuration - resultRevealLeadMs
  );

  queueTimeout(() => {
    showEmbed({ forceReload: false, resultMode: true, sceneKeyOverride: "game" });
    applyResultActionsLayout("finale");
  }, revealResultAt);

  queueTimeout(() => {
    showResultActions();
  }, finalDuration);
}

async function resetExperience() {
  logExperience("resetExperience");
  clearSequenceTimers();
  stopExplanationAudio({ reset: true });
  currentMode = "idle";
  applySceneLayoutStyles();
  speechLabel.textContent = EXPERIENCE_CONFIG.content.speechText;
  speechStage.classList.remove("thinking-mode");
  hideSpeech();
  hideEmbed();
  hideResultActions();
  speechStage.classList.remove("is-fading");
  discoverButton.classList.remove("is-hidden");
  propsOrbit.rotation.set(0, 0, 0);
  airplaneWrappers.forEach((entry) => {
    entry.wrapper.visible = true;
    entry.wrapper.position.set(
      entry.basePosition[0],
      entry.basePosition[1],
      entry.basePosition[2]
    );
    entry.wrapper.rotation.set(
      entry.baseRotation[0],
      entry.baseRotation[1],
      entry.baseRotation[2]
    );
    entry.wrapper.scale.setScalar(entry.baseScale);
  });
  await setAvatarPhase("idle", { loop: true });
  applyVisualConfig();
}

function showSpeech() {
  speechStage.classList.remove("is-fading");
  speechStage.classList.add("is-visible");
}

function hideSpeech() {
  speechStage.classList.remove("thinking-mode");
  speechStage.classList.remove("is-visible", "is-fading");
}

function showEmbed({ forceReload = true, resultMode = false, sceneKeyOverride = null } = {}) {
  logExperience("showEmbed");
  logGameConsoleBanner("GAME ACTIVE");
  if (sceneKeyOverride) {
    applySceneLayoutStyles(sceneKeyOverride);
  }
  document.body.classList.add("game-active");
  document.body.classList.toggle("result-active", resultMode);
  embedStage.classList.add("is-visible");
  renderEmbedContent({ forceReload });
}

function hideEmbed() {
  logExperience("hideEmbed");
  document.body.classList.remove("game-active");
  document.body.classList.remove("result-active");
  embedStage.classList.remove("is-visible");
}

function showResultActions() {
  applyResultActionsLayout("finale");
  resultActions.classList.add("is-visible");
}

function hideResultActions() {
  resultActions.classList.remove("is-visible");
}

function showResultStage() {}

function hideResultStage() {}

function buildExternalExperienceUrl() {
  const { url, tokenParam } = EXPERIENCE_CONFIG.externalExperience;

  if (!url) {
    return "";
  }

  if (!runtimeExternalToken) {
    return url;
  }

  const nextUrl = new URL(url);
  nextUrl.searchParams.set(tokenParam || "token", runtimeExternalToken);
  return nextUrl.toString();
}

function renderEmbedContent({ forceReload = false } = {}) {
  const { enabled, url } = EXPERIENCE_CONFIG.externalExperience;

  if (enabled && url) {
    if (!forceReload && embedContent.querySelector(".embed-iframe")) {
      logExperience("embedReuse");
      return;
    }

    const iframeSrc = buildExternalExperienceUrl();
    logExperience("embedRender", { iframeSrc, forceReload });
    embedContent.innerHTML = `
      <div class="embed-loading is-visible">Caricamento esperienza...</div>
      <iframe
        class="embed-iframe"
        src="${iframeSrc}"
        title="Esperienza MUSA"
        allow="fullscreen; autoplay"
        loading="eager"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    `;

    const iframe = embedContent.querySelector(".embed-iframe");
    const loading = embedContent.querySelector(".embed-loading");

    if (iframe && loading) {
      iframe.addEventListener(
        "load",
        () => {
          logExperience("iframeLoaded", {
            iframeSrc,
            frameWidth: iframe.clientWidth,
            frameHeight: iframe.clientHeight,
          });
          embedContent.classList.add("is-ready");
          loading.classList.remove("is-visible");
        },
        { once: true }
      );
    }

    embedContent.classList.remove("is-ready");
    return;
  }

  embedContent.innerHTML = EXPERIENCE_CONFIG.content.embedHtml;
}

function isAllowedExternalOrigin(origin) {
  try {
    const allowed = new URL(EXPERIENCE_CONFIG.externalExperience.allowOrigin);
    return allowed.origin === origin;
  } catch (_error) {
    return false;
  }
}

function getMessageDebugSummary(data) {
  const topLevelKeys = data && typeof data === "object" ? Object.keys(data) : [];
  const payloadKeys = data?.payload && typeof data.payload === "object"
    ? Object.keys(data.payload)
    : [];
  const nestedDataKeys = data?.data && typeof data.data === "object"
    ? Object.keys(data.data)
    : [];

  return {
    topLevelKeys,
    payloadKeys,
    nestedDataKeys,
  };
}

function extractMessageType(data) {
  const candidates = [
    typeof data === "string" ? data : null,
    data?.type,
    data?.event,
    data?.name,
    data?.action,
    data?.status,
    data?.payload?.type,
    data?.payload?.event,
    data?.payload?.name,
    data?.payload?.action,
    data?.data?.type,
    data?.data?.event,
  ];

  const found = candidates.find((value) => typeof value === "string" && value.trim());
  return found ? found.trim().toLowerCase() : "";
}

function looksLikeFinalResultPayload(data) {
  return Boolean(
    data?.result
    || data?.book
    || data?.bookId
    || data?.bookTitle
    || data?.recommendation
    || data?.payload?.result
    || data?.payload?.book
    || data?.payload?.bookId
    || data?.payload?.bookTitle
    || data?.payload?.recommendation
  );
}

function applyExternalExperienceConfig(nextConfig = {}) {
  EXPERIENCE_CONFIG.externalExperience = {
    ...EXPERIENCE_CONFIG.externalExperience,
    ...nextConfig,
  };

  if (typeof nextConfig.token === "string") {
    runtimeExternalToken = nextConfig.token;
  }

  renderEmbedContent();
  persistExperienceConfig();
}

function applyExperienceConfig() {
  const speechSequence = normalizeSpeechSequence();
  EXPERIENCE_CONFIG.content.speechSequence = speechSequence;
  EXPERIENCE_CONFIG.content.speechText = speechSequence.map((item) => item.text).join("\n\n");
  discoverButton.textContent = EXPERIENCE_CONFIG.content.ctaText;
  speechLabel.textContent = speechSequence[0]?.text || EXPERIENCE_CONFIG.content.speechText;
  renderEmbedContent();

  document.documentElement.style.setProperty(
    "--speech-font-size",
    `${EXPERIENCE_CONFIG.styles.speechFontSize}px`
  );
  document.documentElement.style.setProperty(
    "--speech-max-width",
    `${EXPERIENCE_CONFIG.styles.speechMaxWidth}px`
  );
  document.documentElement.style.setProperty(
    "--embed-width",
    `${EXPERIENCE_CONFIG.styles.embedWidth}px`
  );

  applyPerformanceConfig();
  applyVisualConfig();

  editorCtaText.value = EXPERIENCE_CONFIG.content.ctaText;
  editorVisualMode.value = EXPERIENCE_CONFIG.visuals.visualMode || "normal";
  editorSpeechText1.value = speechSequence[0]?.text || "";
  editorSpeechText2.value = speechSequence[1]?.text || "";
  editorSpeechText3.value = speechSequence[2]?.text || "";
  editorSpeechText4.value = speechSequence[3]?.text || "";
  editorSpeechSize.value = EXPERIENCE_CONFIG.styles.speechFontSize;
  editorSpeechWidth.value = EXPERIENCE_CONFIG.styles.speechMaxWidth;
  editorEmbedWidth.value = EXPERIENCE_CONFIG.styles.embedWidth;
  editorSpeechFadeMs.value = EXPERIENCE_CONFIG.timings.speechFadeMs;
  editorDiscoveryMs.value = getAnimationDurationMs("speaking");
  editorEmbedMs.value = EXPERIENCE_CONFIG.timings.embedHoldMs;
  if (editorSceneTarget) {
    editorSceneTarget.value = editorSceneKey;
  }
  editorBgColor.value = EXPERIENCE_CONFIG.visuals.backgroundColor;
  editorGradientPreset.value = EXPERIENCE_CONFIG.visuals.gradientPreset;
  editorSideShadowOpacity.value = EXPERIENCE_CONFIG.visuals.sideShadowOpacity;
  editorSideShadowDirection.value = EXPERIENCE_CONFIG.visuals.sideShadowShift;
  editorFloorShadowOpacity.value = EXPERIENCE_CONFIG.visuals.floorShadowOpacity;
  editorShadowDepth.value = EXPERIENCE_CONFIG.visuals.contactShadowX;
  editorShadowLightX.value = EXPERIENCE_CONFIG.visuals.shadowLightX;
  editorShadowLightZ.value = EXPERIENCE_CONFIG.visuals.shadowLightZ;
  editorShadowLightY.value = EXPERIENCE_CONFIG.visuals.shadowLightY;
  syncEditorSceneLayoutControls(editorSceneKey);
  editorBookDepth.value = EXPERIENCE_CONFIG.visuals.bookDepth;
  editorBookDensity.value = EXPERIENCE_CONFIG.visuals.bookDensity;
  editorBookScale.value = EXPERIENCE_CONFIG.visuals.bookScale;
  editorLogoY.value = EXPERIENCE_CONFIG.visuals.logoY;
  editorLogoZ.value = EXPERIENCE_CONFIG.visuals.logoZ;
  editorLogoScale.value = EXPERIENCE_CONFIG.visuals.logoScale;
  editorTopGlowOpacity.value = EXPERIENCE_CONFIG.visuals.topGlowOpacity;
  editorVignetteOpacity.value = EXPERIENCE_CONFIG.visuals.vignetteOpacity;
  editorFocusHaloOpacity.value = EXPERIENCE_CONFIG.visuals.focusHaloOpacity;
  editorHemisphereIntensity.value = EXPERIENCE_CONFIG.visuals.hemisphereIntensity;
  editorAmbientIntensity.value = EXPERIENCE_CONFIG.visuals.ambientIntensity;
  editorFillIntensity.value = EXPERIENCE_CONFIG.visuals.fillIntensity;
  editorRimIntensity.value = EXPERIENCE_CONFIG.visuals.rimIntensity;
  refreshEditorRangeValues();
}

function updateSpeechSequenceEntry(index, patch = {}) {
  const sequence = normalizeSpeechSequence();
  sequence[index] = {
    ...sequence[index],
    ...patch,
  };
  EXPERIENCE_CONFIG.content.speechSequence = normalizeSpeechSequence(sequence);
  EXPERIENCE_CONFIG.content.speechText = EXPERIENCE_CONFIG.content.speechSequence
    .map((item) => item.text)
    .join("\n\n");
}

function bindEditor() {
  discoverButton.addEventListener("click", () => {
    if (currentMode !== "idle") {
      return;
    }
    startExperience();
  });

  restartButton.addEventListener("click", () => {
    resetExperience();
  });

  closeButton?.addEventListener("click", () => {
    resetExperience();
  });

  editorToggle.addEventListener("click", () => {
    document.body.classList.toggle("editor-open");
    applyVisualConfig();
  });

  editorPreviewButton.addEventListener("click", () => {
    startExperience();
  });

  editorResetButton.addEventListener("click", () => {
    resetExperience();
  });

  editorResetVisualsButton.addEventListener("click", () => {
    EXPERIENCE_CONFIG.visuals = { ...VISUAL_DEFAULTS };
    EXPERIENCE_CONFIG.sceneLayouts = JSON.parse(JSON.stringify(SCENE_LAYOUT_DEFAULTS));
    EXPERIENCE_CONFIG.performance = { ...DEFAULT_PERFORMANCE_SETTINGS };
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorTotemDepthPresetButton.addEventListener("click", () => {
    applyTotemDepthPreset();
  });

  editorPerformanceMode.addEventListener("change", () => {
    const selectedMode = editorPerformanceMode.value;
    if (selectedMode === "custom") {
      EXPERIENCE_CONFIG.performance.mode = "custom";
    } else {
      applyPerformanceProfile(selectedMode);
    }
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorPerformancePixelRatio.addEventListener("input", () => {
    EXPERIENCE_CONFIG.performance.mode = "custom";
    EXPERIENCE_CONFIG.performance.pixelRatio = Number(editorPerformancePixelRatio.value) || 1;
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorPerformanceFpsDefault.addEventListener("input", () => {
    EXPERIENCE_CONFIG.performance.mode = "custom";
    EXPERIENCE_CONFIG.performance.maxFpsDefault = Number(editorPerformanceFpsDefault.value) || 45;
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorPerformanceFpsGame.addEventListener("input", () => {
    EXPERIENCE_CONFIG.performance.mode = "custom";
    EXPERIENCE_CONFIG.performance.maxFpsDuringGame = Number(editorPerformanceFpsGame.value) || 18;
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorPerformanceShadowQuality.addEventListener("input", () => {
    EXPERIENCE_CONFIG.performance.mode = "custom";
    EXPERIENCE_CONFIG.performance.shadowQuality = Number(editorPerformanceShadowQuality.value) || 0;
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorPerformanceAnimateGame.addEventListener("change", () => {
    EXPERIENCE_CONFIG.performance.mode = "custom";
    EXPERIENCE_CONFIG.performance.animateBackgroundDuringGame = editorPerformanceAnimateGame.checked;
    applyExperienceConfig();
    persistExperienceConfig();
  });

  if (editorSceneTarget) {
    editorSceneTarget.addEventListener("change", () => {
      editorSceneKey = editorSceneTarget.value;
      syncEditorSceneLayoutControls(editorSceneKey);
      applySceneLayoutStyles(editorSceneKey);
      applyVisualConfig();
      applyExperienceConfig();
    });
  }

  editorCtaText.addEventListener("input", () => {
    EXPERIENCE_CONFIG.content.ctaText = editorCtaText.value;
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorVisualMode.addEventListener("change", () => {
    EXPERIENCE_CONFIG.visuals.visualMode = editorVisualMode.value;
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorSpeechText1.addEventListener("input", () => {
    updateSpeechSequenceEntry(0, { text: editorSpeechText1.value });
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorSpeechText2.addEventListener("input", () => {
    updateSpeechSequenceEntry(1, { text: editorSpeechText2.value });
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorSpeechText3.addEventListener("input", () => {
    updateSpeechSequenceEntry(2, { text: editorSpeechText3.value });
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorSpeechText4.addEventListener("input", () => {
    updateSpeechSequenceEntry(3, { text: editorSpeechText4.value });
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorSpeechSize.addEventListener("input", () => {
    EXPERIENCE_CONFIG.styles.speechFontSize = Number(editorSpeechSize.value) || 20;
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorSpeechWidth.addEventListener("input", () => {
    EXPERIENCE_CONFIG.styles.speechMaxWidth = Number(editorSpeechWidth.value) || 340;
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorEmbedWidth.addEventListener("input", () => {
    EXPERIENCE_CONFIG.styles.embedWidth = Number(editorEmbedWidth.value) || 320;
    applyExperienceConfig();
    persistExperienceConfig();
  });

  editorSpeechFadeMs.addEventListener("input", () => {
    EXPERIENCE_CONFIG.timings.speechFadeMs = Number(editorSpeechFadeMs.value) || 2200;
    persistExperienceConfig();
  });

  editorEmbedMs.addEventListener("input", () => {
    EXPERIENCE_CONFIG.timings.embedHoldMs = Number(editorEmbedMs.value) || 0;
    persistExperienceConfig();
  });

  editorEmbedX.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).embedX = Number(editorEmbedX.value) || 50;
    applySceneLayoutStyles();
    refreshEditorRangeValues();
    persistExperienceConfig();
  });

  editorEmbedY.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).embedY = Number(editorEmbedY.value) || 50;
    applySceneLayoutStyles();
    refreshEditorRangeValues();
    persistExperienceConfig();
  });

  editorEmbedScale.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).embedScale = Number(editorEmbedScale.value) || 50;
    applySceneLayoutStyles();
    refreshEditorRangeValues();
    persistExperienceConfig();
  });

  editorDiscoverY.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).discoverButtonY = Number(editorDiscoverY.value) || 70;
    applySceneLayoutStyles();
    refreshEditorRangeValues();
    persistExperienceConfig();
  });

  editorResultY.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).resultActionsY = Number(editorResultY.value) || 40;
    applySceneLayoutStyles();
    refreshEditorRangeValues();
    persistExperienceConfig();
  });

  editorSpeechX.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).speechX = Number(editorSpeechX.value) || 68;
    applySceneLayoutStyles();
    refreshEditorRangeValues();
    persistExperienceConfig();
  });

  editorSpeechY.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).speechY = Number(editorSpeechY.value) || 45;
    applySceneLayoutStyles();
    refreshEditorRangeValues();
    persistExperienceConfig();
  });

  editorBgColor.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.backgroundColor = editorBgColor.value;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorGradientPreset.addEventListener("change", () => {
    EXPERIENCE_CONFIG.visuals.gradientPreset = editorGradientPreset.value;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorSideShadowOpacity.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.sideShadowOpacity = Number(editorSideShadowOpacity.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorSideShadowDirection.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.sideShadowShift = Number(editorSideShadowDirection.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorFloorShadowOpacity.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.floorShadowOpacity = Number(editorFloorShadowOpacity.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorShadowDepth.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.contactShadowX = Number(editorShadowDepth.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorShadowLightX.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.shadowLightX = Number(editorShadowLightX.value) || -4.2;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorShadowLightZ.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.shadowLightZ = Number(editorShadowLightZ.value) || 4.4;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorShadowLightY.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.shadowLightY = Number(editorShadowLightY.value) || 5.7;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorAvatarY.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).avatarY = Number(editorAvatarY.value) || 1.12;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorAvatarX.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).avatarX = Number(editorAvatarX.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorAvatarZ.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).avatarZ = Number(editorAvatarZ.value) || 0.1;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorAvatarScale.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).avatarScale = Number(editorAvatarScale.value) || 0.7;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorCloudY.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).cloudMaskY = Number(editorCloudY.value) || -0.62;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorCloudX.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).cloudMaskX = Number(editorCloudX.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorCloudZ.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).cloudMaskZ = Number(editorCloudZ.value) || 1.45;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorCloudScale.addEventListener("input", () => {
    getSceneLayout(editorSceneKey).cloudMaskScale = Number(editorCloudScale.value) || 1;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorBookDepth.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.bookDepth = Number(editorBookDepth.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorBookDensity.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.bookDensity = Number(editorBookDensity.value) || 1;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorBookScale.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.bookScale = Number(editorBookScale.value) || 1;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorLogoY.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.logoY = Number.isFinite(Number(editorLogoY.value))
      ? Number(editorLogoY.value)
      : -0.28;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorLogoZ.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.logoZ = Number.isFinite(Number(editorLogoZ.value))
      ? Number(editorLogoZ.value)
      : 1.48;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorLogoScale.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.logoScale = Number.isFinite(Number(editorLogoScale.value))
      ? Number(editorLogoScale.value)
      : 1.45;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorTopGlowOpacity.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.topGlowOpacity = Number(editorTopGlowOpacity.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorVignetteOpacity.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.vignetteOpacity = Number(editorVignetteOpacity.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorFocusHaloOpacity.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.focusHaloOpacity = Number(editorFocusHaloOpacity.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorHemisphereIntensity.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.hemisphereIntensity = Number(editorHemisphereIntensity.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorAmbientIntensity.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.ambientIntensity = Number(editorAmbientIntensity.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorFillIntensity.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.fillIntensity = Number(editorFillIntensity.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  editorRimIntensity.addEventListener("input", () => {
    EXPERIENCE_CONFIG.visuals.rimIntensity = Number(editorRimIntensity.value) || 0;
    applyVisualConfig();
    persistExperienceConfig();
  });

  window.addEventListener("musa-game-complete", () => {
    logExperience("windowEvent:musa-game-complete");
    triggerPonderPhase();
  });

  window.addEventListener("musa-submit-start", () => {
    logExperience("windowEvent:musa-submit-start");
    logGameConsoleBanner("SUBMIT START");
    triggerPonderPhase();
  });

  window.addEventListener("musa-final-result", () => {
    logExperience("windowEvent:musa-final-result");
    logGameConsoleBanner("FINAL RESULT");
    triggerFinalPhase();
  });

  window.addEventListener("message", (event) => {
    const messageType = extractMessageType(event.data);
    const debugSummary = getMessageDebugSummary(event.data);

    console.log("[MUSA] postMessage received", {
      origin: event.origin,
      data: event.data,
      mode: currentMode,
      messageType,
      expectedOrigin: EXPERIENCE_CONFIG.externalExperience.allowOrigin,
      hostPage: window.location.href,
      ...debugSummary,
    });

    if (!isAllowedExternalOrigin(event.origin)) {
      logExperience("postMessageIgnored", {
        origin: event.origin,
        expectedOrigin: EXPERIENCE_CONFIG.externalExperience.allowOrigin,
        ...debugSummary,
      });
      return;
    }

    if (
      messageType === "musa-submit-start"
      || messageType === "submit-start"
      || messageType === "request-start"
    ) {
      logExperience("postMessage:submit-start", { payload: event.data });
      logGameConsoleBanner("POST submit-start");
      triggerPonderPhase();
    }

    if (messageType === "musa-game-complete" || messageType === "game-complete") {
      logExperience("postMessage:game-complete", { payload: event.data });
      logGameConsoleBanner("POST game-complete");
      triggerPonderPhase();
    }

    if (
      messageType === "musa-final-result"
      || messageType === "final-result"
      || messageType === "result"
      || messageType === "result-ready"
      || messageType === "recommendation-ready"
      || looksLikeFinalResultPayload(event.data)
    ) {
      logExperience("postMessage:final-result", { payload: event.data });
      logGameConsoleBanner("POST final-result");
      triggerFinalPhase();
    }
  });

  window.musaExperience = {
    start: () => startExperience(),
    reset: () => resetExperience(),
    onSubmitStart: () => triggerPonderPhase(),
    onGameComplete: () => triggerPonderPhase(),
    onFinalResult: () => triggerFinalPhase(),
    setExternalExperience: (config) => applyExternalExperienceConfig(config),
    setExternalToken: (token) => {
      runtimeExternalToken = token;
      renderEmbedContent();
    },
  };
}

function applyVisualConfig() {
  applySceneLayoutStyles();
  const visualMode = EXPERIENCE_CONFIG.visuals.visualMode || "normal";
  document.body.classList.toggle("visual-hologram", visualMode === "hologram");
  const palette = getGradientPalette(
    EXPERIENCE_CONFIG.visuals.gradientPreset,
    EXPERIENCE_CONFIG.visuals.backgroundColor
  );

  document.documentElement.style.setProperty("--bg-solid", palette.solid);
  document.documentElement.style.setProperty("--bg-accent", palette.accent);
  document.documentElement.style.setProperty("--bg-glow", palette.glow);
  document.documentElement.style.setProperty("--bg-secondary", palette.secondary);
  document.documentElement.style.setProperty("--bg-bottom", palette.bottom);
  document.documentElement.style.setProperty(
    "--top-glow-opacity",
    String(EXPERIENCE_CONFIG.visuals.topGlowOpacity)
  );
  document.documentElement.style.setProperty(
    "--vignette-opacity",
    String(EXPERIENCE_CONFIG.visuals.vignetteOpacity)
  );
  document.documentElement.style.setProperty(
    "--focus-halo-opacity",
    String(EXPERIENCE_CONFIG.visuals.focusHaloOpacity)
  );
  document.documentElement.style.setProperty(
    "--side-shadow-opacity",
    String(EXPERIENCE_CONFIG.visuals.sideShadowOpacity)
  );
  document.documentElement.style.setProperty(
    "--floor-shadow-opacity",
    String(EXPERIENCE_CONFIG.visuals.floorShadowOpacity)
  );
  document.documentElement.style.setProperty(
    "--side-shadow-shift",
    `${EXPERIENCE_CONFIG.visuals.sideShadowShift}px`
  );

  contactShadow.position.x = EXPERIENCE_CONFIG.visuals.contactShadowX;
  contactShadow.position.z = 0.48 + getRenderedSceneLayout().avatarZ * 0.15;
  keyLight.position.x = EXPERIENCE_CONFIG.visuals.shadowLightX;
  keyLight.position.y = EXPERIENCE_CONFIG.visuals.shadowLightY;
  keyLight.position.z = EXPERIENCE_CONFIG.visuals.shadowLightZ;
  propsOrbit.position.y = EXPERIENCE_CONFIG.visuals.backgroundLayerY;
  propsOrbit.position.z = EXPERIENCE_CONFIG.visuals.backgroundLayerZ;
  hemisphereLight.intensity = EXPERIENCE_CONFIG.visuals.hemisphereIntensity;
  ambientLight.intensity = EXPERIENCE_CONFIG.visuals.ambientIntensity;
  fillLight.intensity = EXPERIENCE_CONFIG.visuals.fillIntensity;
  rimLight.intensity = EXPERIENCE_CONFIG.visuals.rimIntensity;
  keyLight.intensity = 2.15;

  if (visualMode === "hologram") {
    hemisphereLight.intensity *= 0.45;
    ambientLight.intensity *= 0.68;
    fillLight.intensity *= 0.78;
    rimLight.intensity = Math.max(rimLight.intensity * 2.1, 0.9);
    rimLight.color.set("#7fdcff");
    fillLight.color.set("#bdefff");
    keyLight.color.set("#dffcff");
    keyLight.intensity = 1.55;
    contactShadow.material.opacity = 0.16;
    renderer.toneMappingExposure = 1.12;
  } else {
    rimLight.color.set("#d8e0ff");
    fillLight.color.set("#eee5d8");
    keyLight.color.set("#ffffff");
    contactShadow.material.opacity = 0.38;
    renderer.toneMappingExposure = 1.05;
  }

  applyAvatarVisualOverrides(activeAvatarModel);
  applyCloudMaskVisuals();
  applyBookVisuals();
  applyMusaLogoVisuals();
}

function getGradientPalette(preset, baseColor) {
  const presets = {
    "clean-white": {
      solid: baseColor,
      accent: "rgba(198, 208, 216, 0.1)",
      glow: "rgba(255, 255, 255, 0.98)",
      secondary: "rgba(224, 231, 236, 0.16)",
      bottom: "#f7f9fb",
    },
    "warm-studio": {
      solid: baseColor,
      accent: "rgba(188, 147, 104, 0.16)",
      glow: "rgba(255, 250, 240, 0.92)",
      secondary: "rgba(221, 198, 168, 0.24)",
      bottom: "#eadcc8",
    },
    "cool-air": {
      solid: baseColor,
      accent: "rgba(147, 181, 196, 0.18)",
      glow: "rgba(255, 255, 255, 0.96)",
      secondary: "rgba(190, 214, 226, 0.2)",
      bottom: "#dde8ef",
    },
    "pearl-depth": {
      solid: baseColor,
      accent: "rgba(171, 157, 183, 0.16)",
      glow: "rgba(255, 255, 255, 0.98)",
      secondary: "rgba(215, 208, 225, 0.22)",
      bottom: "#e6e0ec",
    },
  };

  return presets[preset] || presets["clean-white"];
}

function colorToRgba(color, alpha) {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function updateThinkingBackdrop(elapsedTime) {
  const isThinkingPhase = currentMode === "ponder" || currentMode === "final";

  if (!isThinkingPhase) {
    if (thinkingBackdropActive) {
      thinkingBackdropActive = false;
      applyVisualConfig();
    }
    return;
  }

  thinkingBackdropActive = true;

  const cycleLength = 2.8;
  const paletteLength = THINKING_BACKDROP_COLORS.length;
  const cyclePosition = (elapsedTime / cycleLength) % paletteLength;
  const fromIndex = Math.floor(cyclePosition) % paletteLength;
  const toIndex = (fromIndex + 1) % paletteLength;
  const blend = cyclePosition - Math.floor(cyclePosition);
  const activeColor = THINKING_BACKDROP_COLORS[fromIndex]
    .clone()
    .lerp(THINKING_BACKDROP_COLORS[toIndex], blend);

  const solid = new THREE.Color("#ffffff").lerp(activeColor.clone(), 0.24);
  const bottom = new THREE.Color("#f7f9fb").lerp(activeColor.clone(), 0.34);
  const accent = activeColor.clone().lerp(new THREE.Color("#ffffff"), 0.2);
  const secondary = activeColor.clone().lerp(new THREE.Color("#ffffff"), 0.42);
  const glow = new THREE.Color("#ffffff").lerp(activeColor.clone(), 0.16);

  document.documentElement.style.setProperty("--bg-solid", `#${solid.getHexString()}`);
  document.documentElement.style.setProperty("--bg-bottom", `#${bottom.getHexString()}`);
  document.documentElement.style.setProperty("--bg-accent", colorToRgba(accent, 0.28));
  document.documentElement.style.setProperty("--bg-secondary", colorToRgba(secondary, 0.3));
  document.documentElement.style.setProperty("--bg-glow", colorToRgba(glow, 0.96));
}

function applyAvatarVisualOverrides(targetModel) {
  if (!targetModel) {
    return;
  }

  const scaleMultiplier = getRenderedSceneLayout().avatarScale / 0.7;
  targetModel.scale.setScalar(activeAvatarBaseScale * scaleMultiplier);
  targetModel.renderOrder = 4;

  targetModel.traverse((child) => {
    if (child.isMesh) {
      child.renderOrder = 4;
      if (child.material) {
        child.material.depthWrite = true;
        child.material.transparent = false;
        child.material.opacity = 1;
      }
    }
  });
}

function applyCloudMaskVisuals() {
  if (!avatarCloudWrappers.length) {
    return;
  }

  const activeLayout = getCloudRuntimeLayout();
  maskCloudGroup.position.y = 1.12 + (activeLayout.cloudMaskY - CLOUD_MASK_DEFAULT_Y);
  maskCloudGroup.position.x = activeLayout.cloudMaskX;
  maskCloudGroup.position.z = activeLayout.cloudMaskZ - CLOUD_MASK_DEFAULT_Z;
  maskCloudGroup.renderOrder = 5;

  avatarCloudWrappers.forEach((entry) => {
    const [baseX, baseY, baseZ] = entry.basePosition;
    entry.wrapper.position.x = baseX;
    entry.wrapper.position.y = baseY;
    entry.wrapper.position.z = baseZ;
    entry.wrapper.scale.setScalar(entry.baseScale * activeLayout.cloudMaskScale);
    entry.wrapper.renderOrder = 5;

    entry.wrapper.traverse((child) => {
      if (child.isMesh) {
        child.renderOrder = 5;
      }
    });
  });
}

function applyBookVisuals() {
  if (!bookWrappers.length) {
    return;
  }

  const densityScale = EXPERIENCE_CONFIG.visuals.bookDensity;
  const depthOffset = EXPERIENCE_CONFIG.visuals.bookDepth;
  const bookScale = EXPERIENCE_CONFIG.visuals.bookScale;

  bookWrappers.forEach((entry) => {
    const [baseX, baseY, baseZ] = entry.basePosition;
    entry.wrapper.position.x = baseX * densityScale;
    entry.wrapper.position.y = baseY;
    entry.wrapper.position.z = baseZ + depthOffset;
    entry.wrapper.scale.setScalar(entry.baseScale * (0.88 + densityScale * 0.12) * bookScale);
  });
}

function applyMusaLogoVisuals() {
  if (!musaLogoWrapper) {
    return;
  }

  musaLogoGroup.position.set(0, EXPERIENCE_CONFIG.visuals.logoY, EXPERIENCE_CONFIG.visuals.logoZ);
  musaLogoWrapper.scale.setScalar(musaLogoBaseScale * EXPERIENCE_CONFIG.visuals.logoScale);
  musaLogoWrapper.renderOrder = 6;
  musaLogoWrapper.traverse((child) => {
    if (child.isMesh) {
      child.renderOrder = 6;
    }
  });
}

function updateMusaLogo(elapsedTime) {
  if (!musaLogoWrapper) {
    return;
  }

  musaLogoGroup.position.y =
    EXPERIENCE_CONFIG.visuals.logoY + Math.sin(elapsedTime * 0.75) * 0.035;
  musaLogoWrapper.rotation.z = Math.sin(elapsedTime * 0.6) * 0.06;
}

function updateBookStorm(elapsedTime) {
  if (!bookWrappers.length || currentMode !== "ponder") {
    return;
  }

  bookWrappers.forEach((entry, index) => {
    const [baseX, baseY, baseZ] = entry.basePosition;
    const [baseRotX, baseRotY, baseRotZ] = entry.baseRotation;
    const offset = index * 0.72;

    entry.wrapper.position.x = baseX * 2.15 + Math.sin(elapsedTime * 1.12 + offset) * 2.2;
    entry.wrapper.position.y = baseY + 0.95 + Math.cos(elapsedTime * 1.34 + offset) * 1.25;
    entry.wrapper.position.z = baseZ + 0.9 + Math.sin(elapsedTime * 0.94 + offset) * 1.6;

    entry.wrapper.rotation.x = baseRotX + elapsedTime * 0.9 + offset * 0.2;
    entry.wrapper.rotation.y = baseRotY + elapsedTime * 1.18 + offset * 0.24;
    entry.wrapper.rotation.z = baseRotZ + elapsedTime * 0.84 + offset * 0.18;

    entry.wrapper.scale.setScalar(entry.baseScale * 1.55);
  });
}

function updateAirplanes(elapsedTime) {
  if (!airplaneWrappers.length) {
    return;
  }

  airplaneWrappers.forEach((entry, index) => {
    const frontPass = (entry.lane ?? index) % 2 === 1;
    const speed = frontPass ? 0.1 : 0.072;
    const cycle = ((elapsedTime * speed + index * 0.22) % 1 + 1) % 1;
    const visibleWindow = frontPass ? 0.8 : 1;
    const isVisible = !frontPass || cycle < visibleWindow;
    const travel = isVisible ? cycle / visibleWindow : 0;

    entry.wrapper.visible = isVisible;
    if (!isVisible) {
      return;
    }

    entry.wrapper.position.x = THREE.MathUtils.lerp(-5.2, 5.2, travel);
    entry.wrapper.position.y =
      entry.basePosition[1]
      + Math.sin(elapsedTime * (1.1 + index * 0.18)) * (frontPass ? 0.18 : 0.26);
    entry.wrapper.position.z =
      entry.basePosition[2]
      + Math.cos(elapsedTime * (0.9 + index * 0.12)) * 0.26
      + (frontPass ? 1.45 : 0.22);

    entry.wrapper.rotation.y = entry.baseRotation[1] + Math.PI * 0.5;
    entry.wrapper.rotation.x =
      entry.baseRotation[0] + Math.cos(elapsedTime * 1.2 + index) * 0.1;
    entry.wrapper.rotation.z =
      entry.baseRotation[2] + Math.sin(elapsedTime * 1.5 + index) * 0.16;
    entry.wrapper.scale.setScalar(entry.baseScale * (frontPass ? 1.34 : 1.16));
  });
}
