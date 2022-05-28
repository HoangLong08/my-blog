import {
	collection,
	// query,
	getDocs,
	// where,
	// orderBy,
	// getDoc,
	// doc,
	addDoc,
} from "firebase/firestore";
import { db } from "firebaseConfig";

const addReportApi = async (idPost, idComment, descriptions) => {
	const add = await addDoc(collection(db, "posts"), {
		idPost: idPost,
		idComment: idComment,
		descriptions: descriptions
	});

	return add;
}

export { addReportApi }
