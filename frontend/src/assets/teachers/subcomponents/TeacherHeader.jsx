import { Input, Button } from 'antd';
import { SearchOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
const Header = ({ onRefresh, onCreateNew }) => {
    return (
        <div className="flex flex-row items-center justify-end mb-4 gap-4 w-full sm:w-auto">
            <Input
                placeholder="Tìm kiếm..." // Search...
                allowClear
                style={{ width: '100%', maxWidth: '256px' }}
                prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />} // AntD icon
            />
            <Button
                type="primary"
                icon={<RedoOutlined />}
                onClick={onRefresh}
            >
                Tải lại
            </Button>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={onCreateNew}
            >
                Tạo mới
            </Button>
        </div>
    );
};

export default Header;