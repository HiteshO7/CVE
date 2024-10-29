import React from 'react';
import './ResearchCard.scss';

const ResearchCard = ({ title, imageSrc, altText, commentCount, profilePic, commentText }) => {
  return (
    <div className="research-card">
      <h1 className="title">{title}</h1>
      <div className="image-container">
        <img src={imageSrc} alt={altText} className="research-image" onError={(e) => { e.target.src = '/path/to/placeholder.jpg'; }} />
      </div>
      <div className="comments">
        <p>{commentCount} new comments</p>
        <div className="comment-detail">
          <img src={profilePic} alt="User Profile" className="profile-pic" />
          <span>{commentText}</span>
        </div>
      </div>
      <button className="get-started">
        Get started <span>→</span>
      </button>
    </div>
  );
};
 
ResearchCard.defaultProps = {
  title: "Genetic research journey",
  imageSrc: "/path/to/your/image.jpg",
  altText: "Genetic Research",
  commentCount: "10",
  profilePic: "/path/to/profile.jpg",
  commentText: "Subtle cytoplasmic changes...",
};

export default ResearchCard;
