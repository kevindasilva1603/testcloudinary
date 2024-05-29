"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Image as CldImage } from "cloudinary-react";

const Gallery = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios
            .get("/api/projects")
            .then((response) => setProjects(response.data.data))
            .catch((error) => console.error("Error fetching projects:", error));
    }, []);

    return (
        <div className='bg-[#1b1b1d] text-white min-h-screen p-12'>
            <h1 className='text-4xl mb-8 text-center'>Gallery</h1>
            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <Link
                            legacyBehavior
                            key={project._id}
                            href={`/works/${project.category}/${project.slug}`}
                            passHref>
                            <a className='bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer'>
                                <div className='relative w-full h-56 mb-4'>
                                    <CldImage
                                        cloudName={
                                            process.env
                                                .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                                        }
                                        publicId={project.image}
                                        width='300'
                                        height='300'
                                        crop='scale'
                                        alt={project.titre}
                                        className='w-full h-full object-cover rounded-t-lg'
                                    />
                                </div>
                                <div className='p-4'>
                                    <h3 className='text-xl text-white font-bold mb-2'>
                                        {project.titre}
                                    </h3>
                                </div>
                            </a>
                        </Link>
                    ))
                ) : (
                    <p className='text-center col-span-full'>
                        Aucun projet à afficher
                    </p>
                )}
            </div>
            <div className='text-center mt-8'>
                <Link legacyBehavior href='/' passHref>
                    <a className='inline-block bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                        Return to home
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Gallery;
