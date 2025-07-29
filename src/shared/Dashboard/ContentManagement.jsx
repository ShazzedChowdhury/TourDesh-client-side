import React from 'react';
import { useNavigate } from 'react-router';

const ContentManagement = () => {
    const navigate = useNavigate();
    return (
      <div className="w-full h-full">
        <div className='w-full text-right'>
          <button
            onClick={() => navigate("/dashboard/content-management/add-blog")}
            className='btn btn-primary text-white'
          >
            Add Blog
          </button>
        </div>
      </div>
    );
};

export default ContentManagement;