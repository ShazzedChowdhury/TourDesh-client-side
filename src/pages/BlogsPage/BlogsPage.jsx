import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/loading';
import Section from '../../components/Section';
import BlogCard from './BlogCard';

const BlogsPage = () => {
    const axiosPublic = useAxiosPublic();
    const { data: blogs = [], isLoading } = useQuery({
      queryKey: ["blogs"],
      queryFn: async () => {
        const res = await axiosPublic("/blogs");
        return res.data;
      },
    });

    if (isLoading) return <Loading />;
    console.log(blogs)
    return (
       <Section style={"mt-40"}>
         {
            blogs.map(blog => {
                return <BlogCard key={blog?._id} blog={blog} />;
            })
         }
       </Section>
    );
};

export default BlogsPage;