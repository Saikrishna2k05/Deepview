import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ThumbnailUpload from '../components/ThumbnailUpload';
import BlogWriteSkeleton from '../components/BlogWriteSkeleton.jsx'

const EditBlog = () => {
  const { id } = useParams();
  const editor = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      subtitle: '',
      description: '',
      thumbnail: '',
      category: '',
    },
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/blog/${id}`, { withCredentials: true });
        const blog = res.data.blog;
        reset({
          title: blog.title,
          subtitle: blog.subtitle,
          description: blog.description,
          thumbnail: blog.thumbnail,
          category: blog.category,
        });
      } catch (err) {
        toast.error("Failed to load blog data.");        
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  const onSubmit = async ({ title, subtitle, description, thumbnail, category }) => {
    try {
      const response=await axios.put(`http://localhost:3000/blog/editBlog/${id}` , { title, subtitle, description, thumbnail, category }, { headers: { "Content-Type": "application/json" }, withCredentials: true })
      if(!response.data.success)
      {
        toast.error(response.data.message);
      }
      toast.success("Blog updated successfully!");
    } catch (err) {
      if (Array.isArray(err.errorMessages)) {
        err.errorMessages.forEach((msg) => toast.error(msg));
      } else {
        toast.error(err.message || "Something went wrong.");
      }
    }
  };

  if (loading) {
    return Array.from({length: 3}).map((_, i)=>(<BlogWriteSkeleton key={i}/>));
  }

  return (
    <div className="text-white m-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <header className="w-full h-16 bg-[#111] border border-[#2a2a2a] rounded-xl flex items-center">
          <input
            type="text"
            {...register('title', { required: true })}
            placeholder="Your Blog Title Here..."
            className="w-full text-3xl font-extrabold h-10 rounded-xl outline-none p-5 bg-transparent text-white"
          />
        </header>

        <section className="w-full h-14 bg-[#111] border border-[#2a2a2a] rounded-xl flex items-center">
          <input
            type="text"
            {...register('subtitle', { required: true })}
            placeholder="Write a subtitle..."
            className="w-full text-xl font-medium h-10 rounded-xl outline-none p-5 bg-transparent text-white"
          />
        </section>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <JoditEditor
              ref={editor}
              value={field.value}
              onBlur={(newContent) => field.onChange(newContent)}
              config={{
                theme: 'midnight',
                readonly: false,
                height: 400,
                toolbarSticky: false,
                toolbarButtonSize: 'middle',
                buttons: [
                  'bold', 'italic', 'underline', '|',
                  'ul', 'ol', '|',
                  'font', 'fontsize', 'brush', 'paragraph', '|',
                  'align', 'undo', 'redo', '|',
                  'hr', 'link', 'image', 'video', '|'
                ],
                uploader: {
                  insertImageAsBase64URI: true,
                },
                showCharsCounter: false,
                showWordsCounter: false,
                showXPathInStatusbar: false,
              }}
            />
          )}
        />

        <Controller
          name="thumbnail"
          control={control}
          render={({ field }) => (
            <ThumbnailUpload field={field} />
          )}
        />

        <div className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl p-4">
          <label className="block text-white text-lg mb-2">Select Category</label>
          <select
            {...register('category', { required: true })}
            className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-white outline-none"
          >
            <option value="" disabled>Select a category</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Tech">Tech</option>
            <option value="Education">Education</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-black bg-[#01b19d] hover:bg-[#01a18c] rounded-xl border border-[#2a2a2a] cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
