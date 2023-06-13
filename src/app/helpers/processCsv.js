const processCsv = (objectData) => {
  try {
    const { drones, locations } = cleanData(objectData);
    const result = assignTrips(drones, locations);
    return result;
  } catch (error) {
    return null;
  }
};

const sortObjectDescending = (obj) => {
  const sortedArray = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  const sortedObject = Object.fromEntries(sortedArray);
  return sortedObject;
};

const cleanData = (object) => {
  // Clean and define drones object
  const drones = {};
  const initialDrones = object[0];
  if (initialDrones) {
    for (let i = 0; i < initialDrones.length; i += 2) {
      const key = initialDrones[i]?.trim()?.replace(/\[|\]/g, "");
      const value = Number(initialDrones[i + 1]?.trim()?.replace(/\[|\]/g, ""));
      drones[key] = value;
    }
  }

  // Clean and define locations object
  const locations = {};
  if (object.length > 0) {
    // we remove the first element of the array because they are the available drones
    object.shift();
    const initialLocations = object;
    for (let i = 0; i < initialLocations.length; i++) {
      const key = initialLocations[i][0]?.trim()?.replace(/\[|\]/g, "");
      const value = Number(
        initialLocations[i][1]?.trim()?.replace(/\[|\]/g, "")
      );

      locations[key] = value;
    }
  }

  return {
    drones: sortObjectDescending(drones),
    locations: sortObjectDescending(locations),
  };
};

const assignTrips = (drones, locations) => {
  const trips = {};
  // Initialize trips object for each drone
  for (const [drone] of Object.entries(drones)) {
    trips[drone] = {};
  }

  // Assign locations to drones
  for (const [location, weight] of Object.entries(locations)) {
    let assigned = false;

    // Iterate through drones in descending order of capacity
    for (const [drone, capacity] of Object.entries(drones)) {
      const droneTrips = trips[drone];

      // Find the trip with enough remaining capacity or create a new trip
      const trip = Object.values(droneTrips).find(
        (trip) =>
          trip.reduce((total, loc) => total + locations[loc], 0) + weight <=
          capacity
      );

      if (trip) {
        trip.push(location);
        assigned = true;
        break;
      }
    }

    // If no existing trip can accommodate the location, create a new trip for the first drone
    if (!assigned) {
      const firstDrone = Object.entries(drones)[0][0];
      const droneTrips = trips[firstDrone];
      const tripNumber = Object.keys(droneTrips).length + 1;
      droneTrips[`trip${tripNumber}`] = [location];
    }
  }

  return trips;
};

export default processCsv;
