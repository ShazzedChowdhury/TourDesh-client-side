import React from 'react';
import { useNavigate } from 'react-router';
import BlogTable from '../BlogTable';
import useRole from '../../hooks/useRole';

const ContentManagement = () => {
    const navigate = useNavigate();
    const {role} = useRole();
    return (
      <div className="w-full h-full">
        <div className="w-full text-right">
          <button
            disabled={role !== "admin" ? true : false}
            onClick={() => navigate("/dashboard/content-management/add-blog")}
            className="btn btn-primary text-white"
          >
            Add Blog
          </button>
        </div>
        <BlogTable />
      </div>
    );
};

export default ContentManagement;