import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { NotData } from "assets/index";
import "./style.css";

function NoData({ des }) {
	const [noData, setNoData] = useState();

	useEffect(() => {
		setNoData(NotData);
		return () => setNoData();
	}, []);

	return (
		<div className="content-no-data">
			<Player
				autoplay
				loop
				src={noData}
				style={{ height: "200px", width: "200px" }}
			/>
			<p>{des}</p>
		</div>
	);
}

export default NoData;