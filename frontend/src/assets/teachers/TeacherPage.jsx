import React, { useState, useEffect } from 'react';
import { Pagination, Spin, Alert, Form } from 'antd';
import axios from 'axios';
import TeacherTable from './subcomponents/TeacherTable';
import Header from './subcomponents/TeacherHeader';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;




const TeacherPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [teachersData, setTeachersData] = useState({ data: [], total: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [isDrawerVisible, setIsDrawerVisible] = useState(false); // State for drawer visibility
    const [form] = Form.useForm(); // Ant Design form instance

    const apiUrl = `${API_BASE_URL}/teachers?page=${currentPage}&limit=${pageSize}`;

    const fetchTeachers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(apiUrl);
            const result = response.data; // Axios wraps the response in a 'data' property

            if (result.message === "success" && Array.isArray(result.data)) {
                setTeachersData({
                    data: result.data,
                    totalRecords: result.totalRecords
                });
            } else {
                throw new Error("Invalid API response format");
            }
        } catch (err) {
            console.error("Error fetching teachers:", err);
            // Axios errors have a 'response' property for HTTP errors
            setError(err.response?.data?.message || err.message || "Failed to load teachers data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, [currentPage, pageSize]);

    const handlePageChange = (page, newPageSize) => {
        setCurrentPage(page);
        setPageSize(newPageSize);
    };

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onCloseDrawer = () => {
        setIsDrawerVisible(false);
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 font-inter">
            <Header onRefresh={fetchTeachers} onCreateNew={showDrawer} />
            {loading && (
                <div className="flex justify-center items-center h-48">
                    <Spin size="large" tip="Đang tải dữ liệu..." />
                </div>
            )}
            {error && (
                <Alert
                    message="Lỗi"
                    description={error}
                    type="error"
                    showIcon
                    className="mb-4"
                />
            )}
            {!loading && !error && (
                <>
                    <TeacherTable teachers={teachersData.data} />
                    <div className="flex flex-row items-center justify-end mt-2 px-4 py-3 bg-white text-sm font-inter">
                        <div className="text-gray-600 m-0">
                            Tổng {teachersData.totalRecords}
                        </div>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={teachersData.totalRecords}
                            onChange={handlePageChange}
                            showSizeChanger
                            pageSizeOptions={['10', '20', '50']}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default TeacherPage;
