// src/pages/Blogs.jsx

import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import BlogCard from '../components/BlogCard.jsx';
import BlogSkeleton from '../components/BlogSkeleton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs, adminDeleteBlogs, searchBlogs, setLastFetchedQuery, categoryFilter } from '../redux/blogSlice.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const Blogs = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';
  const { blogs, searchResults, loading , categoryBlogs} = useSelector((state) => state.blog);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const lastFetchedQuery = useSelector(state => state.blog.lastFetchedQuery);
  useEffect(() => {
    const currentQuery = { search: searchQuery, category: categoryQuery };
    if (JSON.stringify(currentQuery) === JSON.stringify(lastFetchedQuery)) {
      return;
    }
    if (searchQuery) {
      dispatch(searchBlogs({ search: searchQuery}));      
    }
    else if(categoryQuery  && categoryQuery !== lastFetchedQuery?.category)
      {
        dispatch(categoryFilter({category: categoryQuery}));
      } 
    else {
      if (blogs.length === 0 ) {
        dispatch(fetchAllBlogs());
      }
    }
      dispatch(setLastFetchedQuery(currentQuery));

  }, [dispatch, searchQuery, categoryQuery, blogs.length]);

  const handleDeleteClick = (id) => {
    setSelectedBlogId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(adminDeleteBlogs(selectedBlogId)).unwrap();
      toast.success('Blog deleted successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to delete blog.');
    } finally {
      setShowModal(false);
      setSelectedBlogId(null);
    }
  };

  let visibleBlogs = searchQuery ? searchResults : (categoryQuery?categoryBlogs: blogs);  
  const showNoBlogsFound = !loading && visibleBlogs.length === 0;

  return (
    <div className="text-white">
      {showNoBlogsFound ? (
        <div
          className="flex flex-col items-center justify-center text-white"
          style={{ height: 'calc(90vh - 4rem)' }}
        >
          <p className="text-lg sm:text-3xl font-medium mb-2">No blogs found.</p>
          <p className="text-sm sm:text-xl font-thin text-white">
            Try a different keyword or check back later.
          </p>
        </div>
      ) : (
        <div className="w-full px-10 mt-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <BlogSkeleton key={i} />)
              : visibleBlogs.map((blog) => (
                  <BlogCard key={blog._id} {...blog} onDelete={handleDeleteClick} />
                ))}
          </div>
        </div>
      )}

      {showModal && (
        <ConfirmDeleteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Blogs;
