import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/blogs.css";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BlogsEdit = () => {
    const { store } = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.BACKEND_URL}/api/post`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const result = await response.json();

                if (response.ok) {
                    setPosts(result.map(post => ({ ...post, date: new Date(post.date).toLocaleDateString() })));
                    // Se pone asi en lugar de setPosts(result) porque en JS en el front aparece la hora y así formatea la hora y escoge ese formato
                } else {
                    console.error("Error al obtener las publicaciones:", result);
                }
            } catch (error) {
                console.error("Error al obtener las publicaciones:", error);
            } finally {
                setLoading(false); // Establece loading a false después de obtener los datos
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (postId) => {
        try {
            const token = store.jwt_token;
            const response = await fetch(
                `${process.env.BACKEND_URL}/api/post/${postId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
    
            if (response.ok) {
                // Actualizar el estado de posts después de eliminar el post
                setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
                toast.success('Post eliminado')
            } else {
                toast.error("Error al eliminar el post");
                console.error("Error al eliminar el post. Código de estado:", response.status);
                const result = await response.text(); // Obtener el cuerpo de la respuesta como texto
                console.error("Mensaje de error:", result);
            }
        } catch (error) {
            console.error("Error al eliminar el post:", error);
            toast.error("Error al eliminar el post");
        }
    };

    const handleEdit = (postId) => {
        navigate(`/admin/edit/${postId}`, { replace: true });
    }

    return (
        <section className="container-fluid container-blog">
            <div className="row row-blog">
                {loading ? (
                    <p style={{ textAlign: "center", color: "rgb(5,76,132)"}}>Cargando...</p>
                ) : posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div className="card col-12 col-md-4 card-blog" key={index}>
                            <Link to={`/blog/${post.id}`}><img src={post.img} className="card-img-top img-blog" alt="imagen de post"/></Link>
                            <div className="row icons-blogs">
                                <button className="col-2 iconos-blogs" onClick={() => handleEdit(post.id)}><i className="fa-regular fa-pen-to-square"></i></button>
                                <button className="col-2 iconos-blogs" onClick={() => handleDelete(post.id)}><i className="fa-solid fa-trash"></i></button>
                            </div>
                            <div className="card-body">
                                <Link to={`/blog/${post.id}`} className="card-title title-blog" ><h5>{post.title}</h5></Link>
                                <p className="card-text date-blog">{post.date}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="container-fluid">
                        <h1 style={{ textAlign: "center", color: "rgb(5,76,132)"}} >No hay post publicados</h1>
                    </div>
                )}
            </div>
            <ToastContainer
                            position="bottom-right"
                            autoClose={1000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                            onClose="resolve"
                            />
        </section>
    );
};