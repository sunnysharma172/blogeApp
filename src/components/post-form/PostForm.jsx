import React from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select} from "../index"
import appwrteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function PostForm({post}) {
    const {register,handleSubmit, watch, setValue,control,getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.slug || '',
            featuredImage: post?.featuredImage || '',
            status: post?.status || 'draft'
        },
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.user.userData)
    const submit = async (data) => {
        try {
            if (post) {
                // Update existing post
                await appwrteService.updatePost(post.slug, {
                    title: data.title,
                    content: data.content,
                    featuredImage: data.featuredImage,
                    status: data.status
                });
            } else {
                // Create new post
                await appwrteService.createPost(
                    data.title,
                    data.content,
                    data.slug,
                    data.featuredImage,
                    data.status,
                    userData.$id
                );
            }
            navigate('/posts');
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    }
    return (
        <div></div>
    )
}

export default PostForm
