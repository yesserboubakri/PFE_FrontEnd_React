import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaRoad,
  FaGasPump,
  FaCalendarAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaComments,
  FaUser,
} from "react-icons/fa";
import { TbManualGearboxFilled } from "react-icons/tb";
import { RiMessage2Fill } from "react-icons/ri";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

const ProfilePage = () => {
  const { id } = useParams();
  const history = useHistory();

  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/car/getCarById/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => console.error("Erreur:", err));

    axios
      .get(`http://localhost:5000/Comments/getAllComments?carId=${id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Erreur commentaire:", err));
  }, [id]);

  if (!car)
    return (
      <div className="text-center mt-32 text-xl">Chargement de l'annonce...</div>
    );

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === car.Car_image.length - 1 ? 0 : prev + 1
    );
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? car.Car_image.length - 1 : prev - 1
    );
  };

  const handleSubmitComment = async () => {
    const user = JSON.parse(localStorage.getItem("user_9antra"));
    if (!user || !user._id || !comment.trim()) return;
    try {
      await axios.post("http://localhost:5000/Comments/createComment", {
        content: comment,
        user: user._id,
        car: id,
      });
      setComment("");
      const res = await axios.get(
        `http://localhost:5000/Comments/getAllComments?carId=${id}`
      );
      setComments(res.data);
    } catch (err) {
      console.error("Erreur lors de l'ajout du commentaire:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/Comments/deleteComment/${commentId}`
      );
      const res = await axios.get(
        `http://localhost:5000/Comments/getAllComments?carId=${id}`
      );
      setComments(res.data);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const handleContactSeller = () => {
    const user = JSON.parse(localStorage.getItem("user_9antra"));
    if (!user || !user._id) {
      alert("يرجى تسجيل الدخول أولاً");
      return;
    }
    history.push(`/chat/${id}/${user._id}/${car.owner}`);
  };

  const carSpecs = [
    { icon: <FaRoad style={{ color: "#b91c1c", fontSize: "28px" }} />, label: "Kilométrage", value: `${car.kilometrage} km` },
    { icon: <FaGasPump style={{ color: "#b91c1c", fontSize: "28px" }} />, label: "Carburant", value: car.fuel },
    { icon: <FaCalendarAlt style={{ color: "#b91c1c", fontSize: "28px" }} />, label: "Année", value: car.Annee },
    { icon: <TbManualGearboxFilled style={{ color: "#b91c1c", fontSize: "28px" }} />, label: "Transmission", value: car.boite },
    { icon: <FaCheckCircle style={{ color: "#b91c1c", fontSize: "28px" }} />, label: "État", value: car.etat },
  ];

  const styles = {
    priceContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      gap: "8px",
      margin: "20px 0",
    },
    priceTag: {
      marginTop: "50px",
      fontSize: "50px",
      fontWeight: "700",
      color: "#000000",
      marginBottom: "8px",
      textAlign: "center",
    },
    priceUnit: {
      fontSize: "30px",
      fontWeight: "400",
      color: "#4b5563",
    },
    specsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginBottom: "30px",
      marginLeft: "20px",
    },
    specItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "24px",
      backgroundColor: "#dee2e6",  // changed to #dee2e6 here
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      marginBottom: "12px",
    },
    specLabel: {
      fontSize: "22px",
      color: "#000000",
      fontWeight: "700",
    },
    specValue: {
      fontSize: "22px",
      color: "#000000",
      fontWeight: "700",
      marginLeft: "auto",
    },
    descriptionSection: {
      marginTop: 0,
      marginBottom: "30px",
      padding: "20px",
      backgroundColor: "#dee2e6",  // changed to #dee2e6 here
      borderRadius: "15px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      border: "1px solid #e5e7eb",
      marginLeft: 0,
      maxWidth: "800px",
    },
    descriptionParagraph: {
      marginBottom: "30px",
      fontSize: "30px",
      lineHeight: "1.6",
      color: "#1f2937",
      marginLeft: '30px'
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#000000",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    carModelTitle: {
      fontSize: "42px",
      fontWeight: "900",
      color: "#000000",
      textShadow: "2px 2px 8px rgba(0,0,0,0.2)",
      marginBottom: "32px",
      textAlign: "center",
      letterSpacing: "2px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textTransform: "uppercase",
      marginTop: "100px",
    },
    contactButton: {
      backgroundColor: "#b91c1c",
      color: "white",
      border: "none",
      borderRadius: "12px",
      padding: "16px 32px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      justifyContent: "center",
      width: "100%",
      maxWidth: "320px",
      marginTop: "60px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    commentItem: {
      backgroundColor: "#dee2e6",  // changed to #dee2e6 here
      borderRadius: "15px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      border: "1px solid #e5e7eb",
      marginLeft: "10px",
    },
    commentHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      marginLeft: "10px",
    },
    commentAuthor: {
      fontWeight: "600",
      color: "#000000",
      fontSize: "14px",
    },
    commentDate: {
      fontSize: "12px",
      color: "#4b5563",
    },
    commentText: {
      fontSize: "15px",
      color: "#4b5563",
      lineHeight: "1.5",
      marginBottom: "10px",
    },
    deleteButton: {
      backgroundColor: "transparent",
      color: "#b91c1c",
      border: "1px solid #b91c1c",
      borderRadius: "6px",
      padding: "6px 12px",
      fontSize: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    commentForm: {
      marginTop: "20px",
      borderTop: "1px solid #e5e7eb",
      paddingTop: "20px",
    },
    textarea: {
      width: "100%",
      minHeight: "100px",
      padding: "15px",
      border: "2px solid #e5e7eb",
      borderRadius: "12px",
      fontSize: "15px",
      fontFamily: "inherit",
      resize: "vertical",
      outline: "none",
      transition: "border-color 0.3s ease",
      marginBottom: "15px",
      backgroundColor: "#dee2e6" // textarea bg
    },
    submitButton: {
      backgroundColor: "#b91c1c",
      color: "white",
      border: "none",
      borderRadius: "12px",
      padding: "12px 24px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };

  return (
    <>
      <IndexNavbar fixed />
      <main
        className="min-h-screen text-gray-900 px-4 md:px-8 lg:px-16 py-12"
        style={{ backgroundColor: "#dee2e6" }}
      >
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-block mb-6 text-gray-600 hover:text-gray-900 transition"
          >
            ← Retour à l'accueil
          </Link>

          <div
            className="flex flex-col lg:flex-row gap-12 rounded-xl shadow-lg p-8"
            style={{ backgroundColor: "#dee2e6" }}
          >
            {/* Left side: Image + Comments + Comment Form */}
            <div className="flex flex-col" style={{ width: "800px" }}>
              {/* Image and navigation */}
              <div
                style={{
                  minHeight: "350px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h1 style={styles.carModelTitle}>{car.model}</h1>
                <img
                  src={`http://localhost:5000/files/${car.Car_image[currentImageIndex]}`}
                  alt={car.model}
                  className="object-cover w-full h-full rounded-lg"
                  loading="lazy"
                  draggable={false}
                />
                <div className="mt-2 flex justify-between">
                  <button
                    aria-label="Image précédente"
                    onClick={prevImage}
                    className="bg-black text-white text-3xl px-4 rounded"
                    type="button"
                    style={{ backgroundColor: "#b91c1c" }}
                  >
                    ‹
                  </button>
                  <button
                    aria-label="Image suivante"
                    onClick={nextImage}
                    className="bg-black text-white text-3xl px-4 rounded"
                    type="button"
                    style={{ backgroundColor: "#b91c1c" }}
                  >
                    <div className="text-3xl">›</div>
                  </button>
                </div>
              </div>

              <div style={{ marginTop: "40px" }}>
                <h3 style={styles.sectionTitle}>
                  <FaComments style={{ color: "#b91c1c", fontSize: "28px" }} /> Commentaires ({comments.length})
                </h3>

                <div>
                  {comments.length === 0 ? (
                    <div
                      style={{
                        backgroundColor: "#dee2e6",
                        borderRadius: "15px",
                        padding: "20px",
                        border: "1px solid #e5e7eb",
                        color: "#4b5563",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      }}
                    >
                      Aucun commentaire pour cette annonce. Soyez le premier à commenter !
                    </div>
                  ) : (
                    comments.map((c) => (
                      <div key={c._id} style={styles.commentItem}>
                        <div style={styles.commentHeader}>
                          <div
                            style={{
                              ...styles.commentAuthor,
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <FaUser style={{ fontSize: "18px", color: "#b91c1c" }} />
                            {c.user?.username || "Utilisateur"}
                          </div>
                          <div style={styles.commentDate}>
                            {new Date(c.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                        <div style={styles.commentText}>{c.content}</div>
                        {(JSON.parse(localStorage.getItem("user_9antra"))?._id === c.user?._id ||
                          JSON.parse(localStorage.getItem("user_9antra"))?.role === "admin") && (
                            <button
                              onClick={() => handleDeleteComment(c._id)}
                              style={styles.deleteButton}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#2563eb";
                                e.target.style.color = "white";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#b91c1c";
                              }}
                            >
                              Supprimer
                            </button>
                          )}
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Form below comments */}
                <div style={styles.commentForm}>
                  <h2
                    style={{
                      ...styles.sectionTitle,
                      fontSize: "18px",
                      marginBottom: "15px",
                      color: "#000000",
                    }}
                  >
                    Écrire un commentaire
                  </h2>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Votre commentaire ici..."
                    style={styles.textarea}
                  />
                  <button
                    onClick={handleSubmitComment}
                    style={styles.submitButton}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#9b1c1c" )}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#b91c1c")}
                  >
                    Publier le commentaire
                  </button>
                </div>
              </div>
            </div>

            {/* Right side: Price + Specs + Description + Contact button */}
            <div style={{ flex: 1 }}>
              <div style={styles.detailsSection}>
                <div style={styles.carCard}>
                  <div>
                    <div style={styles.priceContainer}>
                      <div style={styles.priceTag}>{car.prix}</div>
                      <div style={styles.priceUnit}>DT</div>
                    </div>

                    <div style={styles.specsGrid}>
                      {carSpecs.map((spec, index) => (
                        <div key={index} style={styles.specItem}>
                          {spec.icon}
                          <div>
                            <div style={styles.specLabel}>{spec.label}</div>
                          </div>
                          <span style={styles.specValue}>{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    <div style={styles.descriptionSection}>
                      <h3 style={styles.sectionTitle}>
                        <FaInfoCircle style={{ color: "#b91c1c", fontSize: "30px" }} /> Description
                      </h3>
                      <p style={styles.descriptionParagraph}>{car.description}</p>

                      <button
                        style={{ ...styles.contactButton, marginTop: "60px", marginLeft: "auto", marginRight: "50px" }}
                        onClick={handleContactSeller}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#9b1c1c")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#b91c1c")}
                      >
                        <RiMessage2Fill style={{ color: "white", fontSize: "22px" }} /> Contacter le vendeur
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
