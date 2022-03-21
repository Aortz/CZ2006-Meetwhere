import { db } from "../database/firebase";
import firebase from "firebase/compat/app";

export const fetchComplementary = async (locationDetail) => {
  const category = locationDetail.categoryDescription;
  let collection = "Attractions";
  let length = 350;
  if (category === "Bars & Clubs") {
    collection = "Attractions";
    length = 350;
  } else if (category === "Attractions") {
    collection = "Food & Beverages";
    length = 500;
  } else {
    collection = "Bars & Clubs";
    length = 100;
  }

  const randomIndexList = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * length);
    randomIndexList.push(randomIndex.toString());
  }

  const results = await db
    .collection(collection)
    .where(firebase.firestore.FieldPath.documentId(), "in", randomIndexList)
    .get();

  return results;
};
