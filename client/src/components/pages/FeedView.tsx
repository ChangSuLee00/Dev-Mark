import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";

interface P {}

const FeedView: FC<P> = (props: P): JSX.Element => {
  return (
    <>
      {/* Header */}
      <Header header="Feed" search={false} />
      {/* Main */}
      <div className="edit-feed-container">
        <Link to="/feeds/newfeed">
          <button type="button" className="btn btn-secondary feed-edit">
            Edit Feed
          </button>
        </Link>
      </div>

      {/* Cards */}
      <div className="card mb-3 card-wrapper">
        <div className="feed-row row g-0">
          <div className="feed-col col-md-4">
            <img
              src="https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png"
              className="img-fluid rounded-start feed-img"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <p className="card-text">
                <h4>Text Header</h4>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <div className="card-text-like">
                <button className="card-text-like-button">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feed-button-container mb-3">
        <button type="button" className="btn btn-outline-secondary">
          {"<"}
        </button>
        <button type="button" className="btn btn-outline-secondary">
          {"..."}
        </button>
        <button type="button" className="btn btn-outline-secondary">
          {">"}
        </button>
      </div>
    </>
  );
};

export default FeedView;
