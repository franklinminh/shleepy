function parseSleepStagesWithDurations(jsonData) {
  const nightsData = jsonData["data"].map((night) => {
    const samples = night.sleep_durations_data.hypnogram_samples;
    const stages = [];
    const durations = [];

    for (let i = 0; i < samples.length - 1; i++) {
      const currentStage = samples[i].level == 0 ? 1 : samples[i].level; // default stage 0 and 1 to mean the same
      const nextStage = samples[i + 1].level == 0 ? 1 : samples[i].level;
      const duration = (new Date(samples[i + 1].timestamp) - new Date(samples[i].timestamp)) / 1000; // Duration in seconds

      stages.push(currentStage);
      durations.push(duration);

      // Capture the transition
      //   if (currentStage !== nextStage) {
      //     stages.push(nextStage);
      //     durations.push(0); // For transitions, set duration to 0
      //   }
    }
    stages.push(samples[samples.length - 1].level);
    durations.push(
      (new Date(night.metadata.end_time) - new Date(samples[samples.length - 1].timestamp)) / 1000
    );
    // if (samples[samples.length - 1] !== 1) {
    //   stages.push(1);
    //   durations.push(0);
    // }
    return { stages, durations };
  });

  return nightsData;
}

function countTransitionsAndDurationsPerNight(nightsData) {
  const overallTransitionCounts = {};
  const overallStageDurations = {};
  const overallTotalCounts = {};

  nightsData.forEach(({ stages, durations }) => {
    const transitionCounts = {}; // tc[a][b]: # of transitions a->b
    const stageDurations = {}; // sd[a]: total duration in a, # of times a has been counted
    const totalCounts = {}; // # of times a has been counted

    for (let i = 0; i < stages.length - 1; i++) {
      const currentStage = stages[i];
      const nextStage = stages[i + 1];
      const duration = durations[i];

      // have not seen current stage before
      if (!transitionCounts[currentStage]) {
        transitionCounts[currentStage] = {};
        stageDurations[currentStage] = { totalDuration: 0, count: 0 };
        totalCounts[currentStage] = 0;
      }

      // has not seen this transition before
      if (!transitionCounts[currentStage][nextStage]) {
        transitionCounts[currentStage][nextStage] = 0;
      }

      transitionCounts[currentStage][nextStage]++;
      stageDurations[currentStage].totalDuration += duration;
      stageDurations[currentStage].count++;
      totalCounts[currentStage]++;
    }

    // Merge nightly counts into overall counts
    for (const currentStage in transitionCounts) {
      if (!overallTransitionCounts[currentStage]) {
        overallTransitionCounts[currentStage] = {};
        overallStageDurations[currentStage] = { totalDuration: 0, count: 0 };
        overallTotalCounts[currentStage] = 0;
      }
      for (const nextStage in transitionCounts[currentStage]) {
        if (!overallTransitionCounts[currentStage][nextStage]) {
          overallTransitionCounts[currentStage][nextStage] = 0;
        }
        overallTransitionCounts[currentStage][nextStage] +=
          transitionCounts[currentStage][nextStage];
      }
      overallStageDurations[currentStage].totalDuration +=
        stageDurations[currentStage].totalDuration;
      overallStageDurations[currentStage].count += stageDurations[currentStage].count;
      overallTotalCounts[currentStage] += totalCounts[currentStage];
    }
  });

  return {
    transitionCounts: overallTransitionCounts,
    totalCounts: overallTotalCounts,
    stageDurations: overallStageDurations,
  };
}

function convertCountsAndDurationsToModel(transitionCounts, totalCounts, stageDurations) {
  const markovModel = {};

  for (const currentStage in transitionCounts) {
    markovModel[currentStage] = {
      transitionProbabilities: {},
      averageDurations: 0,
    };
    const stageData = stageDurations[currentStage];
    markovModel[currentStage].averageDurations = stageData.totalDuration / stageData.count;

    for (const nextStage in transitionCounts[currentStage]) {
      markovModel[currentStage].transitionProbabilities[nextStage] =
        transitionCounts[currentStage][nextStage] / totalCounts[currentStage];
    }
  }

  console.log("model", markovModel);
  return markovModel;
}

function smoothMarkovModelWithDurations(markovModel, alpha = 1) {
  const smoothedModel = {};
  const allStages = new Set();

  for (const currentStage in markovModel) {
    allStages.add(currentStage);
    for (const nextStage in markovModel[currentStage].transitionProbabilities) {
      allStages.add(nextStage);
    }
  }

  for (const currentStage of allStages) {
    smoothedModel[currentStage] = {
      transitionProbabilities: {},
      averageDurations: markovModel[currentStage]?.averageDurations || alpha,
    };
    const total = Object.keys(markovModel[currentStage]?.transitionProbabilities || {}).length;
    for (const nextStage of allStages) {
      smoothedModel[currentStage].transitionProbabilities[nextStage] =
        (markovModel[currentStage]?.transitionProbabilities[nextStage] || 0) + alpha;
    }
    const totalWithSmoothing = total + alpha * allStages.size;
    for (const nextStage of allStages) {
      smoothedModel[currentStage].transitionProbabilities[nextStage] /= totalWithSmoothing;
    }
  }

  return smoothedModel;
}

function predictNextSleepStageAndDuration(currentStage, markovModel) {
  const transitionProbabilities = markovModel[currentStage]?.transitionProbabilities || {};
  const averageDuration = markovModel[currentStage]?.averageDurations || 0;

  if (Object.keys(transitionProbabilities).length === 0) {
    return { nextStage: null, duration: 0 }; // No transitions available
  }

  const random = Math.random();
  let cumulativeProbability = 0;
  let nextStage = null;

  for (const stage in transitionProbabilities) {
    cumulativeProbability += transitionProbabilities[stage];
    if (random < cumulativeProbability) {
      nextStage = stage;
      break;
    }
  }

  return {
    nextStage,
    duration: averageDuration, // Duration for the predicted next stage
  };
}

function simulateSleepStagesWithDurations(startStage, markovModel, steps) {
  let currentStage = startStage;
  const predictedStages = [];

  for (let i = 0; i < steps; i++) {
    const { nextStage, duration } = predictNextSleepStageAndDuration(currentStage, markovModel);
    if (nextStage === null) {
      break; // Stop if no transition available
    }
    predictedStages.push({ stage: nextStage, duration });
    currentStage = nextStage;
  }

  return predictedStages;
}

export function run_processing(jsonData) {
  const nightsData = parseSleepStagesWithDurations(jsonData);
  const { transitionCounts, totalCounts, stageDurations } =
    countTransitionsAndDurationsPerNight(nightsData);
  let markovModel = convertCountsAndDurationsToModel(transitionCounts, totalCounts, stageDurations);
  // markovModel = smoothMarkovModelWithDurations(markovModel); // Optional smoothing

  const initialStage = 4; // Example starting stage
  const steps = 10; // Number of future stages to predict

  const predictedStages = simulateSleepStagesWithDurations(initialStage, markovModel, steps);
  // console.log(predictedStages);

  
  return predictedStages;
}
