/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import External from "../core/External";
import Messages from "../utils/messages";

/**
 * Custom Data
 */
// import { AllTypes } from "../examples/all_types";
import { CustomBox } from "../custom_template";

const data = CustomBox;

function getData(task) {
  if (task && task.data) {
    return {
      ...task,
      data: JSON.stringify(task.data),
    };
  }

  return task;
}

/**
 * Get current config
 * @param {string} pathToConfig
 */
async function getConfig(pathToConfig) {
  const response = await fetch(pathToConfig);
  const config = await response.text();

  return config;
}

/**
 * Get custom config
 */
async function getExample() {
  let datatype = data;

  let config = await getConfig(datatype.config);
  let annotations = datatype.annotation.annotations;
  let predictions = datatype.tasks[0].predictions;

  let task = {
    annotations,
    predictions,
    data: JSON.stringify(datatype.tasks[0].data),
  };

  return { config, task, annotations, predictions };
}

/**
 * Function to return App element
 */
function rootElement(element) {
  let root;

  if (typeof element === "string") {
    root = document.getElementById(element);
  } else {
    root = element;
  }

  root.innerHTML = "";

  root.style.width = "auto";

  return root;
}

/**
 * Function to configure application with callbacks
 * @param {object} params
 */
function configureApplication(params) {
  const options = {
    alert: (m) => console.log(m), // Noop for demo: window.alert(m)
    messages: { ...Messages, ...params.messages },
    onSubmitAnnotation: params.onSubmitAnnotation ? params.onSubmitAnnotation : External.onSubmitAnnotation,
    onUpdateAnnotation: params.onUpdateAnnotation ? params.onUpdateAnnotation : External.onUpdateAnnotation,
    onDeleteAnnotation: params.onDeleteAnnotation ? params.onDeleteAnnotation : External.onDeleteAnnotation,
    onSkipTask: params.onSkipTask ? params.onSkipTask : External.onSkipTask,
    onSubmitDraft: params.onSubmitDraft,
    onTaskLoad: params.onTaskLoad ? params.onTaskLoad : External.onTaskLoad,
    onLabelStudioLoad: params.onLabelStudioLoad ? params.onLabelStudioLoad : External.onLabelStudioLoad,
    onEntityCreate: params.onEntityCreate || External.onEntityCreate,
    onEntityDelete: params.onEntityDelete || External.onEntityDelete,
    onGroundTruth: params.onGroundTruth || External.onGroundTruth,
    onSelectAnnotation: params.onSelectAnnotation || External.onSelectAnnotation,
    onAcceptAnnotation: params.onAcceptAnnotation || External.onAcceptAnnotation,
    onRejectAnnotation: params.onRejectAnnotation || External.onRejectAnnotation,
    onStorageInitialized: params.onStorageInitialized || External.onStorageInitialized,
  };

  return options;
}

export default { rootElement, getExample, getData, configureApplication };
