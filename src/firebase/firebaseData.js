import db from "./firebase";
import {
	collection,
	getDocs,
	query,
	where,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Reference from "pastriesData" collection database
// Images taken from unsplash.com
const pastriesRef = collection(db, "pastriesData");

export const getPastriesData = async () => {
	const pastries = [];
	try {
		const queries = query(pastriesRef, where("title", "!=", ""));
		const snapshot = await getDocs(queries);
		snapshot.forEach((data) => pastries.push({ ...data.data() }));
	} catch (error) {
		alert(error.message);
	}
	return pastries;
};
