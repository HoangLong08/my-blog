import React from 'react'
import { Tabs, Spin } from 'antd';
import ItemPost from './ItemPost';

const { TabPane } = Tabs;

function Bookmark() {
	return (
		<div>
			<div>
				<Tabs defaultActiveKey="1" size={"large"}>
					<TabPane tab={"Bài viết (" + 2 + ")"} key="1">
						{/* <h1>Bạn chưa lưu bài viết nào.</h1> */}
						<ItemPost
							id={1}
							title={"Những cách để tiến bộ vượt bậc trong lĩnh vực IT"}
							time={"2"}
							timeRead={"2"}
							type="bookmark"
						/>
					</TabPane>
				</Tabs>
			</div>
		</div>
	)
}

export default Bookmark