import { Table, Button, Tag } from 'antd';

const TeacherTable = ({ teachers }) => {
    // Define columns for Ant Design Table
    const columns = [
        {
            title: 'Mã', // Code
            dataIndex: 'code',
            key: 'code',
            responsive: ['md'],
        },
        {
            title: 'Giáo viên', // Teacher
            key: 'user',
            render: (text, record) => (
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        {/* Placeholder image for profile picture */}
                        <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={`https://placehold.co/40x40/cbd5e1/4a5568?text=${record.name ? record.name.charAt(0) : 'N/A'}`}
                            alt={`${record.name ? record.name : 'Unknown'}'s profile`}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/cbd5e1/4a5568?text=N/A'; }} // Fallback
                        />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{record.name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{record.email || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{record.phoneNumber || 'N/A'}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Trình độ cao nhất', // Highest Degree
            key: 'degrees',
            responsive: ['md'],
            render: (text, record) => (
                <div className="text-sm text-gray-900">
                    {record.degrees && record.degrees.length > 0
                        ? `${record.degrees[0].type}: ${record.degrees[0].school}`
                        : 'N/A'}
                </div>
            ),
        },
        {
            title: 'Bộ môn', // Subject - This field is not directly in your API response, keeping as N/A or you can map it from elsewhere
            dataIndex: 'subject',
            key: 'subject',
            responsive: ['lg'],
            render: () => 'N/A', // As 'subject' is not in the API response, default to N/A
        },
        {
            title: 'TT Công tác', // Work Status/Position
            key: 'teacherPositions',
            responsive: ['md'],
            render: (text, record) => (
                <div className="text-sm text-gray-900">
                    {record.teacherPositions && record.teacherPositions.length > 0
                        ? record.teacherPositions.map(pos => pos.name).join(', ')
                        : 'N/A'}
                </div>
            ),
        },
        {
            title: 'Địa chỉ', // Address
            dataIndex: 'address',
            key: 'address',
            responsive: ['md'],
            render: (address) => address || 'N/A',
        },
        {
            title: 'Trạng thái', // Status
            dataIndex: 'isActive',
            key: 'status',
            render: (isActive) => (
                <Tag color={isActive ? 'green' : 'red'} className="rounded-full text-xs font-semibold px-2 py-1">
                    {isActive ? 'Đang công tác' : 'Nghỉ việc'} {/* Working / Resigned */}
                </Tag>
            ),
        },
        {
            title: 'Hành động', // Action
            key: 'action',
            render: (text, record) => (
                <Button type="link" className="text-indigo-600 hover:!text-indigo-900 font-inter p-0">
                    Chi tiết {/* Details */}
                </Button>
            ),
        },
    ];

    return (
        <div className="bg-white rounded-lg w-full">
            <Table
                columns={columns}
                dataSource={teachers.map(teacher => ({ ...teacher, key: teacher.code }))}
                pagination={false}
                className="font-inter"
                scroll={{ x: 'max-content' }}
                rowKey="code"
            />
        </div>
    );
};

export default TeacherTable;