import { db } from "../database/firebase";
const geofire = require("geofire-common");

// Helper function to convert data to an appropriate form
export const convertFilters = (temp_filters, checkBoxes) => {
  temp_filters["foodType"] = [];
  temp_filters["attractionType"] = [];
  temp_filters["barClubType"] = [];

  for (const [key, value] of Object.entries(checkBoxes)) {
    switch (key) {
      case "maxPrice":
        temp_filters["maxPrice"] = value;
        break;
      case "Adventure":
        if (value === true) {
          temp_filters["attractionType"].push(key);
        }
        break;
      case "Arts":
        if (value === true) {
          temp_filters["attractionType"].push(key);
        }
        break;
      case "History & Culture":
        if (value === true) {
          temp_filters["attractionType"].push(key);
        }
        break;
      case "Nature & Wildlife":
        if (value === true) {
          temp_filters["attractionType"].push(key);
        }
        break;
      case "Leisure & Recreation":
        if (value === true) {
          temp_filters["attractionType"].push(key);
        }
        break;
      case "Bars":
        if (value === true) {
          temp_filters["barClubType"].push(key);
        }
        break;
      case "Clubs":
        if (value === true) {
          temp_filters["barClubType"].push(key);
        }
        break;
      case "Cafe":
        if (value === true) {
          temp_filters["foodType"].push(key);
        }
        break;
      case "Restaurants":
        if (value === true) {
          temp_filters["foodType"].push(key);
        }
        break;
      case "Hawker Centres":
        if (value === true) {
          temp_filters["foodType"].push(key);
        }
        break;
      default:
        break;
    }
  }

  return temp_filters;
};

// Function to retrieve locations based on filters from the database
export const getLocations = async (filters, current_user) => {
  const center = [filters.midPoint.latitude, filters.midPoint.longitude];
  const radiusInM = filters["radius"];

  const bounds = geofire.geohashQueryBounds(center, radiusInM);

  let allLocations = [];

  const promises = [];

  let attractionQuery;
  if (filters["attractionType"].length !== 0) {
    attractionQuery = db.collection("Attractions");

    attractionQuery = attractionQuery.where(
      "type",
      "in",
      filters["attractionType"]
    );

    for (const b of bounds) {
      const q = attractionQuery
        .orderBy("location.geohash")
        .startAt(b[0])
        .endAt(b[1]);

      promises.push(q.get());
    }
  }

  let barClubQuery;
  if (filters["barClubType"].length !== 0) {
    barClubQuery = db.collection("Bars & Clubs");

    barClubQuery = barClubQuery.where("type", "in", filters["barClubType"]);

    for (const b of bounds) {
      const q1 = barClubQuery
        .orderBy("location.geohash")
        .startAt(b[0])
        .endAt(b[1]);

      promises.push(q1.get());
    }
  }

  let foodQuery;
  if (filters["foodType"].length !== 0) {
    foodQuery = db.collection("Food & Beverages");

    foodQuery = foodQuery.where("type", "in", filters["foodType"]);

    for (const b of bounds) {
      const q2 = foodQuery
        .orderBy("location.geohash")
        .startAt(b[0])
        .endAt(b[1]);

      promises.push(q2.get());
    }
  }

  const snapshots = await Promise.all(promises);

  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const lat = doc.get("location.latitude");
      const lng = doc.get("location.longitude");

      // We have to filter out a few false positives due to GeoHash
      // accuracy, but most will match
      const distanceInKm = geofire.distanceBetween([lat, lng], center);
      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radiusInM) {
        allLocations.push(doc.data());
      }
    }
  }
  // var allLocationsSet = new Set(allLocations)
  // allLocations = Array.from(allLocationsSet)

  const allLocationsSet = new Set(allLocations);
  allLocations = Array.from(allLocationsSet);

  // Check secondary user history
  if (filters["secondaryUser"] !== null) {
    const second_user_id = filters["secondaryUser"].id;
    const second_user = await db.collection("Users").doc(second_user_id).get();
    const second_history = second_user.data().history;

    for (const i in second_history) {
      const loc = second_history[i];
      if (allLocations.some((item) => item.name === loc.name)) {
        const index = allLocations.findIndex((object) => {
          return object.name === loc.name;
        });

        allLocations.splice(index, 1);
      }
    }
  }

  // Check current user history
  const cur_history = current_user.history;

  for (const i in cur_history) {
    const loc1 = cur_history[i];
    if (allLocations.some((item) => item.name === loc1.name)) {
      const index = allLocations.findIndex((object) => {
        return object.name === loc1.name;
      });

      allLocations.splice(index, 1);
    }
  }

  return allLocations;
};
