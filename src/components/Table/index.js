import React from 'react'
import { Table as TableComponent } from 'antd';

function Table({ data, tableHead, loading, pagination = true }) {
	return (
		<>
			<TableComponent bordered dataSource={data} columns={tableHead} loading={loading} pagination={pagination} />
		</>
	)
}

export default Table