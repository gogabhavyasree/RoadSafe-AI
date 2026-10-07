import { PredictionInputs, PredictionOutput, ContributingFactor, RiskLevel } from '../types';

export class RiskEngineService {
  /**
   * Predict accident risk using simulated ML multi-factor scoring model.
   * Can be directly swapped with an async API call (e.g., fetch('/api/predict'))
   */
  public static calculateRisk(inputs: PredictionInputs): PredictionOutput {
    const factors: ContributingFactor[] = [];
    let baseScore = 15; // baseline urban risk

    // 1. Weather Factor (0-22 pts)
    let weatherImpact = 2;
    let weatherDesc = 'Normal clear sky visibility.';
    if (inputs.weather === 'Rain') {
      weatherImpact = 18;
      weatherDesc = 'Precipitation reduces tire traction and driver sightlines.';
      factors.push({ factor: 'Rain / Wet Precipitation', impact: weatherImpact, category: 'Environment', description: weatherDesc });
    } else if (inputs.weather === 'Fog') {
      weatherImpact = 22;
      weatherDesc = 'Dense particulate fog severely diminishes forward sight distance.';
      factors.push({ factor: 'Dense Fog Visibility', impact: weatherImpact, category: 'Environment', description: weatherDesc });
    } else if (inputs.weather === 'Snow') {
      weatherImpact = 20;
      weatherDesc = 'Sub-zero frozen precipitation creates erratic steering conditions.';
      factors.push({ factor: 'Snow / Frozen Surface', impact: weatherImpact, category: 'Environment', description: weatherDesc });
    } else if (inputs.weather === 'Other') {
      weatherImpact = 10;
      weatherDesc = 'Haze or ambient dust conditions impairing field of view.';
      factors.push({ factor: 'Adverse Atmospheric Conditions', impact: weatherImpact, category: 'Environment', description: weatherDesc });
    }
    baseScore += weatherImpact;

    // 2. Road Surface Factor (0-20 pts)
    let roadImpact = 2;
    if (inputs.roadCondition === 'Wet') {
      roadImpact = 16;
      factors.push({ factor: 'Wet Pavement Friction Loss', impact: roadImpact, category: 'Roadway', description: 'Hydroplaning danger on asphalt.' });
    } else if (inputs.roadCondition === 'Flood') {
      roadImpact = 22;
      factors.push({ factor: 'Localized Water Logging / Flooding', impact: roadImpact, category: 'Roadway', description: 'Submerged lanes and lost steerability.' });
    } else if (inputs.roadCondition === 'Snow/Ice') {
      roadImpact = 20;
      factors.push({ factor: 'Icy / Sleet Coated Roadway', impact: roadImpact, category: 'Roadway', description: 'Frictional coefficient drops below safe stopping thresholds.' });
    }
    baseScore += roadImpact;

    // 3. Lighting Factor (0-18 pts)
    let lightImpact = 2;
    if (inputs.lightCondition === 'Darkness – Lights Off') {
      lightImpact = 18;
      factors.push({ factor: 'Unlit Night Roadway', impact: lightImpact, category: 'Environment', description: 'Zero peripheral street lighting enhances hazard collision risk.' });
    } else if (inputs.lightCondition === 'Darkness – Lights On') {
      lightImpact = 9;
      factors.push({ factor: 'Artificial Street Illumination', impact: lightImpact, category: 'Environment', description: 'Shadow zones and headlight glare.' });
    }
    baseScore += lightImpact;

    // 4. Time of Day (0-14 pts)
    let timeImpact = 2;
    if (inputs.timeOfDay === 'Night') {
      timeImpact = 14;
      factors.push({ factor: 'Late Night High-Fatigue Window', impact: timeImpact, category: 'Environment', description: 'Diminished driver reflexes and slower hazard reaction.' });
    } else if (inputs.timeOfDay === 'Evening') {
      timeImpact = 10;
      factors.push({ factor: 'Peak Evening Commute Window', impact: timeImpact, category: 'Environment', description: 'High driver stress, mixed transit density.' });
    } else if (inputs.timeOfDay === 'Morning') {
      timeImpact = 6;
      factors.push({ factor: 'Morning Rush Hour Period', impact: timeImpact, category: 'Environment', description: 'Rapid stop-and-go congestion cycles.' });
    }
    baseScore += timeImpact;

    // 5. Traffic Density (0-18 pts)
    let trafficImpact = 3;
    if (inputs.trafficDensity === 'High') {
      trafficImpact = 18;
      factors.push({ factor: 'High Traffic Density / Congestion', impact: trafficImpact, category: 'Traffic', description: 'Shorter headway distances and frequent erratic lane changes.' });
    } else if (inputs.trafficDensity === 'Medium') {
      trafficImpact = 10;
      factors.push({ factor: 'Moderate Traffic Volume', impact: trafficImpact, category: 'Traffic', description: 'Active multi-lane vehicular movement.' });
    }
    baseScore += trafficImpact;

    // 6. Speed Limit (0-18 pts)
    let speedImpact = 2;
    if (inputs.speedLimit >= 110) {
      speedImpact = 18;
      factors.push({ factor: `Extreme Speed Limit (${inputs.speedLimit} km/h)`, impact: speedImpact, category: 'Roadway', description: 'Kinetic crash severity escalates quadratically at high speeds.' });
    } else if (inputs.speedLimit >= 80) {
      speedImpact = 12;
      factors.push({ factor: `High Speed Corridor (${inputs.speedLimit} km/h)`, impact: speedImpact, category: 'Roadway', description: 'Higher kinetic energy increases required stopping distances.' });
    } else if (inputs.speedLimit >= 60) {
      speedImpact = 6;
      factors.push({ factor: `Moderate Arterial Speed (${inputs.speedLimit} km/h)`, impact: speedImpact, category: 'Roadway', description: 'Moderate momentum on multi-lane road.' });
    }
    baseScore += speedImpact;

    // 7. Number of Vehicles Involved (0-16 pts)
    let vehicleImpact = 2;
    if (inputs.vehicles >= 5) {
      vehicleImpact = 16;
      factors.push({ factor: `Multi-Vehicle Pileup Potential (${inputs.vehicles} Vehicles)`, impact: vehicleImpact, category: 'Vehicle', description: 'Secondary collision chain reactions.' });
    } else if (inputs.vehicles >= 3) {
      vehicleImpact = 10;
      factors.push({ factor: `Multiple Vehicles Present (${inputs.vehicles} Vehicles)`, impact: vehicleImpact, category: 'Vehicle', description: 'Inter-vehicular conflict points.' });
    } else if (inputs.vehicles === 2) {
      vehicleImpact = 5;
    }
    baseScore += vehicleImpact;

    // 8. Road Type (0-14 pts)
    let roadTypeImpact = 3;
    if (inputs.roadType === 'Intersection') {
      roadTypeImpact = 15;
      factors.push({ factor: 'Complex At-Grade Intersection', impact: roadTypeImpact, category: 'Roadway', description: 'Multiple cross-traffic turning conflicts and blind angles.' });
    } else if (inputs.roadType === 'Expressway') {
      roadTypeImpact = 13;
      factors.push({ factor: 'High-Speed Controlled Expressway', impact: roadTypeImpact, category: 'Roadway', description: 'High differential speeds and merging risks.' });
    } else if (inputs.roadType === 'Highway') {
      roadTypeImpact = 11;
      factors.push({ factor: 'Interstate / State Highway', impact: roadTypeImpact, category: 'Roadway', description: 'Mixed commercial truck and light vehicle traffic.' });
    } else if (inputs.roadType === 'Rural Road') {
      roadTypeImpact = 9;
      factors.push({ factor: 'Narrow Rural Corridor', impact: roadTypeImpact, category: 'Roadway', description: 'Absence of physical medians and shoulder barriers.' });
    }
    baseScore += roadTypeImpact;

    // Clamp score to 0 - 100
    const rawScore = Math.min(99, Math.max(8, baseScore));
    const riskScore = Math.round(rawScore);

    // Classification
    let riskLevel: RiskLevel = 'LOW';
    if (riskScore >= 70) riskLevel = 'HIGH';
    else if (riskScore >= 35) riskLevel = 'MEDIUM';

    // Model Confidence: higher when conditions strongly align with distinct risk patterns
    const certaintyDistance = Math.abs(riskScore - 52);
    const confidence = Math.min(96, Math.max(82, Math.round(84 + (certaintyDistance / 50) * 11)));

    // Sort factors by impact descending
    factors.sort((a, b) => b.impact - a.impact);

    // Dynamic Recommendations
    const recommendations: string[] = [];
    if (inputs.weather === 'Rain' || inputs.roadCondition === 'Wet') {
      recommendations.push('Reduce cruising speed by at least 20 km/h and double the standard 3-second headway buffer to prevent hydroplaning.');
    }
    if (inputs.weather === 'Fog') {
      recommendations.push('Deploy front and rear anti-fog lamps; avoid high-beam reflections and reference painted road edge lines.');
    }
    if (inputs.roadCondition === 'Flood') {
      recommendations.push('Avoid flooded lanes; water depth over 6 inches can induce loss of directional steering and engine stall.');
    }
    if (inputs.lightCondition === 'Darkness – Lights Off') {
      recommendations.push('Exercise extreme vigilance for unlit stationary obstacles, two-wheelers, and pedestrian crossings in dark zones.');
    }
    if (inputs.timeOfDay === 'Night') {
      recommendations.push('Account for circadian drowsiness; take mandatory rest stops if driving extended stretches past 23:00 hrs.');
    }
    if (inputs.trafficDensity === 'High') {
      recommendations.push('Maintain strict lane discipline and avoid abrupt cutting across congested traffic corridors.');
    }
    if (inputs.speedLimit >= 80) {
      recommendations.push('Adhere strictly to posted radar speed corridors; prepare for rapid decelerations near entry ramps.');
    }
    if (inputs.roadType === 'Intersection') {
      recommendations.push('Yield right-of-way cleanly, verify cross-traffic signals before proceeding, and watch for turning vehicles.');
    }
    if (recommendations.length === 0) {
      recommendations.push('Maintain standard safe following distance, scan mirrors every 5-8 seconds, and observe all posted signage.');
      recommendations.push('Ensure tire tread depth and inflation pressure meet optimal highway specifications.');
    }

    return {
      id: `PRED-${Date.now().toString(36).toUpperCase()}`,
      riskScore,
      riskLevel,
      confidence,
      contributingFactors: factors.slice(0, 6),
      safetyRecommendations: recommendations.slice(0, 5),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      inputs,
    };
  }
}
