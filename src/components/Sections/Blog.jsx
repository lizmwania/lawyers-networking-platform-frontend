import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FullButton from "../Buttons/FullButton";
import { Link } from "react-router-dom";
import blogImg from '../../images/blog/blog1.png';


export default function Blog() {

  const [blogs, setBlogs] = useState([]);
  useEffect (() => {
    const fetchBlogs = async () => {
      const response = await fetch (
        //sort=DatePublished:desc&_limit=3
        "http://127.0.0.1:8000/publication/"
      );
      const data = await response.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <Wrapper>
      <div className="blog-container" >
        <div className="container">
          <HeaderInfo>
            <h1 className="font30 extraBold">Recent Stories</h1>
          </HeaderInfo>
          <div className="flex textCenter">
              <BlogWrapper className="flex whiteBg radius8">
              {blogs.slice(0, 3).map((blog) => 
                <SingleBlog>
                  <img src={blogImg} alt='blog' />
                  <p className="font13 extraBold" style={{ padding: "20px 0" }}>{blog.Title}
                  <span className="font12"> - Published:
                  <span className="tag font11">{blog.DatePublished}</span>
                  </span>
                  </p>
                  <p className="font13" >
                    {blog.Description.slice(0, 180)}..
                  </p>
                  <div className="flex flexSpaceNull">
                    <p className="whiteColor tag coralBg radius6 font12">{
                      blog.Category
                    }    
                    </p>
                    <span className=" radius6 tag font13">
                      <Link key={blog.id} className='blogItem-link' to={`/blog/${blog.id}`}>
                      Read More ➝
                      </Link>
                    </span>
                  </div>
                </SingleBlog>
                )}
              </BlogWrapper>
          </div>
          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" }}>
              <Link to="/blog" >
              <FullButton title="Load More"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding-top: 0px;
  justify-content: center;
    align-items: center;
    flex-direction: column;
    
    align-content: center;
    text-align: center;
    margin: 0 auto;
`;
const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const BlogWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;
  
  @media (max-width: 860px) {
    width: fit-content;
    display: flex;
    flex-direction:column;
    align-content:center;
    flex-wrap: wrap;
  }
  
`;
const SingleBlog = styled.div`
flex-direction: row;
width: calc(33.33% - 20px);

:hover {
  opacity: 0.7;
}
  @media (max-width: 860px) {
    flex-direction:column;
    align-content:center;
    width: fit-content;
    display: flex;
    flex-direction:column;
    align-content:center;
    flex-wrap: wrap;
  }
`;

