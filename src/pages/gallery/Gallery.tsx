import React, { useState } from "react";
import CustomModal from "../../components/shared/CustomModal/CustomModal";
import { IoMdCloseCircle } from "react-icons/io";
import "./Gallery.css";

interface ItemData {
  img: string;
  title: string;
}

const itemData: ItemData[] = [
  {
    img: "hamburger.jpg",
    title: "Burger",
  },
  {
    img: "salchipapas.jpg",
    title: "Salchipapa",
  },
  {
    img: "side-dish.jpg",
    title: "Burger",
  },
  {
    img: "tibetan-tsampa.jpg",
    title: "Tsampa",
  },
  {
    img: "food.jpg",
    title: "Fern",
  },
  {
    img: "soba.jpg",
    title: "Soba",
  },
  {
    img: "sushi.jpg",
    title: "Sushi",
  },
  {
    img: "pizza.jpg",
    title: "Pizza",
  },
  {
    img: "lasagna.jpg",
    title: "Lasagna",
  },
  {
    img: "breakfast.jpg",
    title: "Breakfast",
  },
  {
    img: "panipuri.jpg",
    title: "Panipuri",
  },
  {
    img: "creme-caramel.jpg",
    title: "Creme caramel",
  },
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="image-grid">
        {itemData.map((item) => (
          <div
            key={item.img}
            role="button"
            onClick={() => handleImageClick(item.img)}
          >
            <img src={item.img} alt={item.title} loading="lazy" />
          </div>
        ))}
      </div>

      {selectedImage && isModalOpen && (
        <CustomModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
          <IoMdCloseCircle
            className="close-modal-icon"
            onClick={() => setSelectedImage(null)}
          />
          <img src={selectedImage} alt="Selected gallery" />
        </CustomModal>
      )}
    </>
  );
};

export default Gallery;
