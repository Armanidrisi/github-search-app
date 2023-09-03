import React, { useState } from "react";
import { Navbar, ProfileCard, RepoCard } from "../components";
import { ToastContainer, toast } from "react-toastify";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const clearUserData = () => {
    setUser(null);
    setRepos([]);
  };

  const fetchUser = async (username) => {
    if (!username) {
      clearUserData();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (response.status === 404) {
        toast.error("User not found");
        clearUserData();
      } else if (!response.ok) {
        toast.error("An error occurred");
        clearUserData();
      } else {
        const userData = await response.json();
        toast.success("User found successfully");
        setUser(userData);
        fetchUserRepos(username);
      }
    } catch (error) {
      toast.error("An error occurred");
      clearUserData();
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRepos = async (username) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (response.ok) {
        const userRepos = await response.json();
        setRepos(userRepos);
      }
    } catch (error) {
      console.error("Error fetching user repositories", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    fetchUser(username);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <h3>Search GitHub Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-field col s12">
              <input id="username" type="text" name="username" />
              <label htmlFor="username">Username</label>
            </div>
            <button type="submit" className="btn red lighten-2">
              Search
            </button>
          </form>
        </div>

        {loading && <p>Loading... </p>}

        <div className="row">{user && <ProfileCard user={user} />}</div>

        <div className="row">
          <div className="col s12">
            {user && (
              <div className="card">
                <div className="card-content">
                  <span className="card-title">Repositories</span>
                  <div id="repos">
                    {repos.length > 0 &&
                      repos.map((repo) => (
                        <RepoCard key={repo.id} repo={repo} />
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
