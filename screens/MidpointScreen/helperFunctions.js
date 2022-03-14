import { db } from "../database/firebase";
import geohash from "ngeohash";

// check if key already inside
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

const getGeohashRange = (latitude, longitude, distance) => {
  const lat = 0.000009009; // degrees latitude per m
  const lon = 0.00001129766; // degrees longitude per m

  const lowerLat = latitude - lat * distance;
  const lowerLon = longitude - lon * distance;

  const upperLat = latitude + lat * distance;
  const upperLon = longitude + lon * distance;

  const lower = geohash.encode(lowerLat, lowerLon);
  const upper = geohash.encode(upperLat, upperLon);

  return {
    lower,
    upper,
  };
};

export const getLocations = async (filters, current_user) => {
  const range = getGeohashRange(
    filters.midPoint.latitude,
    filters.midPoint.longitude,
    filters["radius"]
  );

  const allLocations = [];

  let attractionQuery;
  if (filters["attractionType"].length !== 0) {
    attractionQuery = db.collection("Attractions");

    attractionQuery = attractionQuery.where(
      "type",
      "in",
      filters["attractionType"]
    );

    attractionQuery = attractionQuery
      .where("location.geohash", ">=", range.lower)
      .where("location.geohash", "<=", range.upper);

    const result = await attractionQuery.get();

    for (const doc of result.docs) {
      allLocations.push(doc.data());
    }
  }

  let barClubQuery;
  if (filters["barClubType"].length !== 0) {
    barClubQuery = db.collection("Bars & Clubs");

    barClubQuery = barClubQuery.where("type", "in", filters["barClubType"]);

    barClubQuery = barClubQuery
      .where("location.geohash", ">=", range.lower)
      .where("location.geohash", "<=", range.upper);

    const result1 = await barClubQuery.get();

    for (const doc of result1.docs) {
      allLocations.push(doc.data());
    }
  }

  let foodQuery;
  if (filters["foodType"].length !== 0) {
    foodQuery = db.collection("Food & Beverages");

    foodQuery = foodQuery.where("type", "in", filters["foodType"]);

    foodQuery = foodQuery
      .where("location.geohash", ">=", range.lower)
      .where("location.geohash", "<=", range.upper);

    const result2 = await foodQuery.get();

    for (const doc of result2.docs) {
      allLocations.push(doc.data());
    }
  }

  // Check secondary user history
  if (filters["secondaryUser"] !== null) {
    const second_user_id = filters["secondaryUser"].id;
    const second_user = await db.collection("Users").doc(second_user_id).get();
    const second_history = second_user.data().history;

    for (const loc in second_history) {
      if (allLocations.includes(loc)) {
        const index = allLocations.indexOf(loc);
        allLocations.splice(index, 1);
      }
    }
  }

  // Check current user history
  const cur_history = current_user.history;

  for (const loc in cur_history) {
    if (allLocations.includes(loc)) {
      const index = allLocations.indexOf(loc);
      allLocations.splice(index, 1);
    }
  }

  return allLocations;
};
