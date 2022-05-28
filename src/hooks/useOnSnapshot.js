import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";

function useOnSnapshot(query, idPost) {
	const [data, setData] = useState([]);
	useEffect(() => {
		onSnapshot(query, (querySnapshot) => {
			const arr = [];
			querySnapshot.forEach((docItem) => {
				arr.push({ ...docItem.data(), id: docItem.id });
			});
			setData(arr);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idPost]);
	return data;
}

export default useOnSnapshot;
