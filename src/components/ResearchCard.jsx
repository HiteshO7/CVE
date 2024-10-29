import React from 'react';
import Image from 'next/image';
import './ResearchCard.scss';

const ResearchCard = ({ title, imageSrc, altText, commentCount, profilePic, commentText }) => {
  return (
    <div className="research-card">
      <h1 className="title">{title}</h1>
      <div className="image-container">
        <Image
          src={imageSrc}
          alt={altText}
          className="research-image"
          onError={(e) => { e.target.src = '/path/to/placeholder.jpg'; }}
          width={500} // Set appropriate width
          height={300} // Set appropriate height
          layout="responsive" // Optional: maintains aspect ratio
        />
      </div>
      <div className="comments">
        <p>{commentCount} new comments</p>
        <div className="comment-detail">
          <Image
            src={profilePic}
            alt="User Profile"
            className="profile-pic"
            width={50} // Set appropriate width for the profile picture
            height={50} // Set appropriate height for the profile picture
          />
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
