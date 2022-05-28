import {
	collection,
	query,
	getDocs,
	where,
	addDoc,
	getDoc,
	doc,
	updateDoc,
	deleteDoc
} from "firebase/firestore";
import { db } from "firebaseConfig";

const getListCategoryApi = async (role) => {
	let queryCategory;

	if (role === "admin") {
		queryCategory = query(
			collection(db, "categories"),
		);
	} else {
		queryCategory = query(
			collection(db, "categories"),
			where("isActive", "==", true) // have active
		);
	}

	const queryPost = await getDocs(collection(db, "posts"));

	const arrPost = [];
	const arrCategory = [];
	await queryPost.forEach((docItem) => {
		arrPost.push({
			idPost: docItem.id,
			...docItem.data()
		});
	});

	const querySnapshotCategory = await getDocs(queryCategory);
	await querySnapshotCategory.forEach((docItem) => {
		arrCategory.push({
			id: docItem.id,
			...docItem.data()
		});
	});

	return arrCategory;
}

const getDetailCategoryApi = async (idCategory) => {
	const docRefCategory = doc(db, "categories", idCategory.trim());
	const docSnapCategory = await getDoc(docRefCategory);
	if (docSnapCategory.exists()) {
		return docSnapCategory.data()
	} else {
		return "404"
	}
}

const addCategoryApi = async (title) => {
	try {
		await addDoc(collection(db, "categories"), {
			createdAt: new Date(),
			title: title,
			isActive: true,
			updatedAt: new Date()
		});
	} catch (error) {

	}
}

const editCategoryApi = async (idCategory, title) => {
	try {
		const res = await updateDoc(doc(db, "categories", idCategory), {
			title: title,
			updatedAt: new Date()
		});
		return res;
	} catch (error) {

	}
}

const deleteCategoryApi = async (idCategory) => {
	try {
		await deleteDoc(doc(db, "categories", idCategory))
	} catch (error) {

	}
}

export { getListCategoryApi, getDetailCategoryApi, addCategoryApi, editCategoryApi, deleteCategoryApi }
