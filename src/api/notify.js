import {
	collection,
	// query,
	// getDocs,
	// where,
	// orderBy,
	// getDoc,
	// doc,
	addDoc,
} from "firebase/firestore";
import { db } from "firebaseConfig";

const addNotifyApi = async (idUser, idPost, content) => {
	await addDoc(collection(db, "notifications"), {
		createdAt: new Date(),
		idUser: idUser.trim(),
		idPost: idPost.trim(),
		isRead: false,
		content: content.trim(),
	});
}

export { addNotifyApi }
