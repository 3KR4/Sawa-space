"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { posts } from "@/Data";
import ContentLoader from "react-content-loader";

import Post from "@/components/Post";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0); // Adjust as needed
  }, []);

  return (
    <div className="home">
      <div className="posts-holder">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div>
                <ContentLoader
                  className="skeleton skeleton-post"
                  width={600}
                  height={350}
                  speed={5}
                  viewBox="0 0 600 350"
                  backgroundColor="#E8E8E8"
                  foregroundColor="#D5D5D5"
                >
                  {/* Profile Picture */}
                  <circle cx="35" cy="35" r="20" />
                  {/* Name & Timestamp */}
                  <rect x="65" y="20" rx="5" ry="5" width="120" height="12" />
                  <rect x="65" y="38" rx="5" ry="5" width="100" height="10" />
                  {/* Post Text */}
                  <rect x="20" y="70" rx="5" ry="5" width="93%" height="10" />
                  <rect x="20" y="90" rx="5" ry="5" width="500" height="10" />
                  <rect x="20" y="110" rx="5" ry="5" width="520" height="10" />
                  {/* Image Placeholder */}
                  <rect x="20" y="140" rx="5" ry="5" width="93%" height="150" />
                  {/* Footer (Likes, Comments, Shares) */}
                  <rect
                    x="20"
                    y="310"
                    rx="5"
                    ry="5"
                    width="30"
                    height="10"
                  />{" "}
                  {/* Like Icon */}
                  <rect
                    x="60"
                    y="310"
                    rx="5"
                    ry="5"
                    width="20"
                    height="10"
                  />{" "}
                  {/* Like Count */}
                  <rect
                    x="515"
                    y="310"
                    rx="5"
                    ry="5"
                    width="30"
                    height="10"
                  />{" "}
                  {/* Comment Icon */}
                  <rect
                    x="555"
                    y="310"
                    rx="5"
                    ry="5"
                    width="20"
                    height="10"
                  />{" "}
                  {/* Comment Count */}
                </ContentLoader>
              </div>
            ))
          : posts.map((x, index) => {
              return <Post key={index} data={x} />;
            })}
      </div>
    </div>
  );
}
