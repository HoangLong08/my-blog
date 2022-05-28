import {
	collection,
	// query,
	getDocs,
	// where,
	// orderBy,
	// getDoc,
	// doc,
	// addDoc,
} from "firebase/firestore";
import { db } from "firebaseConfig";

const getAllUserApi = async () => {
	const queryUser = await getDocs(collection(db, "users"));
	const arrUser = [];
	await queryUser.forEach((docItem) => {
		arrUser.push({
			idUser: docItem.id,
			...docItem.data()
		});
	});
	return arrUser;
}

export { getAllUserApi }
