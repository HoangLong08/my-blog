import {
	collection,
	query,
	getDocs,
	where,
	limit,
	orderBy,
	// getDoc,
	// doc,
	// onSnapshot,
} from "firebase/firestore";
import { db } from "firebaseConfig";

const getOverviewApi = async (role) => {
	const queryUser = await getDocs(collection(db, "users"));
	const queryComment = await getDocs(collection(db, "comments"));

	const queryPost = query(
		collection(db, "posts"),
		where("isApprove", "==", true),
		orderBy('viewer', 'desc'),
		limit(5)
	);

	const queryTotalPost = query(
		collection(db, "posts"),
		where("isApprove", "==", true),
	);
	const arrTotalPost = [];
	const querySnapshotTotalPost = await getDocs(queryTotalPost);
	await querySnapshotTotalPost.forEach((docItem) => {
		arrTotalPost.push({ ...docItem.data(), id: docItem.id });
	});

	const arrPost = [];
	const arrUser = [];
	const arrComment = [];
	const resArr = [];

	const querySnapshotPost = await getDocs(queryPost);
	await querySnapshotPost.forEach((docItem) => {
		arrPost.push({ ...docItem.data(), id: docItem.id });
	});

	await queryUser.forEach((docItem) => {
		arrUser.push({
			idUser: docItem.id,
			avatar: docItem.data().avatar,
			fullName: docItem.data().fullName
		});
	});

	await queryComment.forEach((docItem) => {
		arrComment.push({ ...docItem.data(), id: docItem.id });
	});

	arrPost.forEach(itemPost => {
		let newObj = {}
		arrUser.forEach(itemUser => {
			if (itemPost.idUser.trim() === itemUser.idUser.trim()) {
				newObj = {
					...itemPost,
					...itemUser
				}
			}
		})
		resArr.push(newObj);
	})

	return {
		totalPost: arrTotalPost.length,
		totalComment: arrComment.length,
		totalUser: arrUser.length,
		listTopPostMostView: resArr

	};
}

export { getOverviewApi }
