import React from "react";
import Button from "../shared/Button";
import "./Recommended.css";

interface RecommendedProps {
  handleRecommendedClick: (value: any) => void;
}

const Recommended: React.FC<RecommendedProps> = ({
  handleRecommendedClick,
}) => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommandé</h2>
        <div className="recommended-flex">
          <Button
            onClickHandler={handleRecommendedClick}
            value=""
            title="Tous les menus"
          />
          <Button
            onClickHandler={handleRecommendedClick}
            value="petit-déjeuner"
            title="Petit-déjeuner"
          />
          <Button
            onClickHandler={handleRecommendedClick}
            value="déjeuner"
            title="Déjeuner"
          />
          <Button
            onClickHandler={handleRecommendedClick}
            value="dîner"
            title="Dîner"
          />
        </div>
      </div>
    </>
  );
};

export default Recommended;
