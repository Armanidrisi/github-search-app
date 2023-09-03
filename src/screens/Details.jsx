import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Details = () => {
  const { username, repo } = useParams();
  const navigate = useNavigate();

  const [repoData, setRepoData] = useState(null);
  const [filesData, setFilesData] = useState([]);
  const [loadingRepo, setLoadingRepo] = useState(true);
  const [loadingFiles, setLoadingFiles] = useState(true);

  const fetchRepoDetails = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}`
      );

      if (response.status === 404) {
        toast.error("Repository not found");
        navigate('/')
        return;
      }

      const data = await response.json();
      setRepoData(data);
      setLoadingRepo(false);
      await fetchRepoFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRepoFiles = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/contents`
      );
      const data = await response.json();
      setFilesData(data);
      setLoadingFiles(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRepoDetails();
  }, [username, repo]);

  const RenderRepoDetails = () => {
    if (loadingRepo) {
      return <p>Loading repository details...</p>;
    }

    if (repoData) {
      return (
        <>
          <h3>Repository Details</h3>
          <div id="repo-details">
            <p>Name: {repoData.name}</p>
            <p>Description: {repoData.description || "N/A"}</p>
            <p>Stars: {repoData.stargazers_count}</p>
            <p>Watchers: {repoData.watchers_count}</p>
            <p>Forks: {repoData.forks_count}</p>
            <p>Language: {repoData.language || "N/A"}</p>
            <p>
              URL:{" "}
              <a
                href={repoData.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repoData.html_url}
              </a>
            </p>
          </div>
        </>
      );
    }

    return <p>Repository not found</p>;
  };

  const RenderFileList = () => {
    if (loadingFiles) {
      return <p>Loading files...</p>;
    }

    return (
      <>
        <h2>Files</h2>
        <ul id="file-list" className="collection">
          {filesData.map((file) => (
            <li className="collection-item" key={file.name}>
              <a href={file.html_url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="row">
          <RenderRepoDetails />
          <RenderFileList />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Details;
